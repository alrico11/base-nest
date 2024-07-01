import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { IAddAdminProjectCollaborator, ICheckRoleCollaborator, ICreateProjectCollaborator, IRemoveAdminProjectCollaborator, IRemoveMemberProjectCollaborator } from './collaborator.@types';
export declare class CollaboratorService {
    private readonly prisma;
    private readonly l;
    constructor(prisma: PrismaService, l: LogService);
    addCollaborator({ body, param: { id }, user, lang }: ICreateProjectCollaborator): Promise<{
        message: string;
    }>;
    addAdmin({ body, lang, param: { id }, user }: IAddAdminProjectCollaborator): Promise<{
        message: string;
    }>;
    removeAdmin({ body, lang, param: { id }, user }: IRemoveAdminProjectCollaborator): Promise<{
        message: string;
    }>;
    removeCollaborator({ param: { id }, body: { userId }, user, lang }: IRemoveMemberProjectCollaborator): Promise<{
        message: string;
    }>;
    adminGuard({ projectId, userId, lang }: ICheckRoleCollaborator): Promise<boolean>;
    ownerGuard({ projectId, userId, lang }: ICheckRoleCollaborator): Promise<boolean>;
}
