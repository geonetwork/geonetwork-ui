"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfsReader = void 0;
exports.getWfsEndpoint = getWfsEndpoint;
const ogc_client_1 = require("@camptocamp/ogc-client");
const model_1 = require("../model");
const utils_1 = require("../utils");
const gml_1 = require("./gml");
const geojson_1 = require("./geojson");
const base_cache_1 = require("./base-cache");
const utils_2 = require("../utils");
const sql_utils_1 = require("../sql-utils");
async function getWfsEndpoint(wfsUrl) {
    try {
        return await new ogc_client_1.WfsEndpoint(wfsUrl).isReady();
    }
    catch (e) {
        if (e instanceof Error &&
            'isCrossOriginRelated' in e &&
            'httpStatus' in e) {
            const error = e;
            if (error.isCrossOriginRelated === true) {
                throw new Error(`wfs.unreachable.cors`);
            }
            if (error.httpStatus === 401 || error.httpStatus === 403) {
                throw model_1.FetchError.forbidden(error.httpStatus);
            }
            else if (error.httpStatus === 400 || error.httpStatus > 403) {
                throw model_1.FetchError.http(error.httpStatus);
            }
            else {
                throw model_1.FetchError.unknownType();
            }
        }
        else {
            throw model_1.FetchError.unknownType();
        }
    }
}
class WfsReader extends base_cache_1.BaseCacheReader {
    constructor(url, wfsEndpoint, featureTypeName, cacheActive) {
        super(url, cacheActive);
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
        const wfsEndpoint = await getWfsEndpoint(wfsUrlEndpoint);
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
    async getData(aggregation, groupedBy) {
        if (aggregation || groupedBy) {
            return { items: await this.getQueryData() };
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
        return (0, utils_1.fetchDataAsText)(url, this.cacheActive).then((text) => asJson
            ? (0, geojson_1.parseGeojson)(text)
            : (0, gml_1.parseGml)(text, this.featureTypeName, this.version));
    }
    async getQueryData() {
        const items = (await this.getData()).items;
        const jsonItems = (0, utils_2.getJsonDataItemsProxy)(items);
        const query = (0, sql_utils_1.generateSqlQuery)(this.selected, this.filter, this.sort, this.startIndex, this.count, this.groupedBy, this.aggregations);
        const result = await Promise.resolve().then(() => __importStar(require('alasql'))).then((module) => module.default(query, [jsonItems]));
        return result.map(utils_2.jsonToGeojsonFeature);
    }
    load() {
        // Nothing to load for Wfs
    }
    async read() {
        return (await this.getData(this.aggregations, this.groupedBy)).items;
    }
}
exports.WfsReader = WfsReader;
//# sourceMappingURL=wfs.js.map