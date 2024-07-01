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
exports.TaskListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const file_1 = require("../../file");
const task_event_1 = require("./task.event");
let TaskListener = class TaskListener {
    constructor(ee) {
        this.ee = ee;
    }
    handleUpdatedTaskEvent({ data }) {
        const { newResource, oldResource } = data;
        this.ee.emit(file_1.ResourceEditedEvent.key, new file_1.ResourceEditedEvent({ newResource, oldResource }));
    }
    handleDeletedFilesTaskEvent({ data }) {
        const { oldResourceImages, oldResourceFiles } = data;
        if (oldResourceImages || Array.isArray(oldResourceImages))
            this.ee.emit(file_1.ResourceDeletedEvent.key, new file_1.ResourceDeletedEvent({ oldResource: oldResourceImages }));
        if (oldResourceFiles || Array.isArray(oldResourceFiles))
            this.ee.emit(file_1.ResourceDeletedEvent.key, new file_1.ResourceDeletedEvent({ oldResource: oldResourceFiles }));
    }
};
exports.TaskListener = TaskListener;
__decorate([
    (0, event_emitter_1.OnEvent)(task_event_1.UpdatedTaskEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_event_1.UpdatedTaskEvent]),
    __metadata("design:returntype", void 0)
], TaskListener.prototype, "handleUpdatedTaskEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(task_event_1.DeletedFilesTaskEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_event_1.DeletedFilesTaskEvent]),
    __metadata("design:returntype", void 0)
], TaskListener.prototype, "handleDeletedFilesTaskEvent", null);
exports.TaskListener = TaskListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], TaskListener);
//# sourceMappingURL=task.listener.js.map