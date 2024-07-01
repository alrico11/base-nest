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
exports.FileService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const decorators_1 = require("@nestjs/common/decorators");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const blurhash_1 = require("blurhash");
const fs_1 = require("fs");
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const xconfig_1 = require("../xconfig");
const url_1 = require("url");
const file_resource_service_1 = require("./file.resource.service");
let FileService = class FileService {
    constructor(config, resourceService) {
        this.config = config;
        this.resourceService = resourceService;
        this.sanitizeFileName = (fileName) => fileName.replace(/[^a-zA-Z0-9.-]/g, '');
        this.handleUpload = (file) => ({ fileName: file.filename });
        const env = this.config.env;
        this.s3Client = new client_s3_1.S3Client({
            region: env.OBJECT_STORAGE_REGION,
            credentials: {
                accessKeyId: env.OBJECT_STORAGE_ACCESS_KEY_ID,
                secretAccessKey: env.OBJECT_STORAGE_SECRET_ACCESS_KEY,
            },
            endpoint: env.OBJECT_STORAGE_ENDPOINT,
            forcePathStyle: env.OBJECT_STORAGE_FORCE_PATH_STYLE,
        });
    }
    findFile({ user, fileName }) {
        const filePath = (0, path_1.join)(this.config.env.TMP_FILE_PATH, 'user', user.id, this.sanitizeFileName(fileName));
        if (!(0, fs_1.existsSync)(filePath))
            throw new exceptions_1.HttpException({ message: 'file not found' }, enums_1.HttpStatus.NOT_FOUND);
        return filePath;
    }
    async compressImage(filePath, options) {
        const parsedFilePath = (0, path_1.parse)(filePath);
        const outputFileDir = (0, path_1.join)(this.config.env.TMP_FILE_PATH, 'sharp');
        const outputFilePath = (0, path_1.join)(outputFileDir, `${parsedFilePath.name}.webp`);
        if (!(0, fs_1.existsSync)(outputFileDir))
            (0, fs_1.mkdirSync)(outputFileDir, { recursive: true });
        const { data, info } = await (0, sharp_1.default)(filePath).resize(options?.width || this.config.env.DEFAULT_IMAGE_COMPRESSION_WIDTH, options?.height || this.config.env.DEFAULT_IMAGE_COMPRESSION_HEIGHT, { fit: 'cover', position: sharp_1.default.strategy.entropy, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        (0, sharp_1.default)(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).toFile(outputFilePath);
        const blurHash = (0, blurhash_1.encode)(new Uint8ClampedArray(data), info.width, info.height, this.config.env.BLURHASH_COMPONENT_X, this.config.env.BLURHASH_COMPONENT_Y);
        return {
            outputFilePath, blurHash
        };
    }
    async uploadToObjectStorage({ filePath, prefix, fileName, blurHash, contentType }) {
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new exceptions_1.HttpException({ message: 'File not found' }, enums_1.HttpStatus.NOT_FOUND);
        }
        const originalFileName = (0, path_1.basename)(filePath);
        const { size } = (0, fs_1.statSync)(filePath);
        const objectKey = (0, path_1.join)(prefix, fileName || originalFileName);
        let metadata;
        if (contentType.startsWith('image/')) {
            metadata = await (0, sharp_1.default)(filePath).metadata();
        }
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
            Key: objectKey,
            Body: (0, fs_1.readFileSync)(filePath),
            ACL: 'public-read',
            ContentType: contentType,
        }));
        const resource = await this.resourceService.add({
            blurHash: contentType.startsWith('image/') ? blurHash : undefined,
            objectKey: objectKey,
            fileName: fileName || originalFileName,
            fileType: contentType,
            fileSize: size,
            metadata: metadata,
            objectUrl: this.resolve({ fileName: fileName || originalFileName, prefix }),
        });
        return resource;
    }
    async removeObjectFromStorage(objectKey) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
            Key: objectKey,
        }));
    }
    async fetchObject(objectKey) {
        await this.s3Client.send(new client_s3_1.GetObjectCommand({
            Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
            Key: objectKey
        }));
    }
    async getTmpFile({ param, response, user }) {
        const { fileName, userId } = param;
        if (user.id !== userId)
            throw new exceptions_1.HttpException("unauthorized", enums_1.HttpStatus.UNAUTHORIZED);
        const filePath = (0, path_1.join)(this.config.env.TMP_FILE_PATH, 'user', userId, this.sanitizeFileName(fileName));
        if (!(0, fs_1.existsSync)(filePath))
            throw new exceptions_1.HttpException({ message: 'file not found' }, enums_1.HttpStatus.NOT_FOUND);
        const contentType = mime_types_1.default.lookup(filePath);
        if (contentType === false)
            throw new exceptions_1.HttpException({ message: 'unrecognized file type' }, enums_1.HttpStatus.AMBIGUOUS);
        const fileStream = (0, fs_1.createReadStream)(filePath);
        response.setHeader('Content-Type', contentType);
        fileStream.pipe(response);
    }
    resolve({ fileName, prefix }) {
        return (0, url_1.resolve)(`${prefix}/`, fileName);
    }
    cdnUrl({ objectKey }) {
        return (0, url_1.resolve)(`${this.config.env.CDN_BASE_URL}/`, objectKey);
    }
    isValidURL(url) {
        try {
            const parsedURL = new URL(url);
            return parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
        }
        catch (error) {
            return false;
        }
    }
    async handleUploadObjectStorage({ fileName, user, prefix }) {
        const fileNames = Array.isArray(fileName) ? fileName : [fileName];
        const resources = [];
        for (const name of fileNames) {
            const contentType = mime_types_1.default.lookup(name);
            if (!contentType) {
                throw new Error('Unrecognized file type.');
            }
            let resource;
            if (contentType === 'image/webp') {
                const baseName = name.split('.').slice(0, -1).join('.');
                const fileNameWebp = `${prefix}/${baseName}.webp`;
                resource = await this.resourceService.getResourceByObjectkey(fileNameWebp);
                if (!resource) {
                    const filePath = this.findFile({ fileName: name, user });
                    const { blurHash, outputFilePath } = await this.compressImage(filePath);
                    resource = await this.uploadToObjectStorage({ filePath: outputFilePath, fileName: name, prefix, blurHash, contentType });
                }
            }
            else {
                const filePath = this.findFile({ fileName: name, user });
                resource = await this.uploadToObjectStorage({ filePath, fileName: name, prefix, contentType });
            }
            resources.push(resource);
        }
        return resources.length > 1 ? resources : resources[0];
    }
    async getObjectCustomize(response, { param: { fileName, prefix }, query: { width, height } }) {
        const objectKey = `${prefix}/${fileName}`;
        if (objectKey === undefined)
            throw new exceptions_1.HttpException({ message: 'not found' }, enums_1.HttpStatus.NOT_FOUND);
        const { body, resource } = await this.getObject(response, objectKey);
        const childResource = resource.childResources;
        const childResourceLength = resource.childResources.length;
        if (body === undefined)
            throw new exceptions_1.HttpException({ message: 'file not found' }, enums_1.HttpStatus.NOT_FOUND);
        if (height && width) {
            const fileNameWebp = fileName.split('.').slice(0, -1).join('.') + `_size=${width}x${height}.webp`;
            const newObjectKey = `${prefix}/${fileNameWebp}`;
            const readableStream = body;
            const chunks = [];
            for await (const chunk of readableStream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const image = (0, sharp_1.default)(buffer);
            const resizedImage = image.resize({ width, height }).ensureAlpha();
            const { data, info } = await resizedImage.raw().toBuffer({ resolveWithObject: true });
            if (info.width && info.height && childResourceLength < this.config.env.MAX_CHILD_RESOURCE) {
                const blurHash = (0, blurhash_1.encode)(new Uint8ClampedArray(data), info.width, info.height, this.config.env.BLURHASH_COMPONENT_X, this.config.env.BLURHASH_COMPONENT_Y);
                const resizedWebpBuffer = await resizedImage.webp().toBuffer();
                const webpMetadata = await resizedImage.metadata();
                await this.s3Client.send(new client_s3_1.PutObjectCommand({
                    Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
                    Key: newObjectKey,
                    Body: resizedWebpBuffer,
                    ACL: 'public-read',
                }));
                const fileType = mime_types_1.default.lookup(newObjectKey);
                if (fileType === false)
                    throw new exceptions_1.HttpException({ message: 'unrecognized file' }, enums_1.HttpStatus.CONFLICT);
                await this.resourceService.add({
                    fileName: fileNameWebp,
                    fileType: fileType,
                    fileSize: webpMetadata.size ?? 0,
                    objectKey: newObjectKey,
                    blurHash,
                    metadata: webpMetadata,
                    objectUrl: fileNameWebp ? this.resolve({ fileName: fileNameWebp, prefix }) : undefined,
                    relatedId: resource.id
                });
                const { body } = await this.getObject(response, newObjectKey);
                body.pipe(response);
                return true;
            }
            else {
                const childResourceXY = this.parseChildResource(childResource);
                const queryResourceXY = { sizeX: width, sizeY: height };
                const { closestSizeX, closestSizeY } = this.findClosestSize({ childResourceXY, queryResourceXY });
                const objectKeyParam = `${prefix}/${fileName.split('.').splice(0, 1)}_size=${closestSizeX}x${closestSizeY}.webp`;
                const oldResource = this.findClosestSizeResource({ objectKeyParam }, childResource);
                if (!oldResource)
                    throw new exceptions_1.HttpException('child resource not found', enums_1.HttpStatus.BAD_REQUEST);
                const { objectKey } = oldResource;
                const { body } = await this.getObject(response, objectKey);
                body.pipe(response);
                return true;
            }
        }
        else {
            body.pipe(response);
            return true;
        }
    }
    findClosestSizeResource({ objectKeyParam }, resource) {
        const images = resource.find(({ objectKey }) => objectKey == objectKeyParam);
        return images;
    }
    parseChildResource(resource) {
        return resource.map(({ fileName }) => {
            const regex = /size=(\d+)x(\d+)/;
            const match = fileName.match(regex);
            if (!match) {
                throw new exceptions_1.HttpException("child resource not found to parse", enums_1.HttpStatus.BAD_REQUEST);
            }
            const sizeX = parseInt(match[1], 10);
            const sizeY = parseInt(match[2], 10);
            return { sizeX, sizeY };
        });
    }
    findClosestSize({ childResourceXY, queryResourceXY }) {
        let closestSizeX;
        let closestSizeY;
        let minDifference = Infinity;
        for (const { sizeX, sizeY } of childResourceXY) {
            const differenceX = Math.abs(queryResourceXY.sizeX - sizeX);
            const differenceY = Math.abs(queryResourceXY.sizeY - sizeY);
            const totalDifference = differenceX + differenceY;
            if (totalDifference < minDifference) {
                minDifference = totalDifference;
                closestSizeX = sizeX;
                closestSizeY = sizeY;
            }
        }
        return { closestSizeX, closestSizeY };
    }
    async getObject(response, objectKey) {
        const resource = await this.resourceService.getChildResourceByObjectkey(objectKey);
        if (!resource)
            throw new exceptions_1.HttpException({ message: 'file not found' }, enums_1.HttpStatus.NOT_FOUND);
        response.setHeader('Content-Type', resource.fileType);
        const { Body } = await this.s3Client.send(new client_s3_1.GetObjectCommand({
            Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
            Key: resource.objectKey,
        })).catch(error => {
            throw new exceptions_1.HttpException({ message: 'not found' }, enums_1.HttpStatus.NOT_FOUND);
        });
        return { body: Body, resource };
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [xconfig_1.XConfig,
        file_resource_service_1.ResourceService])
], FileService);
//# sourceMappingURL=file.service.js.map