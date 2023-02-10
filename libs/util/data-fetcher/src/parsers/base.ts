import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { fetchData } from '../lib/utils'

export class Query {
  private selection = {
    fields: '*',
    where: true,
    limit: -1,
    offset: -1,
  }

  constructor(private dataset: BaseDataset) {}

  where(expression): Query

  limit(count): Query

  offset(count): Query

  read(): Promise<DataItem[]> {
    return this.dataset.query(this.state)
  }
}

export class BaseDataset {
  private selection = {
    fields: '*',
    where: true,
    limit: -1,
    offset: -1,
  }

  constructor(private url: string) {}

  protected fetchAsText(): Promise<string> {
    return fetchData(this.url).then((resp) => resp.text())
  }

  protected fetchAsBuffer(): Promise<ArrayBuffer> {
    return fetchData(this.url).then((resp) => resp.arrayBuffer())
  }

  get properties(): Promise<PropertyInfo[]> {
    throw new Error('not implemented')
  }

  get info(): Promise<DatasetInfo> {
    throw new Error('not implemented')
  }

  readAll(): Promise<DataItem[]> {
    throw new Error('not implemented')
  }

  all(): Query {}

  select(...fields): Query {}
}
