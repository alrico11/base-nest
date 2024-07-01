"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zDateFormat = void 0;
const zod_1 = require("zod");
const dayjs_1 = __importDefault(require("dayjs"));
exports.zDateFormat = zod_1.z.string().refine((value) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    switch (true) {
        case !pattern.test(value): return false;
        case !(0, dayjs_1.default)(value, 'YYYY-MM-DD').isValid(): return false;
        default: return true;
    }
}, { message: 'Invalid date format. Expected "yyyy-mm-dd".' });
//# sourceMappingURL=zDateFormat%20copy.js.map