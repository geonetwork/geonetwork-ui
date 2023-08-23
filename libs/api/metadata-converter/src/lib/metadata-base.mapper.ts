import {
  CatalogRecord,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/record'

export class MetadataMapperContext {
  readonly location?
}
export abstract class MetadataBaseMapper<F> {
  constructor(
    protected ctx: MetadataMapperContext = new MetadataMapperContext()
  ) {}

  abstract readDataset(document: F): DatasetRecord
  abstract writeDataset(record: DatasetRecord): F
}
