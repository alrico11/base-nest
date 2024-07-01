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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../constants");
const auth_1 = require("../../auth");
const device_1 = require("../../device");
const tag_dto_1 = require("./tag.dto");
const tag_service_1 = require("./tag.service");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    create(param, body, lang, user) {
        return this.tagService.create({ body, lang, user, param });
    }
    findAll(param, query, lang, user) {
        return this.tagService.findAll({ lang, query, user, param });
    }
    update(param, body, lang, user) {
        return this.tagService.update({ body, lang, param, user });
    }
    remove(param, lang, user) {
        return this.tagService.remove({ lang, param, user });
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: 'CreateTag' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.CreateTagParamDto, tag_dto_1.CreateTagBodyDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'FindAllTags' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.FindAllTagParamDto, tag_dto_1.FindAllTagQueryDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'UpdateTag' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.UpdateTagParamDto, tag_dto_1.UpdateTagBodyDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'DeleteTag' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.DeleteTagParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "remove", null);
exports.TagController = TagController = __decorate([
    (0, common_1.Controller)('organization/:organizationId/tag'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, swagger_1.ApiTags)("User Tag Organization"),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard, device_1.UserDeviceGuard),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map