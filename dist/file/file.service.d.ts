import { Resource } from '@prisma/client';
import { Response } from 'express';
import { XConfig } from 'src/xconfig';
import { Readable } from 'stream';
import { ICDNUrl, IFileCompressUpload, IFindClosestSize, IFindFile, IGetImageDto, IGetTmpFile, IResolve, IUploadToObjectStorage } from './file.@types';
import { ResourceService } from './file.resource.service';
export declare class FileService {
    private readonly config;
    private readonly resourceService;
    private s3Client;
    constructor(config: XConfig, resourceService: ResourceService);
    sanitizeFileName: (fileName: string) => string;
    handleUpload: (file: Express.Multer.File) => {
        fileName: string;
    };
    findFile({ user, fileName }: IFindFile): string;
    compressImage(filePath: string): Promise<{
        outputFilePath: string;
        blurHash: string;
    }>;
    uploadToObjectStorage({ filePath, prefix, fileName, blurHash, contentType }: IUploadToObjectStorage): Promise<{
        id: string;
        objectUrl: string | null;
        objectKey: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        metadata: import("@prisma/client").Prisma.JsonValue | null;
        blurHash: string | null;
        relatedId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    removeObjectFromStorage(objectKey: string): Promise<void>;
    fetchObject(objectKey: string): Promise<void>;
    getTmpFile({ param, response, user }: IGetTmpFile): Promise<void>;
    resolve({ fileName, prefix }: IResolve): string;
    cdnUrl({ objectKey }: ICDNUrl): string;
    isValidURL(url: unknown): boolean;
    handleUploadObjectStorage({ fileName, user, prefix }: IFileCompressUpload): Promise<{
        id: string;
        objectUrl: string | null;
        objectKey: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        metadata: import("@prisma/client").Prisma.JsonValue | null;
        blurHash: string | null;
        relatedId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | {
        id: string;
        objectUrl: string | null;
        objectKey: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        metadata: import("@prisma/client").Prisma.JsonValue | null;
        blurHash: string | null;
        relatedId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    getObjectCustomize(response: Response, { param: { fileName, prefix }, query: { width, height } }: IGetImageDto): Promise<boolean>;
    findClosestSizeResource({ objectKeyParam }: {
        objectKeyParam: any;
    }, resource: Resource[]): {
        id: string;
        objectUrl: string | null;
        objectKey: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        metadata: import("@prisma/client").Prisma.JsonValue | null;
        blurHash: string | null;
        relatedId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | undefined;
    parseChildResource(resource: Resource[]): {
        sizeX: number;
        sizeY: number;
    }[];
    findClosestSize({ childResourceXY, queryResourceXY }: IFindClosestSize): {
        closestSizeX: number | undefined;
        closestSizeY: number | undefined;
    };
    getObject(response: Response, objectKey: string): Promise<{
        body: Readable;
        resource: {
            childResources: {
                id: string;
                objectUrl: string | null;
                objectKey: string;
                fileName: string;
                fileType: string;
                fileSize: number;
                metadata: import("@prisma/client").Prisma.JsonValue | null;
                blurHash: string | null;
                relatedId: string | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            }[];
        } & {
            id: string;
            objectUrl: string | null;
            objectKey: string;
            fileName: string;
            fileType: string;
            fileSize: number;
            metadata: import("@prisma/client").Prisma.JsonValue | null;
            blurHash: string | null;
            relatedId: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
}
