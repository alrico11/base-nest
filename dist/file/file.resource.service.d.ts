import { Resource } from '@prisma/client';
import { XConfig } from 'src/xconfig';
import { PrismaService } from '../prisma/prisma.service';
import { AddResourceInput } from './file.@types';
export declare class ResourceService {
    private readonly config;
    private readonly prisma;
    private s3Client;
    constructor(config: XConfig, prisma: PrismaService);
    add(objectStorageInfo: AddResourceInput): Promise<{
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
    getResource(param: string): Promise<{
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
    } | null>;
    getResourceByObjectkey(objectKey: string): Promise<{
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
    } | null>;
    getChildResourceByObjectkey(objectKey: string): Promise<({
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
    }) | null>;
    removeObjectFromStorage(resource: Resource | Resource[]): Promise<void>;
    updateObjectUrl(resource: Resource | Resource[]): Promise<void>;
    deleteResource(resource: Resource | Resource[]): Promise<void>;
}
