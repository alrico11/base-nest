import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IAddAdminProjectCollaborator, ICreateProjectCollaborator, IRemoveAdminProjectCollaborator, IRemoveMemberProjectCollaborator } from './collaborator.@types';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { this.l.setContext(CollaboratorService.name)}

  async addCollaborator({ body, param: { organizationId, projectId }, user, lang }: ICreateProjectCollaborator) {
    const { userId } = body;
    if (organizationId) {
      const organization = await this.prisma.project.findFirst({ where: { id: projectId, organizationId } });
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND);
    }
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND);
    const collaboratorExist = await this.prisma.projectCollaborator.findFirst({ where: { userId: body.userId, projectId } });
    if (collaboratorExist) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "alreadyCollaborator" }), HttpStatus.CONFLICT);
    const newCollaborator = await this.prisma.projectCollaborator.create({
      data: {
        ...body,
        projectId,
        addedById: user.id
      }
    });
    this.l.save({
      data: {
        message: `userId ${userId} joined successfully in projectId ${projectId} by user id${user.id}`
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
}
