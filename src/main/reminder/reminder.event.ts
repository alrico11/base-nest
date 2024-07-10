import { Note, Organization, Project, Reminder, Task, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { LangEnum } from "src/constants"

type CreateReminderNotificationEventType = {
    reminder: Reminder
    project?: Project
    organization?: Organization
    note?: Note
    task?: Task
    user: User
    lang: LangEnum
}

export class CreateReminderNotificationEvent extends CompactClass<CreateReminderNotificationEventType> {
    public static key = "REMINDER_CREATE_NOTIFICATION.CREATED"
}

type CreateReminderNoteEventType = {
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project
    organization?: Organization
    note: Note
}

type UpdateReminderNoteEventType = {
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project
    organization?: Organization
    note: Note
}

type DeleteReminderNoteEventType = {
    reminder: Reminder
}

export class CreateReminderNoteEvent extends CompactClass<CreateReminderNoteEventType> { public static key = "REMINDER_NOTE.CREATED" }
export class UpdateReminderNoteEvent extends CompactClass<UpdateReminderNoteEventType> { public static key = "REMINDER_NOTE.UPDATED" }
export class DeleteReminderNoteEvent extends CompactClass<DeleteReminderNoteEventType> { public static key = "REMINDER_NOTE.DELETED" }

type CreateReminderTaskEventType = {
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project
    organization?: Organization
    task: Task

}

type UpdateReminderTaskEventType = {
    newReminder: Reminder
    oldReminder: Reminder
    user: User
    lang: LangEnum
    project?: Project
    organization?: Organization
    task: Task
}

type DeleteReminderTaskEventType = {
    reminder: Reminder
}

export class CreateReminderTaskEvent extends CompactClass<CreateReminderTaskEventType> { public static key = "REMINDER_TASK.CREATED" }
export class UpdateReminderTaskEvent extends CompactClass<UpdateReminderTaskEventType> { public static key = "REMINDER_TASK.CREATED" }
export class DeleteReminderTaskEvent extends CompactClass<DeleteReminderTaskEventType> { public static key = "REMINDER_TASK.CREATED" }

//TASK

