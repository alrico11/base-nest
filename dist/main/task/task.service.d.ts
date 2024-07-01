import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { XConfig } from 'src/xconfig';
import { ReminderService } from '../reminder/reminder.service';
import { ICreateTask, IFindAllTask, IFindOneTask, IRemoveTask, IUpdateTask } from './task.@types';
export declare class TaskService {
    private readonly prisma;
    private readonly fileService;
    private readonly config;
    private readonly reminderService;
    private readonly ee;
    constructor(prisma: PrismaService, fileService: FileService, config: XConfig, reminderService: ReminderService, ee: EventEmitter2);
    create({ body, lang, user }: ICreateTask): Promise<{
        message: string;
    }>;
    findAll({ lang, query, user }: IFindAllTask): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            name: string;
            status: import("@prisma/client").$Enums.TaskEnum;
            priority: import("@prisma/client").$Enums.TaskPriority;
            teams: {
                userId: string;
                name: string;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
            }[];
        }[];
    }>;
    findOne({ lang, param: { id }, user }: IFindOneTask): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            status: import("@prisma/client").$Enums.TaskEnum;
            priority: import("@prisma/client").$Enums.TaskPriority;
            duration: number | null;
            teams: {
                userId: string;
                name: string;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
            }[];
            reminder: {
                id: string | undefined;
                date: Date | undefined;
                time: Date | undefined;
                interval: import("@prisma/client").$Enums.IntervalReminder | undefined;
                alarm: boolean | undefined;
            };
        };
    }>;
    update({ body, lang, param: { id }, user }: IUpdateTask): Promise<string>;
    remove({ lang, param: { id }, user }: IRemoveTask): Promise<{
        message: string;
    }>;
}
