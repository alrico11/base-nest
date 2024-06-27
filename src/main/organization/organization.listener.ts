import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ResourceEditedEvent } from "src/resource";
import { OrganizationUpdatedEvent } from "./organization.event";

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