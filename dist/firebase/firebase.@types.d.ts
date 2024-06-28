import { AnyObject } from "src/@types";
interface INotification {
    title: string;
    body: string;
}
export interface INotificationMessage {
    token: string[];
    collapseKey: string;
    data: AnyObject;
    payload: INotification;
}
export {};
