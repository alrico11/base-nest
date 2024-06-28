"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInstance = void 0;
const common_1 = require("@nestjs/common");
exports.DeviceInstance = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return key !== undefined ? request.device[key] : request.device;
});
//# sourceMappingURL=device.decorator.js.map