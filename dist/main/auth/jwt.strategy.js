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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const dayjs_1 = __importDefault(require("dayjs"));
const passport_jwt_1 = require("passport-jwt");
const prisma_1 = require("../../prisma");
let UserJwtStrategy = class UserJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(config, prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.prisma = prisma;
    }
    async validate(payload, req) {
        const rawToken = req.headers?.authorization?.split(' ')[1];
        const user = await this.prisma.authToken.findFirst({ where: { token: rawToken } });
        if (!user)
            throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        const userExist = await this.prisma.user.findFirst({
            where: { id: payload.id, deletedAt: null },
        });
        await this.prisma.user.update({
            where: { id: payload.id },
            data: { updatedAt: (0, dayjs_1.default)().toISOString() }
        });
        if (!userExist)
            throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
        return userExist;
    }
};
exports.UserJwtStrategy = UserJwtStrategy;
exports.UserJwtStrategy = UserJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_1.PrismaService])
], UserJwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map