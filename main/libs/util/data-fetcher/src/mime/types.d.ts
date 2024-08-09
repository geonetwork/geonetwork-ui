export declare const CsvMimeTypes: readonly ["text/csv", "application/csv"];
export declare const JsonMimeTypes: readonly ["application/json"];
export declare const GeoJsonMimeTypes: readonly ["application/geo+json", "application/vnd.geo+json"];
export declare const ExcelMimeTypes: readonly ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
export declare type SupportedMimeType = typeof CsvMimeTypes[number] | typeof JsonMimeTypes[number] | typeof GeoJsonMimeTypes[number] | typeof ExcelMimeTypes[number];
export declare const SupportedTypes: readonly ["csv", "json", "geojson", "excel"];
export declare type SupportedType = typeof SupportedTypes[number];
export declare const AllMimeTypes: {
    csv: readonly ["text/csv", "application/csv"];
    json: readonly ["application/json"];
    geojson: readonly ["application/geo+json", "application/vnd.geo+json"];
    excel: readonly ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
};
