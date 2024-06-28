"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJwtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class UserJwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() { super(); }
}
exports.UserJwtGuard = UserJwtGuard;
//# sourceMappingURL=jwt.guard.js.map