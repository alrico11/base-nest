import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ICreateTag, IFindAllTag, IRemoveTag, IUpdateTag } from './tag.@types';
import dayjs from 'dayjs';
import { OrganizationRepository } from '../organization/organization.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly organizationRepository: OrganizationRepository
  ) { }

  async create({ body: { name }, lang, user, param }: ICreateTag) {
    if (param) {
      const { organizationId } = param
      if (organizationId) {
        const organization = await this.organizationRepository.findById({ organizationId })
        if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
      }
    }
    const data = await this.prisma.tag.create({
      data: { name, creatorId: user.id }
    });

    this.l.save({
      data: { message: `Tag with id ${data.id} created by user id ${user.id}` },
      organizationId : param ? param.organizationId : undefined,
      method: 'CREATE',
      newData: data
    });
    return { message: LangResponse({ key: "created", lang, object: "tag" }) };
  }

  async findAll({ lang, query, user, param }: IFindAllTag) {
    if (param) {
      const { organizationId } = param
      if (organizationId) {
        const organization = await this.organizationRepository.findById({ organizationId })
        if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
      }
    }
    const { limit, orderBy, orderDirection, page, search } = query;
    const { result, ...rest } = await this.prisma.extended.tag.paginate({
      where: { deletedAt: null, name: { contains: search, mode: "insensitive" }, creatorId: user.id, organizationId: null },
      limit, page,
      orderBy: dotToObject({ orderBy, orderDirection })
    });
    const data = result.map(({ id, name }) => ({ id, name }));
    return { message: LangResponse({ key: "fetched", lang, object: "tag" }), data: data, ...rest };
  }

  async update({ body: { name }, lang, param, user }: IUpdateTag) {
    const { id, organizationId } = param
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId })
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
    }
    const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null, organizationId: null } });
    if (!tagExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: 'tag' }), HttpStatus.NOT_FOUND);
    await this.prisma.tag.update({
      where: { id, deletedAt: null },
      data: { name }
    });
    this.l.save({
      data: { message: `Tag with id ${id} updated by user id ${user.id}` },
      method: 'UPDATE',
      oldData: tagExist,
      newData: { ...tagExist, name }
    });
    return { message: LangResponse({ key: "updated", lang, object: "tag" }) };
  }

  async remove({ lang, param, user }: IRemoveTag) {
    const { id, organizationId } = param
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId })
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
    }

    const tagExist = await this.prisma.tag.findFirst({ where: { id, deletedAt: null, organizationId: null } });
    if (!tagExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: 'tag' }), HttpStatus.NOT_FOUND);
    await this.prisma.tag.update({
      where: { id, deletedAt: null },
      data: { deletedAt: dayjs().toISOString() }
    });
    this.l.save({
      data: { message: `Tag with id ${id} deleted by user id ${user.id}` },
      method: 'DELETE',
      oldData: tagExist,
      organizationId,
      newData: { ...tagExist, deletedAt: dayjs().toISOString() }
    });
    return { message: LangResponse({ key: "deleted", lang, object: "tag" }) };
  }
}
