"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAdminOrganizationBodyDto = exports.RemoveAdminOrganizationParamDto = exports.AddAdminOrganizationParamDto = exports.AddAdminOrganizationBodyDto = exports.RemoveMemberOrganizationBodyDto = exports.RemoveMemberOrganizationParamDto = exports.CreateMemberOrganizationParamDto = exports.CreateMemberOrganizationBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const findOne_param_dto_1 = require("../../../constants/findOne-param.dto");
const zod_1 = require("zod");
const CreateMemberOrganizationBodyDtoSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid()
});
const CreateMemberOrganizationParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
class CreateMemberOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationBodyDtoSchema) {
}
exports.CreateMemberOrganizationBodyDto = CreateMemberOrganizationBodyDto;
class CreateMemberOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationParamDtoSchema) {
}
exports.CreateMemberOrganizationParamDto = CreateMemberOrganizationParamDto;
class RemoveMemberOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationParamDtoSchema) {
}
exports.RemoveMemberOrganizationParamDto = RemoveMemberOrganizationParamDto;
class RemoveMemberOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationBodyDtoSchema) {
}
exports.RemoveMemberOrganizationBodyDto = RemoveMemberOrganizationBodyDto;
class AddAdminOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationBodyDtoSchema) {
}
exports.AddAdminOrganizationBodyDto = AddAdminOrganizationBodyDto;
class AddAdminOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationParamDtoSchema) {
}
exports.AddAdminOrganizationParamDto = AddAdminOrganizationParamDto;
class RemoveAdminOrganizationParamDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationParamDtoSchema) {
}
exports.RemoveAdminOrganizationParamDto = RemoveAdminOrganizationParamDto;
class RemoveAdminOrganizationBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateMemberOrganizationBodyDtoSchema) {
}
exports.RemoveAdminOrganizationBodyDto = RemoveAdminOrganizationBodyDto;
//# sourceMappingURL=member.dto.js.map