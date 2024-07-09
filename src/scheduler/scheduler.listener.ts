import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common/decorators";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { ReminderService } from "src/main/reminder/reminder.service";
import { SCHEDULER_QUEUE_KEY } from "./scheduler.constans";
import { SchedulerCreateReminderNoteEvent, SchedulerUserResetTokenJobEvent } from "./scheduler.event";

@Injectable()
export class SchedulerListener {
  constructor(
    @InjectQueue(SCHEDULER_QUEUE_KEY) private queue: Queue,
    private readonly reminderService: ReminderService,
  ) { }
  @OnEvent(SchedulerCreateReminderNoteEvent.key)
  async handleSchedulerCreateReminderNoteEvent({ data }: SchedulerCreateReminderNoteEvent) {
    const { note, reminder, lang, user, organization, project } = data
    const delay = await this.reminderService.setTriggerReminder({ reminder, lang })
    await this.queue.add(SchedulerCreateReminderNoteEvent.key, { note, reminder, user, lang, organization, project }, { delay })
  }

  @OnEvent(SchedulerUserResetTokenJobEvent.key)
  async handleSchedulerUserResetTokenJobEvent({ data }: SchedulerUserResetTokenJobEvent) {
    const { expiry, token, user } = data
    await this.queue.add(SchedulerUserResetTokenJobEvent.key, { user, token }, { delay: expiry })
  }
}