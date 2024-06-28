import { Device, User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { LoginBodyDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(lang: LangEnum, body: LoginBodyDto, device: Device): Promise<{
        message: string;
        data: {
            id: string;
            token: string;
        };
    }>;
    logout(lang: LangEnum, device: Device, user: User): Promise<{
        message: string;
    }>;
}
