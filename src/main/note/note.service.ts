import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateNow, LangResponse } from 'src/constants';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { OrganizationService } from '../organization/organization.service';
import { ProjectService as OrganizationProjectService } from '../organization/project';
import { ProjectService } from '../project';
import { ReminderService } from '../reminder/reminder.service';
import { ICheckMemberOrCollaborator, ICheckToHandle, ICreateNote, IDeleteNote, IFindAllNote, IUpdateNote } from './note.@types';

dayjs.extend(utc)
@Injectable()
export class NoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reminderService: ReminderService,
    private readonly organizationService: OrganizationService,
    private readonly projectService: ProjectService,
    private readonly organizationProjectService: OrganizationProjectService,
  ) { }
  async create({ body, lang, user, param }: ICreateNote) {
    const { reminder, ...data } = body;
    await this.prisma.$transaction(async (prisma) => {
      const note = await prisma.note.create({
        data: {
          creatorId: user.id,
          ...data
        }
      });
      if (param) {
        const { projectId, organizationId } = param
        if (projectId && !organizationId) {
          prisma.noteProject.create({ data: { projectId, noteId: note.id } })
        }
        if (!projectId && organizationId) {
          await this.organizationService.memberGuard({ lang, organizationId, userId: user.id })
          await prisma.noteOrganization.create({ data: { organizationId, noteId: note.id } })
        }
        if (projectId && organizationId) {
          await prisma.noteOrganization.create({ data: { organizationId, noteId: note.id } });
          await prisma.noteProject.create({ data: { projectId, noteId: note.id } });
        }
      }
      if (reminder) {
        const { startDate, time, ...rest } = reminder;
        DateNow({ date: startDate, time: time, lang })
        const hour = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);
        const data = await this.reminderService.createReminderNote({
          lang,
          user,
          db: prisma,
          note,
          reminder: {
            dateReminder: dayjs.utc(startDate).toDate(),
            timeReminder: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
            nextInvocation: dayjs(startDate).set('hour', hour).set('minute', minutes).set('second', 0).toDate(),
            ...rest
          }
        });
      }
      return note;
    });

    return { message: LangResponse({ key: "created", lang, object: "note" }) };
  }

  async findAll({ lang, query, user, param }: IFindAllNote) {
    const { limit, orderBy, orderDirection, page, search } = query
    let where: Prisma.NoteWhereInput = {
      creatorId: user.id,
      deletedAt: null, title: { contains: search, mode: "insensitive" },
    }
    if (param) {
      const { organizationId, projectId } = param
      if (organizationId && !projectId) await this.organizationService.memberGuard({ lang, organizationId, userId: user.id })
      where = { deletedAt: null, title: { contains: search, mode: "insensitive" } }
    }
    const { result, ...rest } = await this.prisma.extended.note.paginate({
      where,
      include: {
        ReminderNotes: { include: { Reminder: true } },
        User: true,
        NoteProjects: { include: { Project: true } }
      },
      limit, page, orderBy: dotToObject({ orderBy, orderDirection })
    })
    const data = result.map(({ ReminderNotes, id, title, description, createdAt, NoteProjects }) => {
      const projectName = NoteProjects.flatMap(({ Project }) => {
        return {
          projectName: Project.name
        }
      })[0]
      return {
        id, title, description, createdAt, projectName,
        reminder: ReminderNotes ? {
          id: ReminderNotes?.Reminder.id,
          alarm: ReminderNotes?.Reminder.id,
          dateReminder: ReminderNotes?.Reminder.dateReminder,
          timeReminder: ReminderNotes?.Reminder.timeReminder,
          interval: ReminderNotes?.Reminder.interval
        } : undefined
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "note" }), data: data, ...rest };
  }

  async update({ body, lang, param, user }: IUpdateNote) {
    const { id } = param
    if (param) await this.checkToHandle({ lang, param, user })
    const noteExist = await this.prisma.note.findFirst({
      where: { id, deletedAt: null, creatorId: user.id },
      include: { ReminderNotes: true }
    });

    if (!noteExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND);
    const { reminder, ...data } = body;
    await this.prisma.$transaction(async (prisma) => {
      const note = await prisma.note.update({
        where: { id, creatorId: user.id },
        data: { creatorId: user.id, ...data }
      });
      if (reminder) {
        const { startDate, time, ...rest } = reminder;
        DateNow({ date: startDate, time: time, lang })
        const hours = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);
        if (noteExist.ReminderNotes) {
          await this.reminderService.updateReminderNote({
            note,
            db: prisma, lang, user,
            reminderNote: noteExist.ReminderNotes,
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              timeReminder: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              nextInvocation: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              ...rest
            }
          });
        } else {
          await this.reminderService.createReminderNote({
            lang, user, db: prisma, note,
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              timeReminder: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              nextInvocation: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              ...rest
            }
          });
        }
      } else if (!reminder) {
        if (noteExist.ReminderNotes?.reminderId) {
          await this.reminderService.removeReminderNote({
            noteId: note.id, db: prisma,
            reminderId: noteExist.ReminderNotes?.reminderId
          });
        }

      }
    });
    return { message: LangResponse({ key: "updated", lang, object: "note" }) };
  }
  async remove({ lang, param, user }: IDeleteNote) {
    const { id } = param
    await this.prisma.$transaction(async (prisma) => {
      if (param) await this.checkToHandle({ lang, param, user })
      const noteExist = await prisma.note.findFirst({
        where: { id, deletedAt: null, creatorId: user.id },
        include: { ReminderNotes: true }
      })

      if (!noteExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND)
      await prisma.note.update({
        where: { id, creatorId: user.id },
        data: { deletedAt: dayjs().toISOString() }
      })
      if (noteExist.ReminderNotes) {
        await this.reminderService.removeReminderNote({ noteId: id, db: prisma, reminderId: noteExist.ReminderNotes?.reminderId })
      }
    })

    return { message: LangResponse({ key: "deleted", lang, object: "note" }) }
  }
  async checkToHandle({ lang, param: { id, organizationId, projectId }, user }: ICheckToHandle) {
    if (projectId && !organizationId) await this.projectService.adminGuard({ lang, projectId, userId: user.id })
    if (organizationId && !projectId) await this.organizationService.adminGuard({ lang, organizationId, userId: user.id })
    if (projectId && organizationId) await this.organizationProjectService.adminGuard({ lang, projectId, userId: user.id })
  }
  // checkMemberOrCollaborator({ organizationId, projectId, userId }: ICheckMemberOrCollaborator) {
  //   let where: Prisma.NoteWhereInput = {}
  //   if (projectId && !organizationId)
  //     where = {
  //       NoteProjects: { some: { projectId, Project: { ProjectCollaborators: { some: { userId } } } } }
  //     }
  //   if (organizationId && !projectId)
  //     where = {
  //       NoteOrganizations: { some: { Organization: { id: organizationId, OrganizationMembers: { some: { userId } } } } }
  //     }
  //   if (projectId && organizationId)
  //     where = {
  //       NoteProjects: { some: { projectId, Project: { ProjectCollaborators: { some: { userId } } } } },
  //       NoteOrganizations: { some: { organizationId, Organization: { OrganizationMembers: { some: { userId } } } } }
  //     }
  //   return where
  // }
}