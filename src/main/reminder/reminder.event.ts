import { Note, Organization, Project, Reminder, Task, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { LangEnum } from "src/constants"

type CreateReminderNotificationEventType = {
    reminder: Reminder
    project?: Project | null
    organization?: Organization | null
    note?: Note
    task?: Task
    user: User
    lang: LangEnum
    delay: number
}

export class CreateReminderNotificationEvent extends CompactClass<CreateReminderNotificationEventType> {
    public static key = "REMINDER_CREATE_NOTIFICATION.CREATED"
}

type CreateReminderNoteEventType = {
    delay: number
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project | null
    organization?: Organization | null
    note: Note
}

type UpdateReminderNoteEventType = {
    delay: number
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project | null
    organization?: Organization | null
    note: Note
}

type DeleteReminderNoteEventType = {
    reminder: Reminder
}

export class CreateReminderNoteEvent extends CompactClass<CreateReminderNoteEventType> { public static key = "REMINDER_NOTE.CREATED" }
export class UpdateReminderNoteEvent extends CompactClass<UpdateReminderNoteEventType> { public static key = "REMINDER_NOTE.UPDATED" }
export class DeleteReminderNoteEvent extends CompactClass<DeleteReminderNoteEventType> { public static key = "REMINDER_NOTE.DELETED" }

type CreateReminderTaskEventType = {
    delay: number
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project | null
    organization?: Organization | null
    task: Task
}

type UpdateReminderTaskEventType = {
    delay: number
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project | null
    organization?: Organization | null
    task: Task
}

type DeleteReminderTaskEventType = {
    reminder: Reminder
}

export class CreateReminderTaskEvent extends CompactClass<CreateReminderTaskEventType> { public static key = "REMINDER_TASK.CREATED" }
export class UpdateReminderTaskEvent extends CompactClass<UpdateReminderTaskEventType> { public static key = "REMINDER_TASK.UPDATED" }
export class DeleteReminderTaskEvent extends CompactClass<DeleteReminderTaskEventType> { public static key = "REMINDER_TASK.DELETED" }