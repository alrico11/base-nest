import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { CreateOrganizationBodyDto, DeleteOrganizationParamDto, FindAllMemberOrganizationParamDto, FindAllMemberOrganizationQueryDto, FindAllOrganizationQueryDto, FindOneOrganizationParamDto, UpdateOrganizationBodyDto, UpdateOrganizationParamDto } from './organization.dto';
import { OrganizationService } from './organization.service';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(body: CreateOrganizationBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAll(query: FindAllOrganizationQueryDto, lang: LangEnum, user: User): Promise<{
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
    findOne(param: FindOneOrganizationParamDto, lang: LangEnum, user: User): Promise<{
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
                role: import("./organization.@types").EnumRoleOrganization;
            };
        };
    }>;
    update(param: UpdateOrganizationParamDto, body: UpdateOrganizationBodyDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    remove(param: DeleteOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAllMember(query: FindAllMemberOrganizationQueryDto, param: FindAllMemberOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            userDetails: {
                userId: string;
                name: string;
                role: import("./organization.@types").EnumRoleOrganization;
            };
            members: {
                name: string;
                userId: string;
                role: import("./organization.@types").EnumRoleOrganization;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
                updatedAt: Date;
            }[];
        };
    }>;
}
