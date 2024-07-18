import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { z } from "zod";

const FindAllHistoryQueryDtoSchema = FindAllQueryDtoBaseSchema
const FindAllHistoryParamDtoSchema = z.object({
    organizationId : z.string().uuid().optional(),
    projectId : z.string().uuid().optional(),
    taskId: z.string().uuid()
})

export class FindAllHistoryQueryDto extends createZodDto(FindAllHistoryQueryDtoSchema) { }
export class FindAllHistoryParamDto extends createZodDto(FindAllHistoryParamDtoSchema) { }