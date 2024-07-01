import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectBodyDto, UpdateProjectParamDto } from "./project.dto";

export interface ICreateProject {
    param : CreateProjectParamDto
    body: CreateProjectBodyDto
    user: User
    lang: LangEnum
}

export interface IFindAllProject {
    param : FindAllProjectParamDto
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