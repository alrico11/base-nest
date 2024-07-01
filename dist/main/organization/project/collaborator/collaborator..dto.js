"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAdminProjectCollaboratorParamDto = exports.RemoveAdminProjectCollaboratorBodyDto = exports.AddAdminProjectCollaboratorParamDto = exports.AddAdminProjectCollaboratorBodyDto = exports.RemoveProjectCollaboratorParamDto = exports.RemoveProjectCollaboratorBodyDto = exports.CreateProjectCollaboratorParamDto = exports.CreateProjectCollaboratorBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const findOne_param_dto_1 = require("../../../../constants/findOne-param.dto");
const zod_1 = require("zod");
const CreateProjectCollaboratorBodyDtoSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid()
});
const CreateProjectCollaboratorParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema.extend({
    organizationId: zod_1.z.string().uuid()
});
class CreateProjectCollaboratorBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorBodyDtoSchema) {
}
exports.CreateProjectCollaboratorBodyDto = CreateProjectCollaboratorBodyDto;
class CreateProjectCollaboratorParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorParamDtoSchema) {
}
exports.CreateProjectCollaboratorParamDto = CreateProjectCollaboratorParamDto;
class RemoveProjectCollaboratorBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorBodyDtoSchema) {
}
exports.RemoveProjectCollaboratorBodyDto = RemoveProjectCollaboratorBodyDto;
class RemoveProjectCollaboratorParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorParamDtoSchema) {
}
exports.RemoveProjectCollaboratorParamDto = RemoveProjectCollaboratorParamDto;
class AddAdminProjectCollaboratorBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorBodyDtoSchema) {
}
exports.AddAdminProjectCollaboratorBodyDto = AddAdminProjectCollaboratorBodyDto;
class AddAdminProjectCollaboratorParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorParamDtoSchema) {
}
exports.AddAdminProjectCollaboratorParamDto = AddAdminProjectCollaboratorParamDto;
class RemoveAdminProjectCollaboratorBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorBodyDtoSchema) {
}
exports.RemoveAdminProjectCollaboratorBodyDto = RemoveAdminProjectCollaboratorBodyDto;
class RemoveAdminProjectCollaboratorParamDto extends (0, zod_nestjs_1.createZodDto)(CreateProjectCollaboratorParamDtoSchema) {
}
exports.RemoveAdminProjectCollaboratorParamDto = RemoveAdminProjectCollaboratorParamDto;
//# sourceMappingURL=collaborator..dto.js.map