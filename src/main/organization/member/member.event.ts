import { Organization, User } from "@prisma/client"
import { CompactClass } from "src/@classes"

type CreateNotificationAddMemberEventTypeSchema = {
    user: User
    organization: Organization
}

export class CreateNotificationAddMemberEvent extends CompactClass<CreateNotificationAddMemberEventTypeSchema> { public static key = "CREATE_NOTIFICATION_ADD_MEMBER.CREATED" }