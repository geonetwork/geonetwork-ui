import { DataItem, PropertyInfo } from '../model';
import { BaseFileReader } from './base-file';
/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
export declare function parseGeojson(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class GeojsonReader extends BaseFileReader {
    getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
