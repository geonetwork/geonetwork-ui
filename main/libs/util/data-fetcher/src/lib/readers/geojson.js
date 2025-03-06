"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeojsonReader = void 0;
exports.parseGeojson = parseGeojson;
const utils_1 = require("../utils");
const base_file_1 = require("./base-file");
/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
function parseGeojson(text) {
    const parsed = JSON.parse(text);
    const features = parsed.type === 'FeatureCollection' ? parsed.features : parsed;
    if (!Array.isArray(features)) {
        throw new Error('Could not parse GeoJSON, expected a features collection or an array of features at root level');
    }
    return (0, utils_1.processItemProperties)(features);
}
class GeojsonReader extends base_file_1.BaseFileReader {
    getData() {
        return (0, utils_1.fetchDataAsText)(this.url).then(parseGeojson);
    }
}
exports.GeojsonReader = GeojsonReader;
//# sourceMappingURL=geojson.js.map