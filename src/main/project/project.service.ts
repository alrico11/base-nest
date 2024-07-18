import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma, Project, Resource } from "@prisma/client";
import dayjs from "dayjs";
import { LangResponse, LangWord } from "src/constants";
import { FileService } from "src/file";
import { LogService } from "src/log";
import { PrismaService } from "src/prisma";
import { dotToObject } from "src/utils/string";
import { XConfig } from "src/xconfig";
import { OrganizationRepository } from "../organization/organization.repository";
import { DeviceLang, ICheckRoleCollaborator, ICreateProject, IFindAllProject, IFindAllProjectCollaborator, IFindOneProject, IRemoveProject, IUpdateProject } from "./project.@types";
import { DeletedProjectFilesEvent, UpdatedProjectEvent } from "./project.event";

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly config: XConfig,
    private readonly ee: EventEmitter2,
    private readonly l: LogService,
    private readonly organizationRepository: OrganizationRepository
  ) { this.l.setContext(ProjectService.name) }

  async create({ body, lang, user, param }: ICreateProject) {
    if (param) {
      const { organizationId } = param
      if (organizationId) {
        const organization = this.organizationRepository.findById({ organizationId })
        if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
      }
    }
    const { thumbnail, files, tagId, ...rest } = body;
    let Resource: Resource | Resource[] | undefined;
    let FileResource: Resource | Resource[];
    await this.prisma.$transaction(async (prisma) => {
      if (thumbnail) Resource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT, user });
      const project = await prisma.project.create({
        data: {
          ...rest,
          creatorId: user.id,
          organizationId: param?.organizationId ? param?.organizationId : undefined,
          thumbnailId: !Array.isArray(Resource) && Resource ? Resource.id : undefined,
        },
      });
      if (tagId) await prisma.projectTag.create({
        data: {
          tagId, projectId: project.id
        }
      });
      if (files) {
        FileResource = await this.fileService.handleUploadObjectStorage({ fileName: files, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE, user });
        if (Array.isArray(Resource) && Resource.length > 0) {
          const ProjectImages: Prisma.ProjectImageCreateManyInput[] = [];
          const ProjectFiles: Prisma.ProjectImageCreateManyInput[] = [];
          Resource.forEach(({ fileType, id }) => {
            if (fileType.includes("image")) {
              ProjectImages.push({ resourceId: id, projectId: project.id });
            } else {
              ProjectFiles.push({ resourceId: id, projectId: project.id });
            }
          });
          if (ProjectImages.length > 0) await prisma.projectImage.createMany({ data: ProjectImages })
          if (ProjectFiles.length > 0) await prisma.projectFile.createMany({ data: ProjectFiles })
        }
        if (!Array.isArray(Resource) && Resource) {
          if (Resource.fileType.includes("image")) await prisma.projectImage.create({ data: { projectId: project.id, resourceId: Resource.id } })
          else await prisma.projectFile.createMany({ data: { projectId: project.id, resourceId: Resource.id } })
        }
      }
      this.l.save({
        data: {
          message: `project with id ${project.id} created by userId ${user.id}`
        },
        method: "CREATE",
        newData: project,
        organizationId: param?.organizationId ? param?.organizationId : undefined,
        projectId: project.id,
        userId: user.id
      });
    });
    return { message: LangResponse({ key: "created", lang, object: "project" }) };
  }

  async findAll({ lang, query, user, param }: IFindAllProject) {

    const { limit, orderDirection, page, tagId, search } = query
    let orderBy: Prisma.ProjectOrderByWithRelationInput = dotToObject({ orderBy: query.orderBy, orderDirection })
    let where: Prisma.ProjectWhereInput = {
      deletedAt: null,
      creatorId: user.id,
      name: { contains: search, mode: "insensitive" },
      ...(tagId && { ProjectTags: { some: { tagId } } })
    };
    if (param) {
      const { organizationId } = param
      if (organizationId) {
        const organization = this.organizationRepository.findById({ organizationId })
        if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
        where.organizationId = organizationId
      } else {
        where.organizationId = null
      }
    }

    if (query.orderBy === "createdAtLastChat") {
      orderBy = { LastChat: dotToObject({ orderBy: query.orderBy, orderDirection }) }
    }
    const { result, ...rest } = await this.prisma.extended.project.paginate({
      where,
      include: {
        _count: {
          select: { Tasks: true }
        },
        User: { include: { Resource: true } },
        ProjectCollaborators: {
          include:
            { User: { include: { Resource: true }, }, }
        },
      },
      limit, page, orderBy
    })
    const data = result.map(({ id, name, createdAt, ProjectCollaborators, _count, priority, User }) => {
      const UserResource = User.Resource
      const teams = ProjectCollaborators.map(({ User }) => {
        const resource = User.Resource
        let thumbnail: undefined | string
        if (resource) {
          thumbnail = this.fileService.cdnUrl({ objectKey: resource.objectKey })
        }
        return {
          userId: User.id,
          name: User.name,
          thumbnail
        }
      })
      return {
        id,
        createdAt,
        name,
        totalProject: _count.Tasks,
        priority,
        teams: [{
          userId: User.id,
          name: User.name,
          thumbnail: UserResource ? this.fileService.cdnUrl({ objectKey: UserResource.objectKey }) : undefined,
          blurHash: UserResource ? UserResource.blurHash : undefined
        }, ...teams]
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "project" }), data: data, ...rest };
  }

  async findOne({ lang, param: { id, organizationId }, user }: IFindOneProject) {
    let where: Prisma.ProjectWhereInput = { id, deletedAt: null }
    if (organizationId) where = { ...where, organizationId }
    const projectExist = await this.prisma.project.findFirst({
      where,
      include: {
        _count: { select: { Tasks: true } },
        Tasks: {
          include: {
          }
        },
        ProjectAdmins: {
          include: {
            User: {
              include: { Resource: true }
            }
          }
        },
      }
    })
    if (!projectExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    const { name, ProjectAdmins, creatorId, _count } = projectExist
    const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId }))
    const data = {
      detailsProject: { id, name, totalTask: _count.Tasks },
      detailUser: {
        userId: user.id,
        name: user.name,
        role: adminIds.has(user.id) ? LangWord({ key: "admin", lang }) : (user.id === creatorId ? LangWord({ key: "owner", lang }) : LangWord({ key: "member", lang }))
      },
    }
    return { message: LangResponse({ key: "fetched", lang, object: "project" }), data };
  }

  async update({ body, lang, param: { id, organizationId }, user }: IUpdateProject) {
    let where: Prisma.ProjectWhereUniqueInput = { id, deletedAt: null }
    if (organizationId) where = { ...where, organizationId }
    return this.prisma.$transaction(async (prisma) => {
      const projectExist = await prisma.project.findFirst({
        where,
        include: {
          Resource: true,
          ProjectFiles: { include: { Resource: true } },
          ProjectImages: { include: { Resource: true } }
        }
      });

      if (!projectExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND);
      const { thumbnail, files, tagId, ...rest } = body;
      let newResource: Resource | undefined | Resource[];
      if (tagId) {
        const projectTagExist = await prisma.projectTag.findFirst({ where: { projectId: id } });
        projectTagExist
          ? await prisma.projectTag.update({ where: { projectId: id }, data: { tagId } })
          : await prisma.projectTag.create({ data: { projectId: id, tagId } });
      }

      if (thumbnail) {
        newResource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT, user });
        const oldResource = projectExist.Resource ? projectExist.Resource : undefined;
        if (oldResource) this.ee.emit(UpdatedProjectEvent.key, new UpdatedProjectEvent({ newResource, oldResource }));
      }
      if (files && files.length === 0) {
        let OldFileResource = projectExist.ProjectFiles.map(({ Resource }) => Resource);
        let OldImageResource = projectExist.ProjectImages.map(({ Resource }) => Resource);
        if (OldFileResource.length > 0) {
          await prisma.projectFile.deleteMany({ where: { projectId: id } })
        }
        if (OldImageResource.length > 0) {
          await prisma.projectImage.deleteMany({ where: { projectId: id } })
        }
        this.ee.emit(DeletedProjectFilesEvent.key, new DeletedProjectFilesEvent({ oldResourceFiles: OldImageResource, oldResourceImages: OldImageResource }))
      }

      if (files && files.length > 0) {
        const { ProjectFiles, ProjectImages } = projectExist
        const objectKeyFiles = ProjectFiles.map(({ Resource }) => Resource.fileName)
        const objectKeyImages = ProjectImages.map(({ Resource }) => Resource.fileName)
        let projectFiles: Prisma.ProjectFileCreateManyInput[] = []
        let projectImages: Prisma.ProjectImageCreateManyInput[] = []
        let fileNamesToDelete: string[] = [];
        let fileNamesToAdd: string[] = [];
        const FileAttachment = [...objectKeyFiles, ...objectKeyImages];

        fileNamesToAdd = files.filter(fileName => !FileAttachment.includes(fileName));
        fileNamesToDelete = FileAttachment.filter(fileName => !files.includes(fileName));

        let newFileResources = await this.fileService.handleUploadObjectStorage({
          fileName: fileNamesToAdd,
          prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE,
          user
        });

        if (newFileResources) {
          if (!Array.isArray(newFileResources)) {
            newFileResources = [newFileResources];
          }
          newFileResources.forEach(newFileResource => {
            if (newFileResource.fileType.includes("image")) projectImages.push({ resourceId: newFileResource.id, projectId: id });
            else projectFiles.push({ resourceId: newFileResource.id, projectId: id });
          });
        }
        if (projectFiles.length > 0) await prisma.projectFile.createMany({ data: projectFiles });
        if (projectImages.length > 0) await prisma.projectImage.createMany({ data: projectImages });
        if (fileNamesToDelete.length > 0) {
          let oldResourceFiles: Resource[] = [];
          let oldResourceImages: Resource[] = [];

          fileNamesToDelete.forEach(fileName => {
            const resource = [...ProjectFiles, ...ProjectImages].find(({ Resource }) => Resource.fileName === fileName);
            if (resource) {
              if (resource.Resource.fileType.includes("image")) oldResourceImages.push(resource.Resource);
              else oldResourceFiles.push(resource.Resource);
            }
          });
          for (const resource of oldResourceFiles) {
            await prisma.projectFile.delete({
              where: { projectId_resourceId: { resourceId: resource.id, projectId: id } }
            });
          }
          for (const resource of oldResourceImages) {
            await prisma.projectImage.delete({
              where: { projectId_resourceId: { resourceId: resource.id, projectId: id } }
            });
          }
          this.ee.emit(DeletedProjectFilesEvent.key, new DeletedProjectFilesEvent({ oldResourceFiles, oldResourceImages }));
        }
      }
      const newData = await prisma.project.update({
        where,
        data: {
          ...rest,
          thumbnailId: !Array.isArray(newResource) && newResource ? newResource.id : undefined
        }
      });
      this.l.save({
        data: {
          message: `project with id ${id} updated by ${user.id}`
        },
        method: "UPDATE",
        newData,
        oldData: projectExist,
        organizationId: organizationId,
        projectId: id,
        userId: user.id
      })
      return { message: LangResponse({ key: "updated", lang, object: "project" }) };
    });
  }

  async findDetail({ lang, param: { id, organizationId }, user }: IFindOneProject) {
    const projectExist = await this.prisma.project.findFirst({
      where: { id, organizationId },
      include: {
        Resource: true,
        ProjectTags: { include: { Tag: true } },
        ProjectFiles: { include: { Resource: true } },
        ProjectImages: { include: { Resource: true } },
      }
    })
    if (!projectExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    const { ProjectTags, name, ProjectFiles, ProjectImages, creatorId, Resource, budget, color, goals, priority, status, target, description, } = projectExist
    const allAttachment = [
      ...ProjectImages.map(({ Resource }) => {
        return {
          attachment: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource ? Resource.blurHash : undefined,
          createdAt: Resource ? Resource.createdAt : undefined,
        }
      }),
      ...ProjectFiles.map(({ Resource }) => {
        return {
          attachment: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          createdAt: Resource ? Resource.createdAt : undefined,
        }
      })
    ]
    const sortedResources = allAttachment
      .filter(resource => resource.createdAt)
      .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
    const attachment = sortedResources.map(({ createdAt, ...rest }) => rest);
    const data = {
      name,
      thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
      blurHash: Resource ? Resource.blurHash : undefined,
      priority,
      status,
      description,
      target,
      group: ProjectTags.map(({ Tag }) => { return Tag.name })[0],
      attachment
    }
    return { message: LangResponse({ key: "fetched", lang, object: "project" }), data };
  }

  async remove({ lang, param: { id, organizationId }, user }: IRemoveProject) {
    let where: Prisma.ProjectWhereInput = { id, deletedAt: null }
    if (organizationId) where = { ...where, organizationId }
    const projectExist = await this.prisma.project.findFirst({ where })
    if (!projectExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    await this.prisma.project.update({ where: { id, creatorId: user.id }, data: { deletedAt: dayjs().toISOString() } })
    this.l.save({
      data: { message: `project with id ${id} deleted by userId ${user.id}` },
      method: "DELETE",
      oldData: projectExist,
      organizationId: organizationId,
      projectId: projectExist.id,
      userId: user.id
    });
    return { message: LangResponse({ key: "deleted", lang, object: "project" }) };
  }


  async findAllCollaborator({ lang, param: { id, organizationId }, query }: IFindAllProjectCollaborator) {
    const { limit, orderDirection, page, search } = query
    const orderBy = { User: dotToObject({ orderBy: query.orderBy, orderDirection }) }
    let where: Prisma.ProjectWhereInput = { id, deletedAt: null }
    if (organizationId) where = { ...where, organizationId }
    const { result, ...rest } = await this.prisma.extended.project.paginate({
      where: where,
      limit, page,
      orderBy,
      include: {
        User: { include: { Resource: true } },
        ProjectAdmins: { include: { User: { include: { Resource: true } } } },
        ProjectCollaborators: { include: { User: { include: { Resource: true } } } }
      }
    })
    const data = result.map(({ ProjectAdmins, ProjectCollaborators, User, creatorId }) => {
      const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId }))
      const collaborators = ProjectCollaborators.map(({ User }) => {
        const { Resource, name, updatedAt } = User
        return {
          userId: User.id,
          name,
          role: adminIds.has(User.id) ? LangWord({ key: "admin", lang }) : creatorId === User.id ? LangWord({ key: "owner", lang }) : LangWord({ key: "member", lang }),
          thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurhash: Resource ? Resource.blurHash : undefined,
          updatedAt,
        }
      })
      const { Resource, name, updatedAt } = User
      return {
        userId: User.id,
        name: name,
        thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        blurhash: Resource ? Resource.blurHash : undefined,
        role: LangWord({ key: "owner", lang }),
        updatedAt: updatedAt
        , ...collaborators
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "collaborator" }), data: data, ...rest }
  }

  async adminGuard({ projectId, userId, lang, organizationId }: ICheckRoleCollaborator) {
    if (organizationId) {
      const organization = await this.prisma.project.findFirst({ where: { id: projectId, organizationId } })
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
    }
    const isAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId, userId } })
    const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId, organizationId } })
    return isAdmin || isOwner ? true : false
  }

  async ownerGuard({ projectId, userId, lang, organizationId }: ICheckRoleCollaborator) {
    let where: Prisma.ProjectWhereInput = { id: projectId, creatorId: userId }
    if (organizationId) where = { ...where, organizationId }
    const isOwner = await this.prisma.project.findFirst({ where })
    return isOwner ? true : false
  }

  async collaboratorGuard({ lang, projectId, userId, organizationId }: ICheckRoleCollaborator) {
    const project = await this.prisma.project.findFirst({ where: { id: projectId, deletedAt: null, organizationId: organizationId ? organizationId : null }, include: { ProjectCollaborators: true } })
    if (!project) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    const collaboratorIds = new Set(project.ProjectCollaborators.map(({ userId }) => { return userId }))
    collaboratorIds.add(project.creatorId)
    if (!collaboratorIds.has(userId)) return false
    return true
  }

  async getCollaborator(project: Project) {
    const collaborator = await this.prisma.projectCollaborator.findMany({
      where: { projectId: project.id },
      include: { User: { include: { UserDevice: { include: { Device: true } } } } }
    })
    let fcmToken: DeviceLang[] = []
    collaborator.map(({ User }) => {
      User.UserDevice.map(({ Device }) => {
        if (Device.fcmToken) fcmToken.push({ fcmToken: Device.fcmToken, lang: Device.lang })
      })
    })
    return fcmToken as DeviceLang[]
  }
}