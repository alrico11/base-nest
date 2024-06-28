import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { OrganizationService } from '../organization.service';
import { IAddAdmin, ICheckRole, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';
export declare class MemberService {
    private readonly prisma;
    private readonly l;
    private readonly organization;
    constructor(prisma: PrismaService, l: LogService, organization: OrganizationService);
    create({ body, lang, param: { id }, user }: ICreateMember): Promise<{
        message: string;
    }>;
    remove({ param: { id }, body: { userId }, user, lang }: IRemoveMember): Promise<{
        message: string;
    }>;
    addAdmin({ body, lang, param: { id }, user }: IAddAdmin): Promise<{
        message: string;
    }>;
    removeAdmin({ body, lang, param: { id }, user }: IRemoveAdmin): Promise<{
        message: string;
    }>;
    adminGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
    ownerGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
}
