import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

const CreateProjectCollaboratorBodyDtoSchema = z.object({
    userIds: z.array(z.string().uuid())
})

const CreateProjectCollaboratorParamDtoSchema = z.object({
    organizationId: z.string().uuid().optional(),
    projectId: z.string().uuid()
})

const AddAdminProjectCollaboratorBodyDtoSchema = z.object({
    userId : z.string().uuid()
})

export class CreateProjectCollaboratorBodyDto extends createZodDto(CreateProjectCollaboratorBodyDtoSchema) { }
export class CreateProjectCollaboratorParamDto extends createZodDto(CreateProjectCollaboratorParamDtoSchema) { }
export class RemoveProjectCollaboratorBodyDto extends createZodDto(AddAdminProjectCollaboratorBodyDtoSchema) { }
export class RemoveProjectCollaboratorParamDto extends createZodDto(CreateProjectCollaboratorParamDtoSchema) { }

export class AddAdminProjectCollaboratorBodyDto extends createZodDto(AddAdminProjectCollaboratorBodyDtoSchema) { }
export class AddAdminProjectCollaboratorParamDto extends createZodDto(CreateProjectCollaboratorParamDtoSchema) { }
export class RemoveAdminProjectCollaboratorBodyDto extends createZodDto(AddAdminProjectCollaboratorBodyDtoSchema) { }
export class RemoveAdminProjectCollaboratorParamDto extends createZodDto(CreateProjectCollaboratorParamDtoSchema) { }