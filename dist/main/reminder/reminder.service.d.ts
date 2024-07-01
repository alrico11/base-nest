import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ICreateReminder, IDeleteReminderNote, IDeleteReminderTask, IUpdateReminder } from './reminder.@types';
export declare class ReminderService {
    private readonly prisma;
    private readonly l;
    constructor(prisma: PrismaService, l: LogService);
    create({ reminder }: ICreateReminder): Promise<boolean>;
    update({ reminder, reminderId }: IUpdateReminder): Promise<void>;
    removeReminderTask({ reminderId, taskId }: IDeleteReminderTask): Promise<boolean>;
    removeReminderNote({ reminderId, noteId }: IDeleteReminderNote): Promise<boolean>;
}
