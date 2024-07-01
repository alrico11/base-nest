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
exports.NotificationController = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./notification.service");
const constants_1 = require("../constants");
const auth_1 = require("../main/auth");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
};
exports.NotificationController = NotificationController;
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Main Notification'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Controller)('main/notification'),
    (0, decorators_1.UseGuards)(auth_1.UserJwtGuard),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map