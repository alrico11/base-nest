"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangResponse = LangResponse;
exports.LangWord = LangWord;
const lang_constant_1 = require("./lang.constant");
function LangResponse({ lang, key, object }) {
    return object && object ? `${lang_constant_1.LangObjects[lang][object]} ${lang_constant_1.LangConstants[lang][key]}` : `${lang_constant_1.LangConstants[lang][key]}`;
}
function LangWord({ lang, key }) {
    return lang_constant_1.LangObjects[lang][key];
}
//# sourceMappingURL=lang.service.js.map