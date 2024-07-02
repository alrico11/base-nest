import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { OrganizationService } from '../organization.service';
import { IAddAdmin, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';
export declare class MemberService {
    private readonly prisma;
    private readonly l;
    private readonly organizationService;
    constructor(prisma: PrismaService, l: LogService, organizationService: OrganizationService);
    addMember({ body, lang, param: { id }, user }: ICreateMember): Promise<{
        message: string;
    }>;
    removeMember({ param: { id }, body: { userId }, user, lang }: IRemoveMember): Promise<{
        message: string;
    }>;
    addAdmin({ body, lang, param: { id }, user }: IAddAdmin): Promise<{
        message: string;
    }>;
    removeAdmin({ body, lang, param: { id }, user }: IRemoveAdmin): Promise<{
        message: string;
    }>;
}
