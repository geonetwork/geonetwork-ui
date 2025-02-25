"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonReader = void 0;
exports.parseJson = parseJson;
const utils_1 = require("../utils");
const base_file_1 = require("./base-file");
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
class JsonReader extends base_file_1.BaseFileReader {
    getData() {
        return (0, utils_1.fetchDataAsText)(this.url).then(parseJson);
    }
}
exports.JsonReader = JsonReader;
//# sourceMappingURL=json.js.map