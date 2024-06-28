"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangResponse = LangResponse;
const lang_constant_1 = require("./lang.constant");
function LangResponse({ lang, key, object }) {
    return object ? `${object} ${lang_constant_1.LangConstants[lang][key]}` : `${lang_constant_1.LangConstants[lang][key]}`;
}
//# sourceMappingURL=lang.service.js.map