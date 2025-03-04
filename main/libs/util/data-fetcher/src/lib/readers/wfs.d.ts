import { WfsEndpoint, WfsVersion } from '@camptocamp/ogc-client';
import { DataItem, DatasetInfo, PropertyInfo } from '../model';
import { BaseReader } from './base';
import { GmlReader } from './gml';
import { GeojsonReader } from './geojson';
export declare class WfsReader extends BaseReader {
    endpoint: WfsEndpoint;
    featureTypeName: string;
    version: WfsVersion;
    constructor(url: string, wfsEndpoint: WfsEndpoint, featureTypeName: string);
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    static createReader(wfsUrlEndpoint: string, featureTypeName?: string): Promise<GeojsonReader | GmlReader | WfsReader>;
    protected getData(): Promise<{
        items: DataItem[];
        properties: PropertyInfo[];
    }>;
    load(): void;
    read(): Promise<DataItem[]>;
}
