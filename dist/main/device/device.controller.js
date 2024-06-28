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
exports.DeviceController = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const enums_1 = require("@nestjs/common/enums");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const device_dto_1 = require("./device.dto");
const device_guard_1 = require("./device.guard");
const device_service_1 = require("./device.service");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    registerDevice(lang, body) {
        return this.deviceService.registerDevice({ body, lang });
    }
    checkDevice(lang, body) {
        return this.deviceService.checkDevice({ body, lang });
    }
    registerFcmToken(lang, body) {
        return this.deviceService.registerFcm({ body, lang });
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, decorators_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ operationId: 'DeviceRegisterDevice' }),
    (0, decorators_1.HttpCode)(enums_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: device_dto_1.RegisterDeviceBodyDto
    }),
    __param(0, (0, constants_1.Lang)()),
    __param(1, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, device_dto_1.RegisterDeviceBodyDto]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "registerDevice", null);
__decorate([
    (0, decorators_1.Post)('check'),
    (0, swagger_1.ApiOperation)({ operationId: 'UserCheckDevice' }),
    (0, decorators_1.HttpCode)(enums_1.HttpStatus.OK),
    __param(0, (0, constants_1.Lang)()),
    __param(1, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, device_dto_1.CheckDeviceBodyDto]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "checkDevice", null);
__decorate([
    (0, decorators_1.Post)('fcm/register'),
    (0, swagger_1.ApiOperation)({ operationId: 'UserRegisterFCMToken' }),
    (0, decorators_1.HttpCode)(enums_1.HttpStatus.CREATED),
    (0, decorators_1.UseGuards)(device_guard_1.UserDeviceGuard),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, constants_1.Lang)()),
    __param(1, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, device_dto_1.RegisterFCMTokenBodyDto]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "registerFcmToken", null);
exports.DeviceController = DeviceController = __decorate([
    (0, swagger_1.ApiTags)('Device Devices'),
    (0, decorators_1.Controller)('/device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map