import { User } from "@prisma/client"
import { CreateCommentTaskBodyDto, CreateCommentTaskParamDto, DeleteCommentTaskParamDto, FindAllCommentTaskParam, FindAllCommentTaskQuery, UpdateCommentTaskBodyDto, UpdateCommentTaskParamDto } from "./comment.dto"
import { LangEnum } from "src/constants"

export interface ICreateCommentTask {
    body: CreateCommentTaskBodyDto
    param: CreateCommentTaskParamDto
    user: User
    lang: LangEnum
}

export interface IFindAllComment {
    query: FindAllCommentTaskQuery
    param: FindAllCommentTaskParam
    lang: LangEnum
}

export interface IUpdateComment {
    body: UpdateCommentTaskBodyDto
    param: UpdateCommentTaskParamDto
    lang: LangEnum
    user: User
}

export interface IDeleteComment {
    param: DeleteCommentTaskParamDto
    user: User
    lang: LangEnum
}