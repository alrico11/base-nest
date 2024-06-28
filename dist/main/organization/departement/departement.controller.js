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
exports.DepartementController = void 0;
const common_1 = require("@nestjs/common");
const departement_service_1 = require("./departement.service");
const create_departement_dto_1 = require("./dto/create-departement.dto");
const update_departement_dto_1 = require("./dto/update-departement.dto");
let DepartementController = class DepartementController {
    constructor(departementService) {
        this.departementService = departementService;
    }
    create(createDepartementDto) {
        return this.departementService.create(createDepartementDto);
    }
    findAll() {
        return this.departementService.findAll();
    }
    findOne(id) {
        return this.departementService.findOne(+id);
    }
    update(id, updateDepartementDto) {
        return this.departementService.update(+id, updateDepartementDto);
    }
    remove(id) {
        return this.departementService.remove(+id);
    }
};
exports.DepartementController = DepartementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_departement_dto_1.CreateDepartementDto]),
    __metadata("design:returntype", void 0)
], DepartementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_departement_dto_1.UpdateDepartementDto]),
    __metadata("design:returntype", void 0)
], DepartementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartementController.prototype, "remove", null);
exports.DepartementController = DepartementController = __decorate([
    (0, common_1.Controller)('departement'),
    __metadata("design:paramtypes", [departement_service_1.DepartementService])
], DepartementController);
//# sourceMappingURL=departement.controller.js.map