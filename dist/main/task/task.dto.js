"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTaskQueryDto = exports.FindOneTaskParamDto = exports.DeleteTaskParamDto = exports.UpdateTaskParamDto = exports.UpdateTaskBodyDto = exports.CreateTaskBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const constants_1 = require("../../constants");
const findAll_query_dto_1 = require("../../constants/findAll-query.dto");
const findOne_param_dto_1 = require("../../constants/findOne-param.dto");
const zTimeFormat_1 = require("../../constants/zTimeFormat");
const zod_1 = require("zod");
dayjs_1.default.extend(utc_1.default);
const CreateReminderBodyDtoSchema = zod_1.z.object({
    alarm: zod_1.z.boolean().default(false),
    interval: zod_1.z.nativeEnum(client_1.IntervalReminder),
    startDate: constants_1.zDateFormat.default(dayjs_1.default.utc().format('YYYY-MM-DD')),
    time: zTimeFormat_1.zTimeFormat.default((0, dayjs_1.default)().format('HH:mm'))
});
const CreateTaskBodyDtoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    assigneeUserIds: zod_1.z.array(zod_1.z.string()).optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.TaskEnum),
    priority: zod_1.z.nativeEnum(client_1.TaskPriority),
    color: zod_1.z.string().optional(),
    duration: zod_1.z.number().default(0),
    projectId: zod_1.z.string().optional(),
    files: zod_1.z.array(zod_1.z.string()).optional(),
    reminder: CreateReminderBodyDtoSchema.optional()
});
const FindAllTaskQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
const UpdateTaskBodyDtoSchema = CreateTaskBodyDtoSchema;
const UpdateTaskParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
class CreateTaskBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateTaskBodyDtoSchema) {
}
exports.CreateTaskBodyDto = CreateTaskBodyDto;
class UpdateTaskBodyDto extends (0, zod_nestjs_1.createZodDto)(UpdateTaskBodyDtoSchema) {
}
exports.UpdateTaskBodyDto = UpdateTaskBodyDto;
class UpdateTaskParamDto extends (0, zod_nestjs_1.createZodDto)(UpdateTaskParamDtoSchema) {
}
exports.UpdateTaskParamDto = UpdateTaskParamDto;
class DeleteTaskParamDto extends (0, zod_nestjs_1.createZodDto)(UpdateTaskParamDtoSchema) {
}
exports.DeleteTaskParamDto = DeleteTaskParamDto;
class FindOneTaskParamDto extends (0, zod_nestjs_1.createZodDto)(UpdateTaskParamDtoSchema) {
}
exports.FindOneTaskParamDto = FindOneTaskParamDto;
class FindAllTaskQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllTaskQueryDtoSchema) {
}
exports.FindAllTaskQueryDto = FindAllTaskQueryDto;
//# sourceMappingURL=task.dto.js.map