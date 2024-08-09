import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model';
import { BaseDataset } from './base';
export declare function parseCsv(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class CsvDataset extends BaseDataset {
    private parseResult_;
    private propertiesInfo_;
    private datasetInfo_;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    readAll(): Promise<DataItem[]>;
}
