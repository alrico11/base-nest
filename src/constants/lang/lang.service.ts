import { LangConstants } from "./lang.constant";
import { ILang } from "./lang.@types";

export function LangResponse({lang,key,object} : ILang){
    return object ? `${object} ${LangConstants[lang][key]}` : `${LangConstants[lang][key]}`
}