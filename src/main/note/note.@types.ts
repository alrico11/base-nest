import { User } from "@prisma/client";
import { CreateNoteBodyDto } from "./note.dto";
import { LangEnum } from "src/constants";

export interface ICreateNote {
    body : CreateNoteBodyDto
    user: User
    lang: LangEnum
}