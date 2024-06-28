import { LangEnum } from "src/constants";
import { CheckDeviceBodyDto, RegisterDeviceBodyDto, RegisterFCMTokenBodyDto } from "./device.dto";
export interface IRegisterDevice {
    body: RegisterDeviceBodyDto;
    lang: LangEnum;
}
export interface ICheckDevice {
    body: CheckDeviceBodyDto;
    lang: LangEnum;
}
export interface IRegisterFcm {
    body: RegisterFCMTokenBodyDto;
    lang: LangEnum;
}
