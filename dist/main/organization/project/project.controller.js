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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../constants");
const auth_1 = require("../../auth");
const device_1 = require("../../device");
const project_dto_1 = require("./project.dto");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(body, param, user, lang) {
        return this.projectService.create({ body, lang, param, user });
    }
    findAll(query, param, user, lang) {
        return this.projectService.findAll({ lang, param, query, user });
    }
    findOne(param, user, lang) {
        return this.projectService.findOne({ lang, param, user });
    }
    update(body, param, user, lang) {
        return this.projectService.update({ body, lang, param, user });
    }
    remove(param, user, lang) {
        return this.projectService.remove({ lang, param, user });
    }
    findAllCollaborator(query, lang, param) {
        return this.projectService.findAllCollaborator({ lang, param, query });
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ operationId: "CreateProjectOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, auth_1.UserInstance)()),
    __param(3, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectBodyDto, project_dto_1.CreateProjectParamDto, Object, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "FindAllProjectOrganization" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, auth_1.UserInstance)()),
    __param(3, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.FindAllProjectQueryDto, project_dto_1.FindAllProjectParamDto, Object, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "FindOneProjectOrganization" }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, auth_1.UserInstance)()),
    __param(2, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.FindOneProjectParamDto, Object, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "UpdateProjectOrganization" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, auth_1.UserInstance)()),
    __param(3, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectBodyDto, project_dto_1.UpdateProjectParamDto, Object, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: "DeleteProjectOrganization" }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, auth_1.UserInstance)()),
    __param(2, (0, constants_1.Lang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.DeleteProjectParamDto, Object, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/collaborator'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ operationId: 'FindAllCollaboratorFromProject' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.FindAllProjectCollaboratorQueryDto, Number, project_dto_1.FindAllProjectCollaboratorParamDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAllCollaborator", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('organization/:organizationId/project'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, swagger_1.ApiTags)('User Organization Project'),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard, device_1.UserDeviceGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map