"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllMemberOrganizationParamDto = exports.FindAllMemberOrganizationQueryDto = exports.DeleteOrganizationParamDto = exports.UpdateOrganizationBodyDto = exports.UpdateOrganizationParamDto = exports.FindOneOrganizationParamDto = exports.FindAllOrganizationQueryDto = exports.CreateOrganizationBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const findAll_query_dto_1 = require("../../constants/findAll-query.dto");
const findOne_param_dto_1 = require("../../constants/findOne-param.dto");
const zod_1 = require("zod");
const CreateOrganizationBodyDtoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().optional()
});
const FindAllOrganizationQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
const FindOneOrganizationParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
const FindAllMemberOrganizationQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
const FindAllMemberOrganizationParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
class CreateOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateOrganizationBodyDtoSchema) {
}
exports.CreateOrganizationBodyDto = CreateOrganizationBodyDto;
class FindAllOrganizationQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllOrganizationQueryDtoSchema) {
}
exports.FindAllOrganizationQueryDto = FindAllOrganizationQueryDto;
class FindOneOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneOrganizationParamDtoSchema) {
}
exports.FindOneOrganizationParamDto = FindOneOrganizationParamDto;
class UpdateOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneOrganizationParamDtoSchema) {
}
exports.UpdateOrganizationParamDto = UpdateOrganizationParamDto;
class UpdateOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateOrganizationBodyDtoSchema) {
}
exports.UpdateOrganizationBodyDto = UpdateOrganizationBodyDto;
class DeleteOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(FindOneOrganizationParamDtoSchema) {
}
exports.DeleteOrganizationParamDto = DeleteOrganizationParamDto;
class FindAllMemberOrganizationQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllMemberOrganizationQueryDtoSchema) {
}
exports.FindAllMemberOrganizationQueryDto = FindAllMemberOrganizationQueryDto;
class FindAllMemberOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(FindAllMemberOrganizationParamDtoSchema) {
}
exports.FindAllMemberOrganizationParamDto = FindAllMemberOrganizationParamDto;
//# sourceMappingURL=organization.dto.js.map