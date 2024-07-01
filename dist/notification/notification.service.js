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
exports.NotificationService = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const log_1 = require("../log");
const prisma_1 = require("../prisma");
let NotificationService = class NotificationService {
    constructor(prisma, l) {
        this.prisma = prisma;
        this.l = l;
    }
    async create({ data, fcm, user: { id }, scope }) {
        const notification = await this.prisma.notification.create({
            data: {
                data: data,
                scope,
                fcm: fcm,
                userId: id
            }
        });
        this.l.info({
            message: `notification create successfully with id ${notification.id} with user id ${id}`
        });
        return true;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_1.LogService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map