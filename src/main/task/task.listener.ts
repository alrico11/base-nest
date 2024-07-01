import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ResourceDeletedEvent, ResourceEditedEvent } from "src/file";
import { DeletedFilesTaskEvent, UpdatedTaskEvent } from "./task.event";

@Injectable()

export class TaskListener {
    constructor(
        private readonly ee: EventEmitter2
    ) { }
    @OnEvent(UpdatedTaskEvent.key)
    handleUpdatedTaskEvent({ data }: UpdatedTaskEvent) {
        const { newResource, oldResource } = data
        this.ee.emit(ResourceEditedEvent.key, new ResourceEditedEvent({ newResource, oldResource }))
    }
    @OnEvent(DeletedFilesTaskEvent.key)
    handleDeletedFilesTaskEvent({ data }: DeletedFilesTaskEvent) {
        const { oldResourceImages, oldResourceFiles } = data
        if (oldResourceImages || Array.isArray(oldResourceImages)) this.ee.emit(ResourceDeletedEvent.key, new ResourceDeletedEvent({ oldResource: oldResourceImages }))
        if (oldResourceFiles || Array.isArray(oldResourceFiles)) this.ee.emit(ResourceDeletedEvent.key, new ResourceDeletedEvent({ oldResource: oldResourceFiles }))
    }

}