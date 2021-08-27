import { Injectable } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { ElasticsearchFieldMapper } from './elasticsearch.field.mapper'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private fieldMapper: ElasticsearchFieldMapper) {}

  toRecords(response: any): MetadataRecord[] {
    return response.hits.hits.map((hit) => this.toRecord(hit))
  }

  toRecord(hit: any) {
    const { _source } = hit
    const record: Partial<MetadataRecord> = {
      uuid: hit._id,
      viewable: hit.view,
      downloadable: hit.download,
    }

    Object.keys(_source).forEach((fieldName) => {
      const mappingFn = (
        this.getMappingFn(fieldName) || this.fieldMapper.mapGenericField
      ).bind(this.fieldMapper)
      mappingFn(record as MetadataRecord, _source, fieldName)
    })

    return record as MetadataRecord
  }

  private getMappingFn(fieldName: string) {
    return this.fieldMapper.fields[fieldName]
  }
}
