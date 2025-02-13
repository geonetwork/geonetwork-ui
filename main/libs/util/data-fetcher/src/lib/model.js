"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMimeTypes = exports.SupportedTypes = exports.GmlMimeTypes = exports.ExcelMimeTypes = exports.GeoJsonMimeTypes = exports.JsonMimeTypes = exports.CsvMimeTypes = exports.FetchError = void 0;
class FetchError {
    constructor(type, info, httpStatus = 0) {
        this.type = type;
        this.info = info;
        this.httpStatus = httpStatus;
        this.stack = null;
        this.message = `An error happened in the data fetcher, type: ${type}, info: ${info}`;
    }
    static http(code) {
        return new FetchError('http', '', code);
    }
    static corsOrNetwork(message) {
        return new FetchError('network', message, 0);
    }
    static parsingFailed(info) {
        return new FetchError('parse', info, 0);
    }
    static unsupportedType(mimeType) {
        return new FetchError('unsupportedType', mimeType, 0);
    }
    static unknownType() {
        return new FetchError('unknown', '', 0);
    }
}
exports.FetchError = FetchError;
// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
exports.CsvMimeTypes = [
    'text/csv', // as per https://www.rfc-editor.org/rfc/rfc4180
    'application/csv', // seems to be also common
];
exports.JsonMimeTypes = ['application/json'];
exports.GeoJsonMimeTypes = [
    'application/geo+json',
    'application/vnd.geo+json',
];
exports.ExcelMimeTypes = [
    'application/vnd.ms-excel', // .xls
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