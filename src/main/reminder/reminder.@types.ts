import { Note, Organization, Prisma, Project, Reminder, ReminderNote, Task, User } from "@prisma/client";
import { PrismaTrx } from "src/@types";
import { LangEnum } from "src/constants";

export type CreateReminderInput = Prisma.ReminderCreateInput
export type UpdateReminderInput = Prisma.ReminderUpdateInput

interface BaseReminder {
    project?: Project
    organization?: Organization
    lang: LangEnum
    db: PrismaTrx
    user: User
}

export interface ICreateReminderTask {
    task: Task
    reminder: CreateReminderInput
}

export interface IUpdateReminderTask {
    reminder: Reminder
    task: Task
}

export interface IDeleteReminderTask {
    reminderId: string
    taskId: string
}
export interface IDeleteReminderNote {
    reminderId: string
    noteId: string
}

export interface ICreateReminderNote extends BaseReminder {
    note: Note
    reminder: CreateReminderInput
}

export interface IUpdateReminderNote {
    reminderNote: ReminderNote
    reminder: CreateReminderInput
    note: Note
}

export interface ITimeTriggerReminder {
    reminder: Reminder
    lang: LangEnum
}

export interface IUpdateNoteReminderNextInvocation {
    reminder: Reminder
    lang: LangEnum
}