import { LangConstants, LangObjects } from "./lang.constant";

export const enum LangEnum {
    ID,
    EN
}

type LangKeys = keyof typeof LangConstants["EN"];
type LangObjects = keyof typeof LangObjects;
export interface ILang {
    lang: LangEnum
    key: LangKeys,
    object?: LangObjects | string
}