import { createZodDto } from "@anatine/zod-nestjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { zDateFormat } from "src/constants";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { z } from "zod";
dayjs.extend(utc);
const CreateEventLogBodyDtoSchema = z.object({
    date: zDateFormat,
    description: z.string().min(3),
})

const CreateEventLogParamDtoSchema = z.object({
    projectId: z.string().uuid(),
    organizationId: z.string().uuid().optional()
})

export class CreateEventLogBodyDto extends createZodDto(CreateEventLogBodyDtoSchema) { }
export class CreateEventLogParamDto extends createZodDto(CreateEventLogParamDtoSchema) { }

const FindAllEventLogQueryDtoSchema = FindAllQueryDtoBaseSchema
export class FindAllEventLogQueryDto extends createZodDto(FindAllEventLogQueryDtoSchema) { } 
export class FindAllEventLogParamDto extends createZodDto(CreateEventLogParamDtoSchema) { } 

const UpdateEventLogParamDtoSchema = CreateEventLogParamDtoSchema.extend({
    id: z.string().uuid()
})

export class UpdateEventLogParamDto extends createZodDto(UpdateEventLogParamDtoSchema) {}
export class UpdateEventLogBodyDto extends createZodDto(CreateEventLogBodyDtoSchema) {}

export class RemoveEventLogParamDto extends createZodDto(UpdateEventLogParamDtoSchema) {} 