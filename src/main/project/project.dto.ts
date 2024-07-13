import { createZodDto } from "@anatine/zod-nestjs";
import { ProjectStatus } from "@prisma/client";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
import { z } from "zod";

const CreateProjectBodyDtoSchema = z.object({
    color: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    priority: z.string(),
    target: z.string().optional(),
    budget: z.number().optional(),
    goals: z.string().optional(),
    status: z.nativeEnum(ProjectStatus),
    thumbnail: z.string().optional(),
    tagId: z.string().optional(),
    files: z.array(z.string()).optional(),
});

const CreateProjectParamDtoSchema = z.object({
    organizationId: z.string().uuid().optional()
})

export class CreateProjectBodyDto extends createZodDto(CreateProjectBodyDtoSchema) { }
export class CreateProjectParamDto extends createZodDto(CreateProjectParamDtoSchema) { }

const FindAllProjectQueryDtoSchema = FindAllQueryDtoBaseSchema.extend({
    orderBy: z.enum(['createdAt', 'priority', 'updatedAt', 'name', 'createdAtLastChat']).optional().default('createdAt'),
    tagId: z.string().uuid().optional()
})
export class FindAllProjectQueryDto extends createZodDto(FindAllProjectQueryDtoSchema) { }
export class FindAllProjectParamDto extends createZodDto(CreateProjectParamDtoSchema) { }


const FindOneProjectParamDtoSchema = FindOneParamDtoBaseSchema.extend({
    organizationId: z.string().uuid().optional()
})
export class FindOneProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }

export class UpdateProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }
export class UpdateProjectBodyDto extends createZodDto(CreateProjectBodyDtoSchema) { }
export class DeleteProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }

const FindAllProjectCollaboratorQueryDtoSchema = FindAllQueryDtoBaseSchema
const FindAllProjectCollaboratorParamDtoSchema = z.object({
    id: z.string().uuid(),
    organizationId: z.string().uuid().optional()
})
export class FindAllProjectCollaboratorParamDto extends createZodDto(FindAllProjectCollaboratorParamDtoSchema) { }
export class FindAllProjectCollaboratorQueryDto extends createZodDto(FindAllProjectCollaboratorQueryDtoSchema) { }