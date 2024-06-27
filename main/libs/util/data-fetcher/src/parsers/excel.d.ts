import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model';
import { BaseDataset } from './base';
/**
 * This will read the first sheet of the excel workbook and expect the first
 * line to contain the properties names
 * @param buffer
 */
export declare function parseExcel(buffer: ArrayBuffer): Promise<{
    items: DataItem[];
    properties: PropertyInfo[];
}>;
export declare class ExcelDataset extends BaseDataset {
    private parseResult_;
    private propertiesInfo_;
    private datasetInfo_;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    readAll(): Promise<DataItem[]>;
}
