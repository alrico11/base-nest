"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserBodyDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
const CreateUserBodyDtoSchema = zod_1.z.object({
    username: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    repeatPassword: zod_1.z.string().min(6),
    phone: zod_1.z.string().min(10),
    cityId: zod_1.z.string()
});
class CreateUserBodyDto extends (0, zod_nestjs_1.createZodDto)(CreateUserBodyDtoSchema) {
}
exports.CreateUserBodyDto = CreateUserBodyDto;
//# sourceMappingURL=user.dto.js.map