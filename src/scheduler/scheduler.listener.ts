import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common/decorators";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { SCHEDULER_QUEUE_KEY } from "./scheduler.constans";
import { SchedulerCreateReminderNoteEvent, SchedulerCreateReminderTaskEvent, SchedulerDeleteReminderNoteEvent, SchedulerReminderDeleteTaskEvent, SchedulerUpdateReminderNoteEvent, SchedulerUpdateReminderTaskEvent, SchedulerUserResetTokenJobEvent } from "./scheduler.event";
import dayjs from "dayjs";
import { Console } from "console";

@Injectable()
export class SchedulerListener {
  constructor(
    @InjectQueue(SCHEDULER_QUEUE_KEY) private queue: Queue,
  ) { }

  @OnEvent(SchedulerUserResetTokenJobEvent.key)
  async handleSchedulerUserResetTokenJobEvent({ data }: SchedulerUserResetTokenJobEvent) {
    const { expiry, token, user } = data
    await this.queue.add(SchedulerUserResetTokenJobEvent.key, { user, token }, { delay: expiry })
  }

  //NOTE

  @OnEvent(SchedulerCreateReminderNoteEvent.key)
  async handleSchedulerCreateReminderNoteEvent({ data }: SchedulerCreateReminderNoteEvent) {
    const { note, reminder, lang, user, organization, project } = data;
    const delay = dayjs(reminder.nextInvocation).diff(dayjs());
    await this.queue.add(SchedulerCreateReminderNoteEvent.key, { note, reminder, user, lang, organization, project }, { delay, jobId: reminder.id, removeOnComplete: true, })
  }

  // ON TESTING
  @OnEvent(SchedulerUpdateReminderNoteEvent.key)
  async handleSchedulerUpdateReminderNoteEvent({ data }: SchedulerUpdateReminderNoteEvent) {
    const { lang, note, reminder, user, organization, project } = data
    const delay = dayjs(reminder.nextInvocation).diff(dayjs());
    const job = await this.queue.getJob(reminder.id)
    await job?.remove()
    await this.queue.add(SchedulerUpdateReminderNoteEvent.key, { note, reminder, user, lang, organization, project }, { delay, jobId: reminder.id, removeOnComplete: true })
  }

  @OnEvent(SchedulerDeleteReminderNoteEvent.key)
  async handleSchedulerDeleteReminderNoteEvent({ data }: SchedulerDeleteReminderNoteEvent) {
    const { reminder } = data
    const job = await this.queue.getJob(reminder.id)
    await job?.remove()
  }

  @OnEvent(SchedulerCreateReminderTaskEvent.key)
  async handleSchedulerCreateReminderTaskEvent({ data }: SchedulerCreateReminderTaskEvent) {
    const { lang, reminder, task, user, organization, project } = data
    const delay = dayjs(reminder.nextInvocation).diff(dayjs());
    await this.queue.add(SchedulerCreateReminderTaskEvent.key, { task, reminder, user, lang, organization, project }, { delay, jobId: reminder.id, removeOnComplete: true });
  }

  @OnEvent(SchedulerUpdateReminderTaskEvent.key)
  async handleSchedulerUpdateReminderTaskEvent({ data }: SchedulerUpdateReminderTaskEvent) {
    const { lang, reminder, task, user, organization, project } = data
    const delay = dayjs(reminder.nextInvocation).diff(dayjs());
    const job = await this.queue.getJob(reminder.id)
    await job?.remove()
    await this.queue.add(SchedulerUpdateReminderTaskEvent.key, { task, reminder, user, lang, organization, project }, { delay, jobId: reminder.id, removeOnComplete: true })
  }

  @OnEvent(SchedulerReminderDeleteTaskEvent.key)
  async handleSchedulerReminderDeleteTaskEvent({ data }: SchedulerReminderDeleteTaskEvent) {
    const { reminder } = data
    const job = await this.queue.getJob(reminder.id)
    await job?.remove()
  }
}