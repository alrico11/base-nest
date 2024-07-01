import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileService } from "src/file";
import { LogService } from "src/log";
import { PrismaService } from "src/prisma";
import { XConfig } from "src/xconfig";
import { ICreateProject, IFindAllProject, IFindAllProjectCollaborator, IFindOneProject, IRemoveProject, IUpdateProject, ProjectRole } from "./project.@types";
export declare class ProjectService {
    private readonly prisma;
    private readonly fileService;
    private readonly config;
    private readonly ee;
    private readonly l;
    constructor(prisma: PrismaService, fileService: FileService, config: XConfig, ee: EventEmitter2, l: LogService);
    create({ body, lang, user }: ICreateProject): Promise<{
        message: string;
    }>;
    findAll({ lang, query, user }: IFindAllProject): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            name: string;
            totalProject: number;
            priority: string;
            teams: {
                userId: string;
                username: string;
                thumbnail: string | undefined;
            }[];
        }[];
    }>;
    findOne({ lang, param: { id }, user }: IFindOneProject): Promise<{
        message: string;
        data: {
            detailsProject: {
                id: string;
                name: string;
            };
            collaboarators: {
                userId: string;
                username: string;
                thumbnail: string | undefined;
                blurHash: string | undefined;
            }[];
        };
    }>;
    update({ body, lang, param: { id }, user }: IUpdateProject): Promise<{
        message: string;
    }>;
    remove({ lang, param: { id }, user }: IRemoveProject): Promise<{
        message: string;
    }>;
    findAllCollaborator({ lang, param: { id }, query }: IFindAllProjectCollaborator): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            detailOwner: {
                userId: string;
                name: string;
                role: ProjectRole;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
                updatedAt: Date;
            };
            collaborators: {
                userId: string;
                name: string;
                role: ProjectRole;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
                updatedAt: Date;
            }[];
        }[];
    }>;
}
