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
exports.CollaboratorController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const auth_1 = require("../../auth");
const swagger_1 = require("@nestjs/swagger");
const device_1 = require("../../device");
const collaborator_dto_1 = require("./collaborator.dto");
const collaborator_service_1 = require("./collaborator.service");
let CollaboratorController = class CollaboratorController {
    constructor(collaboratorService) {
        this.collaboratorService = collaboratorService;
    }
    addCollaborator(body, param, lang, user) {
        return this.collaboratorService.addCollaborator({ body, lang, param, user });
    }
    addAdmin(body, param, lang, user) {
        return this.collaboratorService.addAdmin({ body, lang, param, user });
    }
    removeAdmin(body, param, lang, user) {
        return this.collaboratorService.removeAdmin({ body, lang, param, user });
    }
    removeCollaborator(body, param, lang, user) {
        return this.collaboratorService.removeCollaborator({ body, lang, param, user });
    }
};
exports.CollaboratorController = CollaboratorController;
__decorate([
    (0, common_1.Post)('add-collaborator'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: 'AddCollaborator' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator_dto_1.CreateProjectCollaboratorBodyDto, collaborator_dto_1.CreateProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "addCollaborator", null);
__decorate([
    (0, common_1.Post)('add-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: 'AddAdmin' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator_dto_1.AddAdminProjectCollaboratorBodyDto, collaborator_dto_1.AddAdminProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Delete)('remove-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'RemoveAdmin' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator_dto_1.RemoveAdminProjectCollaboratorBodyDto, collaborator_dto_1.RemoveAdminProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "removeAdmin", null);
__decorate([
    (0, common_1.Delete)('remove-collaborator'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'RemoveCollaborator' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator_dto_1.RemoveProjectCollaboratorBodyDto, collaborator_dto_1.RemoveProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "removeCollaborator", null);
exports.CollaboratorController = CollaboratorController = __decorate([
    (0, common_1.Controller)('collaborator'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, swagger_1.ApiTags)('User Collaborator'),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard, device_1.UserDeviceGuard),
    __metadata("design:paramtypes", [collaborator_service_1.CollaboratorService])
], CollaboratorController);
//# sourceMappingURL=collaborator.controller.js.map