import type { Feature } from 'geojson';
export type DataItem = Feature;
export declare class FetchError {
    type: 'http' | 'network' | 'parse' | 'unsupportedType' | 'unknown';
    info: string;
    httpStatus: number;
    message: string;
    stack: any;
    constructor(type: 'http' | 'network' | 'parse' | 'unsupportedType' | 'unknown', info: string, httpStatus?: number);
    static http(code: number): FetchError;
    static corsOrNetwork(message: string): FetchError;
    static parsingFailed(info: string): FetchError;
    static unsupportedType(mimeType: string): FetchError;
    static unknownType(): FetchError;
}
export declare const CsvMimeTypes: readonly ["text/csv", "application/csv"];
export declare const JsonMimeTypes: readonly ["application/json"];
export declare const GeoJsonMimeTypes: readonly ["application/geo+json", "application/vnd.geo+json"];
export declare const ExcelMimeTypes: readonly ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
export declare const GmlMimeTypes: readonly ["application/gml+xml"];
export type SupportedMimeType = (typeof CsvMimeTypes)[number] | (typeof JsonMimeTypes)[number] | (typeof GeoJsonMimeTypes)[number] | (typeof ExcelMimeTypes)[number] | (typeof GmlMimeTypes)[number];
export declare const SupportedTypes: readonly ["csv", "json", "geojson", "excel", "gml"];
export type SupportedType = (typeof SupportedTypes)[number];
export declare const AllMimeTypes: {
    csv: readonly ["text/csv", "application/csv"];
    json: readonly ["application/json"];
    geojson: readonly ["application/geo+json", "application/vnd.geo+json"];
    excel: readonly ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    gml: readonly ["application/gml+xml"];
};
export interface DatasetHeaders {
    mimeType?: string;
    supportedType?: SupportedType;
    fileSizeBytes?: number;
    lastUpdate?: Date;
    lastUpdateInvalid?: true;
}
export interface PropertyInfo {
    name: string;
    label: string;
    type: 'number' | 'date' | 'url' | 'string';
}
export interface DatasetInfo {
    itemsCount: number;
}
export type FieldName = string;
type SumOperation = ['sum', FieldName];
type AverageOperation = ['average', FieldName];
type MinOperation = ['min', FieldName];
type MaxOperation = ['max', FieldName];
type CountOperation = ['count'];
export type FieldAggregation = SumOperation | AverageOperation | MinOperation | MaxOperation | CountOperation;
type AllOperation = ['all'];
type DistinctOperation = ['distinct', FieldName];
type RangeBucketsOperation = ['rangeBuckets', FieldName, number];
export type FieldGroupBy = AllOperation | DistinctOperation | RangeBucketsOperation;
export type FieldSort = ['desc' | 'asc', FieldName];
type ComparisonOperator = '<' | '>' | '<=' | '>=' | '=' | '!=';
type Comparison = [ComparisonOperator, FieldName, string | number];
type AndOperation = ['and', ...FieldFilter[]];
type OrOperation = ['or', ...FieldFilter[]];
type NotOperation = ['not', FieldFilter];
type InOperation = ['in', FieldName, ...(string[] | number[])];
type LikeOperation = ['like', FieldName, string];
export type FieldFilter = Comparison | AndOperation | OrOperation | NotOperation | InOperation | LikeOperation;
export {};
