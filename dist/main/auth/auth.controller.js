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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const device_1 = require("../device");
const device_guard_1 = require("../device/device.guard");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./jwt.guard");
const user_decorator_1 = require("./user.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(lang, body, device) {
        return this.authService.login({ body, device, lang });
    }
    logout(lang, device, user) {
        return this.authService.logout({ device, user, lang });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ operationId: 'UserLogin' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginBodyDto }),
    __param(0, (0, constants_1.Lang)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, device_1.DeviceInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, auth_dto_1.LoginBodyDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.UserJwtGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ operationId: 'UserLogout' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, constants_1.Lang)()),
    __param(1, (0, device_1.DeviceInstance)()),
    __param(2, (0, user_decorator_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Main Auth'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, common_1.UseGuards)(device_guard_1.UserDeviceGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map