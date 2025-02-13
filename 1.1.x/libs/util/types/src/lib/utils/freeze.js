"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
function deepFreeze(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(deepFreeze);
        return obj;
    }
    else if (obj instanceof Object) {
        Object.keys(obj).forEach((prop) => deepFreeze(obj[prop]));
        return Object.freeze(obj);
    }
    return obj;
}
exports.deepFreeze = deepFreeze;
//# sourceMappingURL=freeze.js.map