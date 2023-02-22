import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'

export class BaseDataset {
  constructor(private url: string) {}

  protected fetchAsText(): Promise<string> {
    return fetchData(this.url).then((resp) => resp.text())
  }

export class BaseDataset {
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
}
