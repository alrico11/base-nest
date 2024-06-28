"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotToObject = void 0;
const dotToObject = ({ orderBy, orderDirection }) => {
    const keys = orderBy.split('.');
    return keys.reduceRight((acc, key, index) => {
        if (index === keys.length - 1) {
            return { [key]: orderDirection };
        }
        else {
            return { [key]: acc };
        }
    }, {});
};
exports.dotToObject = dotToObject;
//# sourceMappingURL=string.js.map