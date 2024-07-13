import { Note, Organization, Prisma, Project, Reminder, ReminderNote, ReminderTask, Task, User } from "@prisma/client";
import { PrismaTrx } from "src/@types";
import { LangEnum } from "src/constants";

export type CreateReminderInput = Prisma.ReminderCreateInput
export type UpdateReminderInput = Prisma.ReminderUpdateInput

interface BaseReminder {
    project?: Project | null
    organization?: Organization | null
    lang: LangEnum
    db: PrismaTrx
    user: User
}

export interface ICreateReminderTask extends BaseReminder {
    task: Task
    reminder: CreateReminderInput
}

export interface IUpdateReminderTask extends BaseReminder {
    reminderTask: ReminderTask
    reminder: CreateReminderInput
    task: Task
}

export interface IDeleteReminderTask {
    projectId?: string
    organizationId?: string
    reminderId: string
    taskId: string
    db: PrismaTrx
    user: User
}
export interface IDeleteReminderNote {
    projectId?: string
    organizationId?: string
    reminderId: string
    noteId: string
    db: PrismaTrx
    user: User
}

export interface ICreateReminderNote extends BaseReminder {
    note: Note
    reminder: CreateReminderInput
}

export interface IUpdateReminderNote extends BaseReminder {
    reminderNote: ReminderNote
    reminder: CreateReminderInput
    note: Note
}

export interface ITimeTriggerReminder {
    reminder: Reminder
    note?: Note
    task?: Task
    user: User
}

export interface IUpdateReminderNextInvocation {
    reminder: Reminder
    note?: Note
    task?: Task
    user: User
}

export interface ISetReminderNextInvocation {
    reminder: Reminder
}
