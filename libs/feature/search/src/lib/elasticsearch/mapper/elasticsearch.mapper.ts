import { Injectable } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { ElasticsearchFieldMapper } from './elasticsearch.field.mapper'

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchMapper {
  constructor(private fieldMapper: ElasticsearchFieldMapper) {}

  toRecords(response): MetadataRecord[] {
    return response.hits.hits.map((hit) => this.toRecord(hit))
  }

  toRecord(hit) {
    const { _source } = hit
    const record: Partial<MetadataRecord> = {
      viewable: hit.view,
      downloadable: hit.download,
    }

    return Object.keys(_source).reduce(
      (prev, fieldName) =>
        this.fieldMapper.getMappingFn(fieldName)(prev, _source, fieldName),
      record
    ) as MetadataRecord
  }
}
