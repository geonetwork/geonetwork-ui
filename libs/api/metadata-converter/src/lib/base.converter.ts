import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export class MetadataMapperContext {
  readonly location?
}

export abstract class BaseConverter<F> {
  constructor(
    protected ctx: MetadataMapperContext = new MetadataMapperContext()
  ) {}

  abstract readRecord(document: F): Promise<CatalogRecord>
  abstract writeRecord(record: CatalogRecord, reference?: F): Promise<F>
  readRecords(documents: F[]): Promise<CatalogRecord[]> {
    return Promise.all(documents.map((doc) => this.readRecord(doc)))
  }
  writeRecords(records: CatalogRecord[]): Promise<F[]> {
    return Promise.all(records.map((doc) => this.writeRecord(doc)))
  }
}
