import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IntervalReminder } from '@prisma/client';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import {
  ICreateReminderNote, ICreateReminderTask, IDeleteReminderNote, IDeleteReminderTask,
  ITimeTriggerReminder,
  IUpdateReminderNextInvocation, IUpdateReminderNote, IUpdateReminderTask
} from './reminder.@types';
import { CreateReminderNoteEvent, CreateReminderTaskEvent, DeleteReminderNoteEvent, DeleteReminderTaskEvent, UpdateReminderNoteEvent, UpdateReminderTaskEvent } from './reminder.event';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly ee: EventEmitter2
  ) { }
  async create({ reminder, task, db, lang, user, organization, project }: ICreateReminderTask) {
    const data = await db.reminder.create({
      data: { ...reminder }
    })
    await db.reminderTask.create({ data: { reminderId: data.id, taskId: task.id } })
    this.ee.emit(CreateReminderTaskEvent.key, new CreateReminderTaskEvent({ lang, reminder: data, task, user, organization, project }))
    return data
  }

  async update({ reminder, task, db, lang, user, organization, project }: IUpdateReminderTask) {
    const { id, ...rest } = reminder
    const oldReminder = await db.reminder.findFirst({ where: { id } })
    if (!oldReminder) throw new HttpException(LangResponse({ key: "notFound", lang, object: "task" }), HttpStatus.NOT_FOUND)
    const data = await this.prisma.reminder.update({
      where: { id },
      data: { ...rest }
    })
    await db.reminderTask.update({
      where: { taskId: task.id },
      data: { reminderId: id, taskId: task.id }
    })
    this.ee.emit(UpdateReminderTaskEvent.key, new UpdateReminderTaskEvent({ lang, newReminder: data, oldReminder, task, user, organization, project }))
    return data
  }

  async removeReminderTask({ reminderId, taskId, db }: IDeleteReminderTask) {
    await db.reminderTask.delete({ where: { reminderId_taskId: { reminderId, taskId } } })
    const reminder = await db.reminder.delete({ where: { id: reminderId }, })
    this.ee.emit(DeleteReminderTaskEvent.key, new DeleteReminderTaskEvent({ reminder }))
    return true
  }

  async removeReminderNote({ reminderId, noteId, db }: IDeleteReminderNote) {
    await db.reminderNote.delete({ where: { reminderId_noteId: { reminderId, noteId } } })
    const reminder = await db.reminder.delete({ where: { id: reminderId }, })
    this.ee.emit(DeleteReminderNoteEvent.key, new DeleteReminderNoteEvent({ reminder }))
    return true
  }

  async createReminderNote({ reminder, note, lang, organization, project, user, db }: ICreateReminderNote) {
    const data = await db.reminder.create({
      data: { ...reminder }
    })
    await db.reminderNote.create({ data: { reminderId: data.id, noteId: note.id } })
    this.ee.emit(CreateReminderNoteEvent.key, new CreateReminderNoteEvent({ lang, note, reminder: data, user, organization, project }))
    return true
  }

  async updateReminderNote({ reminder, note, reminderNote, db, lang, user, organization, project }: IUpdateReminderNote) {
    const { id, ...rest } = reminder
    const oldReminder = await db.reminder.findFirst({ where: { id: reminderNote.reminderId } })
    if (!oldReminder) throw new HttpException(LangResponse({ key: "notFound", lang, object: "reminder" }), HttpStatus.NOT_FOUND)
    const data = await db.reminder.update({
      where: { id: reminderNote.reminderId },
      data: { ...rest }
    })
    await db.reminderNote.update({
      where: {
        reminderId_noteId: {
          noteId: note.id, reminderId: reminderNote.reminderId
        }
      },
      data: { reminderId: id, noteId: note.id }
    })
    this.ee.emit(UpdateReminderNoteEvent.key, new UpdateReminderNoteEvent({ lang, note, reminder: data, user, organization, project }))
    return data
  }

  async updateNoteReminderNextInvocation({ reminder, note, user, task }: IUpdateReminderNextInvocation) {
    const { id, nextInvocation, interval } = reminder;
    if (interval === IntervalReminder.ONCE) {
      await this.prisma.reminder.update({ where: { id }, data: { deletedAt: dayjs().toISOString() } });
      if (note) await this.prisma.reminderNote.delete({ where: { reminderId: id } })
      if (task) await this.prisma.reminderTask.delete({ where: { reminderId: id } })
      return true;
    }
    const newNextInvocation = this.calculateNextInvocation(nextInvocation, interval);
    if (newNextInvocation) {
      await this.prisma.reminder.update({ where: { id }, data: { nextInvocation: newNextInvocation } });
    }
  }

  calculateNextInvocation(currentInvocation: Date, interval: IntervalReminder): Date | undefined {
    switch (interval) {
      case IntervalReminder.DAILY:
        return dayjs.utc(currentInvocation).add(1, 'day').toDate();
      case IntervalReminder.WEEKLY:
        return dayjs.utc(currentInvocation).add(1, 'week').toDate();
      case IntervalReminder.MONTHLY:
        return dayjs.utc(currentInvocation).add(1, 'month').toDate();
      default:
        return undefined;
    }
  }

  async setTriggerReminder({ reminder, note, user, task }: ITimeTriggerReminder) {
    const { nextInvocation } = reminder;
    if (note) await this.updateNoteReminderNextInvocation({ reminder, note, user });
    // if (task) await this.update
    const delay = dayjs(nextInvocation).diff(dayjs());
    return delay;
  }
}
