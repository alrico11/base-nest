import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateTagBodyDtoSchema = z.object({
    name: z.string()
})

const CreateTagParamDtoSchema = z.object({
    organizationId: z.string().uuid().optional()
})

export class CreateTagBodyDto extends createZodDto(CreateTagBodyDtoSchema) { }
export class CreateTagParamDto extends createZodDto(CreateTagParamDtoSchema) { }

const FindAllQueryDtoSchema = FindAllQueryDtoBaseSchema
export class FindAllTagQueryDto extends createZodDto(FindAllQueryDtoSchema) { }
export class FindAllTagParamDto extends createZodDto(CreateTagParamDtoSchema) { }


const UpdateTagParamDtoSchema = FindOneParamDtoBaseSchema.extend({
    organizationId : z.string().uuid().optional()
})
export class UpdateTagParamDto extends createZodDto(UpdateTagParamDtoSchema) { }
export class UpdateTagBodyDto extends createZodDto(CreateTagBodyDtoSchema) { }

export class DeleteTagParamDto extends createZodDto(UpdateTagParamDtoSchema) { }