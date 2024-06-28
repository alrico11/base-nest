import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { XConfig } from 'src/xconfig';
import { ICreateOrganization, IDeleteOrganization, IFindAllMemberOrganization, IFindAllOrganization, IFindOneOrganization, IUpdateOrganization } from './organization.@types';
export declare class OrganizationService {
    private readonly prisma;
    private readonly fileService;
    private readonly config;
    private readonly l;
    private readonly ee;
    constructor(prisma: PrismaService, fileService: FileService, config: XConfig, l: LogService, ee: EventEmitter2);
    create({ body, user, lang }: ICreateOrganization): Promise<{
        message: string;
    }>;
    findAll({ lang, query }: IFindAllOrganization): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            description: string | null;
            thumbnail: string | null | undefined;
            blurHash: string | null | undefined;
        }[];
    }>;
    findOne({ lang, param: { id }, user }: IFindOneOrganization): Promise<{
        message: string;
        data: {
            organizationId: string;
            isAdmin: boolean;
            isOwner: boolean;
            organizationName: string;
            description: string | null;
            thumbnail: string | null | undefined;
            blurHash: string | null | undefined;
        }[];
    }>;
    update({ body, lang, param: { id }, user }: IUpdateOrganization): Promise<{
        message: string;
    }>;
    remove({ param: { id }, lang, user }: IDeleteOrganization): Promise<{
        message: string;
    }>;
    findAllMember({ query, lang, param: { id } }: IFindAllMemberOrganization): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            owner: {
                name: string;
                updatedAt: Date;
                isOwner: boolean;
            };
            members: {
                userId: string;
                name: string;
                isAdmin: boolean;
                updatedAt: Date;
            }[];
        }[];
    }>;
}
