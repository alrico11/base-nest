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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../../constants");
const file_1 = require("../../file");
const prisma_1 = require("../../prisma");
const xconfig_1 = require("../../xconfig");
let UserService = class UserService {
    constructor(prisma, config, fileService) {
        this.prisma = prisma;
        this.config = config;
        this.fileService = fileService;
    }
    async create({ body, device, lang }) {
        const { email, username, password, repeatPassword, ...rest } = body;
        const userExist = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
        if (userExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "alreadRegistered", lang, object: "USER" }), common_1.HttpStatus.CONFLICT);
        if (password !== repeatPassword)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "badRequest", lang }), common_1.HttpStatus.BAD_REQUEST);
        const user = await this.prisma.user.create({ data: { email, username, password: (0, bcrypt_1.hashSync)(password, 12), ...rest } });
        const { USER_JWT_SECRET } = this.config.env;
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, USER_JWT_SECRET, {});
        await this.prisma.authToken.create({ data: { token, deviceId: device.id, userId: user.id } });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "user" }), statusCode: common_1.HttpStatus.CREATED, data: { userId: user.id, email: user.email, token, name: user.name } };
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        xconfig_1.XConfig,
        file_1.FileService])
], UserService);
//# sourceMappingURL=user.service.js.map