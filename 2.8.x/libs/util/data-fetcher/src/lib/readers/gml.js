"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmlReader = void 0;
exports.parseGml = parseGml;
const base_file_1 = require("./base-file");
const utils_1 = require("../utils");
const format_js_1 = require("ol/format.js");
function parseGml(text, namespace, version) {
    const splittedNamespace = namespace.split(':');
    const regex = new RegExp(`xmlns:${splittedNamespace[0]}=["']([^'"]*)["']`);
    const match = regex.exec(text);
    if (match && match.length >= 2) {
        const wf = new format_js_1.WFS({
            featureNS: match[1],
            featureType: splittedNamespace[1],
            version: version,
        });
        let features;
        try {
            features = wf.readFeatures(text);
        }
        catch (e) {
            throw Error("Couldn't parse WFS with GML features");
        }
        const geojsonItem = new format_js_1.GeoJSON().writeFeaturesObject(features);
        return (0, utils_1.processItemProperties)(geojsonItem.features, true);
    }
    throw Error("Couldn't retrieve namespace url");
}
class GmlReader extends base_file_1.BaseFileReader {
    constructor(url, namespace, version, cacheActive = true) {
        super(url);
        this.url = url;
        this.namespace = namespace;
        this.version = version;
        this.cacheActive = cacheActive;
    }
    getData() {
        return (0, utils_1.fetchDataAsText)(this.url, this.cacheActive).then((text) => parseGml(text, this.namespace, this.version));
    }
}
exports.GmlReader = GmlReader;
//# sourceMappingURL=gml.js.map