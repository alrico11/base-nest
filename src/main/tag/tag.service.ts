import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ICreateTag, IFindAllTag, IRemoveTag, IUpdateTag } from './tag.@types';
import dayjs from 'dayjs';

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { }

  async create({ body: { name }, lang, user }: ICreateTag) {
    const data = await this.prisma.tag.create({
      data: {
        name,
        creatorId: user.id
      }
    })

    this.l.info({ message: `tag with id ${data.id} created by userid ${user.id}` })

    return { message: LangResponse({ key: "created", lang, object: "tag" }) };
  }

  async findAll({ lang, query, user }: IFindAllTag) {
    const { limit, orderBy, orderDirection, page, search } = query
    const { result, ...rest } = await this.prisma.extended.tag.paginate({
      where: { deletedAt: null, name: { contains: search, mode: "insensitive" }, creatorId: user.id },
      limit, page,
      orderBy: dotToObject({ orderBy, orderDirection })
    })
    const data = result.map(({ id, name }) => { return { id, name } })
    return { message: LangResponse({ key: "fetched", lang, object: "tag" }), data: data, ...rest };
  }

  async update({ body: { name }, lang, param: { id }, user }: IUpdateTag) {
    const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null } })
    if (!tagExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: 'tag' }), HttpStatus.NOT_FOUND)
    await this.prisma.tag.update({
      where: { id, deletedAt: null },
      data: { name }
    })
    this.l.info({ message: `tag with id ${id} updated by ${user.id}` })
    return { message: LangResponse({ key: "updated", lang, object: "tag" }) };
  }

  async remove({ lang, param: { id }, user }: IRemoveTag) {
    const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null } })
    if (!tagExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: 'tag' }), HttpStatus.NOT_FOUND)
    await this.prisma.tag.update({
      where: { id, deletedAt: null },
      data: { deletedAt: dayjs().toISOString() }
    })
    this.l.info({ message: `tag with id ${id} deleted by ${user.id}` })
    return { message: LangResponse({ key: "deleted", lang, object: "tag" }) };
  }
}
