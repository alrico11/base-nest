import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrganizationUpdatedEvent } from "./organization.event";
export declare class OrganizationListener {
    private readonly ee;
    constructor(ee: EventEmitter2);
    handleUpdateOrganizationEvent({ data: { newResource, oldResource } }: OrganizationUpdatedEvent): void;
}
