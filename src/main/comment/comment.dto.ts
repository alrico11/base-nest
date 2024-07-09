import { createZodDto } from "@anatine/zod-nestjs";
import { CompactClass } from "src/@classes";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { z } from "zod";

const CreateCommentTaskBodyDtoSchema = z.object({
  content: z.string(),
  referenceCommentId: z.string().uuid().optional()
})

const CreateCommentTaskParamDtoSchema = z.object({
  taskId: z.string().uuid()
})

const FindAllCommentTaskQuerySchema = FindAllQueryDtoBaseSchema
const FindAllCommentTaskParamSchema = CreateCommentTaskParamDtoSchema

const UpdateCommentTaskBodyDtoSchema = z.object({
  content: z.string()
})

const UpdateCommentTaskParamDtoSchema = CreateCommentTaskParamDtoSchema.extend({
  id: z.string().uuid()
})

const DeleteCommentTaskParamDtoSchema = UpdateCommentTaskParamDtoSchema
export class DeleteCommentTaskParamDto extends createZodDto(DeleteCommentTaskParamDtoSchema) {}


export class UpdateCommentTaskBodyDto extends createZodDto(UpdateCommentTaskBodyDtoSchema) {}
export class UpdateCommentTaskParamDto extends createZodDto(UpdateCommentTaskParamDtoSchema) {}

export class CreateCommentTaskBodyDto extends createZodDto(CreateCommentTaskBodyDtoSchema) { }
export class CreateCommentTaskParamDto extends createZodDto(CreateCommentTaskParamDtoSchema) { }
export class FindAllCommentTaskQuery extends createZodDto(FindAllCommentTaskQuerySchema) { }
export class FindAllCommentTaskParam extends createZodDto(FindAllCommentTaskParamSchema) { }