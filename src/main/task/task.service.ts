import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Resource } from '@prisma/client';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateTask, IFindAllTask, IFindOneTask, IRemoveTask, IUpdateTask, ReminderType } from './task.@types';
import { DeletedFilesTaskEvent } from './task.event';

dayjs.extend(utc);
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
    const { assigneeUserIds, files, reminder, startDate, endDate, ...rest } = body;
    let Resource: Resource | Resource[] | undefined;
    await this.prisma.$transaction(async (prisma) => {
      const task = await prisma.task.create({
        data: {
          ...rest,
          startDate: startDate ? dayjs.utc(startDate).toDate() : undefined,
          endDate: endDate ? dayjs.utc(endDate).toDate() : undefined,
          createdById: user.id,
        }
      });
      if (assigneeUserIds) await prisma.taskAssignee.createMany({
        data: assigneeUserIds.map((userId) => ({ taskId: task.id, userId, })),
      });

      if (files && files.length > 0) {
        Resource = await this.fileService.handleUploadObjectStorage({ fileName: files, prefix: this.config.env.OBJECT_STORAGE_PREFIX_TASK, user, });

        let TaskImage: Prisma.TaskImageCreateManyInput[] = [];
        let TaskFile: Prisma.TaskFileCreateManyInput[] = [];

        if (Array.isArray(Resource) && Resource.length > 0) {
          Resource.forEach(({ fileName, id }) => {
            fileName.includes("image")
              ? TaskImage.push({ resourceId: id, taskId: task.id })
              : TaskFile.push({ resourceId: id, taskId: task.id });
          });
          if (TaskImage.length > 0) await prisma.taskImage.createMany({ data: TaskImage });
          if (TaskFile.length > 0) await prisma.taskFile.createMany({ data: TaskFile });
        }
      }
      if (reminder && reminder as ReminderType) {
        const { alarm, interval, startDate, time } = reminder;
        const hour = parseInt(time.split(':')[0])
        const minutes = parseInt(time.split(':')[1])
        await this.reminderService.create({
          task,
          reminder: {
            dateReminder: dayjs.utc(startDate).toDate(),
            interval,
            timeReminder: dayjs().set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
            alarm,
          },
        });
      }
    });
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
    const { reminder, assigneeUserIds, files, startDate, endDate, projectId, ...rest } = body;
    const taskExist = await this.prisma.task.findFirst({
      where: { id, createdById: user.id },
      include: {
        TaskFiles: { include: { Resource: true } },
        TaskImages: { include: { Resource: true } },
        TaskAssignees: true,
        ReminderTasks: { include: { Reminder: true } }
      },
    });
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND);
    const { ReminderTasks, TaskFiles, TaskAssignees, TaskImages, createdById } = taskExist;
    await this.prisma.$transaction(async (prisma) => {
      if (reminder && reminder as ReminderType) {
        const { alarm, interval, startDate, time } = reminder;
        const hour = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);
        if (ReminderTasks) {
          await this.reminderService.update({ reminder: ReminderTasks.Reminder, task: taskExist });
        } else {
          await this.reminderService.create({
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              interval,
              timeReminder: dayjs().set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
              nextInvocation: dayjs.utc(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
              alarm,
            }, task: taskExist
          });
        }
      }
      if (assigneeUserIds && assigneeUserIds.length > 0) {
        const assigneeIds = new Set(TaskAssignees.map(({ userId }) => userId));
        assigneeIds.add(createdById);
        const data = assigneeUserIds
          .filter((userId) => !assigneeIds.has(userId))
          .map((userId) => ({ taskId: id, userId }));

        if (data.length > 0) await prisma.taskAssignee.createMany({ data });
      }
      if (assigneeUserIds?.length === 0) await prisma.taskAssignee.deleteMany({ where: { taskId: id } });
      if (files?.length === 0) {
        const oldResourceFiles = TaskFiles.map(({ Resource }) => Resource);
        const oldResourceImages = TaskImages.map(({ Resource }) => Resource);
        if (oldResourceFiles.length > 0) await prisma.taskFile.deleteMany({ where: { taskId: id } });
        if (oldResourceImages.length > 0) await prisma.taskImage.deleteMany({ where: { taskId: id } });
        this.ee.emit(DeletedFilesTaskEvent.key, new DeletedFilesTaskEvent({ oldResourceFiles, oldResourceImages }));
      }
      if (files && files.length > 0) {
        const objectKeyFiles = new Set(TaskFiles.map(({ Resource }) => Resource.fileName));
        const objectKeyImages = new Set(TaskImages.map(({ Resource }) => Resource.fileName));
        await Promise.all(files.map(async (fileName) => {
          const fileExists = [...objectKeyFiles, ...objectKeyImages].some(key => key.includes(this.fileService.parseFilename(fileName)));
          if (!fileExists) {
            const newFileResource = await this.fileService.handleUploadObjectStorage({
              fileName,
              prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE,
              user
            });
            if (!Array.isArray(newFileResource)) {
              if (!newFileResource.fileType.includes("image")) {
                await prisma.taskFile.create({ data: { resourceId: newFileResource.id, taskId: id } });
              } else if (newFileResource.fileType.includes("image")) {
                await prisma.taskImage.create({ data: { resourceId: newFileResource.id, taskId: id } });
              }
            }
          }
        }));
      }
      await prisma.task.update({
        where: { id, deletedAt: null },
        data: {
          ...rest,
          startDate: startDate ? dayjs.utc(startDate).toDate() : undefined,
          endDate: endDate ? dayjs.utc(endDate).toDate() : undefined,
          editedById: user.id,
          projectId: !taskExist.projectId ? projectId : undefined
        }
      });
    });

    return { message: LangResponse({ key: "updated", lang, object: "task" }) };
  }


  async remove({ lang, param: { id }, user }: IRemoveTask) {
    const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } })
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND)
    await this.prisma.task.update({ where: { id, deletedAt: null }, data: { deletedAt: dayjs().toISOString() } })
    return { message: LangResponse({ key: "deleted", lang, object: "task" }) };
  }
}
