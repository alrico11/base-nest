import { Resource } from "@prisma/client"
import { CompactClass } from "src/@classes"

type UpdatedProjectEventType = {
    oldResource: Resource | Resource[]
    newResource: Resource | Resource[]
}

type DeletedProjectFilesEventType = {
    oldResource: Resource | Resource[]
}

export class UpdatedProjectEvent extends CompactClass<UpdatedProjectEventType> { public static key = "PROJECT.UPDATED" }
export class DeletedProjectFilesEvent extends CompactClass<DeletedProjectFilesEventType> { public static key = "PROJECT.UPDATED" }