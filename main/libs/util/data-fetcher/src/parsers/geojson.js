"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeojsonDataset = exports.parseGeojson = void 0;
const base_1 = require("./base");
const utils_1 = require("../lib/utils");
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
exports.parseGeojson = parseGeojson;
class GeojsonDataset extends base_1.BaseDataset {
    constructor() {
        super(...arguments);
        this.parseResult_ = this.fetchAsText().then(parseGeojson);
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
exports.GeojsonDataset = GeojsonDataset;
//# sourceMappingURL=geojson.js.map