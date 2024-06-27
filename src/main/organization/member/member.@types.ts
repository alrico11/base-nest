import { LangEnum } from "src/constants"
import { CreateMemberOrganizationBodyDto, CreateMemberOrganizationParamDto } from "./member.dto"
import { User } from "@prisma/client"

export interface ICreateMember {
    body: CreateMemberOrganizationBodyDto
    param: CreateMemberOrganizationParamDto
    lang: LangEnum
    user: User
}