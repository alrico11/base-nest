import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { OrganizationUpdatedEvent } from "./organization.event";
import { ResourceEditedEvent } from "src/file";

@Injectable()

export class OrganizationListener {
    constructor(
        private readonly ee: EventEmitter2
    ) { }
    @OnEvent(OrganizationUpdatedEvent.key)
    handleUpdateOrganizationEvent({ data: { newResource, oldResource } }: OrganizationUpdatedEvent) {
        this.ee.emit(ResourceEditedEvent.key, new ResourceEditedEvent({ newResource, oldResource }))
    }
}