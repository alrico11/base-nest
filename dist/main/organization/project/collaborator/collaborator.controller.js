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
const constants_1 = require("../../../../constants");
const auth_1 = require("../../../auth");
const collaborator__dto_1 = require("./collaborator..dto");
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
    removeMember(body, param, lang, user) {
        return this.collaboratorService.removeCollaborator({ body, lang, param, user });
    }
};
exports.CollaboratorController = CollaboratorController;
__decorate([
    (0, common_1.Post)('add-collaborator'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator__dto_1.CreateProjectCollaboratorBodyDto, collaborator__dto_1.CreateProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "addCollaborator", null);
__decorate([
    (0, common_1.Post)('add-admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator__dto_1.AddAdminProjectCollaboratorBodyDto, collaborator__dto_1.AddAdminProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Delete)('remove-admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator__dto_1.RemoveAdminProjectCollaboratorBodyDto, collaborator__dto_1.RemoveAdminProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "removeAdmin", null);
__decorate([
    (0, common_1.Delete)('remove-collaborator'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, constants_1.Lang)()),
    __param(3, (0, auth_1.UserInstance)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaborator__dto_1.RemoveProjectCollaboratorBodyDto, collaborator__dto_1.RemoveProjectCollaboratorParamDto, Number, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "removeMember", null);
exports.CollaboratorController = CollaboratorController = __decorate([
    (0, common_1.Controller)(':organizationId/collaborator'),
    __metadata("design:paramtypes", [collaborator_service_1.CollaboratorService])
], CollaboratorController);
//# sourceMappingURL=collaborator.controller.js.map