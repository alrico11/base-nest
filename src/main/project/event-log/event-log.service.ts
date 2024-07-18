import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ProjectRepository } from '..';
import { ICreateEventLog, IFindAllEventLog, IRemoveEventLog, IUpdateEventLog } from './event-log.@types';
import { OrganizationRepository } from 'src/main/organization/organization.repository';

@Injectable()
export class EventLogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectRepository: ProjectRepository,
    private readonly fileService: FileService,
    private readonly logService: LogService,
    private readonly organizationRepository: OrganizationRepository
  ) {
    this.logService.setContext(EventLogService.name);
  }

  async create({ body, param, lang, user }: ICreateEventLog) {
    const { projectId, organizationId } = param;
    const { date, ...rest } = body;

    if (organizationId) {
      const projectOrganization = await this.projectRepository.findById({ projectId });
      if (!projectOrganization) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'project' }), HttpStatus.NOT_FOUND);
    }

    const newEventLog = await this.prisma.eventLog.create({
      data: {
        date: dayjs.utc(date).toISOString(),
        projectId,
        ...rest,
      }
    });

    this.logService.save({
      data: {
        message: `EventLog created with id ${newEventLog.id} in projectId ${projectId} by user id ${user.id}`
      },
      method: 'CREATE',
      newData: newEventLog,
      organizationId,
      projectId,
      userId: user.id
    });

    return { message: LangResponse({ key: 'created', lang, object: 'eventLog' }) };
  }

  async findAll({ query, lang, param }: IFindAllEventLog) {
    const { limit, orderBy, orderDirection, page, search } = query;
    const { projectId, organizationId } = param;

    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'project' }), HttpStatus.NOT_FOUND);
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    const { result, ...rest } = await this.prisma.extended.eventLog.paginate({
      where: { projectId, deletedAt: null, description: { contains: search, mode: 'insensitive' } },
      limit, page,
      orderBy: dotToObject({ orderBy, orderDirection }),
      include: { User: { include: { Resource: true } } }
    });

    const data = result.map(({ createdAt, date, description, id, updatedAt, User }) => {
      return {
        id,
        date,
        description,
        createdAt,
        updatedAt,
        updatedBy: User?.name,
        thumbnail: User?.Resource ? this.fileService.cdnUrl({ objectKey: User?.Resource.objectKey }) : undefined
      };
    });

    return { message: LangResponse({ key: 'fetched', lang, object: 'eventLog' }), data, ...rest };
  }

  async update({ body, lang, param, user }: IUpdateEventLog) {
    const { id, projectId, organizationId } = param;
    const { date, ...rest } = body;
    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'project' }), HttpStatus.NOT_FOUND);
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }
    const eventLog = await this.prisma.eventLog.findFirst({
      where: { id, deletedAt: null }
    });
    if (!eventLog) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'eventLog' }), HttpStatus.NOT_FOUND);

    const updatedEventLog = await this.prisma.eventLog.update({
      where: { id, projectId },
      data: {
        date: dayjs.utc(date).toISOString(),
        lastUpdatedById: user.id,
        ...rest
      }
    });
    this.logService.save({
      data: {
        message: `EventLog with id ${id} updated by user id ${user.id}`
      },
      method: 'UPDATE',
      oldData: eventLog,
      newData: updatedEventLog,
      organizationId,
      projectId,
      userId: user.id
    });
    return { message: LangResponse({ key: 'updated', lang, object: 'eventLog' }) };
  }

  async remove({ lang, param, user }: IRemoveEventLog) {
    const { id, projectId, organizationId } = param;

    if (projectId) {
      const project = await this.projectRepository.findById({ projectId });
      if (!project) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'project' }), HttpStatus.NOT_FOUND);
    }
    if (organizationId) {
      const organization = await this.organizationRepository.findById({ organizationId });
      if (!organization)
        throw new HttpException(
          LangResponse({ key: 'notFound', lang, object: 'organization' }),
          HttpStatus.NOT_FOUND
        );
    }

    const eventLog = await this.prisma.eventLog.findFirst({
      where: { id, deletedAt: null }
    });
    if (!eventLog) throw new HttpException(LangResponse({ key: 'notFound', lang, object: 'eventLog' }), HttpStatus.NOT_FOUND);

    const deletedEventLog = await this.prisma.eventLog.update({
      where: { id, projectId },
      data: {
        deletedAt: dayjs().toISOString()
      }
    });

    this.logService.save({
      data: {
        message: `EventLog with id ${id} deleted by user id ${user.id}`
      },
      method: 'DELETE',
      oldData: eventLog,
      organizationId,
      projectId,
      userId: user.id
    });

    return { message: LangResponse({ key: 'deleted', lang, object: 'eventLog' }) };
  }
}