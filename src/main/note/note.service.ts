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
    private readonly reminderService: ReminderService,
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
        const { projectId, organizationId } = param;
        if (organizationId) await prisma.noteOrganization.create({ data: { organizationId, noteId: note.id } });
        if (projectId) await prisma.noteProject.create({ data: { projectId, noteId: note.id } });
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
      deletedAt: null, title: { contains: search, mode: "insensitive" },
    }
    if (param) {
      const { organizationId, projectId } = param;
      if (organizationId) {
        where.NoteOrganizations = { some: { organizationId } };
      }
      if (projectId) {
        where.NoteProjects = { some: { projectId } };
      }
    } else {
      where.creatorId = user.id;
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
    const { id, organizationId, projectId } = param
    let where: Prisma.NoteWhereUniqueInput = { deletedAt: null, id, }

    if (organizationId) where.NoteOrganizations = { some: { organizationId } };
    else if (projectId) where.NoteProjects = { some: { projectId } };
    else where.creatorId = user.id;

    const noteExist = await this.prisma.note.findFirst({
      where: { id, deletedAt: null, creatorId: user.id },
      include: { ReminderNotes: true }
    });

    if (!noteExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND);
    const { reminder, ...data } = body;
    await this.prisma.$transaction(async (prisma) => {
      const note = await prisma.note.update({
        where,
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
            reminderId: noteExist.ReminderNotes?.reminderId,
            user
          });
        }

      }
    });
    return { message: LangResponse({ key: "updated", lang, object: "note" }) };
  }
  async remove({ lang, param, user }: IDeleteNote) {
    const { id, organizationId, projectId } = param
    let where: Prisma.NoteWhereUniqueInput = { deletedAt: null, id }

    if (organizationId) where.NoteOrganizations = { some: { organizationId } };
    if (projectId) where.NoteProjects = { some: { projectId } };
    else where.creatorId = user.id;

    await this.prisma.$transaction(async (prisma) => {
      const noteExist = await prisma.note.findFirst({
        where,
        include: { ReminderNotes: true }
      })

      if (!noteExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND)
      await prisma.note.update({
        where,
        data: { deletedAt: dayjs().toISOString() }
      })
      if (noteExist.ReminderNotes) {
        await this.reminderService.removeReminderNote({ noteId: id, db: prisma, reminderId: noteExist.ReminderNotes?.reminderId, user })
      }
    })

    return { message: LangResponse({ key: "deleted", lang, object: "note" }) }
  }
}