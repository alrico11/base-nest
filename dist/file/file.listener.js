"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceListener = void 0;
const common_1 = require("@nestjs/common");
const file_event_1 = require("./file.event");
const file_resource_service_1 = require("./file.resource.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let ResourceListener = class ResourceListener {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    handlePropertyCreatedEvent(payload) {
        try {
        }
        catch (error) {
            console.error(error);
        }
    }
    async handlePropertyEditedEvent({ data: { newResource, oldResource } }) {
        const oldResources = Array.isArray(oldResource) ? oldResource : [oldResource];
        const newResources = Array.isArray(newResource) ? newResource : [newResource];
        const newResourceKeys = new Set(newResources.map(({ objectKey }) => objectKey));
        const resourcesToRemove = oldResources.filter(({ objectKey }) => !newResourceKeys.has(objectKey));
        if (resourcesToRemove.length > 0) {
            await this.resourceService.removeObjectFromStorage(resourcesToRemove);
            await this.resourceService.deleteResource(resourcesToRemove);
        }
        this.resourceService.updateObjectUrl(newResource);
    }
    async handleResourceDelete({ data: { oldResource } }) {
        const oldResources = Array.isArray(oldResource) ? oldResource : [oldResource];
        await this.resourceService.removeObjectFromStorage(oldResources);
        await this.resourceService.deleteResource(oldResources);
    }
};
exports.ResourceListener = ResourceListener;
__decorate([
    (0, event_emitter_1.OnEvent)(file_event_1.ResourceCreatedEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_event_1.ResourceCreatedEvent]),
    __metadata("design:returntype", void 0)
], ResourceListener.prototype, "handlePropertyCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(file_event_1.ResourceEditedEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_event_1.ResourceEditedEvent]),
    __metadata("design:returntype", Promise)
], ResourceListener.prototype, "handlePropertyEditedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(file_event_1.ResourceDeletedEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_event_1.ResourceDeletedEvent]),
    __metadata("design:returntype", Promise)
], ResourceListener.prototype, "handleResourceDelete", null);
exports.ResourceListener = ResourceListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_resource_service_1.ResourceService])
], ResourceListener);
//# sourceMappingURL=file.listener.js.map