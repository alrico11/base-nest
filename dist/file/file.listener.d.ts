import { ResourceCreatedEvent, ResourceDeletedEvent, ResourceEditedEvent } from "./file.event";
import { ResourceService } from "./file.resource.service";
export declare class ResourceListener {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    handlePropertyCreatedEvent(payload: ResourceCreatedEvent): void;
    handlePropertyEditedEvent({ data: { newResource, oldResource } }: ResourceEditedEvent): Promise<void>;
    handleResourceDelete({ data: { oldResource } }: ResourceDeletedEvent): Promise<void>;
}
