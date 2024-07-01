import { Prisma } from "@prisma/client";
export type CreateReminderInput = Prisma.ReminderCreateInput;
export type UpdateReminderInput = Prisma.ReminderUpdateInput;
export interface ICreateReminder {
    reminder: CreateReminderInput;
}
export interface IUpdateReminder {
    reminderId: string;
    reminder: UpdateReminderInput;
}
export interface IDeleteReminderTask {
    reminderId: string;
    taskId: string;
}
export interface IDeleteReminderNote {
    reminderId: string;
    noteId: string;
}
