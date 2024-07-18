// import { Injectable } from "@nestjs/common";
// import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
// import { CreateNotificationAddMemberEvent } from "./member.event";
// import { NotificationCreateEvent } from "src/notification";

// @Injectable()
// export class MemberListener {
//     constructor(
//         private readonly ee: EventEmitter2
//     ) { }
//     @OnEvent(CreateNotificationAddMemberEvent.key)
//     handleCreateNotificationAddMemberEvent({ data: { organization, user } }: CreateNotificationAddMemberEvent) {
//         this.ee.emit(NotificationCreateEvent.key, new NotificationCreateEvent({data,fcm,scope,user,project}))
//     }
// }