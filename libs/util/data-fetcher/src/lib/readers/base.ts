import {
  DataItem,
  DatasetInfo,
  FieldAggregation,
  FieldFilter,
  FieldGroupBy,
  FieldName,
  FieldSort,
  PropertyInfo,
} from '../model'

export class BaseReader {
  protected selected: FieldName[] = null
  public groupedBy: FieldGroupBy[] = null
  public aggregations: FieldAggregation[] = null
  protected filter: FieldFilter = null
  protected sort: FieldSort[] = null
  protected startIndex: number = null
  protected count: number = null

  constructor(protected url: string) {}

  load() {
    throw new Error('not implemented')
  }

  get properties(): Promise<PropertyInfo[]> {
    throw new Error('not implemented')
  }

  get info(): Promise<DatasetInfo> {
    throw new Error('not implemented')
  }

  read(): Promise<DataItem[]> {
    throw new Error('not implemented')
  }

  selectAll(): this {
    this.groupedBy = null
    this.aggregations = null
    this.selected = null
    this.filter = null
    this.startIndex = null
    this.count = null
    return this
  }
  select(...selectedFields: FieldName[]): this {
    this.selected = selectedFields
    this.aggregations = null // clear aggregations & groups when selecting fields
    this.groupedBy = null
    return this
  }
  groupBy(...groupBy: FieldGroupBy[]): this {
    this.groupedBy = groupBy
    this.selected = null // clear normal field selection when aggregating
    return this
  }
  aggregate(...aggregations: FieldAggregation[]): this {
    this.aggregations = aggregations
    return this
  }
  where(filter: FieldFilter): this {
    this.filter = filter
    return this
  }
  orderBy(...fieldSorts: FieldSort[]): this {
    this.sort = fieldSorts
    return this
  }
  limit(startIndex: number, count: number): this {
    this.startIndex = startIndex
    this.count = count
    return this
  }
}
