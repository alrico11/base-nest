"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const firebase_module_1 = require("../firebase/firebase.module");
const notification_controller_1 = require("./notification.controller");
const notification_listener_1 = require("./notification.listener");
const notification_service_1 = require("./notification.service");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, decorators_1.Module)({
        imports: [firebase_module_1.FirebaseModule],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, notification_listener_1.NotificationListener],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map