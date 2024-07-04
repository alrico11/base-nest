import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ICreateReminder, ICreateReminderNote, IDeleteReminderNote, IDeleteReminderTask, IUpdateReminder, IUpdateReminderNote } from './reminder.@types';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { }
  async create({ reminder, task }: ICreateReminder) {
    const data = await this.prisma.reminder.create({
      data: { ...reminder }
    })
    await this.prisma.reminderTask.create({ data: { reminderId: data.id, taskId: task.id } })
    return data
  }

  async update({ reminder, task }: IUpdateReminder) {
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

  async createReminderNote({ reminder, note }: ICreateReminderNote) {
    const data = await this.prisma.reminder.create({
      data: { ...reminder }
    })
    await this.prisma.reminderNote.create({ data: { reminderId: data.id, noteId: note.id } })
    return data
  }
  async updateReminderNote({ reminder, note }: IUpdateReminderNote) {
    const { id, ...rest } = reminder
    const data = await this.prisma.reminder.update({
      where: { id },
      data: { ...rest }
    })
    await this.prisma.reminderNote.update({
      where: {
        reminderId_noteId: {
          noteId: note.id, reminderId: reminder.id
        }
      },
      data: { reminderId: id, noteId: note.id }
    })
    return data
  }
}
