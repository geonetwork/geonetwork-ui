import { DataItem, PropertyInfo } from '../model';
import { BaseFileReader } from './base-file';
export declare function parseCsv(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class CsvReader extends BaseFileReader {
    getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
