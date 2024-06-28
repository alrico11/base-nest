import { HttpStatus } from '@nestjs/common/enums';
import { LangEnum } from 'src/constants';
import { CheckDeviceBodyDto, RegisterDeviceBodyDto, RegisterFCMTokenBodyDto } from './device.dto';
import { DeviceService } from './device.service';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    registerDevice(lang: LangEnum, body: RegisterDeviceBodyDto): Promise<{
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
    checkDevice(lang: LangEnum, body: CheckDeviceBodyDto): Promise<{
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
    registerFcmToken(lang: LangEnum, body: RegisterFCMTokenBodyDto): Promise<{
        message: string;
    }>;
}
