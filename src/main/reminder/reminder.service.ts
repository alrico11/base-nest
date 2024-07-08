import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import {
  ICreateReminderNote, ICreateReminderTask, IDeleteReminderNote, IDeleteReminderTask, ITimeTriggerReminder, IUpdateNoteReminderNextInvocation, IUpdateReminderNote, IUpdateReminderTask
} from './reminder.@types';
import { CreateReminderNoteEvent } from './reminder.event';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly ee: EventEmitter2
  ) { }
  async create({ reminder, task }: ICreateReminderTask) {
    const { timeReminder, dateReminder, nextInvocation } = reminder
    const data = await this.prisma.reminder.create({
      data: { ...reminder }
    })
    await this.prisma.reminderTask.create({ data: { reminderId: data.id, taskId: task.id } })
    return data
  }

  async update({ reminder, task }: IUpdateReminderTask) {
    const { id, ...rest } = reminder
    const data = await this.prisma.reminder.update({
      where: { id },
      data: { ...rest }
    })
    await this.prisma.reminderTask.update({
      where: { taskId: task.id },
      data: { reminderId: id, taskId: task.id }
    })
    return data
  }

  async removeReminderTask({ reminderId, taskId }: IDeleteReminderTask) {
    await this.prisma.reminder.update({
      where: { id: reminderId },
      data: { deletedAt: dayjs().toISOString() }
    })
    await this.prisma.reminderTask.delete({
      where: { reminderId_taskId: { reminderId, taskId } }
    })
    return true
  }

  async removeReminderNote({ reminderId, noteId }: IDeleteReminderNote) {
    await this.prisma.reminder.update({
      where: { id: reminderId },
      data: { deletedAt: dayjs().toISOString() }
    })
    await this.prisma.reminderNote.delete({
      where: { reminderId_noteId: { reminderId, noteId } }
    })
    return true
  }

  async createReminderNote({ reminder, note, lang, organization, project, user, db }: ICreateReminderNote) {
    const data = await db.reminder.create({
      data: { ...reminder }
    })
    await db.reminderNote.create({ data: { reminderId: data.id, noteId: note.id } })
    this.ee.emit(CreateReminderNoteEvent.key, new CreateReminderNoteEvent({ lang, note, reminder: data, user, organization, project }))
    return data
  }
  
  async updateReminderNote({ reminder, note, reminderNote }: IUpdateReminderNote) {
    const { id, ...rest } = reminder
    const data = await this.prisma.reminder.update({
      where: { id },
      data: { ...rest }
    })
    await this.prisma.reminderNote.update({
      where: {
        reminderId_noteId: {
          noteId: note.id, reminderId: reminderNote.reminderId
        }
      },
      data: { reminderId: id, noteId: note.id }
    })
    return data
  }

  async updateNoteReminderNextInvocation({ lang, reminder }: IUpdateNoteReminderNextInvocation) {
    const { id, nextInvocation, interval } = reminder
    const reminderExist = await this.prisma.reminder.findFirst({ where: { id, deletedAt: null } })
    if (!reminderExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "note" }), HttpStatus.NOT_FOUND)
    if (interval === "ONCE") {
      await this.prisma.reminder.update({ where: { id }, data: { deletedAt: dayjs().toISOString() } })
      await this.prisma.reminderNote.delete({ where: { reminderId: id } })
    }
    if (interval === "DAILY") await this.prisma.reminder.update({ where: { id }, data: { nextInvocation: dayjs(nextInvocation).add(1, 'day').toDate() } })
    if (interval === "WEEKLY") await this.prisma.reminder.update({ where: { id }, data: { nextInvocation: dayjs(nextInvocation).add(1, 'week').toDate() } })
    if (interval === "MONTHLY") await this.prisma.reminder.update({ where: { id }, data: { nextInvocation: dayjs(nextInvocation).add(1, 'month').toDate() } })
    return true
  }

  async setTriggerReminder({ reminder, lang }: ITimeTriggerReminder) {
    const { nextInvocation } = reminder
    await this.updateNoteReminderNextInvocation({ lang, reminder })
    if (!nextInvocation) throw new Error()
    const delay = dayjs(nextInvocation).diff(dayjs())
    return delay
  }
}
