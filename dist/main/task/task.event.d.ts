import { Resource } from "@prisma/client";
import { CompactClass } from "src/@classes";
type UpdatedTaskEventType = {
    newResource: Resource | Resource[];
    oldResource: Resource | Resource[];
};
type DeletedFilesTaskEventType = {
    oldResourceImages: Resource | Resource[] | undefined;
    oldResourceFiles: Resource | Resource[] | undefined;
};
export declare class UpdatedTaskEvent extends CompactClass<UpdatedTaskEventType> {
    static key: string;
}
export declare class DeletedFilesTaskEvent extends CompactClass<DeletedFilesTaskEventType> {
    static key: string;
}
export {};
