import { Injectable } from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'
import { ElasticsearchFieldMapper } from './elasticsearch.field.mapper'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private fieldMapper: ElasticsearchFieldMapper) {}

  toRecords(response: any): RecordSummary[] {
    return response.hits.hits.map((hit) => this.toRecord(hit))
  }

  toRecord(hit: any) {
    const { _source } = hit
    const record: Partial<RecordSummary> = {
      uuid: hit._id,
      viewable: hit.view,
      downloadable: hit.download,
    }

    Object.keys(_source).forEach((fieldName) => {
      const mappingFn = (
        this.getMappingFn(fieldName) || this.fieldMapper.mapGenericField
      ).bind(this.fieldMapper)
      mappingFn(record, _source, fieldName)
    })

    return record as RecordSummary
  }

  private getMappingFn(fieldName: string) {
    return this.fieldMapper[`map${this.captitalizeFirstLetter(fieldName)}`]
  }
  private captitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
