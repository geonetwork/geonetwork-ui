import { DataItem, DatasetInfo, FieldAggregation, FieldFilter, FieldGroupBy, FieldName, FieldSort, PropertyInfo } from '../model';
export declare class BaseReader {
    protected url: string;
    protected selected: FieldName[];
    protected groupedBy: FieldGroupBy[];
    protected aggregations: FieldAggregation[];
    protected filter: FieldFilter;
    protected sort: FieldSort[];
    protected startIndex: number;
    protected count: number;
    constructor(url: string);
    load(): void;
    get properties(): Promise<PropertyInfo[]>;
    get info(): Promise<DatasetInfo>;
    read(): Promise<DataItem[]>;
    selectAll(): this;
    select(...selectedFields: FieldName[]): this;
    groupBy(...groupBy: FieldGroupBy[]): this;
    aggregate(...aggregations: FieldAggregation[]): this;
    where(filter: FieldFilter): this;
    orderBy(...fieldSorts: FieldSort[]): this;
    limit(startIndex: number, count: number): this;
}
