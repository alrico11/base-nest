import { Note, Organization, Project, Reminder, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { LangEnum } from "src/constants"

type SchedulerCreateReminderNoteEventType = {
    reminder: Reminder
    project?: Project
    organization?: Organization
    note: Note
    user: User
    lang: LangEnum
}

type SchedulerUserResetTokenJob = {
    expiry: number
    user: User
    token: string
}

export class SchedulerUserResetTokenJobEvent extends CompactClass<SchedulerUserResetTokenJob> {
    public static key = `SCHEDULER_USER_JOB.CREATED`
}

export class SchedulerCreateReminderNoteEvent extends CompactClass<SchedulerCreateReminderNoteEventType> { public static key = "SCHEDULER_REMINDER_NOTE.CREATED" }