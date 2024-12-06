import { BaseFileReader } from './base-file';
import { DataItem, PropertyInfo } from '../model';
import { WfsVersion } from '@camptocamp/ogc-client';
export declare function parseGml(text: string, namespace: string, version: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class GmlReader extends BaseFileReader {
    namespace: string;
    version: WfsVersion;
    constructor(url: any, namespace: any, version: any);
    protected getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
}
