import { Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ICreateMember } from './member.@types';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { }
  async create({ body, lang, param: { id }, user }: ICreateMember) {
    const { userId } = body
    await this.prisma.organizationMember.create({
      data: {
        organizationId: id,
        userId: userId,
        addedById: user.id
      }
    })
    this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` })
    return { message: LangResponse({ key: "created", lang, object: 'member' }) };
  }
}
