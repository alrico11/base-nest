"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllQueryDtoBaseSchema = void 0;
const zod_1 = require("zod");
exports.FindAllQueryDtoBaseSchema = zod_1.z.object({
    page: zod_1.z.number({ coerce: true }).default(1),
    limit: zod_1.z.number({ coerce: true }).optional().default(10),
    orderBy: zod_1.z.enum(['createdAt']).optional().default('createdAt'),
    orderDirection: zod_1.z.enum(['asc', 'desc']).optional().default('desc'),
    search: zod_1.z.string().optional()
});
//# sourceMappingURL=findAll-query.dto.js.map