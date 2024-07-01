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
    groupId: z.string().optional(),
    file: z.array(z.string()).optional(),
});

const CreateProjectParamDtoSchema = FindOneParamDtoBaseSchema

const FindAllProjectQueryDtoSchema = FindAllQueryDtoBaseSchema

const FindOneProjectParamDtoSchema = FindOneParamDtoBaseSchema.extend({
    organizationId: z.string().uuid()
})

export class CreateProjectBodyDto extends createZodDto(CreateProjectBodyDtoSchema) { }
export class CreateProjectParamDto extends createZodDto(CreateProjectParamDtoSchema) { }

export class FindAllProjectQueryDto extends createZodDto(FindAllProjectQueryDtoSchema) { }
export class FindAllProjectParamDto extends createZodDto(CreateProjectParamDtoSchema) { }

export class FindOneProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }

export class UpdateProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }
export class UpdateProjectBodyDto extends createZodDto(CreateProjectBodyDtoSchema) { }

export class DeleteProjectParamDto extends createZodDto(FindOneProjectParamDtoSchema) { }