"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneParamDtoBaseSchema = void 0;
const zod_1 = require("zod");
exports.FindOneParamDtoBaseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
//# sourceMappingURL=findOne-param.dto.js.map