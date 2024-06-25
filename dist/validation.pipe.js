"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let ZodValidationPipe = class ZodValidationPipe {
    transform(value, metadata) {
        const zodSchema = metadata?.metatype?.zodSchema;
        if (zodSchema) {
            const parseResult = zodSchema.safeParse(value);
            if (!parseResult.success) {
                const error = parseResult;
                throw error;
            }
            return parseResult.data;
        }
        return value;
    }
};
exports.ZodValidationPipe = ZodValidationPipe;
exports.ZodValidationPipe = ZodValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ZodValidationPipe);
//# sourceMappingURL=validation.pipe.js.map