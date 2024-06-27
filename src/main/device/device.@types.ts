import { LangEnumType } from "src/lib/function/lang/lang.@types";
import { CheckDeviceBodyDto, RegisterDeviceBodyDto, RegisterFCMTokenBodyDto } from "./device.dto";

export interface IRegisterDevice {
    body : RegisterDeviceBodyDto
    lang : LangEnumType
}

export interface ICheckDevice {
    body : CheckDeviceBodyDto
    lang : LangEnumType
}

export interface IRegisterFcm {
    body : RegisterFCMTokenBodyDto
    lang : LangEnumType
}