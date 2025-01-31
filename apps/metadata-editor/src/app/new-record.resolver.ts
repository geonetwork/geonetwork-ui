import { Injectable } from '@angular/core'
import {
  CatalogRecord,
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

@Injectable({
  providedIn: 'root',
})
export class NewRecordResolver {
  constructor(
    private recordsRepository: RecordsRepositoryInterface,
    private platformService: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface
  ) {}

  resolve(): Observable<[CatalogRecord, string, boolean]> {
    return this.getCurrentUserAsPointOfContact().pipe(
      map((contactsForResource) => {
        const catalogRecord: CatalogRecord = {
          uniqueIdentifier: null,
          title: `My new record`,
          abstract: '',
          ownerOrganization: {
            name: 'Owner organization',
          },
          contacts: [],
          recordUpdated: new Date(),
          updateFrequency: 'unknown',
          otherLanguages: [],
          defaultLanguage: 'en',
          topics: [],
          keywords: [],
          licenses: [],
          legalConstraints: [],
          securityConstraints: [],
          otherConstraints: [],
          overviews: [],
          contactsForResource: contactsForResource ? [contactsForResource] : [],
          kind: 'dataset',
          status: 'ongoing',
          lineage: '',
          onlineResources: [],
          spatialExtents: [],
          temporalExtents: [],
        }
        return [catalogRecord, null, false]
      })
    )
  }

  getCurrentUserAsPointOfContact(): Observable<Individual | null> {
    return this.platformService.getMe().pipe(
      switchMap((user) => {
        if (!user) {
          // todo: maybe notify the user that they need to log in?
          return of(null)
        }

        return this.organizationsServiceInterface.organisations$.pipe(
          map((organizations) => {
            let organization = organizations.find(
              (org) => org.name === user.organisation
            )

            if (!organization) {
              organization = {
                name: '',
              } as Organization
            }

            const individual: Individual = {
              email: user.email ?? '',
              address: '',
              firstName: user.name ?? '',
              lastName: user.surname ?? '',
              role: 'point_of_contact',
              organization: organization,
            }

            return individual
          })
        )
      })
    )
  }
}
