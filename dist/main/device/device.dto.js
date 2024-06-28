"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterFCMTokenBodyDto = exports.CheckDeviceBodyDto = exports.RegisterDeviceBodyDto = exports.RegisterFCMTokenDtoBodySchema = exports.CheckDeviceDtoBodySchema = exports.RegisterDeviceDtoBodySchema = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
exports.RegisterDeviceDtoBodySchema = zod_1.z.object({
    fingerprint: zod_1.z.string(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
exports.CheckDeviceDtoBodySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    fingerprint: zod_1.z.string(),
});
exports.RegisterFCMTokenDtoBodySchema = zod_1.z.object({
    deviceToken: zod_1.z.string(),
    fcmToken: zod_1.z.string(),
});
class RegisterDeviceBodyDto extends (0, zod_nestjs_1.createZodDto)(exports.RegisterDeviceDtoBodySchema) {
}
exports.RegisterDeviceBodyDto = RegisterDeviceBodyDto;
class CheckDeviceBodyDto extends (0, zod_nestjs_1.createZodDto)(exports.CheckDeviceDtoBodySchema) {
}
exports.CheckDeviceBodyDto = CheckDeviceBodyDto;
class RegisterFCMTokenBodyDto extends (0, zod_nestjs_1.createZodDto)(exports.RegisterFCMTokenDtoBodySchema) {
}
exports.RegisterFCMTokenBodyDto = RegisterFCMTokenBodyDto;
//# sourceMappingURL=device.dto.js.map