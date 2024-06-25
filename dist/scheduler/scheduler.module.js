"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const bull_1 = require("@nestjs/bull");
const scheduler_constans_1 = require("./scheduler.constans");
const scheduler_listener_1 = require("./scheduler.listener");
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = __decorate([
    (0, decorators_1.Module)({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6380
                },
            }),
            bull_1.BullModule.registerQueue({ name: scheduler_constans_1.SCHEDULER_QUEUE_KEY })
        ],
        providers: [scheduler_listener_1.SchedulerListener],
        exports: [SchedulerModule]
    })
], SchedulerModule);
//# sourceMappingURL=scheduler.module.js.map