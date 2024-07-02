import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { XConfig } from 'src/xconfig';
import { EnumRoleOrganization, ICheckRole, ICreateOrganization, IDeleteOrganization, IFindAllMemberOrganization, IFindAllOrganization, IFindOneOrganization, IUpdateOrganization } from './organization.@types';
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
    findAll({ lang, query, user }: IFindAllOrganization): Promise<{
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
            thumbnail: string | undefined;
            blurHash: string | null | undefined;
        }[];
    }>;
    findOne({ lang, param: { id }, user }: IFindOneOrganization): Promise<{
        message: string;
        data: {
            detailOrganization: {
                id: string;
                name: string;
                description: string | null;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
            };
            detailUser: {
                id: string;
                name: string;
                role: EnumRoleOrganization;
            };
        };
    }>;
    update({ body, lang, param: { id }, user }: IUpdateOrganization): Promise<{
        message: string;
    }>;
    remove({ param: { id }, lang, user }: IDeleteOrganization): Promise<{
        message: string;
    }>;
    findAllMember({ query, lang, param: { id }, user }: IFindAllMemberOrganization): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            userDetails: {
                userId: string;
                role: EnumRoleOrganization;
            };
            members: {
                name: string;
                userId: string;
                role: EnumRoleOrganization;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
                updatedAt: Date;
            }[];
        };
    }>;
    adminGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
    ownerGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
}
