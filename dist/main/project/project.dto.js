"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllProjectCollaboratorQueryDto = exports.FindAllProjectCollaboratorParamDto = exports.CreateProjectParamDto = exports.DeleteProjectParamDto = exports.UpdateProjectBodyDto = exports.UpdateProjectParamDto = exports.FindOneProjectParamDto = exports.FindAllProjectQueryDto = exports.CreateProjectBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const client_1 = require("@prisma/client");
const findAll_query_dto_1 = require("../../constants/findAll-query.dto");
const findOne_param_dto_1 = require("../../constants/findOne-param.dto");
const zod_1 = require("zod");
const CreateProjectBodyDtoSchema = zod_1.z.object({
    color: zod_1.z.string().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.string(),
    target: zod_1.z.string().optional(),
    budget: zod_1.z.number().optional(),
    goals: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.ProjectStatus),
    thumbnail: zod_1.z.string().optional(),
    groupId: zod_1.z.string().optional(),
    file: zod_1.z.array(zod_1.z.string()).optional(),
});
const CreateProjectParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
const FindAllProjectQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
const FindOneProjectParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
const FindAllProjectCollaboratorQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
class CreateProjectBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectBodyDtoSchema) {
}
exports.CreateProjectBodyDto = CreateProjectBodyDto;
class FindAllProjectQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllProjectQueryDtoSchema) {
}
exports.FindAllProjectQueryDto = FindAllProjectQueryDto;
class FindOneProjectParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneProjectParamDtoSchema) {
}
exports.FindOneProjectParamDto = FindOneProjectParamDto;
class UpdateProjectParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneProjectParamDtoSchema) {
}
exports.UpdateProjectParamDto = UpdateProjectParamDto;
class UpdateProjectBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectBodyDtoSchema) {
}
exports.UpdateProjectBodyDto = UpdateProjectBodyDto;
class DeleteProjectParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneProjectParamDtoSchema) {
}
exports.DeleteProjectParamDto = DeleteProjectParamDto;
class CreateProjectParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectParamDtoSchema) {
}
exports.CreateProjectParamDto = CreateProjectParamDto;
class FindAllProjectCollaboratorParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectParamDtoSchema) {
}
exports.FindAllProjectCollaboratorParamDto = FindAllProjectCollaboratorParamDto;
class FindAllProjectCollaboratorQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllProjectCollaboratorQueryDtoSchema) {
}
exports.FindAllProjectCollaboratorQueryDto = FindAllProjectCollaboratorQueryDto;
//# sourceMappingURL=project.dto.js.map