import { DataItem, PropertyInfo } from '../model';
import { BaseFileReader } from './base-file';
/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
export declare function parseExcel(buffer: ArrayBuffer): Promise<{
    items: DataItem[];
    properties: PropertyInfo[];
}>;
export declare class ExcelReader extends BaseFileReader {
    getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
