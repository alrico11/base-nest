"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
const prisma_1 = require("./prisma");
const xconfig_1 = require("./xconfig");
const AppImports = [
    xconfig_1.XConfig,
    event_emitter_1.EventEmitterModule.forRoot({
        maxListeners: 3000,
        verboseMemoryLeak: true
    }),
    nestjs_rate_limiter_1.RateLimiterModule.register({
        type: 'Memory',
        points: 300,
        duration: 60,
    }),
    prisma_1.PrismaModule,
];
exports.default = AppImports;
//# sourceMappingURL=app.imports.js.map