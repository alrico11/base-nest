"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
const app_controller_1 = require("./app.controller");
const app_imports_1 = __importDefault(require("./app.imports"));
const app_service_1 = require("./app.service");
const globalException_filter_1 = require("./globalException.filter");
const interceptor_1 = require("./interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: app_imports_1.default,
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_PIPE, useClass: zod_nestjs_1.ZodValidationPipe },
            { provide: core_1.APP_INTERCEPTOR, useClass: interceptor_1.ResponseInterceptor },
            { provide: core_1.APP_FILTER, useClass: globalException_filter_1.AllExceptionsFilter },
            { provide: core_1.APP_FILTER, useClass: globalException_filter_1.InternalServerErrorExceptionFilter },
            { provide: core_1.APP_FILTER, useClass: globalException_filter_1.ZodErrorFilter },
            { provide: core_1.APP_GUARD, useClass: nestjs_rate_limiter_1.RateLimiterGuard }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map