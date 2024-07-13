import { Process, Processor } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
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
        const { lang, note, reminder, user, organization, project,delay } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, note, reminder, user, organization, project,delay}))
    }
    @Process(SchedulerUpdateReminderNoteEvent.key)
    async handleSchedulerUpdateReminderNoteEvent({ data }: SchedulerUpdateReminderNoteEvent) {
        const { lang, reminder, note, user, organization, project,delay } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, note, reminder, user, organization, project,delay}))
    }
    //TASK
    @Process(SchedulerCreateReminderTaskEvent.key)
    async handleSchedulerCreateReminderTaskEvent({ data }: SchedulerCreateReminderTaskEvent) {
        const { lang, reminder, task, user, organization, project,delay } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, task, reminder, user, organization, project ,delay}))
    }

    @Process(SchedulerUpdateReminderTaskEvent.key)
    async handleSchedulerUpdateReminderTaskEvent({ data }: SchedulerUpdateReminderTaskEvent) {
        const { lang, reminder, task, user, organization, project,delay } = data
        this.ee.emit(CreateReminderNotificationEvent.key, new CreateReminderNotificationEvent({ lang, task, reminder, user, organization, project,delay }))
    }
}