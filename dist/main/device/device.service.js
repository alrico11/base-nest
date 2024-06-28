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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DeviceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const log_1 = require("../../log");
const prisma_service_1 = require("../../prisma/prisma.service");
const xconfig_1 = require("../../xconfig");
const constants_1 = require("../../constants");
let DeviceService = DeviceService_1 = class DeviceService {
    constructor(prisma, config, l) {
        this.prisma = prisma;
        this.config = config;
        this.l = l;
        this.l.setContext(DeviceService_1.name);
    }
    async registerDevice({ body: { fingerprint }, lang }) {
        const device = await this.prisma.device.findFirst({
            where: { fingerprint: fingerprint, deletedAt: null }
        });
        if (device)
            return { message: (0, constants_1.LangResponse)({ key: 'conflict', lang }), statusCode: enums_1.HttpStatus.CONFLICT, data: { deviceId: device.id } };
        const result = await this.prisma.device.create({
            data: {
                fingerprint: fingerprint
            }
        });
        this.l.info({
            message: `fingerprint registered with deviceId ${result.id}`,
        });
        return {
            message: (0, constants_1.LangResponse)({ key: 'created', lang, object: 'device' }),
            data: { ...result, deviceToken: (0, jsonwebtoken_1.sign)({ id: result.id }, this.config.env.USER_JWT_SECRET, {}) }
        };
    }
    async checkDevice({ body: { fingerprint, id }, lang }) {
        const device = await this.prisma.device.findFirst({
            where: { id: id, fingerprint: fingerprint, deletedAt: null }
        });
        if (!device)
            throw new exceptions_1.HttpException({ message: (0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'device' }) }, enums_1.HttpStatus.NOT_FOUND);
        const token = (0, jsonwebtoken_1.sign)({ id: device.id }, this.config.env.USER_JWT_SECRET, {});
        return {
            message: (0, constants_1.LangResponse)({ key: 'conflict', lang }),
            data: { ...device, deviceToken: token }
        };
    }
    async registerFcm({ body: { deviceToken, fcmToken }, lang }) {
        const tokenData = (0, jsonwebtoken_1.verify)(deviceToken, this.config.env.USER_JWT_SECRET);
        if (tokenData?.id === undefined)
            throw new exceptions_1.HttpException((0, constants_1.LangResponse)({ key: 'forbidden', lang }), enums_1.HttpStatus.FORBIDDEN);
        const device = await this.prisma.device.findFirst({ where: { id: tokenData.id, deletedAt: null } });
        if (!device)
            throw new exceptions_1.HttpException({ message: (0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'device' }) }, enums_1.HttpStatus.NOT_FOUND);
        (0, jsonwebtoken_1.verify)(deviceToken, this.config.env.USER_JWT_SECRET);
        await this.prisma.device.update({
            where: { id: device.id },
            data: { fcmToken: fcmToken, fcmTokenLastUpdate: (0, dayjs_1.default)().toDate() }
        });
        this.l.info({
            message: `FCM registered with deviceId ${device.id}`,
        });
        return { message: (0, constants_1.LangResponse)({ key: 'created', lang, object: 'device' }) };
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = DeviceService_1 = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        xconfig_1.XConfig,
        log_1.LogService])
], DeviceService);
//# sourceMappingURL=device.service.js.map