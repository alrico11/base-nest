import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectCollaboratorParamDto, FindAllProjectCollaboratorQueryDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectBodyDto, UpdateProjectParamDto } from "./project.dto";

export interface IResource {
    resourceId: string
    projectId: string
}

export interface ICreateProject {
    param?: CreateProjectParamDto
    body: CreateProjectBodyDto
    user: User
    lang: LangEnum
}

export interface IFindAllProject {
    lang: LangEnum
    user: User
    query: FindAllProjectQueryDto
    param?: FindAllProjectParamDto
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

export interface ICheckProjectCollaborator {
    userIds: string[]
    projectId: string
    lang: LangEnum
    organizationId?: string
}

export interface IFindByIdProject {
    projectId: string
    organizationId?: string
}

export interface ICheckRoleCollaborator {
    organizationId?: string
    projectId: string
    userId: string
    lang: LangEnum
}
