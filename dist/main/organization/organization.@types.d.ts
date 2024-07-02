import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateOrganizationBodyDto, DeleteOrganizationParamDto, FindAllMemberOrganizationParamDto, FindAllMemberOrganizationQueryDto, FindAllOrganizationQueryDto, FindOneOrganizationParamDto, UpdateOrganizationBodyDto, UpdateOrganizationParamDto } from "./organization.dto";
export declare enum EnumRoleOrganization {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    OWNER = "OWNER"
}
export interface UserDetails {
    userId: string;
    name: string;
    role: EnumRoleOrganization;
}
export interface IFindAllMemberOrganization {
    query: FindAllMemberOrganizationQueryDto;
    param: FindAllMemberOrganizationParamDto;
    lang: LangEnum;
    user: User;
}
export interface ICreateOrganization {
    body: CreateOrganizationBodyDto;
    user: User;
    lang: LangEnum;
}
export interface IFindAllOrganization {
    query: FindAllOrganizationQueryDto;
    lang: LangEnum;
    user: User;
}
export interface IFindOneOrganization {
    param: FindOneOrganizationParamDto;
    lang: LangEnum;
    user: User;
}
export interface IUpdateOrganization {
    param: UpdateOrganizationParamDto;
    lang: LangEnum;
    user: User;
    body: UpdateOrganizationBodyDto;
}
export interface IDeleteOrganization {
    param: DeleteOrganizationParamDto;
    lang: LangEnum;
    user: User;
}
export interface ICheckRole {
    userId: string;
    organizationId: string;
    lang: LangEnum;
}
