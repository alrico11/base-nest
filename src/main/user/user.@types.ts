import { LangEnum } from "src/constants";
import { CreateUserBodyDto, FindAllUserQueryDto, FindOneUserParamDto, RequestChangePasswordUserBodyDto, UpdateUserBodyDto } from "./user.dto";
import { Device, User } from "@prisma/client";

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
    body : RequestChangePasswordUserBodyDto
}