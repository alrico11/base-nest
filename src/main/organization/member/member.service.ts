import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IAddAdmin, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';
import { OrganizationAdmin, OrganizationMember } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
  ) { this.l.setContext(MemberService.name) }

  async addMember({ body, lang, param: { id }, user }: ICreateMember) {
    const { userId } = body;
    const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
    const userJoined = await this.prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
    if (userJoined) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "member" }), HttpStatus.CONFLICT);

    const newMember = await this.prisma.organizationMember.create({
      data: {
        organizationId: id,
        userId: userId,
        addedById: user.id
      }
    });

    this.l.save({
      data: { message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` },
      method: 'CREATE',
      organizationId: id,
      newData: newMember,
      userId: user.id,
    });

    return { message: LangResponse({ key: "created", lang, object: 'member' }) };
  }

  async removeMember({ param: { id }, body: { userId }, user, lang }: IRemoveMember) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      const adminJoined = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      let newData : OrganizationMember | OrganizationAdmin | undefined
      if (userJoined) {
        newData = await prisma.organizationMember.delete({
          where: {
            organizationId_userId: { organizationId: id, userId }
          }
        });
      }
      if (adminJoined) {
        await prisma.organizationAdmin.delete({ where: { organizationId_userId: { organizationId: id, userId } } });
      }
      if (!adminJoined && !userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "member" }), HttpStatus.BAD_REQUEST);
      this.l.save({
        data: { message: `userId ${userId} removed successfully from organizationId ${id} by user id${user.id}` },
        method: 'DELETE',
        organizationId: id,
        userId: user.id,
      });

      return { message: LangResponse({ key: "deleted", lang, object: 'member' }) };
    });

    return result;
  }

  async addAdmin({ body, lang, param: { id }, user }: IAddAdmin) {
    const { userId } = body;
    const result = await this.prisma.$transaction(async (prisma) => {
      const userExist = await prisma.user.findFirst({ where: { id: userId } });
      if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND);
      const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
      if (!userJoined) throw new HttpException(LangResponse({ key: "notJoin", lang, object: "admin" }), HttpStatus.BAD_REQUEST);
      const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
      if (alreadyAdmin) throw new HttpException(LangResponse({ key: "alreadyJoin", lang, object: "admin" }), HttpStatus.CONFLICT);

      const newAdmin = await prisma.organizationAdmin.create({
        data: {
          organizationId: id,
          userId: userId,
          addedById: user.id
        }
      });

      return { message: LangResponse({ key: "added", lang, object: 'admin' }) };
    });

    this.l.save({
      data: { message: `userId ${userId} promoted to admin successfully in organizationId ${id} by user id${user.id}` },
      method: 'CREATE',
      newData: { organizationId: id, userId },
      userId: user.id,
    });

    return result;
  }

  async removeAdmin({ body, lang, param: { id }, user }: IRemoveAdmin) {
    const { userId } = body;
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
      
      this.l.save({
        data: { message: `userId ${userId} removed from admin successfully in organizationId ${id} by user id${user.id}` },
        method: 'DELETE',
        oldData: { organizationId: id, userId },
        userId: user.id,
      });

      return { message: LangResponse({ key: "deleted", lang, object: 'admin' }) };
    });



    return result;
  }
}
