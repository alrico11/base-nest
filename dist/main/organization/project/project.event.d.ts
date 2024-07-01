import { Resource } from "@prisma/client";
import { CompactClass } from "src/@classes";
type UpdatedProjectEventType = {
    oldResource: Resource | Resource[];
    newResource: Resource | Resource[];
};
type DeletedProjectFilesEventType = {
    oldResource: Resource | Resource[];
};
export declare class UpdatedProjectEvent extends CompactClass<UpdatedProjectEventType> {
    static key: string;
}
export declare class DeletedProjectFilesEvent extends CompactClass<DeletedProjectFilesEventType> {
    static key: string;
}
export {};
