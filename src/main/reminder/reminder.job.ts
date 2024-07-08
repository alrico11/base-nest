import { Process, Processor } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { NotificationCreateEvent } from "src/notification/notification.event";
import { SCHEDULER_QUEUE_KEY } from "src/scheduler";
import { SchedulerCreateReminderNoteEvent } from "src/scheduler/scheduler.event";

@Processor(SCHEDULER_QUEUE_KEY)
export class ReminderJob {
    constructor(
        private readonly ee: EventEmitter2,
    ) { }
    @Process(SchedulerCreateReminderNoteEvent.key)
    async handleCreateReminderNoteEvent({ data }: SchedulerCreateReminderNoteEvent) {
        const { note, reminder, user, project, organization } = data
        let scope: string = `note/${note.id}`
        if (project && !organization) scope = `project/${project.id}/note/${note.id}`
        if (!project && organization) scope = `organization/${organization.id}/note/${note.id}`
        if (project && organization) scope = `organization/${organization.id}/project/${project.id}/note/${note.id}`
        this.ee.emit(NotificationCreateEvent.key, new NotificationCreateEvent({
            data: { collapseKey: "noteReminder", type: "reminder", data: reminder.id },
            fcm: { title: "Reminder", body: `Reminder for note ${note.title}` },
            scope,
            user
        }))
    }
}