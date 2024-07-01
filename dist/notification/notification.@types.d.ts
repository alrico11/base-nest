import { User } from "@prisma/client";
import { NotificationParamDto, NotificationQueryDto } from "./notification.dto";
import { LangEnum } from "src/constants";
export interface IFindAll {
    query: NotificationQueryDto;
    lang: LangEnum;
    user: User;
}
export interface INotificationReadAt {
    notificationId: string;
    user: User;
}
export interface IFindOne {
    param: NotificationParamDto;
    lang: LangEnum;
    user: User;
}
export interface INotificationCreate {
    scope: string;
    data: any;
    fcm: FcmJsonType;
    user: User;
}
export type FcmJsonType = {
    title: string;
    body: string;
};
