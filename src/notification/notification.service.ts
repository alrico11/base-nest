import { Injectable, } from '@nestjs/common/decorators';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IFindAll, INotificationCreate, INotificationReadAt } from './notification.@types';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly l: LogService
  ) { }

  async create({ data, fcm, user: { id }, scope }: INotificationCreate) {
    const notification = await this.prisma.notification.create({
      data: { data: data, scope, fcm: fcm, userId: id }
    })
    this.l.info({
      message: `notification create successfully with id ${notification.id} with user id ${id}`
    })
    return true
  }

  // async findAll({ user: { id }, lang, query: { page, limit } }: IFindAll) {
  //   const data = await this.prisma.notification.findMany({
  //     where: { userId: id, deletedAt: null },
  //     take: limit,
  //     skip: (page - 1) * limit,
  //   })
  //   return { message: LangResponse({ key: 'fetched', lang, object: 'notification' }), statusCode: HttpStatusCode.Ok, data };
  // }

  // async readNotification({ notificationId, user }: INotificationReadAt) {
  //   await this.prisma.userNotification.update({
  //     where: {
  //       id: notificationId,
  //       deletedAt: null,
  //       readAt: null
  //     }, data: {
  //       readAt: dayjs().toDate()
  //     }
  //   })
  //   this.l.info({
  //     message: `notification read successfully with id ${notificationId} with partner id ${user.id}`
  //   })
  //   return true
  // }
}