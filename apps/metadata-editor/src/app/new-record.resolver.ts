import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Injectable({
  providedIn: 'root',
})
export class NewRecordResolver {
  resolve(): Observable<[CatalogRecord, string, boolean]> {
    return of([
      {
        uniqueIdentifier: `TEMP-ID-${Date.now()}`,
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
