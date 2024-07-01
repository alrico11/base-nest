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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("../../constants");
const file_1 = require("../../file");
const prisma_1 = require("../../prisma");
const string_1 = require("../../utils/string");
const xconfig_1 = require("../../xconfig");
const reminder_service_1 = require("../reminder/reminder.service");
const task_event_1 = require("./task.event");
let TaskService = class TaskService {
    constructor(prisma, fileService, config, reminderService, ee) {
        this.prisma = prisma;
        this.fileService = fileService;
        this.config = config;
        this.reminderService = reminderService;
        this.ee = ee;
    }
    async create({ body, lang, user }) {
        const { assigneeUserIds, files, reminder } = body;
        let Resource;
        const task = await this.prisma.task.create({
            data: {
                ...body,
                createdById: user.id,
            }
        });
        if (assigneeUserIds) {
            const data = assigneeUserIds.map((userId) => {
                return {
                    taskId: task.id,
                    userId
                };
            });
            await this.prisma.taskAssignee.createMany({ data });
        }
        if (files && files.length > 0) {
            Resource = await this.fileService.handleUploadObjectStorage({ fileName: files, prefix: this.config.env.OBJECT_STORAGE_PREFIX_TASK, user });
            if (Array.isArray(Resource) && Resource.length > 0) {
                const { images, files } = Resource.reduce((acc, resource) => {
                    if (resource.fileName.includes(".webp"))
                        acc.images.push({ resourceId: resource.id, taskId: task.id });
                    acc.files.push({ resourceId: resource.id, taskId: task.id });
                    return acc;
                }, { images: [], files: [] });
                await this.prisma.taskImage.createMany({ data: images });
                await this.prisma.taskFile.createMany({ data: files });
            }
        }
        if (reminder) {
            const { alarm, interval, startDate, time } = reminder;
            this.reminderService.create({ reminder: { dateReminder: startDate, interval, timeReminder: time, alarm } });
        }
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "task" }) };
    }
    async findAll({ lang, query, user }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const { result, ...rest } = await this.prisma.extended.task.paginate({
            where: { deletedAt: null, createdById: user.id, name: { contains: search, mode: "insensitive" } },
            limit, page,
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection }),
            include: { TaskAssignees: { include: { User: { include: { Resource: true } } } } }
        });
        const data = result.map(({ TaskAssignees, createdAt, name, priority, status, id }) => {
            const teams = TaskAssignees.map(({ User }) => {
                const { Resource, name, id } = User;
                return {
                    userId: id,
                    name,
                    thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                    blurHash: Resource ? Resource.blurHash : undefined
                };
            });
            return {
                id,
                createdAt,
                name: name,
                status: status,
                priority: priority,
                teams
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "task" }), data: data, ...rest };
    }
    async findOne({ lang, param: { id }, user }) {
        const taskExist = await this.prisma.task.findFirst({
            where: { id, createdById: user.id },
            include: {
                TaskAssignees: { include: { User: { include: { Resource: true } } } },
                ReminderTasks: { include: { Reminder: true } },
            }
        });
        if (!taskExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "deleted", lang, object: "task" }), common_1.HttpStatus.NOT_FOUND);
        const { TaskAssignees, name, status, duration, priority, ReminderTasks } = taskExist;
        const teams = TaskAssignees.map(({ User }) => {
            const { Resource, name, id } = User;
            return {
                userId: id,
                name,
                thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                blurHash: Resource ? Resource.blurHash : undefined
            };
        });
        const data = {
            id, name, status, priority, duration, teams,
            reminder: {
                id: ReminderTasks?.Reminder.id,
                date: ReminderTasks?.Reminder.dateReminder,
                time: ReminderTasks?.Reminder.timeReminder,
                interval: ReminderTasks?.Reminder.interval,
                alarm: ReminderTasks?.Reminder.alarm
            }
        };
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "task" }), data };
    }
    async update({ body, lang, param: { id }, user }) {
        const { reminder, assigneeUserIds, files, } = body;
        let Resource;
        const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } });
        if (!taskExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "deleted", lang, object: "task" }), common_1.HttpStatus.NOT_FOUND);
        if (files?.length === 0) {
            const resource = await this.prisma.task.findFirst({
                where: { id, deletedAt: null },
                include: {
                    TaskFiles: { include: { Resource: true } },
                    TaskImages: { include: { Resource: true } }
                },
            });
            if (resource && (resource.TaskFiles || resource.TaskImages)) {
                const oldResourceFiles = resource.TaskFiles.map(({ Resource }) => { return Resource; });
                const oldResourceImages = resource.TaskImages.map(({ Resource }) => { return Resource; });
                this.ee.emit(task_event_1.DeletedFilesTaskEvent.key, new task_event_1.DeletedFilesTaskEvent({ oldResourceFiles, oldResourceImages }));
            }
        }
        await this.prisma.task.update({
            where: { id, deletedAt: null },
            data: { ...body }
        });
        return `This action updates a #${id} task`;
    }
    async remove({ lang, param: { id }, user }) {
        const taskExist = await this.prisma.task.findFirst({ where: { id, createdById: user.id } });
        if (!taskExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "deleted", lang, object: "task" }), common_1.HttpStatus.NOT_FOUND);
        await this.prisma.task.update({ where: { id, deletedAt: null }, data: { deletedAt: (0, dayjs_1.default)().toISOString() } });
        return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: "task" }) };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        file_1.FileService,
        xconfig_1.XConfig,
        reminder_service_1.ReminderService,
        event_emitter_1.EventEmitter2])
], TaskService);
//# sourceMappingURL=task.service.js.map