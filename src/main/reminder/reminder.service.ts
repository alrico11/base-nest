import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IntervalReminder, Note, Reminder, Task } from '@prisma/client';
import dayjs from 'dayjs';
import { LangResponse } from 'src/constants';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import {
  ICreateReminderNote, ICreateReminderTask, IDeleteReminderNote, IDeleteReminderTask,
  ITimeTriggerReminder,
  IUpdateInvocation, IUpdateReminderNote, IUpdateReminderTask
} from './reminder.@types';
import { CreateReminderNoteEvent, CreateReminderTaskEvent, DeleteReminderNoteEvent, DeleteReminderTaskEvent, UpdateReminderNoteEvent, UpdateReminderTaskEvent } from './reminder.event';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService,
    private readonly ee: EventEmitter2
  ) { this.l.setContext(ReminderService.name); }

  async create({ reminder, task, db, lang, user, organization, project }: ICreateReminderTask) {
    const data = await db.reminder.create({
      data: { ...reminder }
    });
    await db.reminderTask.create({ data: { reminderId: data.id, taskId: task.id } });
    await this.setNextInvocReminder({ task, reminder: data, user, db });
    this.ee.emit(CreateReminderTaskEvent.key, new CreateReminderTaskEvent({ lang, reminder: data, task, user, organization, project, }));

    this.l.save({
      data: { message: `Reminder created with id ${data.id} by user id ${user.id}` },
      method: 'CREATE',
      newData: data,
      organizationId: organization?.id,
      projectId: project?.id,
      userId: user.id,
    });

    return data;
  }

  async update({ reminder, task, db, lang, user, organization, project }: IUpdateReminderTask) {
    const { id, ...rest } = reminder;
    const oldReminder = await db.reminder.findFirst({ where: { id } });
    if (!oldReminder) throw new HttpException(LangResponse({ key: "notFound", lang, object: "task" }), HttpStatus.NOT_FOUND);
    const data = await this.prisma.reminder.update({
      where: { id },
      data: { ...rest }
    });
    await db.reminderTask.update({
      where: { taskId: task.id },
      data: { reminderId: id, taskId: task.id }
    });
    await this.setNextInvocReminder({ task, reminder: data, user, db });
    this.ee.emit(UpdateReminderTaskEvent.key, new UpdateReminderTaskEvent({ lang, reminder: data, task, user, organization, project, }));

    this.l.save({
      data: { message: `Reminder updated with id ${id} by user id ${user.id}` },
      method: 'UPDATE',
      oldData: oldReminder,
      newData: data,
      organizationId: organization?.id,
      projectId: project?.id,
      userId: user.id,
    });

    return data;
  }

  async removeReminderTask({ reminderId, taskId, db, user, organizationId, projectId }: IDeleteReminderTask) {
    await db.reminderTask.delete({ where: { reminderId_taskId: { reminderId, taskId } } });
    const reminder = await db.reminder.delete({ where: { id: reminderId } });
    this.ee.emit(DeleteReminderTaskEvent.key, new DeleteReminderTaskEvent({ reminder }));
    this.l.save({
      data: { message: `Reminder task deleted with id ${reminderId} by user id ${user.id}` },
      method: 'DELETE',
      organizationId,
      projectId,
      userId: user.id,
    });

    return true;
  }

  async removeReminderNote({ reminderId, noteId, db, user, organizationId, projectId }: IDeleteReminderNote) {
    const reminderNote = await db.reminderNote.delete({ where: { reminderId_noteId: { reminderId, noteId } } });
    const reminder = await db.reminder.delete({ where: { id: reminderId } });

    this.ee.emit(DeleteReminderNoteEvent.key, new DeleteReminderNoteEvent({ reminder }));

    this.l.save({
      data: { message: `Reminder note deleted with id ${reminderId} by user id ${user.id}` },
      method: 'DELETE',
      organizationId,
      projectId,
      userId: user.id,
    });

    return true;
  }

  async createReminderNote({ reminder, note, lang, organization, project, user, db, }: ICreateReminderNote) {
    const data = await db.reminder.create({
      data: { ...reminder }
    });
    await db.reminderNote.create({ data: { reminderId: data.id, noteId: note.id } });
    await this.setNextInvocReminder({ note, reminder: data, user, db });
    this.ee.emit(CreateReminderNoteEvent.key, new CreateReminderNoteEvent({ lang, reminder: data, note, user, organization, project, }));
    this.l.save({
      data: { message: `Reminder note created with id ${data.id} by user id ${user.id}` },
      method: 'CREATE',
      newData: data,
      organizationId: organization?.id,
      projectId: project?.id,
      userId: user.id,
    });

    return data;
  }

  async updateReminderNote({ reminder, note, reminderNote, db, lang, user, organization, project }: IUpdateReminderNote) {
    const { id, ...rest } = reminder;
    const oldReminder = await db.reminder.findFirst({ where: { id: reminderNote.reminderId } });
    if (!oldReminder) throw new HttpException(LangResponse({ key: "notFound", lang, object: "reminder" }), HttpStatus.NOT_FOUND);
    const data = await db.reminder.update({
      where: { id: reminderNote.reminderId },
      data: { ...rest }
    });
    await db.reminderNote.update({
      where: {
        reminderId_noteId: {
          noteId: note.id, reminderId: reminderNote.reminderId
        }
      },
      data: { reminderId: id, noteId: note.id }
    });
    await this.setNextInvocReminder({ note, reminder: data, user, db });
    this.ee.emit(UpdateReminderNoteEvent.key, new UpdateReminderNoteEvent({ lang, reminder: data, note, user, organization, project }));

    this.l.save({
      data: { message: `Reminder note updated with id ${id} by user id ${user.id}` },
      method: 'UPDATE',
      oldData: oldReminder,
      newData: data,
      organizationId: organization?.id,
      projectId: project?.id,
      userId: user.id,
    });

    return data;
  }

  async updateInvocation({ reminder, note, user, task, db }: IUpdateInvocation) {
    const { id, nextInvocation, interval } = reminder;
    if (interval === IntervalReminder.ONCE) {
      await db.reminder.update({ where: { id }, data: { deletedAt: dayjs().toISOString() } });
      return undefined;
    }
    const newNextInvocation = this.calculateNextInvocation(nextInvocation, interval);
    if (newNextInvocation) {
      const data = await db.reminder.update({ where: { id }, data: { previousInvocation: reminder.nextInvocation, nextInvocation: newNextInvocation } })
      return data
    }
  }

  calculateNextInvocation(currentInvocation: Date, interval: IntervalReminder): Date | undefined {
    switch (interval) {
      case IntervalReminder.DAILY:
        return dayjs(currentInvocation).add(1, 'day').toDate();
      case IntervalReminder.WEEKLY:
        return dayjs(currentInvocation).add(1, 'week').toDate();
      case IntervalReminder.MONTHLY:
        return dayjs(currentInvocation).add(1, 'month').toDate();
      default:
        return undefined;
    }
  }

  async setNextInvocReminder({ reminder, note, user, task, db }: ITimeTriggerReminder) {
    let data: Reminder | undefined
    if (note) { data = await this.updateInvocation({ reminder, note, user, db }) };
    if (task) { data = await this.updateInvocation({ reminder, task, user, db }) };
    return true;
  }
}
