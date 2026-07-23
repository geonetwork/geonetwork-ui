import { DataItem, DatasetHeaders, PropertyInfo, SupportedType } from './model';
export declare function inferDatasetType(url: string, typeHint?: SupportedType): Promise<SupportedType>;
export declare function fetchHeaders(url: string): Promise<DatasetHeaders>;
export declare function fetchDataAsText(url: string): Promise<string>;
export declare function fetchDataAsArrayBuffer(url: string): Promise<ArrayBuffer>;
export declare function tryParseDate(input: string): Date | null;
export declare function tryParseNumber(input: string): number | null;
export declare function jsonToGeojsonFeature(object: {
    [key: string]: any;
}): DataItem;
/**
 * This will infer field types from a list of data items and cast the values accordingly
 * @param items
 * @param inferTypes
 */
export declare function processItemProperties(items: DataItem[], inferTypes?: boolean): {
    items: DataItem[];
    properties: PropertyInfo[];
};
/**
 * This creates a Proxy that allows reading and writing to the data item properties
 * as if it was a simple array of JSON objects
 * @param items
 */
export declare function getJsonDataItemsProxy(items: DataItem[]): Record<string, unknown>[];
