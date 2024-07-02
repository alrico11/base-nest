import { LangConstants, LangObjects } from "./lang.constant";
export declare const enum LangEnum {
    ID = 0,
    EN = 1
}
type LangKeys = keyof typeof LangConstants["EN"];
export type LangObjectType = keyof typeof LangObjects["EN"];
export interface ILang {
    lang: LangEnum;
    key: LangKeys;
    object?: LangObjectType | string;
}
export interface ILangWord {
    lang: LangEnum;
    key: LangObjectType;
}
export {};
