import { createZodDto } from "@anatine/zod-nestjs";
import { IntervalReminder } from "@prisma/client";
import { zDateFormat } from "src/constants";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
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
export class CreateNoteBodyDto extends createZodDto(CreateNoteBodyDtoSchema) { }

const FindAllNoteQueryDtoSchema = FindAllQueryDtoBaseSchema
export class FindAllNoteQueryDto extends createZodDto(FindAllNoteQueryDtoSchema) { }