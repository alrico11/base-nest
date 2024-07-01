"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zTimeFormat = void 0;
const zod_1 = require("zod");
const dayjs_1 = __importDefault(require("dayjs"));
exports.zTimeFormat = zod_1.z.string().refine((value) => {
    const pattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    switch (true) {
        case !pattern.test(value): return false;
        case !(0, dayjs_1.default)(value, 'HH:mm').isValid(): return false;
        default: return true;
    }
}, { message: 'Invalid time format. Expected "hh:mm".' });
//# sourceMappingURL=zTimeFormat.js.map