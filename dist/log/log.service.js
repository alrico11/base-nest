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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../prisma");
let LogService = class LogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    setContext(context) { this.context = context; }
    async saveLog(data, { level = 1, ...optionalParams } = { level: 1 }) {
        try {
            await this.prisma.log.create({
                data: {
                    context: this.context,
                    level: level,
                    data: data instanceof Error ? { message: data?.message, stack: data?.stack, name: data?.name } : data
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    info(data, { level = 1, ...optionalParams } = { level: 1 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    log(data, { level = 2, ...optionalParams } = { level: 2 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    error(data, { level = 8, ...optionalParams } = { level: 8 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    warn(data, { level = 7, ...optionalParams } = { level: 7 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    debug(data, { level = 3, ...optionalParams } = { level: 3 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    verbose(data, { level = 4, ...optionalParams } = { level: 4 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
    event(data, { level = 4, ...optionalParams } = { level: 5 }) {
        this.saveLog(data, { level, ...optionalParams });
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], LogService);
//# sourceMappingURL=log.service.js.map