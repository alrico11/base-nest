import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { INotificationCreate } from './notification.@types';
export declare class NotificationService {
    private readonly prisma;
    private readonly l;
    constructor(prisma: PrismaService, l: LogService);
    create({ data, fcm, user: { id }, scope }: INotificationCreate): Promise<boolean>;
}
