import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Resource } from '@prisma/client';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateTask, IFindAllTask, IFindOneTask, IRemoveTask, IResource, IUpdateTask } from './task.@types';
import { DeletedFilesTaskEvent } from './task.event';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly config: XConfig,
    private readonly reminderService: ReminderService,
    private readonly ee: EventEmitter2
  ) { }

  async create({ body, lang, user }: ICreateTask) {
    const { assigneeUserIds, files, reminder } = body
    let Resource: Resource | Resource[] | undefined

    const task = await this.prisma.task.create({
      data: {
        ...body,
        createdById: user.id,
      }
    })

    if (assigneeUserIds) {
      const data = assigneeUserIds.map((userId) => {
        return {
          taskId: task.id,
          userId
        }
      });
      await this.prisma.taskAssignee.createMany({ data })
    }

    if (files && files.length > 0) {
      Resource = await this.fileService.handleUploadObjectStorage({ fileName: files, prefix: this.config.env.OBJECT_STORAGE_PREFIX_TASK, user })
      if (Array.isArray(Resource) && Resource.length > 0) {
        const { images, files } = Resource.reduce<{ images: IResource[]; files: IResource[]; }>((acc, resource) => {
          if (resource.fileName.includes(".webp")) acc.images.push({ resourceId: resource.id, taskId: task.id });
          acc.files.push({ resourceId: resource.id, taskId: task.id });
          return acc;
        }, { images: [], files: [] } as { images: IResource[], files: IResource[] });
        await this.prisma.taskImage.createMany({ data: images })
        await this.prisma.taskFile.createMany({ data: files })
      }
    }

    if (reminder) {
      const { alarm, interval, startDate, time } = reminder
      this.reminderService.create({ reminder: { dateReminder: startDate, interval, timeReminder: time, alarm } })
    }

    return { message: LangResponse({ key: "created", lang, object: "task" }) };
  }

  async findAll({ lang, query, user }: IFindAllTask) {
    const { limit, orderBy, orderDirection, page, search } = query
    const { result, ...rest } = await this.prisma.extended.task.paginate({
      where: { deletedAt: null, createdById: user.id, name: { contains: search, mode: "insensitive" } },
      limit, page,
      orderBy: dotToObject({ orderBy, orderDirection }),
      include: { TaskAssignees: { include: { User: { include: { Resource: true } } } } }
    })
    const data = result.map(({ TaskAssignees, createdAt, name, priority, status, id }) => {
      const teams = TaskAssignees.map(({ User }) => {
        const { Resource, name, id } = User
        return {
          userId: id,
          name,
          thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
          blurHash: Resource ? Resource.blurHash : undefined
        }
      })
      return {
        id,
        createdAt,
        name: name,
        status: status,
        priority: priority,
        teams
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "task" }), data: data, ...rest };
  }

  async findOne({ lang, param: { id }, user }: IFindOneTask) {
    const taskExist = await this.prisma.task.findFirst({
      where: { id, createdById: user.id },
      include: {
        TaskAssignees: { include: { User: { include: { Resource: true } } } },
        ReminderTasks: { include: { Reminder: true } },
      }
    })
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND)
    const { TaskAssignees, name, status, duration, priority, ReminderTasks } = taskExist

    const teams = TaskAssignees.map(({ User }) => {
      const { Resource, name, id } = User
      return {
        userId: id,
        name,
        thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        blurHash: Resource ? Resource.blurHash : undefined
      }
    })
    const data = {
      id, name, status, priority, duration, teams,
      reminder: {
        id: ReminderTasks?.Reminder.id,
        date: ReminderTasks?.Reminder.dateReminder,
        time: ReminderTasks?.Reminder.timeReminder,
        interval: ReminderTasks?.Reminder.interval,
        alarm: ReminderTasks?.Reminder.alarm
      }
    }
    return { message: LangResponse({ key: "fetched", lang, object: "task" }), data };
  }

  async update({ body, lang, param: { id }, user }: IUpdateTask) {
    const { reminder, assigneeUserIds, files, } = body
    let Resource: Resource | Resource[] | undefined
    const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } })
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND)

    if (files?.length === 0) {
      const resource = await this.prisma.task.findFirst({
        where: { id, deletedAt: null },
        include: {
          TaskFiles: { include: { Resource: true } },
          TaskImages: { include: { Resource: true } }
        },
      })
      if (resource && (resource.TaskFiles || resource.TaskImages)) {
        const oldResourceFiles = resource.TaskFiles.map(({ Resource }) => { return Resource })
        const oldResourceImages = resource.TaskImages.map(({ Resource }) => { return Resource })
        this.ee.emit(DeletedFilesTaskEvent.key, new DeletedFilesTaskEvent({ oldResourceFiles, oldResourceImages }))
      }
    }

    // if (images && images.length > 0) {
    //   Resource = await this.fileService.handleUploadObjectStorage({ fileName: images, prefix: this.config.env.OBJECT_STORAGE_PREFIX_TASK, user })
    //   // const resource = await this.prisma.task.findFirst({ where: { id }, include: { TaskFiles  } },)
    //   // this.ee.emit(UpdatedTaskEvent.key, new UpdatedTaskEvent({ newResource: Resource, oldResource }))
    // }
    await this.prisma.task.update({
      where: { id, deletedAt: null },
      data: { ...body }
    })

    return `This action updates a #${id} task`;
  }

  async remove({ lang, param: { id }, user }: IRemoveTask) {
    const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } })
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND)
    await this.prisma.task.update({ where: { id, deletedAt: null }, data: { deletedAt: dayjs().toISOString() } })
    return { message: LangResponse({ key: "deleted", lang, object: "task" }) };
  }
}
