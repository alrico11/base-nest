import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, Project, Resource } from '@prisma/client';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import { DateNow, LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { MemberService } from '../organization/member';
import { CollaboratorService } from '../project/collaborator';
import { ProjectRepository } from '../project/project.repository';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateTask, IFindAllTask, IFindOneTask, IRemoveTask, IUpdateTask, ReminderType } from './task.@types';
import { DeletedFilesTaskEvent } from './task.event';
import { OrganizationService } from '../organization';
import { OrganizationRepository } from '../organization/organization.repository';

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
    private readonly l: LogService,
    private readonly collaboratorService: CollaboratorService,
    private readonly memberService: MemberService,
    private readonly organizationRepository: OrganizationRepository
  ) { this.l.setContext(TaskService.name) }

  async create({ body, lang, user, param }: ICreateTask) {
    const { assigneeUserIds, files, reminder, startDate, endDate, ...rest } = body;

    await this.prisma.$transaction(async (prisma) => {
      let project
      let organization
      if (param) {
        const { organizationId, projectId } = param
        if (organizationId) {
          organization = await this.organizationRepository.findById({ organizationId })
          if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
          if (assigneeUserIds) {
            const isMember = await this.memberService.findMemberIsExist({ organizationCreatorId: organization.creatorId, organizationMembers: organization.OrganizationMembers, userIds: assigneeUserIds })
            if (!isMember) throw new HttpException(LangResponse({ key: "badRequest", lang, object: "task" }), HttpStatus.BAD_REQUEST)
          }
        }
        if (projectId) {
          project = await this.projectRepository.findById({ projectId })
          if (!project) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
          const { ProjectCollaborators } = project
          if (assigneeUserIds) {
            const isCollaborator = await this.collaboratorService.findCollaboratorIsExist({ projectCollaborators: ProjectCollaborators, userIds: assigneeUserIds })
            if (!isCollaborator) throw new HttpException(LangResponse({ key: "badRequest", lang, object: "task" }), HttpStatus.BAD_REQUEST)

          }
        }
      }

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
      if (assigneeUserIds) {
        await prisma.taskAssignee.createMany({
          data: assigneeUserIds.map((userId) => ({ taskId: task.id, userId, })),
        })
      };

      if (files && files.length > 0) {
        const Resource = await this.fileService.handleUploadObjectStorage({
          fileName: files,
          prefix: this.config.env.OBJECT_STORAGE_PREFIX_TASK,
          user,
        });
        if (Array.isArray(Resource) && Resource.length > 0) {
          const TaskImages: Prisma.TaskImageCreateManyInput[] = [];
          const TaskFiles: Prisma.TaskFileCreateManyInput[] = [];
          Resource.forEach(({ fileType, id }) => {
            if (fileType.includes("image")) {
              TaskImages.push({ resourceId: id, taskId: task.id });
            } else {
              TaskFiles.push({ resourceId: id, taskId: task.id });
            }
          });
          if (TaskImages.length > 0) await prisma.taskImage.createMany({ data: TaskImages })
          if (TaskFiles.length > 0) await prisma.taskFile.createMany({ data: TaskFiles })
        }
        if (!Array.isArray(Resource)) {
          if (Resource.fileType.includes("image")) await prisma.taskImage.create({ data: { taskId: task.id, resourceId: Resource.id } })
          else await prisma.taskFile.createMany({ data: { taskId: task.id, resourceId: Resource.id } })
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
          project,
          organization,
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
    } else {
      where.createdById = user.id
      where.organizationId = null
      where.projectId = null
    };

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
        TaskImages: { include: { Resource: true } },
        TaskFiles: { include: { Resource: true } }
      }
    })
    if (!taskExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "task" }), HttpStatus.NOT_FOUND)
    const { TaskAssignees, name, status, duration, priority, ReminderTasks, TaskFiles, TaskImages } = taskExist

    const teams = TaskAssignees.map(({ User }) => {
      const { Resource, name, id } = User
      return {
        userId: id,
        name,
        thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        blurHash: Resource ? Resource.blurHash : undefined
      }
    })
    const allResources = [
      ...TaskImages.map(({ Resource }) => ({
        attachment: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        blurHash: Resource ? Resource.blurHash : undefined,
        createdAt: Resource ? Resource.createdAt : undefined,
      })),
      ...TaskFiles.map(({ Resource }) => ({
        attachment: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        createdAt: Resource ? Resource.createdAt : undefined,
      }))
    ];
    const sortedResources = allResources
      .filter(resource => resource.createdAt)
      .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));

    const attachment = sortedResources.map(({ createdAt, ...rest }) => rest);
    const data = {
      id, name, status, priority, duration, teams,
      attachment,
      reminder: {
        id: ReminderTasks?.Reminder.id,
        date: ReminderTasks?.Reminder.dateReminder,
        time: ReminderTasks?.Reminder.timeReminder,
        nextInvocation: ReminderTasks?.Reminder.nextInvocation,
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
    let organization
    let project
    if (organizationId) {
      where.organizationId = organizationId;
      organization = await this.organizationRepository.findById({ organizationId })
      if (!organization) throw new HttpException(LangResponse({ key: "notFound", lang, object: "organization" }), HttpStatus.NOT_FOUND)
    }
    else if (projectId) {
      where.projectId = projectId;
      project = await this.projectRepository.findById({ projectId })
      if (!project) throw new HttpException(LangResponse({ key: "notFound", lang, object: "project" }), HttpStatus.NOT_FOUND)
    }
    else where.createdById = user.id;

    const taskExist = await this.prisma.task.findFirst({
      where,
      include: {
        Organization: true,
        Project: true,
        TaskFiles: { include: { Resource: true } },
        TaskImages: { include: { Resource: true } },
        TaskAssignees: true,
        ReminderTasks: { include: { Reminder: true } }
      },
    });
    if (!taskExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "task" }), HttpStatus.NOT_FOUND);
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
            reminder: { ...ReminderTasks.Reminder, nextInvocation: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(), },
            task: taskExist,
            db: prisma,
            lang, user,
            organization: taskExist.Organization,
            project: taskExist.Project
          });
        } else {
          await this.reminderService.create({
            db: prisma,
            lang, user,
            project: taskExist.Project,
            organization : taskExist.Organization,
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              interval,
              timeReminder: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
              nextInvocation: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
              alarm,
            }, task: taskExist
          });
        }
      }
      if (assigneeUserIds && assigneeUserIds.length > 0) {
        const assigneeIds = new Set(TaskAssignees.map(({ userId }) => userId));
        assigneeIds.add(createdById);
        const dataToAdd = assigneeUserIds
          .filter((userId) => !assigneeIds.has(userId))
          .map((userId) => ({ userId, taskId: id }));

        const dataToDelete = Array.from(assigneeIds)
          .filter((userId) => !assigneeUserIds.includes(userId) && userId !== createdById)
          .map((userId) => ({ userId, taskId: id }));

        if (dataToAdd.length > 0) await prisma.taskAssignee.createMany({ data: dataToAdd });
        if (dataToDelete.length > 0) await prisma.taskAssignee.deleteMany({ where: { AND: dataToDelete } });
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
        const objectKeyFiles = TaskFiles.map(({ Resource }) => Resource.fileName);
        const objectKeyImages = TaskImages.map(({ Resource }) => Resource.fileName);
        let taskFiles: Prisma.TaskFileCreateManyInput[] = [];
        let taskImages: Prisma.TaskImageCreateManyInput[] = [];
        let fileNamesToDelete: string[] = [];
        let fileNamesToAdd: string[] = [];
        const FileAttachment = [...objectKeyFiles, ...objectKeyImages];

        fileNamesToAdd = files.filter(fileName => !FileAttachment.includes(fileName));
        fileNamesToDelete = FileAttachment.filter(fileName => !files.includes(fileName));

        let newFileResources = await this.fileService.handleUploadObjectStorage({
          fileName: fileNamesToAdd,
          prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE,
          user
        });

        if (newFileResources) {
          if (!Array.isArray(newFileResources)) {
            newFileResources = [newFileResources];
          }
          newFileResources.forEach(newFileResource => {
            if (newFileResource.fileType.includes("image")) taskImages.push({ resourceId: newFileResource.id, taskId: id });
            else taskFiles.push({ resourceId: newFileResource.id, taskId: id });
          });
        }
        if (taskFiles.length > 0) await prisma.taskFile.createMany({ data: taskFiles });
        if (taskImages.length > 0) await prisma.taskImage.createMany({ data: taskImages });
        if (fileNamesToDelete.length > 0) {
          let oldResourceFiles: Resource[] = [];
          let oldResourceImages: Resource[] = [];

          fileNamesToDelete.forEach(fileName => {
            const resource = [...TaskFiles, ...TaskImages].find(({ Resource }) => Resource.fileName === fileName);
            if (resource) {
              if (resource.Resource.fileType.includes("image")) oldResourceImages.push(resource.Resource);
              else oldResourceFiles.push(resource.Resource);
            }
          });
          for (const resource of oldResourceFiles) {
            await prisma.taskFile.delete({
              where: { taskId_resourceId: { resourceId: resource.id, taskId: id } }
            });
          }
          for (const resource of oldResourceImages) {
            await prisma.taskImage.delete({
              where: { taskId_resourceId: { resourceId: resource.id, taskId: id } }
            });
          }
          this.ee.emit(DeletedFilesTaskEvent.key, new DeletedFilesTaskEvent({ oldResourceFiles, oldResourceImages }));
        }
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
    const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id }, include: { ReminderTasks: true } })
    let where: Prisma.TaskWhereUniqueInput = { id, deletedAt: null };

    if (organizationId) where.organizationId = organizationId;
    if (projectId) where.projectId = projectId;
    else where.createdById = user.id;

    if (projectId) where.projectId = projectId;
    if (organizationId) where.organizationId = organizationId;
    if (!taskExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "task" }), HttpStatus.NOT_FOUND)

    await this.prisma.$transaction(async (prisma) => {
      const newData = await prisma.task.update({ where, data: { deletedAt: dayjs().toISOString() } })
      if (taskExist.ReminderTasks) await this.reminderService.removeReminderTask({ db: prisma, reminderId: taskExist.ReminderTasks.reminderId, taskId: id, user, organizationId, projectId })
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
    })

    return { message: LangResponse({ key: "deleted", lang, object: "task" }) };
  }
}
