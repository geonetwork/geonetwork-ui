"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonReader = exports.parseJson = void 0;
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
exports.parseJson = parseJson;
class JsonReader extends base_file_1.BaseFileReader {
    getData() {
        return (0, utils_1.fetchDataAsText)(this.url).then(parseJson);
    }
}
exports.JsonReader = JsonReader;
//# sourceMappingURL=json.js.map