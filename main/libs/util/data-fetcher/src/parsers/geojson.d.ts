import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model';
import { BaseDataset } from './base';
/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
export declare function parseGeojson(text: string): {
    items: DataItem[];
    properties: PropertyInfo[];
};
export declare class GeojsonDataset extends BaseDataset {
    private parseResult_;
    private propertiesInfo_;
    private datasetInfo_;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    readAll(): Promise<DataItem[]>;
}
