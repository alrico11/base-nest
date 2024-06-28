import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateTagBodyDto, DeleteTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from "./tag.dto";

export interface ICreateTag {
    lang: LangEnum
    user: User
    body: CreateTagBodyDto
}

export interface IFindAllTag {
    query: FindAllTagQueryDto
    user: User
    lang: LangEnum
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