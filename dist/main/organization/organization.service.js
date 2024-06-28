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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("../../constants");
const file_1 = require("../../file");
const log_1 = require("../../log");
const prisma_1 = require("../../prisma");
const string_1 = require("../../utils/string");
const xconfig_1 = require("../../xconfig");
const organization_event_1 = require("./organization.event");
let OrganizationService = class OrganizationService {
    constructor(prisma, fileService, config, l, ee) {
        this.prisma = prisma;
        this.fileService = fileService;
        this.config = config;
        this.l = l;
        this.ee = ee;
    }
    async create({ body, user, lang }) {
        const { name, description, thumbnail } = body;
        let resource;
        if (thumbnail) {
            const prefix = this.config.env.OBJECT_STORAGE_PREFIX_ORGANIZATION;
            resource = await this.fileService.compressAndUploadObjectStorage({ user, prefix, fileName: thumbnail });
        }
        const data = await this.prisma.organization.create({
            data: {
                name: name,
                description: description ? description : undefined,
                thumbnailId: !Array.isArray(resource) && resource ? resource.id : undefined,
                creatorId: user.id
            }
        });
        this.l.info({
            message: `organization with id ${data.id} created successfully by userId ${user.id}`
        });
        return { message: (0, constants_1.LangResponse)({ key: 'created', lang, object: 'ORGANIZATION' }) };
    }
    async findAll({ lang, query }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const condition = {
            deletedAt: null,
            name: { contains: search },
        };
        const { result, ...rest } = await this.prisma.extended.organization.paginate({
            where: condition,
            limit,
            page,
            include: { Resource: true },
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection })
        });
        const data = result.map(({ description, id, name, Resource }) => {
            return {
                id, name, description, thumbnail: Resource?.objectUrl, blurHash: Resource?.blurHash
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: 'fetched', lang, object: 'ORGANIZATION' }), data: data, ...rest };
    }
    async findOne({ lang, param: { id }, user }) {
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id, deletedAt: null },
            include: {
                Resource: true,
                OrganizationAdmin: {
                    include: {
                        User: true
                    }
                },
                Creator: true
            }
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "ORGANIZATION" }), common_1.HttpStatus.NOT_FOUND);
        const { OrganizationAdmin, Creator, description, name, Resource } = organizationExist;
        const data = OrganizationAdmin.map(({ User }) => {
            return {
                organizationId: id,
                isAdmin: user.id === User.id,
                isOwner: user.id === Creator.id,
                organizationName: name,
                description,
                thumbnail: Resource?.objectUrl,
                blurHash: Resource?.blurHash
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: 'fetched', object: 'ORGANIZATION', lang }), data };
    }
    async update({ body, lang, param: { id }, user }) {
        const { name, description, thumbnail } = body;
        let newResource;
        let oldResource;
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id },
            include: { Resource: true }
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'ORGANIZATION' }), common_1.HttpStatus.NOT_FOUND);
        if (organizationExist.creatorId !== user.id)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        if (thumbnail) {
            const prefix = this.config.env.OBJECT_STORAGE_PREFIX_ORGANIZATION;
            newResource = await this.fileService.compressAndUploadObjectStorage({ fileName: thumbnail, prefix, user });
            if (organizationExist.Resource)
                oldResource = organizationExist.Resource;
        }
        if (!Array.isArray(newResource) && newResource && oldResource) {
            this.ee.emit(organization_event_1.OrganizationUpdatedEvent.key, new organization_event_1.OrganizationUpdatedEvent({ newResource, oldResource }));
        }
        await this.prisma.organization.update({
            where: { id },
            data: {
                name,
                description,
                thumbnailId: !Array.isArray(newResource) && newResource ? newResource.id : undefined
            }
        });
        this.l.info({
            message: `organization with id ${id} udpated by userId ${user.id}`
        });
        return { message: (0, constants_1.LangResponse)({ key: "updated", lang, object: "ORGANIZATION" }) };
    }
    async remove({ param: { id }, lang, user }) {
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id, deletedAt: null },
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'ORGANIZATION' }), common_1.HttpStatus.NOT_FOUND);
        if (organizationExist.creatorId !== user.id)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        await this.prisma.organization.update({
            where: { id, creatorId: user.id },
            data: { deletedAt: (0, dayjs_1.default)().toISOString() }
        });
        this.l.info({
            message: `organization with id ${id} deleted successfully by userId ${user.id}`
        });
        return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: "ORGANIZATION" }) };
    }
    async findAllMember({ query, lang, param: { id } }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const { result, ...rest } = await this.prisma.extended.organization.paginate({
            where: { id, name: { contains: search, mode: "insensitive" }, deletedAt: null },
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection }),
            limit, page,
            include: {
                OrganizationAdmin: { include: { User: true } },
                OrganizationMembers: { include: { User: true } },
                Creator: true
            }
        });
        const data = result.map(({ OrganizationAdmin, OrganizationMembers, Creator }) => {
            const admin = OrganizationAdmin.map(({ User }) => {
                const { id, name, updatedAt } = User;
                return {
                    userId: id,
                    name: name,
                    isAdmin: true,
                    updatedAt: updatedAt
                };
            });
            const member = OrganizationMembers.map(({ User }) => {
                const { id, name, updatedAt } = User;
                return {
                    userId: id,
                    name: name,
                    isAdmin: false,
                    updatedAt: updatedAt
                };
            });
            return {
                owner: {
                    name: Creator.name,
                    updatedAt: Creator.updatedAt,
                    isOwner: true
                },
                members: [...admin, ...member]
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "ORGANIZATION" }), data: data, ...rest };
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        file_1.FileService,
        xconfig_1.XConfig,
        log_1.LogService,
        event_emitter_1.EventEmitter2])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map