import { FieldAggregation, FieldFilter, FieldGroupBy, FieldName, FieldSort } from './model';
/**
 * Leave arguments at null if not used
 * @param selected
 * @param filter
 * @param sort
 * @param startIndex
 * @param count
 * @param groupBy
 * @param aggregations
 */
export declare function generateSqlQuery(selected?: FieldName[], filter?: FieldFilter, sort?: FieldSort[], startIndex?: number, count?: number, groupBy?: FieldGroupBy[], aggregations?: FieldAggregation[]): string;
