"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDataset = openDataset;
exports.readDataset = readDataset;
exports.readDatasetHeaders = readDatasetHeaders;
const headers_1 = require("./headers");
const csv_1 = require("./readers/csv");
const json_1 = require("./readers/json");
const geojson_1 = require("./readers/geojson");
const excel_1 = require("./readers/excel");
const model_1 = require("./model");
const utils_1 = require("./utils");
const gml_1 = require("./readers/gml");
const wfs_1 = require("./readers/wfs");
async function openDataset(url, typeHint, options, cacheActive) {
    const fileType = await (0, utils_1.inferDatasetType)(url, typeHint);
    let reader;
    try {
        switch (fileType) {
            case 'csv':
                reader = new csv_1.CsvReader(url);
                break;
            case 'json':
                reader = new json_1.JsonReader(url);
                break;
            case 'geojson':
                reader = new geojson_1.GeojsonReader(url);
                break;
            case 'excel':
                reader = new excel_1.ExcelReader(url);
                break;
            case 'gml':
                reader = new gml_1.GmlReader(url, options.namespace, options.wfsVersion);
                break;
            case 'wfs':
                reader = await wfs_1.WfsReader.createReader(url, options.wfsFeatureType);
                break;
        }
        reader.setCacheActive(cacheActive);
        reader.load();
        return reader;
    }
    catch (e) {
        //WfsReader may already raise a FetchError
        if (e instanceof model_1.FetchError)
            throw e;
        else
            throw model_1.FetchError.parsingFailed(e.message);
    }
}
/**
 * This fetches the full dataset at the given URL and parses it according to its mime type.
 * All items in the dataset are converted to GeoJSON features, even if they do not bear any spatial geometry.
 * File type can be either inferred (from the HTTP headers or the URL), or hinted using the 2nd argument
 * File type is determined liked so:
 *  1. if a type hint is given, use it
 *  2. otherwise, look for a Content-Type header in the response with a supported mime type
 *  3. if no valid mime type was found, look for an explicit file extension in the url (.csv, .geojson etc.)
 */
async function readDataset(url, typeHint, options, cacheActive = true) {
    const reader = await openDataset(url, typeHint, options, cacheActive);
    try {
        return await reader.read();
    }
    catch (e) {
        throw model_1.FetchError.parsingFailed(e.message);
    }
}
/**
 * This fetches only the header of the dataset at the given URL, giving info on size, mime-type and last update if available.
 */
function readDatasetHeaders(url) {
    return fetch(url).then((response) => (0, headers_1.parseHeaders)(response.headers));
}
//# sourceMappingURL=data-fetcher.js.map