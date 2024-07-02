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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("../../../constants");
const file_1 = require("../../../file");
const log_1 = require("../../../log");
const prisma_1 = require("../../../prisma");
const string_1 = require("../../../utils/string");
const xconfig_1 = require("../../../xconfig");
const project_event_1 = require("./project.event");
let ProjectService = class ProjectService {
    constructor(prisma, fileService, config, ee, l) {
        this.prisma = prisma;
        this.fileService = fileService;
        this.config = config;
        this.ee = ee;
        this.l = l;
    }
    async create({ body, lang, user, param: { organizationId } }) {
        const { thumbnail, file, tagId, ...rest } = body;
        let Resource;
        let FileResource;
        await this.prisma.$transaction(async (prisma) => {
            if (thumbnail) {
                Resource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT, user });
            }
            const project = await prisma.project.create({
                data: {
                    ...rest,
                    creatorId: user.id,
                    organizationId,
                    thumbnailId: !Array.isArray(Resource) && Resource ? Resource.id : undefined,
                },
            });
            if (tagId) {
                await prisma.projectTag.create({
                    data: {
                        tagId, projectId: project.id
                    }
                });
            }
            if (file) {
                FileResource = await this.fileService.handleUploadObjectStorage({ fileName: file, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE, user });
                if (Array.isArray(FileResource) && FileResource.length > 0) {
                    await prisma.projectFile.createMany({
                        data: FileResource.map(({ id }) => ({
                            projectId: project.id,
                            resourceId: id
                        }))
                    });
                }
            }
            this.l.info({ message: `project with id ${project.id} created by userId ${user.id}` });
        });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "project" }) };
    }
    async findAll({ lang, query, user, param: { organizationId } }) {
        const { limit, orderDirection, page, search } = query;
        let orderBy = (0, string_1.dotToObject)({ orderBy: query.orderBy, orderDirection });
        if (query.orderBy === "createdAtLastChat") {
            orderBy = { LastChat: (0, string_1.dotToObject)({ orderBy: query.orderBy, orderDirection }) };
        }
        const { result, ...rest } = await this.prisma.extended.project.paginate({
            where: {
                deletedAt: null, organizationId, creatorId: user.id,
                name: { contains: search, mode: "insensitive" }
            },
            include: {
                _count: {
                    select: { Tasks: true }
                },
                User: { include: { Resource: true } },
                ProjectCollaborators: {
                    include: {
                        User: {
                            include: {
                                Resource: true
                            },
                        },
                    }
                },
            },
            limit, page, orderBy
        });
        const data = result.map(({ id, name, createdAt, ProjectCollaborators, _count, priority, User }) => {
            const { Resource } = User;
            const teams = ProjectCollaborators.map(({ User }) => {
                const resource = User.Resource;
                let thumbnail;
                if (resource) {
                    thumbnail = this.fileService.cdnUrl({ objectKey: resource.objectKey });
                }
                return {
                    userId: User.id,
                    name: User.name,
                    thumbnail
                };
            });
            return {
                id,
                createdAt,
                name,
                totalProject: _count.Tasks,
                priority,
                teams: [{
                        userId: User.id,
                        name: User.name,
                        thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                        blurHash: Resource ? Resource.blurHash : undefined
                    }, ...teams]
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), data: data, ...rest };
    }
    async findOne({ lang, param: { id, organizationId }, user }) {
        const projectExist = await this.prisma.project.findFirst({
            where: { id },
            include: {
                _count: { select: { Tasks: true } },
                Tasks: {
                    include: {}
                },
                ProjectAdmins: {
                    include: {
                        User: {
                            include: {
                                Resource: true
                            }
                        }
                    }
                },
            }
        });
        if (!projectExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), common_1.HttpStatus.NOT_FOUND);
        const { name, ProjectAdmins, creatorId, _count } = projectExist;
        const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId; }));
        const data = {
            detailsProject: { id, name, totalTask: _count.Tasks },
            detailUser: {
                userId: user.id,
                name: user.name,
                role: adminIds.has(user.id) ? (0, constants_1.LangWord)({ key: "admin", lang }) : (user.id === creatorId ? (0, constants_1.LangWord)({ key: "owner", lang }) : (0, constants_1.LangWord)({ key: "member", lang }))
            },
        };
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), data };
    }
    async update({ body, lang, param: { id }, user }) {
        return this.prisma.$transaction(async (prisma) => {
            const projectExist = await prisma.project.findFirst({
                where: { id, deletedAt: null, creatorId: user.id },
                include: { Resource: true, ProjectFiles: { include: { Resource: true } } }
            });
            if (!projectExist)
                throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), common_1.HttpStatus.NOT_FOUND);
            const { thumbnail, file } = body;
            let newResource;
            if (thumbnail) {
                newResource = await this.fileService.handleUploadObjectStorage({
                    fileName: thumbnail,
                    prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT,
                    user
                });
                const oldResource = projectExist.Resource ? projectExist.Resource : undefined;
                if (oldResource) {
                    this.ee.emit(project_event_1.UpdatedProjectEvent.key, new project_event_1.UpdatedProjectEvent({ newResource, oldResource }));
                }
            }
            if (file && file.length < 0) {
                let OldFileResource = projectExist.ProjectFiles.map(({ Resource }) => Resource);
                this.ee.emit(project_event_1.DeletedProjectFilesEvent.key, new project_event_1.DeletedProjectFilesEvent({ oldResource: OldFileResource }));
            }
            if (file && file.length > 0) {
                const project = await prisma.project.findFirst({
                    where: { id, deletedAt: null },
                    include: { ProjectFiles: { include: { Resource: true } } }
                });
                const objectKey = new Set(project?.ProjectFiles.map(({ Resource }) => Resource.fileName));
                await Promise.all(file.map(async (fileName) => {
                    const fileRes = objectKey.has(fileName);
                    if (!fileRes) {
                        const newFileResource = await this.fileService.handleUploadObjectStorage({
                            fileName,
                            prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE,
                            user
                        });
                        if (!Array.isArray(newFileResource))
                            await prisma.projectFile.create({ data: { resourceId: newFileResource.id, projectId: id } });
                    }
                }));
            }
            await prisma.project.update({
                where: { id, creatorId: user.id },
                data: {
                    ...body,
                    thumbnailId: !Array.isArray(newResource) && newResource ? newResource.id : undefined
                }
            });
            this.l.info({ message: `project with id ${id} updated by userId ${user.id}` });
            return { message: (0, constants_1.LangResponse)({ key: "updated", lang, object: "project" }) };
        });
    }
    async remove({ lang, param: { id }, user }) {
        const projectExist = await this.prisma.project.findFirst({ where: { id, deletedAt: null } });
        if (!projectExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "notFound", lang, object: "project" }), common_1.HttpStatus.NOT_FOUND);
        await this.prisma.project.update({ where: { id, creatorId: user.id }, data: { deletedAt: (0, dayjs_1.default)().toISOString() } });
        this.l.info({ message: `project with id ${id} deleted by userId ${user.id}` });
        return { message: (0, constants_1.LangResponse)({ key: "deleted", lang, object: "project" }) };
    }
    async findAllCollaborator({ lang, param: { id }, query }) {
        const { limit, orderDirection, page, search } = query;
        const orderBy = { User: (0, string_1.dotToObject)({ orderBy: query.orderBy, orderDirection }) };
        const { result, ...rest } = await this.prisma.extended.project.paginate({
            where: { id },
            limit, page,
            orderBy,
            include: {
                User: { include: { Resource: true } },
                ProjectAdmins: { include: { User: { include: { Resource: true } } } },
                ProjectCollaborators: { include: { User: { include: { Resource: true } } } }
            }
        });
        const data = result.map(({ ProjectAdmins, ProjectCollaborators, User }) => {
            const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId; }));
            const collaborators = ProjectCollaborators.map(({ User }) => {
                const { Resource, name, updatedAt } = User;
                return {
                    userId: User.id,
                    name,
                    role: adminIds.has(id) ? (0, constants_1.LangWord)({ key: "admin", lang }) : (0, constants_1.LangWord)({ key: "member", lang }),
                    thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                    blurhash: Resource ? Resource.blurHash : undefined,
                    updatedAt,
                };
            });
            const { Resource, name, updatedAt } = User;
            return {
                userId: User.id,
                name: name,
                thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                blurhash: Resource ? Resource.blurHash : undefined,
                role: (0, constants_1.LangWord)({ key: "owner", lang }),
                updatedAt: updatedAt,
                ...collaborators
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "collaborator" }), data: data, ...rest };
    }
    async adminGuard({ projectId, userId, lang }) {
        const isAdmin = await this.prisma.projectAdmin.findFirst({ where: { projectId, userId } });
        const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId } });
        if (!isAdmin && !isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "collaborator" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
    async ownerGuard({ projectId, userId, lang }) {
        const isOwner = await this.prisma.project.findFirst({ where: { id: projectId, creatorId: userId } });
        if (!isOwner)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "unauthorize", lang, object: "collaborator" }), common_1.HttpStatus.UNAUTHORIZED);
        return true;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        file_1.FileService,
        xconfig_1.XConfig,
        event_emitter_1.EventEmitter2,
        log_1.LogService])
], ProjectService);
//# sourceMappingURL=project.service.js.map