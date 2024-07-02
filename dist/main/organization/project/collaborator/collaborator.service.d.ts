import { FileService } from 'src/file';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ProjectService } from '../project.service';
import { IAddAdminProjectCollaborator, ICreateProjectCollaborator, IRemoveAdminProjectCollaborator, IRemoveMemberProjectCollaborator } from './collaborator.@types';
export declare class CollaboratorService {
    private readonly prisma;
    private readonly l;
    private readonly projectService;
    private readonly fileService;
    constructor(prisma: PrismaService, l: LogService, projectService: ProjectService, fileService: FileService);
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
}
