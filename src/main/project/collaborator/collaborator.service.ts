import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IAddAdminProjectCollaborator, ICheckAlreadyCollaborator, ICreateProjectCollaborator, IFindCollaboratorIsExist, IRemoveAdminProjectCollaborator, IRemoveMemberProjectCollaborator } from './collaborator.@types';
import { MemberService } from 'src/main/organization/member';
import { OrganizationRepository } from 'src/main/organization/organization.repository';
import { CollaboratorRepository } from './collaborator.repository';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly memberService: MemberService,
    private readonly organizationRepository: OrganizationRepository,
    private readonly collaboratorRepository: CollaboratorRepository
  ) { this.l.setContext(CollaboratorService.name) }

  async addCollaborator({ body, param: { organizationId, projectId }, user, lang }: ICreateProjectCollaborator) {
    const { userIds } = body;

    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId })
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
      const isMember = await this.memberService.findMemberIsExist({ organizationCreatorId: organization.creatorId, organizationMembers: organization.OrganizationMembers, userIds })
      if (!isMember) throw new HttpException(LangResponse({ key: "badRequest", lang, object: "task" }), HttpStatus.BAD_REQUEST)
    }

    const project = await this.prisma.project.findFirst({ where: { id: projectId }, include: { ProjectCollaborators: true } })
    if (!project) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    const isExist = await this.findCollaboratorIsExist({ projectCollaborators: project.ProjectCollaborators, userIds })
    if (isExist) throw new HttpException(LangResponse({ key: "conflict", lang, object: "alreadyCollaborator" }), HttpStatus.CONFLICT);

    const newCollaborator = await this.collaboratorRepository.createManyCollaborator({ addedById: user.id, projectId, userIds })
    this.l.save({
      data: {
        message: `userId ${userIds} joined successfully in projectId ${projectId} by user id${user.id}`
      },
      method: "CREATE",
      newData: newCollaborator,
      organizationId,
      projectId,
      userId: user.id
    });
    return { message: LangResponse({ key: "created", lang, object: "collaborator" }) };
  }

  async addAdmin({ body, lang, param: { projectId, organizationId }, user }: IAddAdminProjectCollaborator) {
    const { userId } = body;
    if (organizationId) {
      const organization = await this.prisma.project.findFirst({ where: { id: projectId, organizationId } });
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND);
    }
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
    const userJoined = await this.prisma.projectCollaborator.findFirst({ where: { projectId, userId } });
    if (!userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "collaborator" }), HttpStatus.BAD_REQUEST);
    const alreadyAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId, userId } });
    if (alreadyAdmin) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "admin" }), HttpStatus.CONFLICT);
    const newAdmin = await this.prisma.projectAdmin.create({
      data: {
        ...body,
        addedById: user.id,
        projectId
      }
    });
    this.l.save({
      data: {
        message: `userId ${userId} update role to admin successfully in projectId ${projectId} by user id${user.id}`
      },
      method: "CREATE",
      newData: newAdmin,
      organizationId,
      projectId,
      userId: user.id
    });
    return { message: LangResponse({ key: "created", lang, object: "admin" }) };
  }

  async removeAdmin({ body, lang, param: { projectId, organizationId }, user }: IRemoveAdminProjectCollaborator) {
    const { userId } = body;
    if (organizationId) {
      const organization = await this.prisma.project.findFirst({ where: { id: projectId, organizationId } });
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND);
    }
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);

      const alreadyAdmin = await prisma.projectAdmin.findFirst({ where: { projectId, userId } });
      if (!alreadyAdmin) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND);

      await prisma.projectAdmin.delete({ where: { projectId_userId: { projectId, userId } } });

      return { message: LangResponse({ key: "created", lang, object: 'collaborator' }) };
    });

    this.l.save({
      data: {
        message: `userId ${userId} removed as admin from projectId ${projectId} by user id${user.id}`
      },
      method: "DELETE",
      organizationId,
      projectId,
      userId: user.id
    });
    return result;
  }

  async removeCollaborator({ param: { projectId, organizationId }, body: { userId }, user, lang }: IRemoveMemberProjectCollaborator) {
    const result = await this.prisma.$transaction(async (prisma) => {
      if (organizationId) {
        const organization = await this.prisma.project.findFirst({ where: { id: projectId, organizationId } });
        if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND);
      }
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND);

      const userJoined = await prisma.projectCollaborator.findFirst({ where: { projectId, userId } });
      const adminJoined = await prisma.projectAdmin.findFirst({ where: { projectId, userId } });

      if (userJoined) await prisma.projectCollaborator.delete({
        where: {
          projectId_userId: { projectId, userId }
        }
      });

      if (adminJoined) {
        await prisma.projectCollaborator.delete({ where: { projectId_userId: { projectId, userId } } });
        await prisma.projectAdmin.delete({ where: { projectId_userId: { projectId, userId } } });
      }

      if (!adminJoined && !userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "collaborator" }), HttpStatus.BAD_REQUEST);

      return { message: LangResponse({ key: "deleted", lang, object: 'collaborator' }) };
    });

    this.l.save({
      data: {
        message: `userId ${userId} deleted successfully from projectId ${projectId} by user id${user.id}`
      },
      method: "DELETE",
      organizationId,
      projectId,
      userId: user.id
    });
    return result;
  }
  async findCollaboratorIsExist({  projectCollaborators, userIds }: IFindCollaboratorIsExist) {
    const collaborators = new Set(projectCollaborators.map(({ userId }) => userId));
    const allExist = userIds.every(id => collaborators.has(id));
    return allExist;
  }
}
