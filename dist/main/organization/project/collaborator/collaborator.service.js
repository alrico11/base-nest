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
exports.CollaboratorService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const log_1 = require("../../../../log");
const prisma_1 = require("../../../../prisma");
let CollaboratorService = class CollaboratorService {
    constructor(prisma, l) {
        this.prisma = prisma;
        this.l = l;
    }
    async addCollaborator({ body, param: { id }, user, lang }) {
        const { userId } = body;
        await this.adminGuard({ lang, projectId: id, userId: user.id });
        const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
        if (!userExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "collaborator" }), common_1.HttpStatus.NOT_FOUND);
        const collaboratorExist = await this.prisma.projectCollaborator.findFirst({ where: { userId: body.userId, projectId: id } });
        if (!collaboratorExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "alreadyJoin", lang, object: "alreadyCollaborator" }), common_1.HttpStatus.CONFLICT);
        await this.prisma.projectCollaborator.create({
            data: {
                ...body,
                projectId: id,
                addedById: user.id
            }
        });
        this.l.info({ message: `userId ${userId} joined successfully in projectId ${id} by user id${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "collaborator" }) };
    }
    async addAdmin({ body, lang, param: { id }, user }) {
        const { userId } = body;
        await this.ownerGuard({ lang, projectId: id, userId: user.id });
        const userExist = await this.prisma.user.findFirst({ where: { id: userId } });
        if (!userExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "user" }), common_1.HttpStatus.NOT_FOUND);
        const userJoined = await this.prisma.projectCollaborator.findFirst({ where: { projectId: id, userId } });
        if (!userJoined)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notJoin", lang, object: "collaborator" }), common_1.HttpStatus.BAD_REQUEST);
        const alreadyAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });
        if (alreadyAdmin)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "alreadyJoin", lang, object: "admin" }), common_1.HttpStatus.CONFLICT);
        await this.prisma.projectAdmin.create({
            data: {
                ...body,
                addedById: user.id,
                projectId: id
            }
        });
        this.l.info({ message: `userId ${userId} update role to admin successfully in projectId ${id} by user id${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "admin" }) };
    }
    async removeAdmin({ body, lang, param: { id }, user }) {
        const { userId } = body;
        await this.adminGuard({ lang, projectId: id, userId: user.id });
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "user" }), common_1.HttpStatus.NOT_FOUND);
            const alreadyAdmin = await prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });
            if (!alreadyAdmin)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "collaborator" }), common_1.HttpStatus.NOT_FOUND);
            await prisma.projectAdmin.delete({
                where: {
                    projectId_userId: { projectId: id, userId }
                }
            });
            return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: 'collaborator' }) };
        });
        this.l.info({ message: `userId ${userId} joined successfully in projectId ${id} by user id${user.id}` });
        return result;
    }
    async removeCollaborator({ param: { id }, body: { userId }, user, lang }) {
        const result = await this.prisma.$transaction(async (prisma) => {
            const userExist = await prisma.user.findFirst({ where: { id: userId } });
            if (!userExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "collaborator" }), common_1.HttpStatus.NOT_FOUND);
            const userJoined = await prisma.projectCollaborator.findFirst({ where: { projectId: id, userId } });
            const adminJoined = await prisma.projectAdmin.findFirst({ where: { projectId: id, userId } });
            if (userJoined)
                await this.adminGuard({ lang, projectId: id, userId: user.id });
            await prisma.projectCollaborator.delete({
                where: {
                    projectId_userId: { projectId: id, userId }
                }
            });
            if (adminJoined)
                await this.ownerGuard({ lang, projectId: id, userId: user.id });
            await prisma.projectCollaborator.delete({
                where: {
                    projectId_userId: { projectId: id, userId }
                }
            });
            if (!adminJoined && !userJoined)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notJoin", lang, object: "collaborator" }), common_1.HttpStatus.BAD_REQUEST);
            return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: 'collaborator' }) };
        });
        this.l.info({ message: `userId ${userId} deleted successfully in projectId ${id} by user id${user.id}` });
        return result;
    }
    async adminGuard({ projectId, userId, lang }) {
        const isAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId, userId } });
        const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId } });
        if (!isAdmin || !isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "collaborator" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
    async ownerGuard({ projectId, userId, lang }) {
        const isOwner = await this.prisma.organization.findFirst({ where: { id: projectId, creatorId: userId } });
        if (!isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "collaborator" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
};
exports.CollaboratorService = CollaboratorService;
exports.CollaboratorService = CollaboratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        log_1.LogService])
], CollaboratorService);
//# sourceMappingURL=collaborator.service.js.map