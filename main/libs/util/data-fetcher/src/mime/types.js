"use strict";
// Useful reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMimeTypes = exports.SupportedTypes = exports.ExcelMimeTypes = exports.GeoJsonMimeTypes = exports.JsonMimeTypes = exports.CsvMimeTypes = void 0;
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
exports.SupportedTypes = ['csv', 'json', 'geojson', 'excel'];
exports.AllMimeTypes = {
    csv: exports.CsvMimeTypes,
    json: exports.JsonMimeTypes,
    geojson: exports.GeoJsonMimeTypes,
    excel: exports.ExcelMimeTypes,
};
//# sourceMappingURL=types.js.map