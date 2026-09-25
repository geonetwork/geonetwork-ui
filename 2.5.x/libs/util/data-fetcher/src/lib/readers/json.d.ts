import { DataItem, PropertyInfo } from '../model';
import { BaseFileReader } from './base-file';
/**
 * This parser only supports arrays of simple flat objects with properties
 * @param text
 */
export declare function parseJson(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class JsonReader extends BaseFileReader {
    getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
