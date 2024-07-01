import { Resource } from "@prisma/client"
import { CompactClass } from "src/@classes"

type UpdatedTaskEventType = {
    newResource: Resource | Resource[]
    oldResource: Resource | Resource[]
}

type DeletedFilesTaskEventType = {
    oldResourceImages: Resource | Resource[] | undefined
    oldResourceFiles: Resource | Resource[] | undefined
}

export class UpdatedTaskEvent extends CompactClass<UpdatedTaskEventType> { public static key = "TASK.UPDATED" }
export class DeletedFilesTaskEvent extends CompactClass<DeletedFilesTaskEventType> { public static key = "TASK.DELETED" }