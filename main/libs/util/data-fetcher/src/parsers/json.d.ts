import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model';
import { BaseDataset } from './base';
/**
 * This parser only supports arrays of simple flat objects with properties
 * @param text
 */
export declare function parseJson(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class JsonDataset extends BaseDataset {
    private parseResult_;
    private propertiesInfo_;
    private datasetInfo_;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    readAll(): Promise<DataItem[]>;
}
