import { BaseDataset } from './base'
import { DataItem, DatasetInfo, PropertyInfo } from '../lib/model'
import { fetchData } from '../lib/utils'

type ParseResult = {
  items: DataItem[]
  properties: PropertyInfo[]
}

export class BaseFileDataset extends BaseDataset {
  private parseResult_: Promise<ParseResult>
  private propertiesInfo_: Promise<PropertyInfo[]>
  private datasetInfo_: Promise<DatasetInfo>

  protected getData(): Promise<ParseResult> {
    throw new Error('not implemented')
  }

  load() {
    this.parseResult_ = this.getData()
    this.propertiesInfo_ = this.parseResult_.then((result) => result.properties)
    this.datasetInfo_ = this.parseResult_.then(
      (result) =>
        ({
          itemsCount: result.items.length,
        } as DatasetInfo)
    )
  }

  get properties(): Promise<PropertyInfo[]> {
    return this.propertiesInfo_
  }

  get info(): Promise<DatasetInfo> {
    return this.datasetInfo_
  }

  read(): Promise<DataItem[]> {
    return this.parseResult_.then((result) => result.items)
  }

  protected fetchAsText(): Promise<string> {
    return fetchData(this.url).then((resp) => resp.text())
  }

  protected fetchAsBuffer(): Promise<ArrayBuffer> {
    return fetchData(this.url).then((resp) => resp.arrayBuffer())
  }
}
