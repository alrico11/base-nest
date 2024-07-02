import { HttpStatus } from '@nestjs/common';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { XConfig } from 'src/xconfig';
import { ICreateUser } from './user.@types';
export declare class UserService {
    private readonly prisma;
    private readonly config;
    private readonly fileService;
    constructor(prisma: PrismaService, config: XConfig, fileService: FileService);
    create({ body, device, lang }: ICreateUser): Promise<{
        message: string;
        statusCode: HttpStatus;
        data: {
            userId: string;
            email: string;
            token: string;
            name: string;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
