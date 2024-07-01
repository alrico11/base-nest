import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IAddAdmin, ICheckRole, ICreateMember, IRemoveAdmin, IRemoveMember } from './member.@types';
export declare class MemberService {
    private readonly prisma;
    private readonly l;
    constructor(prisma: PrismaService, l: LogService);
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
    adminGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
    ownerGuard({ organizationId, userId, lang }: ICheckRole): Promise<boolean>;
}
