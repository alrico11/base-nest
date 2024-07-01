import { LangConstants, LangObjects } from "./lang.constant";
import { ILang, LangObjectType } from "./lang.@types";

export function LangResponse({ lang, key, object }: ILang) {
    return object && object as LangObjectType ? `${LangObjects[lang][object]} ${LangConstants[lang][key]}` : `${LangConstants[lang][key]}`
}