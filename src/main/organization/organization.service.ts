import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Resource } from '@prisma/client';
import dayjs from 'dayjs';
import { LangResponse, LangWord } from 'src/constants';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { ICheckRole, ICreateOrganization, IDeleteOrganization, IFindAllMemberOrganization, IFindAllOrganization, IFindOneOrganization, IUpdateOrganization } from './organization.@types';
import { OrganizationUpdatedEvent } from './organization.event';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly config: XConfig,
    private readonly l: LogService,
    private readonly ee: EventEmitter2
  ) { }
  async create({ body, user, lang }: ICreateOrganization) {
    const { name, description, thumbnail } = body
    let resource: Resource | Resource[] | undefined
    if (thumbnail) {
      const prefix = this.config.env.OBJECT_STORAGE_PREFIX_ORGANIZATION
      resource = await this.fileService.handleUploadObjectStorage({ user, prefix, fileName: thumbnail })
    }
    const data = await this.prisma.organization.create({
      data: {
        name: name,
        description: description ? description : undefined,
        thumbnailId: !Array.isArray(resource) && resource ? resource.id : undefined,
        creatorId: user.id
      }
    })
    this.l.info({
      message: `organization with id ${data.id} created successfully by userId ${user.id}`
    })
    return { message: LangResponse({ key: 'created', lang, object: 'organization' }) };
  }

  async findAll({ lang, query, user }: IFindAllOrganization) {
    const { limit, orderBy, orderDirection, page, search } = query
    const condition: Prisma.OrganizationWhereInput = {
      deletedAt: null,
      name: { contains: search },
      OR: [
        { creatorId: user.id },
        { OrganizationMembers: { some: { userId: user.id } } }
      ]
    }

    const { result, ...rest } = await this.prisma.extended.organization.paginate({
      where: condition,
      limit,
      page,
      include: { Resource: true },
      orderBy: dotToObject({ orderBy, orderDirection })
    })
    const data = result.map(({ description, id, name, Resource }) => {
      return {
        id, name, description, thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined, blurHash: Resource?.blurHash
      }
    })
    return { message: LangResponse({ key: 'fetched', lang, object: 'organization' }), data: data, ...rest };
  }

  async findOne({ lang, param: { id }, user }: IFindOneOrganization) {
    const organizationExist = await this.prisma.organization.findFirst({
      where: { id, deletedAt: null },
      include: {
        Resource: true,
        OrganizationMembers: {
          include: {
            User: true
          }
        },
        OrganizationAdmin: {
          include: {
            User: true
          }
        },
        Creator: true,
      }
    })
    if (!organizationExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "ORGANIZATION" }), HttpStatus.NOT_FOUND)
    const { OrganizationAdmin, Creator, description, name, Resource, OrganizationMembers } = organizationExist
    if (OrganizationMembers.length === 0 && Creator.id !== user.id) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED)

    const detailOrganization = {
      id: organizationExist.id,
      name,
      description,
      thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
      blurHash: Resource ? Resource.blurHash : undefined
    }
    const adminIds = new Set(OrganizationAdmin.map(({ userId }) => { return userId }))
    const detailUser = {
      id: user.id,
      name: user.name,
      role: adminIds.has(user.id) ? LangWord({ key: "admin", lang }) : (Creator.id === user.id ? LangWord({ key: "owner", lang }) : LangWord({ key: "member", lang }))
    }

    return { message: LangResponse({ key: 'fetched', object: 'organization', lang }), data: { detailOrganization, detailUser } }
  }

  async update({ body, lang, param: { id }, user }: IUpdateOrganization) {
    const { name, description, thumbnail } = body
    let newResource: Resource | Resource[] | undefined
    let oldResource: Resource | undefined
    await this.adminGuard({ lang, organizationId: id, userId: user.id })
    const organizationExist = await this.prisma.organization.findFirst({
      where: { id },
      include: { Resource: true }
    })
    if (!organizationExist) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'organization' }), HttpStatus.NOT_FOUND)
    if (thumbnail) {
      const prefix = this.config.env.OBJECT_STORAGE_PREFIX_ORGANIZATION
      newResource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix, user })
      if (organizationExist.Resource) oldResource = organizationExist.Resource
    }
    if (!Array.isArray(newResource) && newResource && oldResource) {
      this.ee.emit(OrganizationUpdatedEvent.key, new OrganizationUpdatedEvent({ newResource, oldResource }))
    }
    await this.prisma.organization.update({
      where: { id },
      data: {
        name,
        description,
        thumbnailId: !Array.isArray(newResource) && newResource ? newResource.id : undefined
      }
    })
    this.l.info({
      message: `organization with id ${id} udpated by userId ${user.id}`
    })
    return { message: LangResponse({ key: "updated", lang, object: "organization" }) };
  }

  async remove({ param: { id }, lang, user }: IDeleteOrganization) {
    await this.ownerGuard({ lang, organizationId: id, userId: user.id })
    const organizationExist = await this.prisma.organization.findFirst({
      where: { id, deletedAt: null },
    })
    if (!organizationExist) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'organization' }), HttpStatus.NOT_FOUND)
    if (organizationExist.creatorId !== user.id) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED)
    await this.prisma.organization.update({
      where: { id, creatorId: user.id },
      data: { deletedAt: dayjs().toISOString() }
    })
    this.l.info({
      message: `organization with id ${id} deleted successfully by userId ${user.id}`
    })
    return { message: LangResponse({ key: "deleted", lang, object: "organization" }) };
  }

  async findAllMember({ query, lang, param: { id }, user }: IFindAllMemberOrganization) {
    const { limit, orderBy, orderDirection, page } = query;
    const { result, ...rest } = await this.prisma.extended.organization.paginate({
      where: {
        id, deletedAt: null,
        OR: [
          { creatorId: user.id },
          { OrganizationMembers: { some: { userId: user.id } } }
        ]
      },
      orderBy: dotToObject({ orderBy, orderDirection }),
      limit, page,
      include: {
        OrganizationAdmin: { include: { User: { include: { Resource: true } } } },
        OrganizationMembers: { include: { User: { include: { Resource: true } } } },
        Creator: { include: { Resource: true } }
      }
    });
    const data = result.map(({ OrganizationAdmin, OrganizationMembers, Creator }) => {
      const adminIds = new Set(OrganizationAdmin.map(({ userId }) => userId));
      const { Resource } = Creator
      const members = OrganizationMembers.map(({ User }) => {
        const { id, name, updatedAt, Resource } = User;
        return {
          userId: id,
          name: name,
          role: adminIds.has(id) ? LangWord({ key: "admin", lang }) : LangWord({ key: "member", lang }),
          thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource?.blurHash,
          updatedAt: updatedAt
        };
      });
      return {
        userDetails: {
          userId: user.id,
          name: user.name,
          role: adminIds.has(user.id) ? LangWord({ key: "admin", lang }) : LangWord({ key: "member", lang })
        },
        members: [
          {
            name: Creator.name,
            userId: Creator.id,
            role: LangWord({ key: "owner", lang }),
            thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
            blurHash: Resource?.blurHash,
            updatedAt: Creator.updatedAt,
          },
          ...members
        ]
      };
    })[0]
    return { message: LangResponse({ key: "fetched", lang, object: "organization" }), data: data, ...rest };
  }

  async adminGuard({ organizationId, userId, lang }: ICheckRole) {
    const isAdmin = await this.prisma.organizationAdmin.findFirst({ where: { organizationId, userId } })
    const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } })
    if (!isAdmin && !isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "user" }), HttpStatus.UNAUTHORIZED)
    return true
  }

  async ownerGuard({ organizationId, userId, lang }: ICheckRole) {
    const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } })
    if (!isOwner) throw new HttpException(LangResponse({ key: "unauthorize", lang, object: "user" }), HttpStatus.UNAUTHORIZED)
    return true
  }
}