import { BaseReader } from './base';
import { DataItem, DatasetInfo, PropertyInfo } from '../model';
type ParseResult = {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class BaseFileReader extends BaseReader {
    private parseResult_;
    protected getData(): Promise<ParseResult>;
    load(): void;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    read(): Promise<DataItem[]>;
}
export {};
