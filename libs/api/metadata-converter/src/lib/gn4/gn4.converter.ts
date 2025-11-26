import { Gn4FieldMapper } from './gn4.field.mapper'
import { lastValueFrom } from 'rxjs'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BaseConverter } from '../base.converter'
import { Injectable } from '@angular/core'
import { Gn4Record } from './types'

@Injectable({
  providedIn: 'root',
})
export class Gn4Converter extends BaseConverter<Gn4Record> {
  constructor(
    private fieldMapper: Gn4FieldMapper,
    private orgsService: OrganizationsServiceInterface
  ) {
    super()
  }

  readRecord(document: Gn4Record): Promise<CatalogRecord> {
    const { _source, ...rootDocument } = document
    const allKeys = { ..._source, ...rootDocument }
    const emptyRecord: Partial<CatalogRecord> = {
      kind: 'dataset',
      status: null,
      lineage: null,
      recordUpdated: null,
      recordPublished: null,
      ownerOrganization: null,
      licenses: [],
      legalConstraints: [],
      securityConstraints: [],
      otherConstraints: [],
      contacts: [],
      contactsForResource: [],
      keywords: [],
      topics: [],
      spatialExtents: [],
      temporalExtents: [],
      overviews: [],
      defaultLanguage: null,
      otherLanguages: [],
    }
    const record: CatalogRecord = Object.keys(allKeys).reduce(
      (prev, fieldName) =>
        this.fieldMapper.getMappingFn(fieldName)(prev, allKeys),
      emptyRecord
    )
    return lastValueFrom(
      this.orgsService.addOrganizationToRecordFromSource(_source, record)
    )
  }

  writeRecord(record: CatalogRecord): Promise<Gn4Record> {
    throw new Error('not implemented')
  }
}
