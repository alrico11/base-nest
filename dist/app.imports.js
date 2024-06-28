"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
const prisma_1 = require("./prisma");
const device_1 = require("./main/device");
const log_1 = require("./log");
const xconfig_1 = require("./xconfig");
const organization_module_1 = require("./main/organization/organization.module");
const tag_module_1 = require("./main/tag/tag.module");
const tag_module_2 = require("./main/organization/tag/tag.module");
const AppImports = [
    xconfig_1.XConfigModule,
    event_emitter_1.EventEmitterModule.forRoot({
        maxListeners: 3000,
        verboseMemoryLeak: true
    }),
    nestjs_rate_limiter_1.RateLimiterModule.register({
        type: 'Memory',
        points: 300,
        duration: 60,
    }),
    log_1.LogModule,
    prisma_1.PrismaModule,
    device_1.DeviceModule,
    organization_module_1.OrganizationModule,
    tag_module_1.TagModule,
    tag_module_2.TagModule
];
exports.default = AppImports;
//# sourceMappingURL=app.imports.js.map