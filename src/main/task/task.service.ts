import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Resource } from '@prisma/client';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { DateNow, LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { ProjectRepository } from '../project/project.repository';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateTask, IFindAllTask, IFindOneTask, IRemoveTask, IUpdateTask, ReminderType } from './task.@types';
import { DeletedFilesTaskEvent } from './task.event';
import { LogService } from 'src/log';

dayjs.extend(utc);
@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly config: XConfig,
    private readonly reminderService: ReminderService,
    private readonly ee: EventEmitter2,
    private readonly projectRepository: ProjectRepository,
    private readonly l: LogService
  ) { this.l.setContext(TaskService.name) }

  async create({ body, lang, user, param }: ICreateTask) {
    const { assigneeUserIds, files, reminder, startDate, endDate, ...rest } = body;
    let Resource: Resource | Resource[] | undefined;
    if (param) {
      const { organizationId, projectId } = param
      if (projectId) {
        const project = await this.projectRepository.findById({ projectId, organizationId })
        if (!project) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
      }
    }
    await this.prisma.$transaction(async (prisma) => {
      const task = await prisma.task.create({
        data: {
          ...rest,
          startDate: startDate ? dayjs.utc(startDate).toDate() : undefined,
          endDate: endDate ? dayjs.utc(endDate).toDate() : undefined,
          createdById: user.id,
          organizationId: param ? param.organizationId : undefined,
          projectId: param ? param.projectId : undefined
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
        DateNow({ date: startDate, time: time, lang })
        const hour = parseInt(time.split(':')[0])
        const minutes = parseInt(time.split(':')[1])
        await this.reminderService.create({
          task,
          db: prisma,
          lang,
          user,
          reminder: {
            dateReminder: dayjs.utc(startDate).toDate(),
            interval,
            timeReminder: dayjs().set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
            nextInvocation: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
            alarm,
          },
        });
      }
      this.l.save({
        data: {
          message: `Task created with id ${task.id} in projectId ${task.projectId} by user id ${user.id}`
        },
        method: 'CREATE',
        newData: task,
        organizationId: param?.organizationId,
        projectId: param?.projectId,
        userId: user.id
      });
    });
    return { message: LangResponse({ key: "created", lang, object: "task" }) };
  }


  async findAll({ lang, query, user, param }: IFindAllTask) {
    const { limit, orderBy, orderDirection, page, search } = query
    let where: Prisma.TaskWhereInput = { deletedAt: null, name: { contains: search, mode: "insensitive" } }

    if (param) {
      const { organizationId, projectId } = param
      if (projectId) where.projectId = projectId;
      if (organizationId) where.organizationId = organizationId;
    } else where.createdById = user.id;

    const { result, ...rest } = await this.prisma.extended.task.paginate({
      where,
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

  async findOne({ lang, param: { id, organizationId, projectId }, user }: IFindOneTask) {
    let where: Prisma.TaskWhereInput = { id, deletedAt: null }
    if (projectId) where.projectId = projectId;
    if (organizationId) where.organizationId = organizationId;
    else where.createdById = user.id;
    const taskExist = await this.prisma.task.findFirst({
      where,
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

  async update({ body, lang, param, user }: IUpdateTask) {
    const { id, organizationId, projectId } = param
    const { reminder, assigneeUserIds, files, startDate, endDate, ...rest } = body;
    let where: Prisma.TaskWhereUniqueInput = { id, deletedAt: null }
    if (projectId) where.projectId = projectId;
    if (organizationId) where.organizationId = organizationId;
    else where.createdById = user.id;

    const taskExist = await this.prisma.task.findFirst({
      where,
      include: {
        Organization :true,
        Project: true,
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
        DateNow({ date: startDate, time: time, lang })
        const hour = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);
        if (ReminderTasks) {
          await this.reminderService.update({
            reminderTask: ReminderTasks,
            reminder: ReminderTasks.Reminder,
            task: taskExist,
            db: prisma,
            lang, user,
            organization : taskExist.Organization, 
            project : taskExist.Project
          });
        } else {
          await this.reminderService.create({
            db: prisma,
            lang, user,
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
      const newData = await prisma.task.update({
        where,
        data: {
          ...rest,
          startDate: startDate ? dayjs.utc(startDate).toDate() : undefined,
          endDate: endDate ? dayjs.utc(endDate).toDate() : undefined,
          editedById: user.id,
          projectId: !taskExist.projectId ? body.projectId : undefined
        }
      });
      this.l.save({
        data: {
          message: `Task updated with id ${id} in projectId ${newData.projectId} by user id ${user.id}`
        },
        method: 'UPDATE',
        oldData: taskExist,
        newData,
        organizationId: param?.organizationId,
        projectId: param?.projectId,
        userId: user.id
      });
    });

    return { message: LangResponse({ key: "updated", lang, object: "task" }) };
  }

  async remove({ lang, param, user }: IRemoveTask) {
    const { id, organizationId, projectId } = param
    const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } })
    let where: Prisma.TaskWhereUniqueInput = { id, deletedAt: null };
    if (projectId) where.projectId = projectId;
    if (organizationId) where.organizationId = organizationId;
    if (!taskExist) throw new HttpException(LangResponse({ key: "deleted", lang, object: "task" }), HttpStatus.NOT_FOUND)
    const newData = await this.prisma.task.update({ where, data: { deletedAt: dayjs().toISOString() } })
    this.l.save({
      data: {
        message: `Task deleted with id ${id} in projectId ${taskExist.projectId} by user id ${user.id}`
      },
      method: 'DELETE',
      oldData: taskExist,
      newData,
      organizationId: param?.organizationId,
      projectId: param?.projectId,
      userId: user.id
    });
    return { message: LangResponse({ key: "deleted", lang, object: "task" }) };
  }
}
