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
const constants_1 = require("../../constants");
const auth_1 = require("../auth");
const project_dto_1 = require("./project.dto");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(body, lang, user) {
        return this.projectService.create({ body, lang, user });
    }
    findAll(query, lang, user) {
        return this.projectService.findAll({ lang, query, user });
    }
    findOne(param, lang, user) {
        return this.projectService.findOne({ lang, param, user });
    }
    update(param, body, lang, user) {
        return this.projectService.update({ body, lang, param, user });
    }
    remove(param, lang, user) {
        return this.projectService.remove({ lang, param, user });
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectBodyDto, Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.FindAllProjectQueryDto, Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.FindOneProjectParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.UpdateProjectParamDto, project_dto_1.UpdateProjectBodyDto, Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, constants_1.Lang)()),
    __param(2, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.DeleteProjectParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map