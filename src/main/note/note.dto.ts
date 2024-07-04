import { createZodDto } from "@anatine/zod-nestjs";
import { IntervalReminder } from "@prisma/client";
import { zDateFormat } from "src/constants";
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