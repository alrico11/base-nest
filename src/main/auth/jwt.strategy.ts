import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import dayjs from "dayjs";
import { Request } from 'express';
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: any, req: Request) {
    const rawToken = req.headers?.authorization?.split(' ')[1];
    const user = await this.prisma.authToken.findFirst({ where: { token: rawToken } })
    if (!user) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
    const userExist = await this.prisma.user.findFirst({
      where: { id: payload.id, deletedAt: null },
    })
    await this.prisma.user.update({
      where: { id: payload.id },
      data: { updatedAt: dayjs().toISOString() }
    })
    if (!userExist) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
    return userExist
  }
}