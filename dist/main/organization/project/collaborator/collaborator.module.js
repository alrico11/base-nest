"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorModule = void 0;
const common_1 = require("@nestjs/common");
const collaborator_service_1 = require("./collaborator.service");
const collaborator_controller_1 = require("./collaborator.controller");
const project_module_1 = require("../project.module");
let CollaboratorModule = class CollaboratorModule {
};
exports.CollaboratorModule = CollaboratorModule;
exports.CollaboratorModule = CollaboratorModule = __decorate([
    (0, common_1.Module)({
        imports: [project_module_1.ProjectModule],
        controllers: [collaborator_controller_1.CollaboratorController],
        providers: [collaborator_service_1.CollaboratorService],
    })
], CollaboratorModule);
//# sourceMappingURL=collaborator.module.js.map