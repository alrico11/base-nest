import { MemberService } from './member.service';
import { AddAdminOrganizationBodyDto, AddAdminOrganizationParamDto, CreateMemberOrganizationBodyDto, CreateMemberOrganizationParamDto, RemoveAdminOrganizationBodyDto, RemoveAdminOrganizationParamDto, RemoveMemberOrganizationBodyDto, RemoveMemberOrganizationParamDto } from './member.dto';
import { LangEnum } from 'src/constants';
import { User } from '@prisma/client';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    addMember(body: CreateMemberOrganizationBodyDto, param: CreateMemberOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    removeMember(body: RemoveMemberOrganizationBodyDto, param: RemoveMemberOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    addAdmin(body: AddAdminOrganizationBodyDto, param: AddAdminOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    removeAdmin(body: RemoveAdminOrganizationBodyDto, param: RemoveAdminOrganizationParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
}
