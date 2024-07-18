import { Injectable, } from '@nestjs/common/decorators';
import { OnEvent } from "@nestjs/event-emitter";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
import { FirebaseService } from "src/firebase/firebase.service";
import { NotificationCreateEvent } from "./notification.event";
import { NotificationService } from "./notification.service";

@Injectable()
export class NotificationListener {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly firebaseService: FirebaseService,
    ) { }
    @OnEvent(NotificationCreateEvent.key)
    async handleNotificationEvent(notification: NotificationCreateEvent) {
        const { fcm, user, data, scope, tokens, save } = notification.data
        const { body, title } = fcm
        const message: MulticastMessage = {
            tokens,
            android: { collapseKey: data.collapseKey, ttl: 1800 },
            notification: { title, body },
            data
        }
        if (save) await this.notificationService.create({ data, fcm, user, scope })
        await this.firebaseService.sendNotification(message)
    }
}