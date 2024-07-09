import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MailResetUserPasswordEvent } from "./mail.event";
import { MailService } from "./mail.service";

@Injectable()
export class MailListener {
    constructor(
        private readonly mailService: MailService
    ) { }
    @OnEvent(MailResetUserPasswordEvent.key)
    async handleMailResetUserPasswordEvent({ data }: MailResetUserPasswordEvent) {
        const { user, token } = data
        await this.mailService.sendResetPassword({ user, token })
    }
}