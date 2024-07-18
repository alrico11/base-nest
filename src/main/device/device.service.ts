import { Injectable, } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { LogService } from 'src/log';
import { PrismaService } from '../../prisma/prisma.service';
import { ICheckDevice, IRegisterDevice, IRegisterFcm } from './device.@types';
import { ApplicationConfig } from '@nestjs/core';
import { XConfig } from 'src/xconfig';
import { LangResponse } from 'src/constants';

@Injectable()
export class DeviceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: XConfig,
    private readonly l: LogService
  ) { this.l.setContext(DeviceService.name) }

  async registerDevice({ body: { fingerprint }, lang }: IRegisterDevice) {
    const device = await this.prisma.device.findFirst({
      where: { fingerprint: fingerprint, deletedAt: null }
    })
    if (device) return { message: LangResponse({ key: 'conflict', lang }), statusCode: HttpStatus.CONFLICT, data: { deviceId: device.id } }

    const result = await this.prisma.device.create({
      data: {
        fingerprint: fingerprint
      }
    })
    this.l.info({
      message: `fingerprint registered with deviceId ${result.id}`,
    })

    return {
      message: LangResponse({ key: 'created', lang, object: 'device' }),
      data: { ...result, deviceToken: sign({ id: result.id }, this.config.env.DEVICE_JWT_SECRET, {}) }
    }
  }

  async checkDevice({ body: { fingerprint, id }, lang }: ICheckDevice) {
    const device = await this.prisma.device.findFirst({
      where: { id: id, fingerprint: fingerprint, deletedAt: null }
    })
    if (!device) throw new HttpException({ message: LangResponse({ key: 'notFound', lang, object: 'device' }) }, HttpStatus.NOT_FOUND)

    const token = sign({ id: device.id }, this.config.env.DEVICE_JWT_SECRET, {})
    return {
      message: LangResponse({ key: 'conflict', lang }),
      data: { ...device, deviceToken: token }
    }
  }

  async registerFcm({ body: { deviceToken, fcmToken }, lang }: IRegisterFcm) {
    const tokenData: any = verify(deviceToken, this.config.env.DEVICE_JWT_SECRET)
    if (tokenData?.id === undefined) throw new HttpException(LangResponse({ key: 'forbidden', lang }), HttpStatus.FORBIDDEN)
    const device = await this.prisma.device.findFirst({ where: { id: tokenData.id, deletedAt: null } })
    if (!device) throw new HttpException({ message: LangResponse({ key: 'notFound', lang, object: 'device' }) }, HttpStatus.NOT_FOUND)
    verify(deviceToken, this.config.env.DEVICE_JWT_SECRET)

    await this.prisma.device.update({
      where: { id: device.id },
      data: { fcmToken: fcmToken, fcmTokenLastUpdate: dayjs().toDate() }
    })
    this.l.info({
      message: `FCM registered with deviceId ${device.id}`,
    })

    return { message: LangResponse({ key: 'created', lang, object: 'device' }) }
  }
}
