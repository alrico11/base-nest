import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto, RemoveAdminProjectCollaboratorBodyDto, RemoveAdminProjectCollaboratorParamDto, RemoveProjectCollaboratorBodyDto, RemoveProjectCollaboratorParamDto } from './collaborator.dto';
import { CollaboratorService } from './collaborator.service';
export declare class CollaboratorController {
    private readonly collaboratorService;
    constructor(collaboratorService: CollaboratorService);
    addCollaborator(body: CreateProjectCollaboratorBodyDto, param: CreateProjectCollaboratorParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    addAdmin(body: AddAdminProjectCollaboratorBodyDto, param: AddAdminProjectCollaboratorParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    removeAdmin(body: RemoveAdminProjectCollaboratorBodyDto, param: RemoveAdminProjectCollaboratorParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    removeCollaborator(body: RemoveProjectCollaboratorBodyDto, param: RemoveProjectCollaboratorParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
}
