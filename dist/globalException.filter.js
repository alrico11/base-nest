"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InternalServerErrorExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = exports.ZodErrorFilter = exports.InternalServerErrorExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const log_1 = require("./log");
let InternalServerErrorExceptionFilter = InternalServerErrorExceptionFilter_1 = class InternalServerErrorExceptionFilter {
    constructor(l) {
        this.l = l;
        this.l.setContext(InternalServerErrorExceptionFilter_1.name);
    }
    catch(exception, host) {
        try {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const status = exception.getStatus();
            if (status === 500)
                this.l.error(exception);
            return response.status(status).json({ statusCode: status, message: status === 500 ? 'Internal server error' : exception.message });
        }
        catch (error) {
        }
    }
};
exports.InternalServerErrorExceptionFilter = InternalServerErrorExceptionFilter;
exports.InternalServerErrorExceptionFilter = InternalServerErrorExceptionFilter = InternalServerErrorExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [log_1.LogService])
], InternalServerErrorExceptionFilter);
let ZodErrorFilter = class ZodErrorFilter {
    constructor(l) {
        this.l = l;
        this.l.setContext(InternalServerErrorExceptionFilter.name);
    }
    catch(zodError, host) {
        try {
            const ctx = host.switchToHttp();
            ctx.getRequest();
            const response = ctx.getResponse();
            const generatedMessage = zodError.issues.map(issue => `${issue.path.join(', ')} is ${issue.message}`).join(', ');
            return response.status(400).json({ statusCode: 400, message: generatedMessage });
        }
        catch (error) {
        }
    }
};
exports.ZodErrorFilter = ZodErrorFilter;
exports.ZodErrorFilter = ZodErrorFilter = __decorate([
    (0, common_1.Catch)(zod_1.ZodError),
    __metadata("design:paramtypes", [log_1.LogService])
], ZodErrorFilter);
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(l) {
        this.l = l;
        this.l.setContext(InternalServerErrorExceptionFilter.name);
    }
    catch(error, host) {
        try {
            console.error(error);
            this.l.error(error);
            const ctx = host?.switchToHttp();
            const response = ctx?.getResponse();
            if (ctx !== undefined && response !== undefined)
                response.status(500).json({ statusCode: 500, message: error });
        }
        catch (error) {
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [log_1.LogService])
], AllExceptionsFilter);
//# sourceMappingURL=globalException.filter.js.map