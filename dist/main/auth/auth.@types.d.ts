import { Device, User } from "@prisma/client";
import { LoginBodyDto } from "./auth.dto";
import { LangEnum } from "src/constants";
export interface ILoginDto {
    body: LoginBodyDto;
    device: Device;
    lang: LangEnum;
}
export interface ILogOutDto {
    device: Device;
    user: User;
    lang: LangEnum;
}
