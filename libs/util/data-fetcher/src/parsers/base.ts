import {
  DataItem,
  DatasetInfo,
  FieldAggregation,
  FieldFilter,
  FieldGroupBy,
  FieldName,
  FieldSort,
  PropertyInfo,
} from '../lib/model'

export class BaseDataset {
  protected selected: FieldName[] = null
  protected groupBy: FieldGroupBy = null
  protected aggregations: FieldAggregation[] = null
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
    this.groupBy = null
    this.aggregations = null
    this.selected = null
    this.filter = null
    this.startIndex = null
    this.count = null
    return this
  }
  select(...selectedFields: FieldName[]): this {
    this.selected = selectedFields
    this.aggregations = null
    return this
  }
  aggregate(groupBy: FieldGroupBy, ...aggregations: FieldAggregation[]): this {
    this.groupBy = groupBy
    this.aggregations = aggregations
    this.selected = null
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
