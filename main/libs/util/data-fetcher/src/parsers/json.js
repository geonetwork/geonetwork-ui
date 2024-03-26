"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDataset = exports.parseJson = void 0;
const base_1 = require("./base");
const utils_1 = require("../lib/utils");
/**
 * This parser only supports arrays of simple flat objects with properties
 * @param text
 */
function parseJson(text) {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
        throw new Error('Could not parse JSON, expected an array at root level');
    }
    return (0, utils_1.processItemProperties)(parsed.map(utils_1.jsonToGeojsonFeature));
}
exports.parseJson = parseJson;
class JsonDataset extends base_1.BaseDataset {
    constructor() {
        super(...arguments);
        this.parseResult_ = this.fetchAsText().then(parseJson);
        this.propertiesInfo_ = this.parseResult_.then((result) => result.properties);
        this.datasetInfo_ = this.parseResult_.then((result) => ({
            itemsCount: result.items.length,
        }));
    }
    get properties() {
        return this.propertiesInfo_;
    }
    get info() {
        return this.datasetInfo_;
    }
    readAll() {
        return this.parseResult_.then((result) => result.items);
    }
}
exports.JsonDataset = JsonDataset;
//# sourceMappingURL=json.js.map