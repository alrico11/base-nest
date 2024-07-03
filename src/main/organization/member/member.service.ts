import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { OrganizationService } from '../organization.service';
import { IAddAdmin, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly organizationService: OrganizationService
  ) { }

  async addMember({ body, lang, param: { id }, user }: ICreateMember) {
    const { userId } = body;
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND)
    const userJoined = await this.prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
    if (userJoined) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "member" }), HttpStatus.CONFLICT);
    await this.organizationService.adminGuard({ lang, organizationId: id, userId: user.id })
    await this.prisma.organizationMember.create({
      data: {
        organizationId: id,
        userId: userId,
        addedById: user.id
      }
    });
    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
    return { message: LangResponse({ key: "created", lang, object: 'member' }) };
  }

  async removeMember({ param: { id }, body: { userId }, user, lang }: IRemoveMember) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      const adminJoined = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (userJoined)
        await this.organizationService.adminGuard({ lang, organizationId: id, userId: user.id })
      await prisma.organizationMember.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });
      if (adminJoined)
        await this.organizationService.ownerGuard({ lang, organizationId: id, userId: user.id })
      await prisma.organizationAdmin.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });
      if (!adminJoined && !userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "member" }), HttpStatus.BAD_REQUEST);

      return { message: LangResponse({ key: "deleted", lang, object: 'member' }) };
    });

    this.l.info({ message: `userId ${userId} deleted successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }

  async addAdmin({ body, lang, param: { id }, user }: IAddAdmin) {
    const { userId } = body;
    await this.organizationService.adminGuard({ lang, organizationId: id, userId: user.id })
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      if (!userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "admin" }), HttpStatus.BAD_REQUEST);
      const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (alreadyAdmin) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "admin" }), HttpStatus.CONFLICT);

      await prisma.organizationAdmin.create({
        data: {
          organizationId: id,
          userId: userId,
          addedById: user.id
        }
      });

      return { message: LangResponse({ key: "added", lang, object: 'admin' }) };
    });

    this.l.info({ message: `userId ${userId} update role to admin successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }

  async removeAdmin({ body, lang, param: { id }, user }: IRemoveAdmin) {
    const { userId } = body;
    await this.organizationService.adminGuard({ lang, organizationId: id, userId: user.id })
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);

      const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (!alreadyAdmin) throw new HttpException(LangResponse({ key: "notFound", lang, object: "admin" }), HttpStatus.NOT_FOUND);

      await prisma.organizationAdmin.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });

      return { message: LangResponse({ key: "deleted", lang, object: 'admin' }) };
    });

    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }
}
