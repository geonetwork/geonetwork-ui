import { DataItem } from '../lib/model'
import { fetchData } from '../lib/utils'

export class BaseDataset {
  constructor(private url: string) {}

  protected fetchAsText(): Promise<string> {
    return fetchData(this.url).then((resp) => resp.text())
  }

  protected fetchAsBuffer(): Promise<ArrayBuffer> {
    return fetchData(this.url).then((resp) => resp.arrayBuffer())
  }

  readAll(): Promise<DataItem[]> {
    throw new Error('not implemented')
  }
}
