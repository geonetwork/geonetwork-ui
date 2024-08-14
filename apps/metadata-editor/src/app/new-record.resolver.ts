import { Injectable } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NewRecordResolver {
  constructor(private recordsRepository: RecordsRepositoryInterface) {}

  resolve(): Observable<[CatalogRecord, string, boolean]> {
    return of([
      {
        uniqueIdentifier: this.recordsRepository.generateTemporaryId(),
        title: `My new record (${new Date().toISOString()})`,
        abstract: '',
        ownerOrganization: {},
        contacts: [],
        recordUpdated: new Date(),
        updateFrequency: 'unknown',
        languages: [],
        topics: [],
        keywords: [],
        licenses: [],
        legalConstraints: [],
        securityConstraints: [],
        otherConstraints: [],
        overviews: [],
        contactsForResource: [],
        kind: 'dataset',
        status: 'ongoing',
        lineage: '',
        distributions: [],
        spatialExtents: [],
        temporalExtents: [],
      } as CatalogRecord,
      null,
      false,
    ])
  }
}
