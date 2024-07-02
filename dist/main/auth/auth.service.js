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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const firebase_service_1 = require("../../firebase/firebase.service");
const log_1 = require("../../log");
const prisma_1 = require("../../prisma");
const xconfig_1 = require("../../xconfig");
const constants_1 = require("../../constants");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, config, firebase, l) {
        this.prisma = prisma;
        this.config = config;
        this.firebase = firebase;
        this.l = l;
        this.l.setContext(`MAIN ${AuthService_1.name}`);
    }
    async login({ body, device, lang }) {
        const { email, firebaseIdToken, password } = body;
        if (firebaseIdToken) {
            const decodedId = await this.firebase
                .verifyToken(firebaseIdToken)
                .catch((error) => {
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
            });
            this.l.error({
                message: `user login failed with firebase id ${firebaseIdToken}`,
            });
            if (decodedId.email === null)
                throw new common_1.HttpException("unauthorized", common_1.HttpStatus.UNAUTHORIZED);
            const user = await this.prisma.user.findFirst({
                where: { deletedAt: null, email: decodedId?.email },
            });
        }
        if (!email || !password)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "badRequest", lang }), common_1.HttpStatus.BAD_REQUEST);
        const existUser = await this.prisma.user.findFirst({
            where: { deletedAt: null, email: email.toLowerCase() },
        });
        if (!existUser)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        if (!existUser.password)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        const match = await (0, bcrypt_1.compare)(password, existUser.password);
        console.log(match);
        if (!match)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        const { USER_JWT_SECRET } = this.config.env;
        const token = (0, jsonwebtoken_1.sign)({ id: existUser.id }, USER_JWT_SECRET, {});
        const user = await this.prisma.authToken.create({
            data: {
                userId: existUser.id,
                token: token,
                deviceId: device.id,
            },
        });
        this.l.info({
            message: `user login successfuly with id ${user.id} & token ${token}`,
        });
        return {
            message: (0, constants_1.LangResponse)({ key: "success", lang, object: "login" }),
            data: { id: existUser.id, token: token },
        };
    }
    async logout({ device, lang, user }) {
        await this.prisma.authToken.deleteMany({
            where: {
                userId: user.id,
                deviceId: device.id
            }
        });
        this.l.info({
            message: `user logout successfuly with id ${user.id}`,
            data: user
        });
        return ({ message: (0, constants_1.LangResponse)({ lang, key: "success", object: "logout" }) });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        xconfig_1.XConfig,
        firebase_service_1.FirebaseService,
        log_1.LogService])
], AuthService);
//# sourceMappingURL=auth.service.js.map