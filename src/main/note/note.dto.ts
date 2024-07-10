import { createZodDto } from "@anatine/zod-nestjs";
import { IntervalReminder } from "@prisma/client";
import { zDateFormat } from "src/constants";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { zTimeFormat } from "src/constants/zTimeFormat";
import { z } from "zod";

export const CreateReminderBodyDtoSchema = z.object({
    alarm: z.boolean().default(false),
    interval: z.nativeEnum(IntervalReminder),
    startDate: zDateFormat,
    time: zTimeFormat
});
const CreateNoteBodyDtoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    reminder: CreateReminderBodyDtoSchema.optional()
})
const CreateNoteParamDtoSchema = z.object({
    projectId : z.string().uuid().optional(),
    organizationId : z.string().uuid().optional()
})
export class CreateNoteBodyDto extends createZodDto(CreateNoteBodyDtoSchema) { }
export class CreateNoteParamDto  extends createZodDto(CreateNoteParamDtoSchema) { }

const FindAllNoteQueryDtoSchema = FindAllQueryDtoBaseSchema
export class FindAllNoteQueryDto extends createZodDto(FindAllNoteQueryDtoSchema) { }
export class FindAllNoteParamDto extends createZodDto(CreateNoteParamDtoSchema) { }

export const UpdateNoteParamDtoSchema = FindOneParamDtoBaseSchema.extend({
    projectId : z.string().uuid().optional(),
    organizationId : z.string().uuid().optional()
})
const UpdateNoteBodyDtoSchema = CreateNoteBodyDtoSchema
export class UpdateNoteParamDto extends createZodDto(UpdateNoteParamDtoSchema) { }
export class UpdateNoteBodyDto extends createZodDto(UpdateNoteBodyDtoSchema) { }

export class DeleteNoteParamDto extends createZodDto(UpdateNoteParamDtoSchema) { }