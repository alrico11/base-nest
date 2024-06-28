"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeDate = rangeDate;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
function rangeDate({ endDate, startDate }) {
    let currentDate = dayjs_1.default.utc(startDate);
    let allDates = [];
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        allDates.push(currentDate.toDate());
        currentDate = currentDate.add(1, 'day');
    }
    return allDates;
}
//# sourceMappingURL=rangeDate.js.map