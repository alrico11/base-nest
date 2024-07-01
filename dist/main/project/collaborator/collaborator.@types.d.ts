import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto } from "./collaborator..dto";
export interface ICreateProjectCollaborator {
    body: CreateProjectCollaboratorBodyDto;
    user: User;
    param: CreateProjectCollaboratorParamDto;
    lang: LangEnum;
}
export interface ICheckRoleCollaborator {
    projectId: string;
    userId: string;
    lang: LangEnum;
}
export interface IAddAdminProjectCollaborator {
    body: AddAdminProjectCollaboratorBodyDto;
    lang: LangEnum;
    param: AddAdminProjectCollaboratorParamDto;
    user: User;
}
export interface IRemoveAdminProjectCollaborator extends IAddAdminProjectCollaborator {
}
export interface IRemoveMemberProjectCollaborator extends IAddAdminProjectCollaborator {
}
