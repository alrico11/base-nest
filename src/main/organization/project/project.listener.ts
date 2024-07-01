import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { DeletedProjectFilesEvent, UpdatedProjectEvent } from "./project.event";
import { ResourceDeletedEvent, ResourceEditedEvent } from "src/file";

@Injectable()
export class ProjectListener {
    constructor(
        private readonly ee: EventEmitter2
    ) { }
    @OnEvent(UpdatedProjectEvent.key)
    handleUpdatedProjectEvent({ data: { newResource, oldResource } }: UpdatedProjectEvent) {
        this.ee.emit(ResourceEditedEvent.key, new ResourceEditedEvent({ newResource, oldResource }))
    }
    @OnEvent(DeletedProjectFilesEvent.key)
    handleDeletedProjectFilesEvent({ data: { oldResource } }: DeletedProjectFilesEvent) {
        this.ee.emit(ResourceDeletedEvent.key, new ResourceDeletedEvent({ oldResource }))
    }
}