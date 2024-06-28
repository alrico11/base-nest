"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTagParamDto = exports.UpdateTagParamDto = exports.UpdateTagBodyDto = exports.FindAllTagQueryDto = exports.CreateTagBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const findAll_query_dto_1 = require("../../constants/findAll-query.dto");
const findOne_param_dto_1 = require("../../constants/findOne-param.dto");
const zod_1 = require("zod");
const CreateTagBodyDtoSchema = zod_1.z.object({
    name: zod_1.z.string()
});
const FindAllQueryDtoSchema = findAll_query_dto_1.FindAllQueryDtoBaseSchema;
const UpdateTagParamDtoSchema = findOne_param_dto_1.FindOneParamDtoBaseSchema;
class CreateTagBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateTagBodyDtoSchema) {
}
exports.CreateTagBodyDto = CreateTagBodyDto;
class FindAllTagQueryDto extends (0, zod_nestjs_1.createZodDto)(FindAllQueryDtoSchema) {
}
exports.FindAllTagQueryDto = FindAllTagQueryDto;
class UpdateTagBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateTagBodyDtoSchema) {
}
exports.UpdateTagBodyDto = UpdateTagBodyDto;
class UpdateTagParamDto extends (0, zod_nestjs_1.createZodDto)(UpdateTagParamDtoSchema) {
}
exports.UpdateTagParamDto = UpdateTagParamDto;
class DeleteTagParamDto extends (0, zod_nestjs_1.createZodDto)(UpdateTagParamDtoSchema) {
}
exports.DeleteTagParamDto = DeleteTagParamDto;
//# sourceMappingURL=tag.dto.js.map