import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ResourceEditedEvent } from "src/file";
import { UserResetPasswordCreatedEvent, UserUpdatedEvent } from "./user.event";
import { SchedulerUserResetTokenJobEvent } from "src/scheduler/scheduler.event";
import { MailResetUserPasswordEvent } from "src/mail/mail.event";

@Injectable()
export class UserListener {
    constructor(
        private readonly ee: EventEmitter2
    ) { }
    @OnEvent(UserUpdatedEvent.key)
    handleUpdateUserEvent({ data }: UserUpdatedEvent) {
        const { newResource, oldResource } = data
        this.ee.emit(ResourceEditedEvent.key, new ResourceEditedEvent({ newResource, oldResource }))
    }
    @OnEvent(UserResetPasswordCreatedEvent.key)
    handleUserResetPasswordCreatedEvent({ data }: UserResetPasswordCreatedEvent) {
        const { user, expiry, token } = data
        this.ee.emit(SchedulerUserResetTokenJobEvent.key, new SchedulerUserResetTokenJobEvent({ expiry, token, user }))
        this.ee.emit(MailResetUserPasswordEvent.key, new MailResetUserPasswordEvent({ user, token }))
    }
}