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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const member_dto_1 = require("./member.dto");
const constants_1 = require("../../../constants");
const auth_1 = require("../../auth");
const swagger_1 = require("@nestjs/swagger");
const device_1 = require("../../device");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    addMember(body, param, lang, user) {
        return this.memberService.addMember({ body, param, lang, user });
    }
    removeMember(body, param, lang, user) {
        return this.memberService.removeMember({ body, param, lang, user });
    }
    addAdmin(body, param, lang, user) {
        return this.memberService.addAdmin({ body, param, lang, user });
    }
    removeAdmin(body, param, lang, user) {
        return this.memberService.removeAdmin({ body, param, lang, user });
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Post)('add-member'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: "CreateMemberOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.CreateMemberOrganizationBodyDto, member_dto_1.CreateMemberOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)('remove-member'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "DeleteMemberOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.RemoveMemberOrganizationBodyDto, member_dto_1.RemoveMemberOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Post)('add-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: "CreateAdminOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.AddAdminOrganizationBodyDto, member_dto_1.AddAdminOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Delete)('remove-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "DeleteAdminOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.RemoveAdminOrganizationBodyDto, member_dto_1.RemoveAdminOrganizationParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "removeAdmin", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('organization/:id/member'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard, device_1.UserDeviceGuard),
    (0, swagger_1.ApiTags)("User Organization Member"),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controller.js.map