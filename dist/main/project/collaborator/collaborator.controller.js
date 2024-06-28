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
const collaborator_service_1 = require("./collaborator.service");
const create_collaborator_dto_1 = require("./dto/create-collaborator.dto");
const update_collaborator_dto_1 = require("./dto/update-collaborator.dto");
let CollaboratorController = class CollaboratorController {
    constructor(collaboratorService) {
        this.collaboratorService = collaboratorService;
    }
    create(createCollaboratorDto) {
        return this.collaboratorService.create(createCollaboratorDto);
    }
    findAll() {
        return this.collaboratorService.findAll();
    }
    findOne(id) {
        return this.collaboratorService.findOne(+id);
    }
    update(id, updateCollaboratorDto) {
        return this.collaboratorService.update(+id, updateCollaboratorDto);
    }
    remove(id) {
        return this.collaboratorService.remove(+id);
    }
};
exports.CollaboratorController = CollaboratorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collaborator_dto_1.CreateCollaboratorDto]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_collaborator_dto_1.UpdateCollaboratorDto]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollaboratorController.prototype, "remove", null);
exports.CollaboratorController = CollaboratorController = __decorate([
    (0, common_1.Controller)('collaborator'),
    __metadata("design:paramtypes", [collaborator_service_1.CollaboratorService])
], CollaboratorController);
//# sourceMappingURL=collaborator.controller.js.map