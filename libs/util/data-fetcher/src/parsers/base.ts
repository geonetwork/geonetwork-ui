import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { fetchData } from '../lib/utils'

export class BaseDataset {
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
}
