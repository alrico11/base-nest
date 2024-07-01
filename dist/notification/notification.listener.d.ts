import { FirebaseService } from "src/firebase/firebase.service";
import { PrismaService } from "src/prisma";
import { NotificationCreateEvent } from "./notification.event";
import { NotificationService } from "./notification.service";
export declare class NotificationListener {
    private readonly notificationService;
    private readonly firebaseService;
    private readonly prisma;
    constructor(notificationService: NotificationService, firebaseService: FirebaseService, prisma: PrismaService);
    handleNotificationEvent(notification: NotificationCreateEvent): Promise<void>;
}
