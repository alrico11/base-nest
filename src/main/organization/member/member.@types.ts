import { OrganizationMember, User } from "@prisma/client"
import { LangEnum } from "src/constants"
import { AddAdminOrganizationBodyDto, AddAdminOrganizationParamDto, CreateMemberOrganizationBodyDto, CreateMemberOrganizationParamDto, RemoveAdminOrganizationBodyDto, RemoveAdminOrganizationParamDto, RemoveMemberOrganizationBodyDto, RemoveMemberOrganizationParamDto } from "./member.dto"

export interface ICreateMember {
    body: CreateMemberOrganizationBodyDto
    param: CreateMemberOrganizationParamDto
    lang: LangEnum
    user: User
}

export interface IRemoveMember {
    param: RemoveMemberOrganizationParamDto
    body: RemoveMemberOrganizationBodyDto
    user: User
    lang: LangEnum
}

export interface IAddAdmin {
    param: AddAdminOrganizationParamDto
    body: AddAdminOrganizationBodyDto
    user: User
    lang: LangEnum
}

export interface IRemoveAdmin {
    param: RemoveAdminOrganizationParamDto
    body: RemoveAdminOrganizationBodyDto
    user: User
    lang: LangEnum
}

export interface IFindMemberIsExist {
    userIds: string[]
    organizationCreatorId: string
    organizationMembers: OrganizationMember[]
}

export interface ICreateManyMember {
    userIds : string[]
    organizationId : string
    addedById : string
}