import { Resource, User } from "@prisma/client"
import { CompactClass } from "src/@classes"

type UserUpdatedEventType = {
    oldResource: Resource | Resource[]
    newResource: Resource | Resource[]
}

type UserResetPasswordCreatedEventType = {
    token: string
    user: User
    expiry: number
}

export class UserUpdatedEvent extends CompactClass<UserUpdatedEventType> { public static key = "USER_THUMBNAIL.UPDATED" }
export class UserResetPasswordCreatedEvent extends CompactClass<UserResetPasswordCreatedEventType> { public static key = "USER_RESET_PASSWORD.UPDATED" }