"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lang = void 0;
const common_1 = require("@nestjs/common");
exports.Lang = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const lang = request.headers['x-accept-lang'];
    return lang ? lang : "EN";
});
//# sourceMappingURL=lang.decorator.js.map