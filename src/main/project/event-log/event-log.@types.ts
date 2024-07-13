import { User } from "@prisma/client"
import { LangEnum } from "src/constants"
import { CreateEventLogBodyDto, CreateEventLogParamDto, FindAllEventLogParamDto, FindAllEventLogQueryDto, RemoveEventLogParamDto, UpdateEventLogBodyDto, UpdateEventLogParamDto } from "./event-log.dto"

export interface ICreateEventLog {
    body: CreateEventLogBodyDto
    param: CreateEventLogParamDto
    lang: LangEnum
    user: User
}

export interface IFindAllEventLog {
    query: FindAllEventLogQueryDto
    param: FindAllEventLogParamDto
    lang: LangEnum
}

export interface IUpdateEventLog {
    user: User
    lang: LangEnum
    param: UpdateEventLogParamDto
    body: UpdateEventLogBodyDto
}

export interface IRemoveEventLog {
    user: User
    lang: LangEnum
    param: RemoveEventLogParamDto
}