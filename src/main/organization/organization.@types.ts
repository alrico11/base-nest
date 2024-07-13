import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateOrganizationBodyDto, DeleteOrganizationParamDto, FindAllMemberOrganizationParamDto, FindAllMemberOrganizationQueryDto, FindAllOrganizationQueryDto, FindOneOrganizationParamDto, UpdateOrganizationBodyDto, UpdateOrganizationParamDto } from "./organization.dto";
import e from "express";

export interface IFindAllMemberOrganization {
    query: FindAllMemberOrganizationQueryDto
    param: FindAllMemberOrganizationParamDto
    lang: LangEnum
    user: User
}

export interface ICheckMemberOrganization {
    userIds: string[]
    organizationId: string
    lang: LangEnum
}

export interface ICreateOrganization {
    body: CreateOrganizationBodyDto
    user: User
    lang: LangEnum
}

export interface IFindAllOrganization {
    query: FindAllOrganizationQueryDto
    lang: LangEnum
    user: User
}

export interface IFindOneOrganization {
    param: FindOneOrganizationParamDto
    lang: LangEnum
    user: User
}

export interface IUpdateOrganization {
    param: UpdateOrganizationParamDto
    lang: LangEnum
    user: User
    body: UpdateOrganizationBodyDto
}

export interface IDeleteOrganization {
    param: DeleteOrganizationParamDto
    lang: LangEnum
    user: User
}

export interface ICheckRole {
    userId: string
    organizationId: string
    lang: LangEnum
}

export interface IFindOrganizationById{
    organizationId : string,
}