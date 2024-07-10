import { Process, Processor } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IntervalReminder } from "@prisma/client";
import { NotificationCreateEvent } from "src/notification/notification.event";
import { PrismaService } from "src/prisma";
import { SCHEDULER_QUEUE_KEY } from "src/scheduler";
import { SchedulerCreateReminderNoteEvent, SchedulerCreateReminderTaskEvent, SchedulerUpdateReminderNoteEvent, SchedulerUpdateReminderTaskEvent } from "src/scheduler/scheduler.event";
import { CreateReminderNotificationEvent } from "./reminder.event";

@Processor(SCHEDULER_QUEUE_KEY)
export class ReminderJob {
    constructor(
        private readonly ee: EventEmitter2,
        private readonly prisma: PrismaService
    ) { }

    //NOTE
    @Process(SchedulerCreateReminderNoteEvent.key)
    async handleCreateReminderNoteEvent({ data }: SchedulerCreateReminderNoteEvent) {
        const { lang, note, reminder, user, organization, project, } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, note, reminder, user, organization, project }))
    }
    @Process(SchedulerUpdateReminderNoteEvent.key)
    async handleSchedulerUpdateReminderNoteEvent({ data }: SchedulerUpdateReminderNoteEvent) {
        const { lang, reminder, note, user, organization, project } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, note, reminder, user, organization, project }))
    }
    //TASK
    @Process(SchedulerCreateReminderTaskEvent.key)
    async handleSchedulerCreateReminderTaskEvent({ data }: SchedulerCreateReminderTaskEvent) {
        const { lang, reminder, task, user, organization, project } = data
    }

    @Process(SchedulerUpdateReminderTaskEvent.key)
    async handleSchedulerUpdateReminderTaskEvent({ data }: SchedulerUpdateReminderTaskEvent) {
        const { lang, newReminder, oldReminder, task, user, organization, project } = data
    }
}