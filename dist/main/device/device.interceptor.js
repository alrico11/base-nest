"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInterceptor = void 0;
class DeviceInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        return response;
    }
}
exports.DeviceInterceptor = DeviceInterceptor;
//# sourceMappingURL=device.interceptor.js.map