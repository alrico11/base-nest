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
    findAll(query: FindAllOrganizationQueryDto, lang: LangEnum): Promise<{
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
    findOne(param: FindOneOrganizationParamDto, lang: LangEnum, user: User): Promise<{
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
    update(param: UpdateOrganizationParamDto, body: UpdateOrganizationBodyDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    remove(param: DeleteOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAllMember(query: FindAllMemberOrganizationQueryDto, param: FindAllMemberOrganizationParamDto, lang: LangEnum, user: User): void;
}
