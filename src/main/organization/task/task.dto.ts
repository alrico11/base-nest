import { createZodDto } from "@anatine/zod-nestjs";
import { IntervalReminder, TaskEnum, TaskPriority } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { zDateFormat } from "src/constants";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { zTimeFormat } from "src/constants/zTimeFormat";
import { z } from "zod";
dayjs.extend(utc);

export const CreateReminderBodyDtoSchema = z.object({
    alarm: z.boolean().default(false),
    interval: z.nativeEnum(IntervalReminder),
    startDate: zDateFormat,
    time: zTimeFormat
});

const CreateTaskBodyDtoSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    assigneeUserIds: z.array(z.string()).optional(),
    startDate: zDateFormat.optional(),
    endDate: zDateFormat.optional(),
    status: z.nativeEnum(TaskEnum),
    priority: z.nativeEnum(TaskPriority),
    color: z.string().optional(),
    duration: z.number().default(0),
    projectId: z.string().optional(),
    files: z.array(z.string()).optional(),
    reminder: CreateReminderBodyDtoSchema.optional()
});

const CreateTaskParamDtoSchema = z.object({
    organizationId: z.string().uuid()
})
export class CreateTaskBodyDto extends createZodDto(CreateTaskBodyDtoSchema) { }
export class CreateTaskParamDto extends createZodDto(CreateTaskParamDtoSchema) { }

const FindAllTaskQueryDtoSchema = FindAllQueryDtoBaseSchema
const UpdateTaskBodyDtoSchema = CreateTaskBodyDtoSchema
const UpdateTaskParamDtoSchema = FindOneParamDtoBaseSchema.extend({
    organizationId: z.string().uuid()
})

export class UpdateTaskBodyDto extends createZodDto(UpdateTaskBodyDtoSchema) { }
export class UpdateTaskParamDto extends createZodDto(UpdateTaskParamDtoSchema) { }
export class DeleteTaskParamDto extends createZodDto(UpdateTaskParamDtoSchema) { }
export class FindOneTaskParamDto extends createZodDto(UpdateTaskParamDtoSchema) { }
export class FindAllTaskQueryDto extends createZodDto(FindAllTaskQueryDtoSchema) { }
export class FindAllTaskParamDto extends createZodDto(CreateTaskParamDtoSchema) { }
