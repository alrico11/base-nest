import { User } from "@prisma/client"
import { CompactClass } from "src/@classes"

const NOTIFICATION_KEY = "NOTIFICATION_USER"

export type FcmJson = {
    title: string,
    body: string
}

export type DataJson = {
    bookingId: string,
    type: string,
    collapseKey: string
}

export type NotificationCreateEventType = {
    user: User,
    fcm: FcmJson,
    scope: string
    data: DataJson,
}

export class NotificationCreateEvent extends CompactClass<NotificationCreateEventType> {
    public static key = `${NOTIFICATION_KEY}_CREATE`
}