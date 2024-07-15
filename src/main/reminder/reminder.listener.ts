import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { IntervalReminder } from "@prisma/client";
import { NotificationCreateEvent } from "src/notification/notification.event";
import { PrismaService } from "src/prisma";
import { SchedulerCreateReminderNoteEvent, SchedulerCreateReminderTaskEvent, SchedulerDeleteReminderNoteEvent, SchedulerUpdateReminderNoteEvent, SchedulerUpdateReminderTaskEvent } from "src/scheduler/scheduler.event";
import { CreateReminderNoteEvent, CreateReminderNotificationEvent, CreateReminderTaskEvent, DeleteReminderNoteEvent, DeleteReminderTaskEvent, UpdateReminderNoteEvent, UpdateReminderTaskEvent } from "./reminder.event";
@Injectable()
export class ReminderListener {
    constructor(
        private readonly ee: EventEmitter2,
        private readonly prisma: PrismaService
    ) { }
    //HANDLE NOTIFICATION
    @OnEvent(CreateReminderNotificationEvent.key)
    async handleCreateReminderNotificationEvent({ data: { lang, note, reminder, user, organization, project, task } }: CreateReminderNotificationEvent) {
        const item = note || task;
        if (!item) {
            throw new Error("Neither note nor task is provided.");
        }
        const itemType = note ? 'note' : 'task';
        const itemTitle = note ? note.title : task!.name;
        let scope = `${itemType}/${item.id}`;
        if (project) scope = `project/${project.id}/${scope}`;
        if (organization) scope = `organization/${organization.id}/${scope}`;
        this.ee.emit(NotificationCreateEvent.key, new NotificationCreateEvent({
            data: { collapseKey: `${itemType}Reminder`, type: "reminder", data: reminder.id },
            fcm: { title: "Reminder", body: `Reminder for ${itemType} ${itemTitle}` },
            scope,
            user
        }));
        const newReminder = await this.prisma.reminder.findFirst({ where: { id: reminder.id, deletedAt: null } });
        if (newReminder && newReminder.interval !== IntervalReminder.ONCE && note) {
            console.log(reminder.nextInvocation)
            this.ee.emit(SchedulerCreateReminderNoteEvent.key, new SchedulerCreateReminderNoteEvent({
                lang, note, reminder: newReminder, user, organization, project
            }));
        }
        if (newReminder && newReminder.interval !== IntervalReminder.ONCE && task) {
            this.ee.emit(SchedulerCreateReminderTaskEvent.key, new SchedulerCreateReminderTaskEvent({
                lang, task, reminder: newReminder, user, organization, project
            }));
        }
    }

    //NOTE
    @OnEvent(CreateReminderNoteEvent.key)
    handleShowReminderNoteEvent({ data: { note, lang, reminder, user, organization, project } }: CreateReminderNoteEvent) {
        this.ee.emit(SchedulerCreateReminderNoteEvent.key, new SchedulerCreateReminderNoteEvent({ lang, reminder, user, organization, project, note }))
    }

    //ON TESTING
    @OnEvent(UpdateReminderNoteEvent.key)
    handleUpdateReminderNoteEvent({ data: { note, lang, reminder, user, organization, project } }: UpdateReminderNoteEvent) {
        this.ee.emit(SchedulerUpdateReminderNoteEvent.key, new SchedulerUpdateReminderNoteEvent({ lang, reminder, user, organization, project, note }))
    }
    @OnEvent(DeleteReminderNoteEvent.key)
    handleDeleteReminderNoteEvent({ data: { reminder } }: DeleteReminderNoteEvent) {
        this.ee.emit(SchedulerDeleteReminderNoteEvent.key, new SchedulerDeleteReminderNoteEvent({ reminder }))
    }

    //TASK
    @OnEvent(CreateReminderTaskEvent.key)
    handleCreateReminderTaskEvent({ data: { lang, reminder, task, user, organization, project } }: CreateReminderTaskEvent) {
        this.ee.emit(SchedulerCreateReminderTaskEvent.key, new SchedulerCreateReminderTaskEvent({ lang, reminder, task, user, organization, project }))
    }

    @OnEvent(UpdateReminderTaskEvent.key)
    handleUpdateReminderTaskEvent({ data: { lang, reminder, task, user, organization, project } }: UpdateReminderTaskEvent) {
        this.ee.emit(SchedulerUpdateReminderTaskEvent.key, new SchedulerUpdateReminderTaskEvent({ lang, reminder, task, user, organization, project }))
    }

    @OnEvent(DeleteReminderTaskEvent.key)
    handleDeleteReminderTaskEvent({ data: { reminder } }: DeleteReminderTaskEvent) {
        this.ee.emit(DeleteReminderTaskEvent.key, new DeleteReminderTaskEvent({ reminder }))
    }
}