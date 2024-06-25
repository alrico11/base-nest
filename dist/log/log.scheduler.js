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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var LogScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_1 = require("../prisma");
const log_service_1 = require("./log.service");
const dayjs_1 = __importDefault(require("dayjs"));
let LogScheduler = LogScheduler_1 = class LogScheduler {
    constructor(prisma, log) {
        this.prisma = prisma;
        this.log = log;
        this.log.setContext(LogScheduler_1.name);
    }
    scheduledDeletion() {
        this.log.log({ message: 'running log daily scheduled deletion' });
        this.prisma.log.deleteMany({ where: { timestamp: { lte: (0, dayjs_1.default)().subtract(3, 'months').toDate() } } });
    }
};
exports.LogScheduler = LogScheduler;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogScheduler.prototype, "scheduledDeletion", null);
exports.LogScheduler = LogScheduler = LogScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_service_1.LogService])
], LogScheduler);
//# sourceMappingURL=log.scheduler.js.map