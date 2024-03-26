import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model';
export declare class BaseDataset {
    private url;
    constructor(url: string);
    protected fetchAsText(): Promise<string>;
    protected fetchAsBuffer(): Promise<ArrayBuffer>;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    readAll(): Promise<DataItem[]>;
}
