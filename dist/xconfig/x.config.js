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
Object.defineProperty(exports, "__esModule", { value: true });
exports.XConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const zEnvValidationSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['PRODUCTION', 'DEVELOPMENT', 'LOCAL']),
    APP_PORT: zod_1.z.number({ coerce: true }).min(1000),
    DATABASE_URL: zod_1.z.string(),
    USER_JWT_SECRET: zod_1.z.string(),
    DEVICE_JWT_SECRET: zod_1.z.string(),
    OBJECT_STORAGE_HOST: zod_1.z.string(),
    OBJECT_STORAGE_PORT: zod_1.z.string(),
    OBJECT_STORAGE_REGION: zod_1.z.string(),
    OBJECT_STORAGE_BUCKET: zod_1.z.string(),
    OBJECT_STORAGE_ACCESS_KEY_ID: zod_1.z.string(),
    OBJECT_STORAGE_SECRET_ACCESS_KEY: zod_1.z.string(),
    OBJECT_STORAGE_FORCE_PATH_STYLE: zod_1.z.boolean({ coerce: true }),
    OBJECT_STORAGE_ENDPOINT: zod_1.z.string(),
    DEFAULT_IMAGE_COMPRESSION_WIDTH: zod_1.z.number({ coerce: true }),
    DEFAULT_IMAGE_COMPRESSION_HEIGHT: zod_1.z.number({ coerce: true }),
    OBJECT_STORAGE_PREFIX_USER: zod_1.z.string(),
    OBJECT_STORAGE_PREFIX_ORGANIZATION: zod_1.z.string(),
    OBJECT_STORAGE_PREFIX_PROJECT: zod_1.z.string(),
    OBJECT_STORAGE_PREFIX_PROJECT_FILE: zod_1.z.string(),
    OBJECT_STORAGE_PREFIX_ADMIN: zod_1.z.string(),
    TMP_FILE_PATH: zod_1.z.string(),
    CDN_PATH_URL: zod_1.z.string(),
    CDN_MAIN_URL: zod_1.z.string(),
    CDN_BASE_URL: zod_1.z.string(),
    BLURHASH_COMPONENT_X: zod_1.z.number({ coerce: true }),
    BLURHASH_COMPONENT_Y: zod_1.z.number({ coerce: true }),
    MAX_CHILD_RESOURCE: zod_1.z.number({ coerce: true }),
});
let XConfig = class XConfig {
    constructor(configService) {
        this.configService = configService;
        this.env = new Proxy(({}), {
            get: (_, prop) => {
                if (zEnvValidationSchema.keyof()._def.values.includes(prop))
                    return this.configService.get(prop);
                throw new Error(`Property '${prop}' does not exist in XConfig.`);
            },
        });
    }
    static validate(env) {
        try {
            return zEnvValidationSchema.parse(env);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.XConfig = XConfig;
exports.XConfig = XConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], XConfig);
//# sourceMappingURL=x.config.js.map