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

export class SchedulerCreateReminderNoteEvent extends CompactClass<SchedulerCreateReminderNoteEventType> { public static key = "SCHEDULER_REMINDER_NOTE.CREATED" }