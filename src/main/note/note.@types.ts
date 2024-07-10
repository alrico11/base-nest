import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateNoteBodyDto, CreateNoteParamDto, DeleteNoteParamDto, FindAllNoteParamDto, FindAllNoteQueryDto, UpdateNoteBodyDto, UpdateNoteParamDto, UpdateNoteParamDtoSchema } from "./note.dto";
import { z } from "zod";

export interface ICreateNote {
    body: CreateNoteBodyDto
    user: User
    lang: LangEnum
    param?: CreateNoteParamDto
}

export interface IFindAllNote {
    query: FindAllNoteQueryDto
    user: User
    lang: LangEnum
    param?: FindAllNoteParamDto
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

export interface ICheckToHandle {
    param: z.infer<typeof UpdateNoteParamDtoSchema>
    user: User
    lang: LangEnum
}

export interface ICheckMemberOrCollaborator {
    organizationId? : string
    projectId? : string
    userId : string
}