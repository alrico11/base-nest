import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateOrganizationBodyDto, DeleteOrganizationParamDto, FindAllMemberOrganizationParamDto, FindAllMemberOrganizationQueryDto, FindAllOrganizationQueryDto, FindOneOrganizationParamDto, UpdateOrganizationBodyDto, UpdateOrganizationParamDto } from "./organization.dto";

export interface IFindAllMemberOrganization {
    query: FindAllMemberOrganizationQueryDto
    param: FindAllMemberOrganizationParamDto
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

export interface IsAdmin {
    userId: string
    organizationId: string
    lang: LangEnum
}
export interface IsOwner extends IsAdmin { }