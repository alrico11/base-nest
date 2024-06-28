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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const auth_1 = require("../auth");
const device_1 = require("../device");
const organization_dto_1 = require("./organization.dto");
const organization_service_1 = require("./organization.service");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    create(body, lang, user) {
        return this.organizationService.create({ body, lang, user });
    }
    findAll(query, lang) {
        return this.organizationService.findAll({ lang, query });
    }
    findOne(param, lang, user) {
        return this.organizationService.findOne({ param, lang, user });
    }
    update(param, body, user, lang) {
        return this.organizationService.update({ body, lang, param, user });
    }
    remove(param, lang, user) {
        return this.organizationService.remove({ lang, param, user });
    }
    findAllMember(query, param, lang) {
        this.organizationService.findAllMember({ lang, param, query });
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: "CreateOrganization" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.CreateOrganizationBodyDto, Number, Object]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "FindAllOrganization" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.FindAllOrganizationQueryDto, Number]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "FindOneOrganization" }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.FindOneOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "UpdateOrganization" }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.UserInstance)()),
    __param(3, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.UpdateOrganizationParamDto, organization_dto_1.UpdateOrganizationBodyDto, Object, Number]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "DeleteOrganization" }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.DeleteOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('member'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.FindAllMemberOrganizationQueryDto, organization_dto_1.FindAllMemberOrganizationParamDto, Number]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "findAllMember", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard, device_1.UserDeviceGuard),
    (0, swagger_1.ApiTags)("User Organization"),
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map