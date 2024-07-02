import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBodyDto } from './user.dto';
import { Device } from '@prisma/client';
import { LangEnum } from 'src/constants';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserBodyDto, device: Device, lang: LangEnum): Promise<{
        message: string;
        statusCode: HttpStatus;
        data: {
            userId: string;
            email: string;
            token: string;
            name: string;
        };
    }>;
}
