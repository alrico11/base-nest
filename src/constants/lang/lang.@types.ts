import { LangConstants, LangObjects } from "./lang.constant";

export const enum LangEnum {
    ID,
    EN
}

type LangKeys = keyof typeof LangConstants["EN"];
export type LangObjectType = keyof typeof LangObjects["EN"];
export interface ILang {
    lang: LangEnum
    key: LangKeys,
    object?: LangObjectType | string
}