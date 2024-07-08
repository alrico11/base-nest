import { Reminder, User } from "@prisma/client"
import { CompactClass } from "src/@classes"
import { CollapseKey, FcmType } from "./notification.@types"

const NOTIFICATION_KEY = "NOTIFICATION_USER"

export type FcmJson = {
    title: string,
    body: string
}

export type DataJson = {
    data: any
    type: FcmType,
    collapseKey: CollapseKey
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