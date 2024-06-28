import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { XConfig } from 'src/xconfig';
export declare class UserDeviceGuard implements CanActivate {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: XConfig);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
