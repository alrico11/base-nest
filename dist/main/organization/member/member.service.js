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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const log_1 = require("../../../log");
const prisma_1 = require("../../../prisma");
const organization_service_1 = require("../organization.service");
let MemberService = class MemberService {
    constructor(prisma, l, organization) {
        this.prisma = prisma;
        this.l = l;
        this.organization = organization;
    }
    async create({ body, lang, param: { id }, user }) {
        const { userId } = body;
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "member" }), common_1.HttpStatus.NOT_FOUND);
            const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
            if (userJoined)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "alreadyJoin", lang, object: "member" }), common_1.HttpStatus.CONFLICT);
            await this.adminGuard({ lang, organizationId: id, userId: user.id });
            await prisma.organizationMember.create({
                data: {
                    organizationId: id,
                    userId: userId,
                    addedById: user.id
                }
            });
            return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: 'member' }) };
        });
        this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
        return result;
    }
    async remove({ param: { id }, body: { userId }, user, lang }) {
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "member" }), common_1.HttpStatus.NOT_FOUND);
            const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
            const adminJoined = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
            if (userJoined)
                await this.adminGuard({ lang, organizationId: id, userId: user.id });
            await prisma.organizationMember.delete({
                where: {
                    organizationId_userId: { organizationId: id, userId }
                }
            });
            if (adminJoined)
                await this.ownerGuard({ lang, organizationId: id, userId: user.id });
            await prisma.organizationAdmin.delete({
                where: {
                    organizationId_userId: { organizationId: id, userId }
                }
            });
            if (!adminJoined && !userJoined)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notJoin", lang, object: "member" }), common_1.HttpStatus.BAD_REQUEST);
            return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: 'member' }) };
        });
        this.l.info({ message: `userId ${userId} deleted successfully in organizationId ${id} by user id${user.id}` });
        return result;
    }
    async addAdmin({ body, lang, param: { id }, user }) {
        const { userId } = body;
        await this.ownerGuard({ lang, organizationId: id, userId: user.id });
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "member" }), common_1.HttpStatus.NOT_FOUND);
            const userJoined = await prisma.organizationMember.findFirst({ where: { organizationId: id, userId } });
            if (!userJoined)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notJoin", lang, object: "member" }), common_1.HttpStatus.BAD_REQUEST);
            const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
            if (alreadyAdmin)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "alreadyJoin", lang, object: "member" }), common_1.HttpStatus.CONFLICT);
            await prisma.organizationMember.delete({
                where: {
                    organizationId_userId: { organizationId: id, userId }
                }
            });
            await prisma.organizationAdmin.create({
                data: {
                    organizationId: id,
                    userId: userId,
                    addedById: user.id
                }
            });
            return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: 'member' }) };
        });
        this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
        return result;
    }
    async removeAdmin({ body, lang, param: { id }, user }) {
        const { userId } = body;
        await this.adminGuard({ lang, organizationId: id, userId: user.id });
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "member" }), common_1.HttpStatus.NOT_FOUND);
            const alreadyAdmin = await prisma.organizationAdmin.findFirst({ where: { organizationId: id, userId } });
            if (!alreadyAdmin)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "member" }), common_1.HttpStatus.NOT_FOUND);
            await prisma.organizationAdmin.delete({
                where: {
                    organizationId_userId: { organizationId: id, userId }
                }
            });
            await prisma.organizationMember.create({
                data: {
                    organizationId: id,
                    userId: userId,
                    addedById: user.id
                }
            });
            return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: 'member' }) };
        });
        this.l.info({ message: `userId ${userId} joined successfully in organizationId ${id} by user id${user.id}` });
        return result;
    }
    async adminGuard({ organizationId, userId, lang }) {
        const isAdmin = await this.prisma.organizationAdmin.findFirst({ where: { organizationId, userId } });
        const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } });
        if (!isAdmin || !isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "organization" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
    async ownerGuard({ organizationId, userId, lang }) {
        const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } });
        if (!isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "organization" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_1.LogService,
        organization_service_1.OrganizationService])
], MemberService);
//# sourceMappingURL=member.service.js.map