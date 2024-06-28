"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFileParamDto = exports.GetImageQueryDto = exports.GetImageParamDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
const GetFileParamDtoSchema = zod_1.z.object({
    fileName: zod_1.z.string(),
    userId: zod_1.z.string()
});
const GetImageQueryDtoSchema = zod_1.z.object({
    width: zod_1.z.number({ coerce: true }).optional(),
    height: zod_1.z.number({ coerce: true }).optional()
});
const GetImageParamDtoSchema = zod_1.z.object({
    fileName: zod_1.z.string(),
    prefix: zod_1.z.string()
});
class GetImageParamDto extends (0, zod_nestjs_1.createZodDto)(GetImageParamDtoSchema) {
}
exports.GetImageParamDto = GetImageParamDto;
class GetImageQueryDto extends (0, zod_nestjs_1.createZodDto)(GetImageQueryDtoSchema) {
}
exports.GetImageQueryDto = GetImageQueryDto;
class GetFileParamDto extends (0, zod_nestjs_1.createZodDto)(GetFileParamDtoSchema) {
}
exports.GetFileParamDto = GetFileParamDto;
//# sourceMappingURL=file.dto.js.map