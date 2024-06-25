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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerListener = void 0;
const bull_1 = require("@nestjs/bull");
const decorators_1 = require("@nestjs/common/decorators");
const scheduler_constans_1 = require("./scheduler.constans");
let SchedulerListener = class SchedulerListener {
    constructor(queue) {
        this.queue = queue;
    }
};
exports.SchedulerListener = SchedulerListener;
exports.SchedulerListener = SchedulerListener = __decorate([
    (0, decorators_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(scheduler_constans_1.SCHEDULER_QUEUE_KEY)),
    __metadata("design:paramtypes", [Object])
], SchedulerListener);
//# sourceMappingURL=scheduler.listener.js.map