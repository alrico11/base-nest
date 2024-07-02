import { LangEnum } from "src/constants";
import { CreateUserBodyDto } from "./user.dto";
import { Device } from "@prisma/client";

export interface ICreateUser {
    body: CreateUserBodyDto
    lang: LangEnum
    device: Device
}