"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfsReader = void 0;
const ogc_client_1 = require("@camptocamp/ogc-client");
const utils_1 = require("../utils");
const base_1 = require("./base");
const gml_1 = require("./gml");
const geojson_1 = require("./geojson");
const ngx_translate_extract_marker_1 = require("@biesbjerg/ngx-translate-extract-marker");
class WfsReader extends base_1.BaseReader {
    constructor(url, wfsEndpoint, featureTypeName) {
        super(url);
        this.endpoint = wfsEndpoint;
        this.featureTypeName = featureTypeName;
        this.version = this.endpoint.getVersion();
    }
    get properties() {
        return this.endpoint
            .getFeatureTypeFull(this.featureTypeName)
            .then((featureType) => Object.keys(featureType.properties).map((prop) => {
            const originalType = featureType.properties[prop];
            const type = originalType === 'float' || originalType === 'integer'
                ? 'number'
                : originalType; // FIXME: ogc-client typing is incorrect, should be a string union
            return {
                name: prop,
                label: prop,
                type,
            };
        }));
    }
    get info() {
        return this.endpoint.getFeatureTypeFull(this.featureTypeName).then((result) => ({
            itemsCount: result.objectCount,
        }));
    }
    static async createReader(wfsUrlEndpoint, featureTypeName) {
        const wfsEndpoint = await new ogc_client_1.WfsEndpoint(wfsUrlEndpoint).isReady();
        const featureTypes = wfsEndpoint.getFeatureTypes();
        const featureType = wfsEndpoint.getFeatureTypeSummary(featureTypes.length === 1 && !featureTypeName
            ? featureTypes[0].name
            : featureTypeName);
        if (!featureType) {
            throw new Error('wfs.featuretype.notfound');
        }
        if (wfsEndpoint.supportsStartIndex()) {
            return new WfsReader(wfsUrlEndpoint, wfsEndpoint, featureType.name);
        }
        else if (wfsEndpoint.supportsJson(featureType.name)) {
            return new geojson_1.GeojsonReader(wfsEndpoint.getFeatureUrl(featureType.name, {
                asJson: true,
                outputCrs: 'EPSG:4326',
            }));
        }
        else {
            if (featureType.outputFormats.find((f) => f.toLowerCase().includes('gml')) &&
                (featureType.defaultCrs === 'EPSG:4326' ||
                    featureType.otherCrs?.includes('EPSG:4326'))) {
                return new gml_1.GmlReader(wfsEndpoint.getFeatureUrl(featureType.name, {
                    outputFormat: featureType.outputFormats.find((f) => f.toLowerCase().includes('gml')),
                    outputCrs: 'EPSG:4326',
                }), featureType.name, wfsEndpoint.getVersion());
            }
            throw new Error('wfs.geojsongml.notsupported');
        }
    }
    getData() {
        if (this.aggregations || this.groupedBy) {
            throw new Error((0, ngx_translate_extract_marker_1.marker)('wfs.aggregations.notsupported'));
        }
        const asJson = this.endpoint.supportsJson(this.featureTypeName);
        const attributes = this.selected ?? undefined;
        let url = this.endpoint.getFeatureUrl(this.featureTypeName, {
            ...(this.startIndex !== null && { startIndex: this.startIndex }),
            ...(this.count !== null && { maxFeatures: this.count }),
            asJson,
            outputCrs: 'EPSG:4326',
            attributes,
            // sortBy: this.sort // TODO: no sort in ogc-client?
        });
        if (Array.isArray(this.sort) && this.sort.length > 0) {
            const finalUrl = new URL(url);
            const sorts = this.sort
                .map((fieldSort) => `${fieldSort[1]}+${fieldSort[0] === 'asc' ? 'A' : 'D'}`)
                .join(',');
            // Direct update on string url to prevent encoding of +A and +D
            url = `${url}${finalUrl.search ? '&' : ''}SORTBY=${sorts}`;
        }
        return (0, utils_1.fetchDataAsText)(url).then((text) => asJson
            ? (0, geojson_1.parseGeojson)(text)
            : (0, gml_1.parseGml)(text, this.featureTypeName, this.version));
    }
    load() {
        // Nothing to load for Wfs
    }
    async read() {
        return (await this.getData()).items;
    }
}
exports.WfsReader = WfsReader;
//# sourceMappingURL=wfs.js.map