import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ProjectService } from '../project.service';
import { IAddAdminProjectCollaborator, ICreateProjectCollaborator, IRemoveAdminProjectCollaborator, IRemoveMemberProjectCollaborator } from './collaborator.@types';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly projectService: ProjectService,
    private readonly fileService: FileService
  ) { }
  async addCollaborator({ body, param: { id }, user, lang }: ICreateProjectCollaborator) {
    const { userId } = body
    await this.projectService.adminGuard({ lang, projectId: id, userId: user.id })
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND)
    const collaboratorExist = await this.prisma.projectCollaborator.findFirst({ where: { userId: body.userId, projectId: id } })
    if (!collaboratorExist) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "alreadyCollaborator" }), HttpStatus.CONFLICT)
    await this.prisma.projectCollaborator.create({
      data: {
        ...body,
        projectId: id,
        addedById: user.id
      }
    })
    this.l.info({ message: `userId ${userId} joined successfully in projectId ${id} by user id${user.id}` });
    return { message: LangResponse({ key: "created", lang, object: "collaborator" }) };
  }

  async addAdmin({ body, lang, param: { id }, user }: IAddAdminProjectCollaborator) {
    const { userId } = body
    await this.projectService.adminGuard({ lang, projectId: id, userId: user.id })
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
    const userJoined = await this.prisma.projectCollaborator.findFirst({ where: { projectId: id, userId } });
    if (!userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "collaborator" }), HttpStatus.BAD_REQUEST);
    const alreadyAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });
    if (alreadyAdmin) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "admin" }), HttpStatus.CONFLICT);
    await this.prisma.projectAdmin.create({
      data: {
        ...body,
        addedById: user.id,
        projectId: id
      }
    })
    this.l.info({ message: `userId ${userId} update role to admin successfully in projectId ${id} by user id${user.id}` });
    return { message: LangResponse({ key: "created", lang, object: "admin" }) }
  }

  async removeAdmin({ body, lang, param: { id }, user }: IRemoveAdminProjectCollaborator) {
    const { userId } = body;
    await this.projectService.adminGuard({ lang, projectId: id, userId: user.id })
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);

      const alreadyAdmin = await prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });
      if (!alreadyAdmin) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND);

      await prisma.projectAdmin.delete({
        where: {
          projectId_userId: { projectId: id, userId }
        }
      });

      return { message: LangResponse({ key: "created", lang, object: 'collaborator' }) };
    });

    this.l.info({ message: `userId ${userId} joined successfully in projectId ${id} by user id${user.id}` });
    return result;
  }


  async removeCollaborator({ param: { id }, body: { userId }, user, lang }: IRemoveMemberProjectCollaborator) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "collaborator" }), HttpStatus.NOT_FOUND);

      const userJoined = await prisma.projectCollaborator.findFirst({ where: { projectId: id, userId } });
      const adminJoined = await prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });

      if (userJoined)
        await this.projectService.adminGuard({ lang, projectId: id, userId: user.id })
      await prisma.projectCollaborator.delete({
        where: {
          projectId_userId: { projectId: id, userId }
        }
      });

      if (adminJoined)
        await this.projectService.ownerGuard({ lang, projectId: id, userId: user.id })
      await prisma.projectCollaborator.delete({
        where: {
          projectId_userId: { projectId: id, userId }
        }
      });

      if (!adminJoined && !userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "collaborator" }), HttpStatus.BAD_REQUEST);

      return { message: LangResponse({ key: "deleted", lang, object: 'collaborator' }) };
    });

    this.l.info({ message: `userId ${userId} deleted successfully in projectId ${id} by user id${user.id}` });
    return result;
  }
 
}
