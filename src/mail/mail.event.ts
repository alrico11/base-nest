import { User, UserResetToken } from "@prisma/client"
import { CompactClass } from "src/@classes"

export type MailResetUserPasswordEventType = {
    user: User
    token: string
}

export class MailResetUserPasswordEvent extends CompactClass<MailResetUserPasswordEventType> { public static key = "MAIL_RESET_PASSWORD.CREATED" }