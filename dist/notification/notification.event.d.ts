import { User } from "@prisma/client";
import { CompactClass } from "src/@classes";
export type FcmJson = {
    title: string;
    body: string;
};
export type DataJson = {
    bookingId: string;
    type: string;
    collapseKey: string;
};
export type NotificationCreateEventType = {
    user: User;
    fcm: FcmJson;
    scope: string;
    data: DataJson;
};
export declare class NotificationCreateEvent extends CompactClass<NotificationCreateEventType> {
    static key: string;
}
