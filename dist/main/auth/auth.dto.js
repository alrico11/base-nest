"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutBodyDto = exports.LoginBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
const LoginBodySchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
    firebaseIdToken: zod_1.z.string().optional(),
});
const LogoutBodySchema = zod_1.z.object({});
class LoginBodyDto extends (0, zod_nestjs_1.createZodDto)(LoginBodySchema) {
}
exports.LoginBodyDto = LoginBodyDto;
class LogoutBodyDto extends (0, zod_nestjs_1.createZodDto)(LogoutBodySchema) {
}
exports.LogoutBodyDto = LogoutBodyDto;
//# sourceMappingURL=auth.dto.js.map