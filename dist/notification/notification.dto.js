"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationParamDto = exports.NotificationQueryDto = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
const NotificationQuerySchema = zod_1.z.object({
    page: zod_1.z.number({ coerce: true }).default(1),
    limit: zod_1.z.number({ coerce: true }).default(10)
});
const NotificationParamSchema = zod_1.z.object({
    notificationId: zod_1.z.string().uuid()
});
class NotificationQueryDto extends (0, zod_nestjs_1.createZodDto)(NotificationQuerySchema) {
}
exports.NotificationQueryDto = NotificationQueryDto;
class NotificationParamDto extends (0, zod_nestjs_1.createZodDto)(NotificationParamSchema) {
}
exports.NotificationParamDto = NotificationParamDto;
//# sourceMappingURL=notification.dto.js.map