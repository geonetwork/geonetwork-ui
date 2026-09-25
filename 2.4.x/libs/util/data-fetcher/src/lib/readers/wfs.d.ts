import { WfsEndpoint, WfsVersion } from '@camptocamp/ogc-client';
import { DataItem, DatasetInfo, PropertyInfo } from '../model';
import { GmlReader } from './gml';
import { GeojsonReader } from './geojson';
import { BaseCacheReader } from './base-cache';
export declare class WfsReader extends BaseCacheReader {
    endpoint: WfsEndpoint;
    featureTypeName: string;
    version: WfsVersion;
    constructor(url: string, wfsEndpoint: WfsEndpoint, featureTypeName: string, cacheActive?: boolean);
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    static createReader(wfsUrlEndpoint: string, featureTypeName?: string): Promise<GeojsonReader | GmlReader | WfsReader>;
    getData(aggregation?: any, groupedBy?: any): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    } | {
        items: any;
    }>;
    getQueryData(): Promise<any>;
    load(): void;
    read(): Promise<DataItem[]>;
}
