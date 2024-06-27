import { Injectable } from "@nestjs/common";
import { ResourceCreatedEvent, ResourceDeletedEvent, ResourceEditedEvent } from "./resource.event";
import { ResourceService } from "./resource.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ResourceListener {
  constructor(
    private readonly resourceService: ResourceService,
    // private readonly l: LogService
  ) {
    // this.l.setContext(ResourceListener.name) 
  }

  @OnEvent(ResourceCreatedEvent.key)
  handlePropertyCreatedEvent(payload: ResourceCreatedEvent) {
    try {
    } catch (error) {
      console.error(error)
    }
  }

  @OnEvent(ResourceEditedEvent.key)
  async handlePropertyEditedEvent({ data: { newResource, oldResource } }: ResourceEditedEvent) {
    const oldResources = Array.isArray(oldResource) ? oldResource : [oldResource];
    const newResources = Array.isArray(newResource) ? newResource : [newResource];
    const newResourceKeys = new Set(newResources.map(({ objectKey }) => objectKey));
    const resourcesToRemove = oldResources.filter(({ objectKey }) => !newResourceKeys.has(objectKey));
    if (resourcesToRemove.length > 0) {
      await this.resourceService.removeObjectFromStorage(resourcesToRemove);
      await this.resourceService.deleteResource(resourcesToRemove);
    }
    this.resourceService.updateObjectUrl(newResource)
  }
  @OnEvent(ResourceDeletedEvent.key)
  async handleResourceDelete({ data: { oldResource } }: ResourceDeletedEvent) {
    const oldResources = Array.isArray(oldResource) ? oldResource : [oldResource];
    await this.resourceService.removeObjectFromStorage(oldResources);
    await this.resourceService.deleteResource(oldResources);
  }
}
