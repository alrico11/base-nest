import { Device, User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CheckRequestPasswordUserParamDto, ConfirmChangePasswordUserBodyDto, ConfirmChangePasswordUserParamDto, CreateUserBodyDto, FindAllUserQueryDto, FindOneUserParamDto, RequestChangePasswordUserBodyDto, UpdateUserBodyDto } from "./user.dto";

export interface ICreateUser {
    body: CreateUserBodyDto
    lang: LangEnum
    device: Device
}

export interface IUpdateUser {
    body: UpdateUserBodyDto
    lang: LangEnum
    user: User
}

export interface IRemoveUser {
    user: User
    lang: LangEnum
}

export interface IFindAllUser {
    lang: LangEnum
    query: FindAllUserQueryDto
}

export interface IFindOneUser {
    param: FindOneUserParamDto
    lang: LangEnum
}

export interface IRequestChangePasswordUser {
    body: RequestChangePasswordUserBodyDto
    lang: LangEnum
}

export interface IConfirmChangePassword {
    body: ConfirmChangePasswordUserBodyDto
    param: ConfirmChangePasswordUserParamDto
    device: Device
    lang: LangEnum
}

export interface CheckRequestResetPassword {
    param: CheckRequestPasswordUserParamDto
    lang: LangEnum
}