import { BaseFileReader } from './base-file';
import { DataItem, PropertyInfo } from '../model';
import { WfsVersion } from '@camptocamp/ogc-client';
export declare function parseGml(text: string, namespace: string, version: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class GmlReader extends BaseFileReader {
    protected url: string;
    protected namespace: string;
    protected version: WfsVersion;
    protected cacheActive: boolean;
    constructor(url: string, namespace: string, version: WfsVersion, cacheActive?: boolean);
    protected getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
