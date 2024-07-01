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
const constants_1 = require("../../constants");
const file_1 = require("../../file");
const log_1 = require("../../log");
const prisma_1 = require("../../prisma");
const string_1 = require("../../utils/string");
const xconfig_1 = require("../../xconfig");
const project__types_1 = require("./project.@types");
const project_event_1 = require("./project.event");
let ProjectService = class ProjectService {
    constructor(prisma, fileService, config, ee, l) {
        this.prisma = prisma;
        this.fileService = fileService;
        this.config = config;
        this.ee = ee;
        this.l = l;
    }
    async create({ body, lang, user }) {
        const { thumbnail, file } = body;
        let Resource;
        let FileResource;
        await this.prisma.$transaction(async (prisma) => {
            if (thumbnail) {
                Resource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT, user });
            }
            const project = await prisma.project.create({
                data: {
                    ...body,
                    creatorId: user.id,
                    thumbnailId: !Array.isArray(Resource) && Resource ? Resource.id : undefined,
                },
            });
            if (file) {
                FileResource = await this.fileService.handleUploadObjectStorage({ fileName: file, prefix: this.config.env.OBJECT_STORAGE_PREFIX_PROJECT_FILE, user });
                if (Array.isArray(FileResource) && FileResource.length > 0) {
                    const { images, files } = FileResource.reduce((acc, resource) => {
                        if (resource.fileName.includes(".webp"))
                            acc.images.push({ resourceId: resource.id, projectId: project.id });
                        acc.files.push({ resourceId: resource.id, projectId: project.id });
                        return acc;
                    }, { images: [], files: [] });
                    await this.prisma.projectImage.createMany({ data: images });
                    await this.prisma.projectFile.createMany({ data: files });
                }
            }
            this.l.info({ message: `project with id ${project.id} created by userId ${user.id}` });
        });
        return { message: (0, constants_1.LangResponse)({ key: "created", lang, object: "project" }) };
    }
    async findAll({ lang, query, user }) {
        const { limit, orderBy, orderDirection, page, search } = query;
        const { result, ...rest } = await this.prisma.extended.project.paginate({
            where: {
                deletedAt: null, organizationId: null, creatorId: user.id,
                name: { contains: search, mode: "insensitive" }
            },
            include: {
                _count: {
                    select: { Tasks: true }
                },
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
            limit, page,
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection })
        });
        const data = result.map(({ id, name, createdAt, ProjectCollaborators, _count, priority }) => {
            const teams = ProjectCollaborators.map(({ User }) => {
                const resource = User.Resource;
                let thumbnail;
                if (resource) {
                    thumbnail = this.fileService.cdnUrl({ objectKey: resource.objectKey });
                }
                return {
                    userId: User.id,
                    username: User.username,
                    thumbnail
                };
            });
            return {
                id,
                createdAt,
                name,
                totalProject: _count.Tasks,
                priority,
                teams
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), data: data, ...rest };
    }
    async findOne({ lang, param: { id }, user }) {
        const projectExist = await this.prisma.project.findFirst({
            where: { id },
            include: {
                ProjectCollaborators: {
                    include: {
                        User: {
                            include: {
                                Resource: true
                            }
                        }
                    }
                }
            }
        });
        if (!projectExist)
            throw new common_1.HttpException((0, constants_1.LangResponse)({ key: "fetched", lang, object: "project" }), common_1.HttpStatus.NOT_FOUND);
        const { name, ProjectCollaborators } = projectExist;
        const collaboarators = ProjectCollaborators.map(({ User }) => {
            const { Resource, username } = User;
            let thumbnail;
            let blurHash;
            if (Resource && Resource.blurHash) {
                thumbnail = this.fileService.cdnUrl({ objectKey: Resource.objectKey });
                blurHash = Resource.blurHash;
            }
            return {
                userId: User.id,
                username,
                thumbnail,
                blurHash
            };
        });
        const data = {
            detailsProject: { id, name },
            collaboarators
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
                        if (!Array.isArray(newFileResource) && !newFileResource.fileName.includes("webp"))
                            await prisma.projectFile.create({ data: { resourceId: newFileResource.id, projectId: id } });
                        if (!Array.isArray(newFileResource) && newFileResource.fileName.includes("webp"))
                            await prisma.projectImage.create({ data: { resourceId: newFileResource.id, projectId: id } });
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
        const { limit, orderBy, orderDirection, page } = query;
        const { result, ...rest } = await this.prisma.extended.project.paginate({
            where: { id, deletedAt: null },
            include: {
                User: { include: { Resource: true } },
                ProjectAdmins: { include: { User: { include: { Resource: true } } } },
                ProjectCollaborators: { include: { User: { include: { Resource: true } } } }
            },
            orderBy: (0, string_1.dotToObject)({ orderBy, orderDirection }),
            limit, page
        });
        const data = result.map(({ User, ProjectAdmins, ProjectCollaborators, creatorId }) => {
            const { Resource, updatedAt, name } = User;
            const adminIds = new Set(ProjectAdmins.map(({ userId }) => { return userId; }));
            const collaborators = ProjectCollaborators.map(({ User, userId }) => {
                const { Resource, updatedAt, name } = User;
                return {
                    userId: User.id,
                    name,
                    role: adminIds.has(userId) ? project__types_1.ProjectRole.ADMIN : project__types_1.ProjectRole.COLLABORATOR,
                    thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                    blurHash: Resource?.blurHash,
                    updatedAt
                };
            });
            return {
                detailOwner: {
                    userId: creatorId,
                    name,
                    role: project__types_1.ProjectRole.OWNER,
                    thumbnail: Resource?.objectKey ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
                    blurHash: Resource?.blurHash,
                    updatedAt
                },
                collaborators
            };
        });
        return { message: (0, constants_1.LangResponse)({ key: "fetched", lang, object: "collaborator" }), data: data, ...rest };
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