import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { OrganizationService } from '../organization.service';
import { IAddAdmin, ICheckRole, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly organization: OrganizationService
  ) { }

  async create({ body, lang, param: { id }, user }: ICreateMember) {
    const { userId } = body;

    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "member" }), HttpStatus.NOT_FOUND)
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      if (userJoined) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "member" }), HttpStatus.CONFLICT);
      await this.adminGuard({ lang, organizationId: id, userId: user.id })
      await prisma.organizationMember.create({
        data: {
          organizationId: id,
          userId: userId,
          addedById: user.id
        }
      });

      return { message: LangResponse({ key: "created", lang, object: 'member' }) };
    });

    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }

  async remove({ param: { id }, body: { userId }, user, lang }: IRemoveMember) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "member" }), HttpStatus.NOT_FOUND);

      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      const adminJoined = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });

      if (userJoined)
        await this.adminGuard({ lang, organizationId: id, userId: user.id })
      await prisma.organizationMember.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });

      if (adminJoined)
        await this.ownerGuard({ lang, organizationId: id, userId: user.id })
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
    await this.ownerGuard({ lang, organizationId: id, userId: user.id })
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "member" }), HttpStatus.NOT_FOUND);
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      if (!userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "member" }), HttpStatus.BAD_REQUEST);
      const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (alreadyAdmin) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "member" }), HttpStatus.CONFLICT);
      await prisma.organizationMember.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });

      await prisma.organizationAdmin.create({
        data: {
          organizationId: id,
          userId: userId,
          addedById: user.id
        }
      });

      return { message: LangResponse({ key: "created", lang, object: 'member' }) };
    });

    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }

  async removeAdmin({ body, lang, param: { id }, user }: IRemoveAdmin) {
    const { userId } = body;
    await this.adminGuard({ lang, organizationId: id, userId: user.id })
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "member" }), HttpStatus.NOT_FOUND);

      const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (!alreadyAdmin) throw new HttpException(LangResponse({ key: "notFound", lang, object: "member" }), HttpStatus.NOT_FOUND);

      await prisma.organizationAdmin.delete({
        where: {
          organizationId_userId: { organizationId: id, userId }
        }
      });

      await prisma.organizationMember.create({
        data: {
          organizationId: id,
          userId: userId,
          addedById: user.id
        }
      });

      return { message: LangResponse({ key: "created", lang, object: 'member' }) };
    });

    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
    return result;
  }

  async adminGuard({ organizationId, userId, lang }: ICheckRole) {
    const isAdmin = await this.prisma.organizationAdmin.findFirst({ where: { organizationId, userId } })
    const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } })
    if (!isAdmin || !isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "organization" }), HttpStatus.UNAUTHORIZED)
    return true
  }

  async ownerGuard({ organizationId, userId, lang }: ICheckRole) {
    const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } })
    if (!isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "organization" }), HttpStatus.UNAUTHORIZED)
    return true
  }
}
