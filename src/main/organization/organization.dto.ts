import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateOrganizationBodyDtoSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional()
})

const FindAllOrganizationQueryDtoSchema = FindAllQueryDtoBaseSchema
const FindOneOrganizationParamDtoSchema = FindOneParamDtoBaseSchema
const FindAllMemberOrganizationQueryDtoSchema = FindAllQueryDtoBaseSchema
const FindAllMemberOrganizationParamDtoSchema = FindOneParamDtoBaseSchema

export class CreateOrganizationBodyDto extends createZodDto(CreateOrganizationBodyDtoSchema) { }
export class FindAllOrganizationQueryDto extends createZodDto(FindAllOrganizationQueryDtoSchema) { }
export class FindOneOrganizationParamDto extends createZodDto(FindOneOrganizationParamDtoSchema) { }
export class UpdateOrganizationParamDto extends createZodDto(FindOneOrganizationParamDtoSchema) { }
export class UpdateOrganizationBodyDto extends createZodDto(CreateOrganizationBodyDtoSchema) { }
export class DeleteOrganizationParamDto extends createZodDto(FindOneOrganizationParamDtoSchema) { }
export class FindAllMemberOrganizationQueryDto extends createZodDto(FindAllMemberOrganizationQueryDtoSchema) { }
export class FindAllMemberOrganizationParamDto extends createZodDto(FindAllMemberOrganizationParamDtoSchema) { }