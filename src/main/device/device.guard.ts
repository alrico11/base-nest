import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { XConfig } from 'src/xconfig';

@Injectable()
export class UserDeviceGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: XConfig
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const deviceId = request.headers['x-client-id'];
        const deviceToken = request.headers['x-client-token']
        if (!deviceId) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        if (!deviceToken) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        const decoded: any = verify(deviceToken, this.config.env.DEVICE_JWT_SECRET)
        if (deviceId && decoded.id !== deviceId) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        const device = await this.prisma.device.findFirst({
            where: { id: deviceId, deletedAt: null },
            include: { AuthTokens: true }
        })

        if (!device) throw new HttpException("unregistered device", HttpStatus.UNAUTHORIZED)
        request.device = device
        return device != null;
    }
}
