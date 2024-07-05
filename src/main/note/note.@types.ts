import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateNoteBodyDto, DeleteNoteParamDto, FindAllNoteQueryDto, UpdateNoteBodyDto, UpdateNoteParamDto } from "./note.dto";

export interface ICreateNote {
    body: CreateNoteBodyDto
    user: User
    lang: LangEnum
}

export interface IFindAllNote {
    query: FindAllNoteQueryDto
    user: User
    lang: LangEnum
}

export interface IUpdateNote {
    param: UpdateNoteParamDto
    body: UpdateNoteBodyDto
    user: User
    lang: LangEnum
}

export interface IDeleteNote {
    param: DeleteNoteParamDto
    user: User
    lang: LangEnum
}