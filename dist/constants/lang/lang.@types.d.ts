import { LangConstants, LangObjects } from "./lang.constant";
export declare const enum LangEnum {
    ID = 0,
    EN = 1
}
type LangKeys = keyof typeof LangConstants["EN"];
type LangObjects = keyof typeof LangObjects;
export interface ILang {
    lang: LangEnum;
    key: LangKeys;
    object?: LangObjects | string;
}
export {};
