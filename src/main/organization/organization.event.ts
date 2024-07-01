import { Resource } from "@prisma/client"
import { CompactClass } from "src/@classes"

type OrganizationUpdatedEventType = {
    oldResource: Resource | Resource[]
    newResource: Resource | Resource[]
}

export class OrganizationUpdatedEvent extends CompactClass<OrganizationUpdatedEventType> { public static key = "ORGANIZATION.UPDATED" }