import { Note, Prisma, Reminder, ReminderNote, Task } from "@prisma/client";

export type CreateReminderInput = Prisma.ReminderCreateInput
export type UpdateReminderInput = Prisma.ReminderUpdateInput

export interface ICreateReminder {
    task: Task
    reminder: CreateReminderInput
}

export interface IUpdateReminder {
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

export interface ICreateReminderNote {
    note: Note
    reminder: CreateReminderInput
}

export interface IUpdateReminderNote {
    reminderNote: ReminderNote
    reminder: CreateReminderInput
    note: Note
}
