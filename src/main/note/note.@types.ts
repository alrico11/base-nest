import { User } from "@prisma/client";
import { CreateNoteBodyDto, FindAllNoteQueryDto } from "./note.dto";
import { LangEnum } from "src/constants";

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