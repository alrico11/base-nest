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
exports.ProjectListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const project_event_1 = require("./project.event");
const file_1 = require("../../../file");
let ProjectListener = class ProjectListener {
    constructor(ee) {
        this.ee = ee;
    }
    handleUpdatedProjectEvent({ data: { newResource, oldResource } }) {
        this.ee.emit(file_1.ResourceEditedEvent.key, new file_1.ResourceEditedEvent({ newResource, oldResource }));
    }
    handleDeletedProjectFilesEvent({ data: { oldResource } }) {
        this.ee.emit(file_1.ResourceDeletedEvent.key, new file_1.ResourceDeletedEvent({ oldResource }));
    }
};
exports.ProjectListener = ProjectListener;
__decorate([
    (0, event_emitter_1.OnEvent)(project_event_1.UpdatedProjectEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_event_1.UpdatedProjectEvent]),
    __metadata("design:returntype", void 0)
], ProjectListener.prototype, "handleUpdatedProjectEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(project_event_1.DeletedProjectFilesEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_event_1.DeletedProjectFilesEvent]),
    __metadata("design:returntype", void 0)
], ProjectListener.prototype, "handleDeletedProjectFilesEvent", null);
exports.ProjectListener = ProjectListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], ProjectListener);
//# sourceMappingURL=project.listener.js.map