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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const log_1 = require("../../log");
const prisma_1 = require("../../prisma");
let ReminderService = class ReminderService {
    constructor(prisma, l) {
        this.prisma = prisma;
        this.l = l;
    }
    async create({ reminder }) {
        await this.prisma.reminder.create({
            data: { ...reminder }
        });
        return true;
    }
    async update({ reminder, reminderId }) {
        await this.prisma.reminder.update({
            where: { id: reminderId },
            data: { ...reminder }
        });
        true;
    }
    async removeReminderTask({ reminderId, taskId }) {
        await this.prisma.reminder.update({
            where: { id: reminderId },
            data: { deletedAt: (0, dayjs_1.default)().toISOString() }
        });
        await this.prisma.reminderTask.delete({
            where: { reminderId_taskId: { reminderId, taskId } }
        });
        return true;
    }
    async removeReminderNote({ reminderId, noteId }) {
        await this.prisma.reminder.update({
            where: { id: reminderId },
            data: { deletedAt: (0, dayjs_1.default)().toISOString() }
        });
        await this.prisma.reminderNote.delete({
            where: { reminderId_noteId: { reminderId, noteId } }
        });
        return true;
    }
};
exports.ReminderService = ReminderService;
exports.ReminderService = ReminderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_1.LogService])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map