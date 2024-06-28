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
exports.UserDeviceGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../../prisma/prisma.service");
const xconfig_1 = require("../../xconfig");
let UserDeviceGuard = class UserDeviceGuard {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const deviceId = request.headers['x-client-id'];
        const deviceToken = request.headers['x-client-token'];
        if (!deviceId)
            throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        if (!deviceToken)
            throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        const decoded = (0, jsonwebtoken_1.verify)(deviceToken, this.config.env.USER_JWT_SECRET);
        if (deviceId && decoded.id !== deviceId)
            throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        const device = await this.prisma.device.findFirst({
            where: { id: deviceId, deletedAt: null },
            include: { AuthTokens: true }
        });
        if (!device)
            throw new common_1.HttpException("unregistered device", common_1.HttpStatus.UNAUTHORIZED);
        request.device = device;
        return device != null;
    }
};
exports.UserDeviceGuard = UserDeviceGuard;
exports.UserDeviceGuard = UserDeviceGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        xconfig_1.XConfig])
], UserDeviceGuard);
//# sourceMappingURL=device.guard.js.map