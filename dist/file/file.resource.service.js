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
exports.ResourceService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const decorators_1 = require("@nestjs/common/decorators");
const xconfig_1 = require("../xconfig");
const zod_1 = require("zod");
const prisma_service_1 = require("../prisma/prisma.service");
let ResourceService = class ResourceService {
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
        this.s3Client = new client_s3_1.S3Client({
            region: this.config.env.OBJECT_STORAGE_REGION || 'localhost',
            credentials: {
                accessKeyId: this.config.env.OBJECT_STORAGE_ACCESS_KEY_ID,
                secretAccessKey: this.config.env.OBJECT_STORAGE_SECRET_ACCESS_KEY
            },
            endpoint: this.config.env.OBJECT_STORAGE_ENDPOINT,
            forcePathStyle: this.config.env.OBJECT_STORAGE_FORCE_PATH_STYLE
        });
    }
    async add(objectStorageInfo) {
        const { objectKey } = objectStorageInfo;
        const resource = await this.prisma.resource.findFirst({
            where: { objectKey }
        });
        if (resource)
            return resource;
        const newResource = await this.prisma.resource.create({
            data: {
                ...objectStorageInfo,
            }
        });
        return newResource;
    }
    async getResource(param) {
        if (zod_1.z.string().uuid().safeParse(param).success)
            return await this.prisma.resource.findFirst({
                where: { id: param, deletedAt: null },
            });
        return await this.prisma.resource.findFirst({
            where: { fileName: param, deletedAt: null }
        });
    }
    async getResourceByObjectkey(objectKey) {
        return await this.prisma.resource.findFirst({
            where: {
                objectKey
            },
        });
    }
    async getChildResourceByObjectkey(objectKey) {
        return await this.prisma.resource.findFirst({
            where: {
                objectKey
            },
            include: {
                childResources: true
            }
        });
    }
    async removeObjectFromStorage(resource) {
        const resources = Array.isArray(resource) ? resource : [resource];
        const deletePromises = resources.map(({ objectKey }) => {
            this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
                Key: objectKey,
            }));
        });
        await Promise.all(deletePromises);
    }
    async updateObjectUrl(resource) {
        const resources = Array.isArray(resource) ? resource : [resource];
        const updateOperations = resources.map((res) => {
            return this.prisma.resource.update({
                where: { id: res.id },
                data: { objectUrl: res.objectUrl },
            });
        });
        await this.prisma.$transaction(updateOperations);
    }
    async deleteResource(resource) {
        const resources = Array.isArray(resource) ? resource : [resource];
        const deleteOperations = resources.map(res => {
            return this.prisma.resource.delete({
                where: { id: res.id },
            });
        });
        await this.prisma.$transaction(deleteOperations);
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [xconfig_1.XConfig,
        prisma_service_1.PrismaService])
], ResourceService);
//# sourceMappingURL=file.resource.service.js.map