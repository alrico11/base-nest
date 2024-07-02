import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Resource } from "@prisma/client";
import dayjs from "dayjs";
import { LangResponse, LangWord } from "src/constants";
import { FileService } from "src/file";
import { LogService } from "src/log";
import { PrismaService } from "src/prisma";
import { dotToObject } from "src/utils/string";
import { XConfig } from "src/xconfig";
import { ICheckRoleCollaborator, ICreateProject, IFindAllProject, IFindAllProjectCollaborator, IFindOneProject, IRemoveProject, IUpdateProject } from "./project.@types";
import { DeletedProjectFilesEvent, UpdatedProjectEvent } from "./project.event";

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly config: XConfig,
    private readonly ee: EventEmitter2,
    private readonly l: LogService
  ) { }

  async create({ body, lang, user, param: { organizationId } }: ICreateProject) {
    const { thumbnail, file, tagId, ...rest } = body;
    let Resource: Resource | Resource[] | undefined;
    let FileResource: Resource | Resource[];
    await this.prisma.$transaction(async (prisma) => {

      if (thumbnail) {
        Resource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT, user });
      }

      const project = await prisma.project.create({
        data: {
          ...rest,
          creatorId: user.id,
          organizationId,
          thumbnailId: !Array.isArray(Resource) && Resource ? Resource.id : undefined,
        },
      });
      if (tagId) {
        await prisma.projectTag.create({
          data: {
            tagId, projectId: project.id
          }
        })
      }
      if (file) {
        FileResource = await this.fileService.handleUploadObjectStorage({ fileName: file, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE, user });
        if (Array.isArray(FileResource) && FileResource.length > 0) {
          await prisma.projectFile.createMany({
            data: FileResource.map(({ id }) => ({
              projectId: project.id,
              resourceId: id
            }))
          });
        }
      }
      this.l.info({ message: `project with id ${project.id} created by userId ${user.id}` })
    });
    return { message: LangResponse({ key: "created", lang, object: "project" }) };
  }

  async findAll({ lang, query, user, param: { organizationId } }: IFindAllProject) {
    const { limit, orderDirection, page, search } = query
    let orderBy = dotToObject({ orderBy: query.orderBy, orderDirection })
    if (query.orderBy === "createdAtLastChat") {
      orderBy = { LastChat: dotToObject({ orderBy: query.orderBy, orderDirection }) }
    }

    const { result, ...rest } = await this.prisma.extended.project.paginate({
      where: {
        deletedAt: null, organizationId, creatorId: user.id,
        name: { contains: search, mode: "insensitive" }
      },
      include: {
        _count: {
          select: { Tasks: true }
        },
        User: { include: { Resource: true } },
        ProjectCollaborators: {
          include: {
            User: {
              include: {
                Resource: true
              },
            },
          }
        },
      },
      limit, page, orderBy
    })

    const data = result.map(({ id, name, createdAt, ProjectCollaborators, _count, priority, User }) => {
      const { Resource } = User
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
          thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource ? Resource.blurHash : undefined
        }, ...teams]
      }
    })

    return { message: LangResponse({ key: "fetched", lang, object: "project" }), data: data, ...rest };
  }

  async findOne({ lang, param: { id, organizationId }, user }: IFindOneProject) {
    const projectExist = await this.prisma.project.findFirst({
      where: { id },
      include: {
        _count: { select: { Tasks: true } },
        Tasks: {
          include: {
          }
        },
        ProjectAdmins: {
          include: {
            User: {
              include: {
                Resource: true
              }
            }
          }
        },
      }
    })
    if (!projectExist) throw new HttpException(LangResponse({ key: "fetched", lang, object: "project" }), HttpStatus.NOT_FOUND)
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

  async update({ body, lang, param: { id }, user }: IUpdateProject) {
    return this.prisma.$transaction(async (prisma) => {
      const projectExist = await prisma.project.findFirst({
        where: { id, deletedAt: null, creatorId: user.id },
        include: { Resource: true, ProjectFiles: { include: { Resource: true } } }
      });

      if (!projectExist) throw new HttpException(LangResponse({ key: "fetched", lang, object: "project" }), HttpStatus.NOT_FOUND);

      const { thumbnail, file } = body;
      let newResource: Resource | undefined | Resource[];

      if (thumbnail) {
        newResource = await this.fileService.handleUploadObjectStorage({
          fileName: thumbnail,
          prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT,
          user
        });

        const oldResource = projectExist.Resource ? projectExist.Resource : undefined;
        if (oldResource) {
          this.ee.emit(UpdatedProjectEvent.key, new UpdatedProjectEvent({ newResource, oldResource }));
        }
      }

      if (file && file.length < 0) {
        let OldFileResource = projectExist.ProjectFiles.map(({ Resource }) => Resource);
        this.ee.emit(DeletedProjectFilesEvent.key, new DeletedProjectFilesEvent({ oldResource: OldFileResource }));
      }

      if (file && file.length > 0) {
        const project = await prisma.project.findFirst({
          where: { id, deletedAt: null },
          include: { ProjectFiles: { include: { Resource: true } } }
        });

        const objectKey = new Set(project?.ProjectFiles.map(({ Resource }) => Resource.fileName));

        await Promise.all(file.map(async (fileName) => {
          const fileRes = objectKey.has(fileName);
          if (!fileRes) {
            const newFileResource = await this.fileService.handleUploadObjectStorage({
              fileName,
              prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE,
              user
            });
            if (!Array.isArray(newFileResource)) await prisma.projectFile.create({ data: { resourceId: newFileResource.id, projectId: id } });
          }
        }));
      }
      await prisma.project.update({
        where: { id, creatorId: user.id },
        data: {
          ...body,
          thumbnailId: !Array.isArray(newResource) && newResource ? newResource.id : undefined
        }
      });
      this.l.info({ message: `project with id ${id} updated by userId ${user.id}` })
      return { message: LangResponse({ key: "updated", lang, object: "project" }) };
    });
  }

  async remove({ lang, param: { id }, user }: IRemoveProject) {
    const projectExist = await this.prisma.project.findFirst({ where: { id, deletedAt: null } })
    if (!projectExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    await this.prisma.project.update({ where: { id, creatorId: user.id }, data: { deletedAt: dayjs().toISOString() } })
    this.l.info({ message: `project with id ${id} deleted by userId ${user.id}` })
    return { message: LangResponse({ key: "deleted", lang, object: "project" }) };
  }

  async findAllCollaborator({ lang, param: { id }, query }: IFindAllProjectCollaborator) {
    const { limit, orderDirection, page, search } = query
    const orderBy = { User: dotToObject({ orderBy: query.orderBy, orderDirection }) }
    const { result, ...rest } = await this.prisma.extended.project.paginate({
      where: { id },
      limit, page,
      orderBy,
      include: {
        User: { include: { Resource: true } },
        ProjectAdmins: { include: { User: { include: { Resource: true } } } },
        ProjectCollaborators: { include: { User: { include: { Resource: true } } } }
      }
    })

    const data = result.map(({ ProjectAdmins, ProjectCollaborators, User }) => {
      const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId }))
      const collaborators = ProjectCollaborators.map(({ User }) => {
        const { Resource, name, updatedAt } = User
        return {
          userId: User.id,
          name,
          role: adminIds.has(id) ? LangWord({ key: "admin", lang }) : LangWord({ key: "member", lang }),
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
        ,...collaborators
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "collaborator" }), data: data, ...rest }
  }

  async adminGuard({ projectId, userId, lang }: ICheckRoleCollaborator) {
    const isAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId, userId } })
    const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId } })
    if (!isAdmin && !isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "collaborator" }), HttpStatus.UNAUTHORIZED)
    return true
  }

  async ownerGuard({ projectId, userId, lang }: ICheckRoleCollaborator) {
    const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId } })
    if (!isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "collaborator" }), HttpStatus.UNAUTHORIZED)
    return true
  }
}
