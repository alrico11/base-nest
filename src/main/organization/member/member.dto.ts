import { createZodDto } from "@anatine/zod-nestjs";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateMemberOrganizationBodyDtoSchema = z.object({
    userId: z.string().uuid()
})

const CreateMemberOrganizationParamDtoSchema = FindOneParamDtoBaseSchema

export class CreateMemberOrganizationBodyDto extends createZodDto(CreateMemberOrganizationBodyDtoSchema) { }
export class CreateMemberOrganizationParamDto extends createZodDto(CreateMemberOrganizationParamDtoSchema) { }