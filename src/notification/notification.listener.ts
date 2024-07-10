import { Injectable, } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { OnEvent } from "@nestjs/event-emitter";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
import { FirebaseService } from "src/firebase/firebase.service";
import { PrismaService } from "src/prisma";
import { NotificationCreateEvent } from "./notification.event";
import { NotificationService } from "./notification.service";

@Injectable()
export class NotificationListener {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly firebaseService: FirebaseService,
        private readonly prisma: PrismaService
    ) { }
    @OnEvent(NotificationCreateEvent.key)
    async handleNotificationEvent(notification: NotificationCreateEvent) {
        const { fcm, user, data, scope} = notification.data
        const { body, title } = fcm
        let tokens: string[] = []
        const token = await this.prisma.userDevice.findFirst({
            where: { userId: user.id },
            include: { Device: true }
        })
        if (!token) throw new HttpException('FCM TOKEN NOT FOUND', HttpStatus.BAD_REQUEST)
        if (!token.Device.fcmToken) throw new HttpException('FCM TOKEN NOT FOUND', HttpStatus.BAD_REQUEST)
        tokens.push(token.Device.fcmToken)
        const message: MulticastMessage = {
            tokens,
            android: { collapseKey: data.collapseKey, ttl: 1800 },
            notification: { title, body },
            data
        }
        await this.notificationService.create({ data, fcm, user, scope })
        const notif = await this.firebaseService.sendNotification(message)
    }
}