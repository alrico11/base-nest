import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ICreateReminder, IDeleteReminderNote, IDeleteReminderTask, IUpdateReminder } from './reminder.@types';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { }
  async create({ reminder }: ICreateReminder) {
    const data = await this.prisma.reminder.create({
      data: { ...reminder }
    })
    return data
  }

  async update({ reminder, reminderId }: IUpdateReminder) {
    const data = await this.prisma.reminder.update({
      where: { id: reminderId },
      data: { ...reminder }
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
}
