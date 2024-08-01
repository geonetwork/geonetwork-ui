import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import {
  CatalogRecord,
  Individual,
} from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'

@Injectable({
  providedIn: 'root',
})
export class NewRecordResolver {
  constructor(
    private platformService: PlatformServiceInterface,
    private organizationsServiceInterface: OrganizationsServiceInterface
  ) {}

  resolve(): Observable<[CatalogRecord, string, boolean]> {
    return this.getCurrentUserAsIndividual().pipe(
      map((contactsForResource) => [
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
          contactsForResource: contactsForResource ?? [],
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
    )
  }

  getCurrentUserAsIndividual(): Observable<Individual[] | null> {
    return this.platformService.getMe().pipe(
      switchMap((user) => {
        if (!user) {
          return of(null)
        }

        return this.organizationsServiceInterface.organisations$.pipe(
          map((organizations) => {
            const organization = organizations.find(
              (org) => org.name === user.organisation
            )

            if (!organization) {
              return null
            }

            const individual: Individual = {
              email: user.email ?? '',
              address: '',
              firstName: user.name ?? '',
              lastName: user.surname ?? '',
              role: 'point_of_contact',
              organization: organization,
            }

            return [individual]
          })
        )
      })
    )
  }
}
