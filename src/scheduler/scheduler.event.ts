import { Note, Organization, Project, Reminder, Task, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { LangEnum } from "src/constants"

//NOTE

type SchedulerCreateReminderNoteEventType = {
    reminder: Reminder
    project?: Project
    organization?: Organization
    note: Note
    user: User
    lang: LangEnum
}

type SchedulerUpdateReminderNoteEventType = {
    reminder: Reminder
    project?: Project
    organization?: Organization
    note: Note
    user: User
    lang: LangEnum
}

type SchedulerDeleteReminderNoteEventType = {
    reminder: Reminder
}

export class SchedulerCreateReminderNoteEvent extends CompactClass<SchedulerCreateReminderNoteEventType> { public static key = "SCHEDULER_REMINDER_NOTE.CREATED" }
export class SchedulerUpdateReminderNoteEvent extends CompactClass<SchedulerUpdateReminderNoteEventType> { public static key = "SCHEDULER_REMINDER_NOTE.UPDATED" }
export class SchedulerDeleteReminderNoteEvent extends CompactClass<SchedulerDeleteReminderNoteEventType> { public static key = "SCHEDULER_REMINDER_NOTE.DELETED" }


//TASK

type SchedulerCreateReminderTaskEventType = {
    reminder: Reminder
    project?: Project
    organization?: Organization
    task: Task
    user: User
    lang: LangEnum
}

type SchedulerUpdateReminderTaskEventType = {
    oldReminder: Reminder
    newReminder: Reminder
    project?: Project
    organization?: Organization
    task: Task
    user: User
    lang: LangEnum
}

type SchedulerReminderDeleteTaskEventType = {
    reminder: Reminder
}

export class SchedulerCreateReminderTaskEvent extends CompactClass<SchedulerCreateReminderTaskEventType> { public static key = "SCHEDULER_REMINDER_TASK.CREATED" }

export class SchedulerUpdateReminderTaskEvent extends CompactClass<SchedulerUpdateReminderTaskEventType> { public static key = "SCHEDULER_REMINDER_TASK.UPDATED" }

export class SchedulerReminderDeleteTaskEvent extends CompactClass<SchedulerReminderDeleteTaskEventType> {
    public static key = "SCHEDULER_REMINDER_TASK.DELETED"
}

type SchedulerUserResetTokenJob = {
    expiry: number
    user: User
    token: string
}

export class SchedulerUserResetTokenJobEvent extends CompactClass<SchedulerUserResetTokenJob> {
    public static key = `SCHEDULER_USER_JOB.CREATED`
}