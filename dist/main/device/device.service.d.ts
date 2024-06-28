import { HttpStatus } from '@nestjs/common/enums';
import { LogService } from 'src/log';
import { PrismaService } from '../../prisma/prisma.service';
import { ICheckDevice, IRegisterDevice, IRegisterFcm } from './device.@types';
import { XConfig } from 'src/xconfig';
export declare class DeviceService {
    private readonly prisma;
    private readonly config;
    private readonly l;
    constructor(prisma: PrismaService, config: XConfig, l: LogService);
    registerDevice({ body: { fingerprint }, lang }: IRegisterDevice): Promise<{
        message: string;
        statusCode: HttpStatus;
        data: {
            deviceId: string;
        };
    } | {
        message: string;
        data: {
            deviceToken: string;
            id: string;
            fingerprint: string;
            fcmToken: string | null;
            fcmTokenLastUpdate: Date | null;
            lastActive: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            deviceId?: undefined;
        };
        statusCode?: undefined;
    }>;
    checkDevice({ body: { fingerprint, id }, lang }: ICheckDevice): Promise<{
        message: string;
        data: {
            deviceToken: string;
            id: string;
            fingerprint: string;
            fcmToken: string | null;
            fcmTokenLastUpdate: Date | null;
            lastActive: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    registerFcm({ body: { deviceToken, fcmToken }, lang }: IRegisterFcm): Promise<{
        message: string;
    }>;
}
