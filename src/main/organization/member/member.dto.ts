import { createZodDto } from "@anatine/zod-nestjs";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateMemberOrganizationBodyDtoSchema = z.object({
    userIds: z.array(z.string().uuid())
})

const RemoveMemberOrganizationBodyDtoSchema = z.object({
    userId : z.string().uuid()
})

const CreateMemberOrganizationParamDtoSchema = FindOneParamDtoBaseSchema

export class CreateMemberOrganizationBodyDto extends createZodDto(CreateMemberOrganizationBodyDtoSchema) { }
export class CreateMemberOrganizationParamDto extends createZodDto(CreateMemberOrganizationParamDtoSchema) { }
export class RemoveMemberOrganizationParamDto extends createZodDto(CreateMemberOrganizationParamDtoSchema) { }
export class RemoveMemberOrganizationBodyDto extends createZodDto(RemoveMemberOrganizationBodyDtoSchema) { }
export class AddAdminOrganizationBodyDto extends createZodDto(RemoveMemberOrganizationBodyDtoSchema) { }
export class AddAdminOrganizationParamDto extends createZodDto(CreateMemberOrganizationParamDtoSchema) { }
export class RemoveAdminOrganizationParamDto extends createZodDto(CreateMemberOrganizationParamDtoSchema) { }
export class RemoveAdminOrganizationBodyDto extends createZodDto(RemoveMemberOrganizationBodyDtoSchema) { }