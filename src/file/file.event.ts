import { Admin, Resource } from "@prisma/client";
import { CompactClass } from "../@classes";

type ResourceCreatedEventType = {
  resource : Resource[]
  admin?: Admin
}
type ResourceEditedEventType = {
  newResource : Resource | Resource[],
  oldResource: Resource | Resource[]
}

type ResourceDeletedEventType = {
  oldResource: Resource | Resource[],
}

export class ResourceCreatedEvent extends CompactClass<ResourceCreatedEventType>{ public static key = 'RESOURCE.CREATED' }
export class ResourceDeletedEvent extends CompactClass<ResourceDeletedEventType>{ public static key = 'RESOURCE.DELETED' }
export class ResourceEditedEvent extends CompactClass<ResourceEditedEventType>{ public static key = 'RESOURCE.EDITED' }
