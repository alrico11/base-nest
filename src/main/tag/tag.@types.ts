import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateTagBodyDto, CreateTagParamDto, DeleteTagParamDto, FindAllTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from "./tag.dto";

export interface ICreateTag {
    lang: LangEnum
    user: User
    body: CreateTagBodyDto
    param?: CreateTagParamDto
}

export interface IFindAllTag {
    query: FindAllTagQueryDto
    user: User
    lang: LangEnum
    param?: FindAllTagParamDto
}

export interface IUpdateTag {
    body: UpdateTagBodyDto
    param: UpdateTagParamDto
    user: User
    lang: LangEnum
}

export interface IRemoveTag {
    param: DeleteTagParamDto
    user: User
    lang: LangEnum
}