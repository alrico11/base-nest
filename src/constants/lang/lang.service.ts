import { LangConstants, LangObjects } from "./lang.constant";
import { ILang, ILangNotification, ILangWord, LangEnum, LangObjectType } from "./lang.@types";

export function LangResponse({ lang, key, object }: ILang) {
    return object && object as LangObjectType ? `${LangObjects[lang][object]} ${LangConstants[lang][key]}` : `${LangConstants[lang][key]}`
}

export function LangWord({ lang, key }: ILangWord) {
    return LangObjects[LangEnum.EN][key]
}

export function LangNotification({ lang, key }: ILangNotification){
    return LangConstants[lang][key]
}