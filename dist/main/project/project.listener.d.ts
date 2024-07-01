import { EventEmitter2 } from "@nestjs/event-emitter";
import { DeletedProjectFilesEvent, UpdatedProjectEvent } from "./project.event";
export declare class ProjectListener {
    private readonly ee;
    constructor(ee: EventEmitter2);
    handleUpdatedProjectEvent({ data: { newResource, oldResource } }: UpdatedProjectEvent): void;
    handleDeletedProjectFilesEvent({ data: { oldResource } }: DeletedProjectFilesEvent): void;
}
