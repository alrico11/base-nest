import { Resource } from "@prisma/client";
import { CompactClass } from "src/@classes";
type OrganizationUpdatedEventType = {
    oldResource: Resource | Resource[];
    newResource: Resource | Resource[];
};
export declare class OrganizationUpdatedEvent extends CompactClass<OrganizationUpdatedEventType> {
    static key: string;
}
export {};
