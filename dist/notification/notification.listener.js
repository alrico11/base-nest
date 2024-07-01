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
exports.NotificationListener = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const event_emitter_1 = require("@nestjs/event-emitter");
const firebase_service_1 = require("../firebase/firebase.service");
const prisma_1 = require("../prisma");
const notification_event_1 = require("./notification.event");
const notification_service_1 = require("./notification.service");
let NotificationListener = class NotificationListener {
    constructor(notificationService, firebaseService, prisma) {
        this.notificationService = notificationService;
        this.firebaseService = firebaseService;
        this.prisma = prisma;
    }
    async handleNotificationEvent(notification) {
        const { fcm, user, data, scope } = notification.data;
        const { body, title } = fcm;
        let tokens = [];
        const token = await this.prisma.userDevice.findFirst({
            where: { userId: user.id },
            include: { Device: true }
        });
        if (!token)
            throw new exceptions_1.HttpException('FCM TOKEN NOT FOUND', enums_1.HttpStatus.BAD_REQUEST);
        if (!token.Device.fcmToken)
            throw new exceptions_1.HttpException('FCM TOKEN NOT FOUND', enums_1.HttpStatus.BAD_REQUEST);
        tokens.push(token.Device.fcmToken);
        const message = {
            tokens,
            android: { collapseKey: data.collapseKey, ttl: 1800 },
            notification: { title, body },
            data
        };
        await this.notificationService.create({ data, fcm, user, scope });
        await this.firebaseService.sendNotification(message);
    }
};
exports.NotificationListener = NotificationListener;
__decorate([
    (0, event_emitter_1.OnEvent)(notification_event_1.NotificationCreateEvent.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_event_1.NotificationCreateEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "handleNotificationEvent", null);
exports.NotificationListener = NotificationListener = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        firebase_service_1.FirebaseService,
        prisma_1.PrismaService])
], NotificationListener);
//# sourceMappingURL=notification.listener.js.map