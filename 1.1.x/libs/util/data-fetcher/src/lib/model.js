"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMimeTypes = exports.SupportedTypes = exports.GmlMimeTypes = exports.ExcelMimeTypes = exports.GeoJsonMimeTypes = exports.JsonMimeTypes = exports.CsvMimeTypes = exports.FetchError = void 0;
class FetchError {
    constructor(message, httpStatus = 0, isCrossOriginOrNetworkRelated = false, parsingFailed = false, contentTypeError = false) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.isCrossOriginOrNetworkRelated = isCrossOriginOrNetworkRelated;
        this.parsingFailed = parsingFailed;
        this.contentTypeError = contentTypeError;
    }
    static http(code) {
        return new FetchError('Received HTTP error', code);
    }
    static corsOrNetwork(message) {
        return new FetchError(`Data could not be fetched (probably because of CORS limitations or a network error); error message is: ${message}`, 0, true);
    }
    static parsingFailed(info) {
        return new FetchError(`The received file could not be parsed for the following reason: ${info}`, 0, false, true);
    }
    static unsupportedType(mimeType) {
        return new FetchError(`The following content type is unsupported: ${mimeType}`, 0, false, false, true);
    }
    static unknownType() {
        return new FetchError('The content type could not be inferred and was not hinted, abandoning', 0, false, false, true);
    }
}
exports.FetchError = FetchError;
// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
exports.CsvMimeTypes = [
    'text/csv',
    'application/csv', // seems to be also common
];
exports.JsonMimeTypes = ['application/json'];
exports.GeoJsonMimeTypes = [
    'application/geo+json',
    'application/vnd.geo+json',
];
exports.ExcelMimeTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xslx
];
exports.GmlMimeTypes = ['application/gml+xml'];
exports.SupportedTypes = [
    'csv',
    'json',
    'geojson',
    'excel',
    'gml',
];
exports.AllMimeTypes = {
    csv: exports.CsvMimeTypes,
    json: exports.JsonMimeTypes,
    geojson: exports.GeoJsonMimeTypes,
    excel: exports.ExcelMimeTypes,
    gml: exports.GmlMimeTypes,
};
//# sourceMappingURL=model.js.map