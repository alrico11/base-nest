import { Note, Organization, Project, Reminder, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { LangEnum } from "src/constants"

type CreateReminderNoteEventType = {
    reminder: Reminder
    user: User
    lang: LangEnum
    project?: Project
    organization?: Organization
    note: Note
}

export class CreateReminderNoteEvent extends CompactClass<CreateReminderNoteEventType> { public static key = "REMINDER_NOTE.CREATED" }