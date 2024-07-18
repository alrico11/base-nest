import { Project, ProjectCollaborator, User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto } from "./collaborator.dto";
import { PrismaTrx } from "src/@types";

export interface ICreateProjectCollaborator {
    body: CreateProjectCollaboratorBodyDto
    user: User
    param: CreateProjectCollaboratorParamDto
    lang: LangEnum
}

export interface IAddAdminProjectCollaborator {
    body: AddAdminProjectCollaboratorBodyDto
    lang: LangEnum
    param: AddAdminProjectCollaboratorParamDto
    user: User
}

export interface IRemoveAdminProjectCollaborator extends IAddAdminProjectCollaborator { }
export interface IRemoveMemberProjectCollaborator extends IAddAdminProjectCollaborator { }

export interface IFindCollaboratorIsExist {
    userIds: string[]
    projectCollaborators: ProjectCollaborator[]
}

export interface ICheckAlreadyCollaborator extends IFindCollaboratorIsExist {}

export interface ICreateManyCollaborator {
    userIds : string[]
    projectId : string
    addedById : string
}