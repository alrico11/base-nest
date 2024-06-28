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
exports.SopController = void 0;
const common_1 = require("@nestjs/common");
const sop_service_1 = require("./sop.service");
const create_sop_dto_1 = require("./dto/create-sop.dto");
const update_sop_dto_1 = require("./dto/update-sop.dto");
let SopController = class SopController {
    constructor(sopService) {
        this.sopService = sopService;
    }
    create(createSopDto) {
        return this.sopService.create(createSopDto);
    }
    findAll() {
        return this.sopService.findAll();
    }
    findOne(id) {
        return this.sopService.findOne(+id);
    }
    update(id, updateSopDto) {
        return this.sopService.update(+id, updateSopDto);
    }
    remove(id) {
        return this.sopService.remove(+id);
    }
};
exports.SopController = SopController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sop_dto_1.CreateSopDto]),
    __metadata("design:returntype", void 0)
], SopController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SopController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sop_dto_1.UpdateSopDto]),
    __metadata("design:returntype", void 0)
], SopController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SopController.prototype, "remove", null);
exports.SopController = SopController = __decorate([
    (0, common_1.Controller)('sop'),
    __metadata("design:paramtypes", [sop_service_1.SopService])
], SopController);
//# sourceMappingURL=sop.controller.js.map