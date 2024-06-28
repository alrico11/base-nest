import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateTagBodyDtoSchema = z.object({
    name: z.string()
})

const FindAllQueryDtoSchema = FindAllQueryDtoBaseSchema
const UpdateTagParamDtoSchema = FindOneParamDtoBaseSchema

export class CreateTagBodyDto extends createZodDto(CreateTagBodyDtoSchema) { }
export class FindAllTagQueryDto extends createZodDto(FindAllQueryDtoSchema) { }
export class UpdateTagBodyDto extends createZodDto(CreateTagBodyDtoSchema) { }
export class UpdateTagParamDto extends createZodDto(UpdateTagParamDtoSchema) { }
export class DeleteTagParamDto extends createZodDto(UpdateTagParamDtoSchema) { }