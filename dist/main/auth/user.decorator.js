"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const common_1 = require("@nestjs/common");
exports.UserInstance = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return key !== undefined ? request.User[key] : request.user;
});
//# sourceMappingURL=user.decorator.js.map