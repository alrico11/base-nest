import { Admin, Resource } from "@prisma/client";
import { CompactClass } from "../@classes";
type ResourceCreatedEventType = {
    resource: Resource[];
    admin?: Admin;
};
type ResourceEditedEventType = {
    newResource: Resource | Resource[];
    oldResource: Resource | Resource[];
};
type ResourceDeletedEventType = {
    oldResource: Resource | Resource[];
};
export declare class ResourceCreatedEvent extends CompactClass<ResourceCreatedEventType> {
    static key: string;
}
export declare class ResourceDeletedEvent extends CompactClass<ResourceDeletedEventType> {
    static key: string;
}
export declare class ResourceEditedEvent extends CompactClass<ResourceEditedEventType> {
    static key: string;
}
export {};
