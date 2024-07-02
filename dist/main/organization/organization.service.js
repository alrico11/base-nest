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
const organization__types_1 = require("./organization.@types");
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
            resource = await this.fileService.handleUploadObjectStorage({ user, prefix, fileName: thumbnail });
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
        return { message: (0, constants_1.LangResponse)({ key: 'created', lang, object: 'organization' }) };
    }
    async findAll({ lang, query, user }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const condition = {
            deletedAt: null,
            name: { contains: search },
            OR: [
                { creatorId: user.id },
                { OrganizationMembers: { some: { userId: user.id } } }
            ]
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
                id, name, description, thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined, blurHash: Resource?.blurHash
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: 'fetched', lang, object: 'organization' }), data: data, ...rest };
    }
    async findOne({ lang, param: { id }, user }) {
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id, deletedAt: null },
            include: {
                Resource: true,
                OrganizationMembers: {
                    include: {
                        User: true
                    }
                },
                OrganizationAdmin: {
                    include: {
                        User: true
                    }
                },
                Creator: true,
            }
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "ORGANIZATION" }), common_1.HttpStatus.NOT_FOUND);
        const { OrganizationAdmin, Creator, description, name, Resource, OrganizationMembers } = organizationExist;
        if (OrganizationMembers.length === 0 && Creator.id !== user.id)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        const detailOrganization = {
            id: organizationExist.id,
            name,
            description,
            thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
            blurHash: Resource ? Resource.blurHash : undefined
        };
        const adminIds = new Set(OrganizationAdmin.map(({ userId }) => { return userId; }));
        const detailUser = {
            id: user.id,
            name: user.name,
            role: adminIds.has(user.id) ? organization__types_1.EnumRoleOrganization.ADMIN : (Creator.id === user.id ? organization__types_1.EnumRoleOrganization.OWNER : organization__types_1.EnumRoleOrganization.MEMBER)
        };
        return { message: (0, constants_1.LangResponse)({ key: 'fetched', object: 'organization', lang }), data: { detailOrganization, detailUser } };
    }
    async update({ body, lang, param: { id }, user }) {
        const { name, description, thumbnail } = body;
        let newResource;
        let oldResource;
        await this.adminGuard({ lang, organizationId: id, userId: user.id });
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id },
            include: { Resource: true }
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'organization' }), common_1.HttpStatus.NOT_FOUND);
        if (thumbnail) {
            const prefix = this.config.env.OBJECT_STORAGE_PREFIX_ORGANIZATION;
            newResource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix, user });
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
        return { message: (0, constants_1.LangResponse)({ key: "updated", lang, object: "organization" }) };
    }
    async remove({ param: { id }, lang, user }) {
        await this.ownerGuard({ lang, organizationId: id, userId: user.id });
        const organizationExist = await this.prisma.organization.findFirst({
            where: { id, deletedAt: null },
        });
        if (!organizationExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: 'notFound', lang, object: 'organization' }), common_1.HttpStatus.NOT_FOUND);
        if (organizationExist.creatorId !== user.id)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang }), common_1.HttpStatus.UNAUTHORIZED);
        await this.prisma.organization.update({
            where: { id, creatorId: user.id },
            data: { deletedAt: (0, dayjs_1.default)().toISOString() }
        });
        this.l.info({
            message: `organization with id ${id} deleted successfully by userId ${user.id}`
        });
        return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: "organization" }) };
    }
    async findAllMember({ query, lang, param: { id }, user }) {
        const { limit, orderBy, orderDirection, page } = query;
        const { result, ...rest } = await this.prisma.extended.organization.paginate({
            where: {
                id, deletedAt: null,
                OR: [
                    { creatorId: user.id },
                    { OrganizationMembers: { some: { userId: user.id } } }
                ]
            },
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection }),
            limit, page,
            include: {
                OrganizationAdmin: { include: { User: { include: { Resource: true } } } },
                OrganizationMembers: { include: { User: { include: { Resource: true } } } },
                Creator: { include: { Resource: true } }
            }
        });
        const data = result.map(({ OrganizationAdmin, OrganizationMembers, Creator }) => {
            const adminIds = new Set(OrganizationAdmin.map(({ userId }) => userId));
            const { Resource } = Creator;
            const members = OrganizationMembers.map(({ User }) => {
                const { id, name, updatedAt, Resource } = User;
                return {
                    userId: id,
                    name: name,
                    role: adminIds.has(id) ? organization__types_1.EnumRoleOrganization.ADMIN : organization__types_1.EnumRoleOrganization.MEMBER,
                    thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                    blurHash: Resource?.blurHash,
                    updatedAt: updatedAt
                };
            });
            return {
                userDetails: {
                    userId: user.id,
                    name: user.name,
                    role: adminIds.has(user.id) ? organization__types_1.EnumRoleOrganization.ADMIN : organization__types_1.EnumRoleOrganization.MEMBER
                },
                members: [
                    {
                        name: Creator.name,
                        userId: Creator.id,
                        role: organization__types_1.EnumRoleOrganization.OWNER,
                        thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                        blurHash: Resource?.blurHash,
                        updatedAt: Creator.updatedAt,
                    },
                    ...members
                ]
            };
        })[0];
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "organization" }), data: data, ...rest };
    }
    async adminGuard({ organizationId, userId, lang }) {
        const isAdmin = await this.prisma.organizationAdmin.findFirst({ where: { organizationId, userId } });
        const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } });
        if (!isAdmin && !isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "user" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
    async ownerGuard({ organizationId, userId, lang }) {
        const isOwner = await this.prisma.organization.findFirst({ where: { id: organizationId, creatorId: userId } });
        if (!isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "user" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
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