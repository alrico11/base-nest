import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateProjectBodyDto, DeleteProjectParamDto, FindAllProjectCollaboratorParamDto, FindAllProjectCollaboratorQueryDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectBodyDto, UpdateProjectParamDto } from "./project.dto";

export interface IResource {
    resourceId: string
    projectId: string
}

export interface ICreateProject {
    body: CreateProjectBodyDto
    user: User
    lang: LangEnum
}

export interface IFindAllProject {
    lang: LangEnum
    user: User
    query: FindAllProjectQueryDto
}

export interface IFindOneProject {
    lang: LangEnum
    user: User
    param: FindOneProjectParamDto
}

export interface IUpdateProject {
    lang: LangEnum
    user: User
    param: UpdateProjectParamDto
    body: UpdateProjectBodyDto
}

export interface IRemoveProject {
    lang: LangEnum
    user: User
    param: DeleteProjectParamDto
}

export interface IFindAllProjectCollaborator {
    lang: LangEnum
    query: FindAllProjectCollaboratorQueryDto
    param: FindAllProjectCollaboratorParamDto
}

export interface ICheckRoleCollaborator {
    projectId: string
    userId: string
    lang: LangEnum
}
