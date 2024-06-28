import { ConfigService } from "@nestjs/config";
import { Request } from 'express';
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma";
declare const UserJwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class UserJwtStrategy extends UserJwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: any, req: Request): Promise<{
        id: string;
        username: string;
        name: string;
        email: string;
        password: string | null;
        phone: string | null;
        thumbnailId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        cityId: string;
    }>;
}
export {};
