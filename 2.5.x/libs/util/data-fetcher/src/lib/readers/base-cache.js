"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCacheReader = void 0;
const base_1 = require("./base");
class BaseCacheReader extends base_1.BaseReader {
    constructor(url, cacheActive = true) {
        super(url);
        this.url = url;
        this.cacheActive = cacheActive;
    }
    setCacheActive(value) {
        this.cacheActive = value;
    }
}
exports.BaseCacheReader = BaseCacheReader;
//# sourceMappingURL=base-cache.js.map