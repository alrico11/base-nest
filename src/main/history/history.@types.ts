import { User } from "@prisma/client";
import { FindAllHistoryParamDto, FindAllHistoryQueryDto } from "./histoy.dto";
import { LangEnum } from "src/constants";

export interface IFindAllHistory {
    query: FindAllHistoryQueryDto
    param: FindAllHistoryParamDto
    user: User
    lang: LangEnum
}