"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataset = void 0;
const utils_1 = require("../lib/utils");
class BaseDataset {
    constructor(url) {
        this.url = url;
    }
    fetchAsText() {
        return (0, utils_1.fetchData)(this.url).then((resp) => resp.text());
    }
    fetchAsBuffer() {
        return (0, utils_1.fetchData)(this.url).then((resp) => resp.arrayBuffer());
    }
    get properties() {
        throw new Error('not implemented');
    }
    get info() {
        throw new Error('not implemented');
    }
    readAll() {
        throw new Error('not implemented');
    }
}
exports.BaseDataset = BaseDataset;
//# sourceMappingURL=base.js.map