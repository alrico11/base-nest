import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateNow, LangResponse } from 'src/constants';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateNote, IDeleteNote, IFindAllNote, IUpdateNote } from './note.@types';

dayjs.extend(utc)
@Injectable()
export class NoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reminderService: ReminderService
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
        if (projectId && !organizationId) prisma.noteProject.create({ data: { projectId, noteId: note.id } });
        if (!projectId && organizationId) await prisma.noteOrganization.create({ data: { organizationId, noteId: note.id } });
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
        await this.reminderService.createReminderNote({
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
      creatorId: user.id, deletedAt: null, title: { contains: search, mode: "insensitive" },
    }
    if (param) {
      const { organizationId, projectId } = param
      if (projectId && !organizationId)
        where = {
          deletedAt: null, title: { contains: search, mode: "insensitive" },
          NoteProjects: { some: { projectId, Project: { ProjectCollaborators: { some: { userId: user.id } } } } }
        }
      if (organizationId && !projectId)
        where = {
          deletedAt: null, title: { contains: search, mode: "insensitive" },
          NoteOrganizations: { some: { organizationId, Organization: { OrganizationMembers: { some: { userId: user.id } } } } },
        }
      if (projectId && organizationId)
        where = {
          deletedAt: null, title: { contains: search, mode: "insensitive" },
          NoteProjects: { some: { projectId, Project: { ProjectCollaborators: { some: { userId: user.id } } } } },
          NoteOrganizations: { some: { organizationId, Organization: { OrganizationMembers: { some: { userId: user.id } } } } }
        }
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
        id, title, description, createdAt,projectName,
        reminder: {
          id: ReminderNotes?.Reminder.id,
          alarm: ReminderNotes?.Reminder.id,
          dateReminder: ReminderNotes?.Reminder.dateReminder,
          timeReminder: ReminderNotes?.Reminder.timeReminder,
          interval: ReminderNotes?.Reminder.interval
        }
      }
    })
    return { message: LangResponse({ key: "fetched", lang, object: "note" }), data: data, ...rest };
  }

  async update({ body, lang, param: { id }, user }: IUpdateNote) {
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
            reminderNote: noteExist.ReminderNotes,
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              timeReminder: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              ...rest
            }
          });
        } else {
          await this.reminderService.createReminderNote({
            lang, user, db: prisma, note,
            reminder: {
              dateReminder: dayjs.utc(startDate).toDate(),
              timeReminder: dayjs(startDate).set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
              ...rest
            }
          });
        }
      } else if (noteExist.ReminderNotes?.reminderId) {
        await this.reminderService.removeReminderNote({
          noteId: note.id,
          reminderId: noteExist.ReminderNotes?.reminderId
        });
      }
      return note;
    });
    return { message: LangResponse({ key: "updated", lang, object: "note" }) };
  }
  async remove({ lang, param: { id }, user }: IDeleteNote) {
    const noteExist = await this.prisma.note.findFirst({
      where: { id, deletedAt: null, creatorId: user.id },
      include: { ReminderNotes: true }
    })
    if (!noteExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND)
    await this.prisma.note.update({
      where: { id, creatorId: user.id },
      data: { deletedAt: dayjs().toISOString() }
    })
    if (noteExist.ReminderNotes) {
      await this.reminderService.removeReminderNote({ noteId: id, reminderId: noteExist.ReminderNotes?.reminderId })
    }
    return { message: LangResponse({ key: "deleted", lang, object: "note" }) }
  }
}
