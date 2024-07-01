import { EventEmitter2 } from "@nestjs/event-emitter";
import { DeletedFilesTaskEvent, UpdatedTaskEvent } from "./task.event";
export declare class TaskListener {
    private readonly ee;
    constructor(ee: EventEmitter2);
    handleUpdatedTaskEvent({ data }: UpdatedTaskEvent): void;
    handleDeletedFilesTaskEvent({ data }: DeletedFilesTaskEvent): void;
}
