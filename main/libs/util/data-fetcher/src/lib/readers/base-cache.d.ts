import { BaseReader } from './base';
export declare abstract class BaseCacheReader extends BaseReader {
    protected url: string;
    protected cacheActive: boolean;
    constructor(url: string, cacheActive?: boolean);
    setCacheActive(value: boolean): void;
}
