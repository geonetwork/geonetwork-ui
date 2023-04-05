import {
  DatasetRecord,
  Gn4SearchResults,
} from '@geonetwork-ui/util/types/metadata'
import { MetadataBaseMapper } from '../metadata-base.mapper'
import { Gn4FieldMapper } from './gn4.field.mapper'

export class Gn4MetadataMapper extends MetadataBaseMapper<Gn4SearchResults> {
  private fieldMapper = new Gn4FieldMapper(this.ctx)

  readDatasets(esResponse: any) {
    return esResponse.hits.hits.map((hit) => this.readDataset(hit))
  }

  readDataset(document: any): DatasetRecord {
    const { _source } = document
    const record: Partial<DatasetRecord> = {}

    return {
      ...Object.keys(_source).reduce(
        (prev, fieldName) =>
          this.fieldMapper.getMappingFn(fieldName)(prev, _source),
        record
      ),
      kind: 'dataset',
    } as DatasetRecord
  }

  writeDataset(record: DatasetRecord): any {
    return undefined
  }
}
