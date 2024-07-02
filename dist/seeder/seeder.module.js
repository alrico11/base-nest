"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const seeder_service_1 = require("./seeder.service");
const xconfig_1 = require("../xconfig");
const prisma_1 = require("../prisma");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, decorators_1.Module)({
        imports: [xconfig_1.XConfigModule, prisma_1.PrismaModule],
        providers: [seeder_service_1.SeederService]
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map