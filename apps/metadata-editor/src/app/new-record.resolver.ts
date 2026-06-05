import { Injectable, inject } from '@angular/core'
import {
  CatalogRecord,
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { from, Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { TranslateService } from '@ngx-translate/core'
import { NOT_KNOWN_CONSTRAINT } from '@geonetwork-ui/feature/editor'
import { getOptionalEditorConfig } from '@geonetwork-ui/util/app-config'
import { Iso191153Converter } from '@geonetwork-ui/api/metadata-converter'

@Injectable({
  providedIn: 'root',
})
export class NewRecordResolver {
  private platformService = inject(PlatformServiceInterface)
  private organizationsServiceInterface = inject(OrganizationsServiceInterface)
  private translateService = inject(TranslateService)
  private readonly iso191153Converter = new Iso191153Converter()

  resolve(): Observable<[CatalogRecord, string | null, boolean]> {
    const editorConfig = getOptionalEditorConfig()
    const defaultLang =
      editorConfig?.NEW_RECORD_DEFAULT_LANGUAGE ??
      this.translateService.currentLang
    return this.getCurrentUserAsPointOfContact().pipe(
      map((userContact) => {
        const catalogRecord: CatalogRecord = {
          uniqueIdentifier: null,
          title: this.translateService.instant('editor.new.record.title'),
          abstract: '',
          ownerOrganization: {
            name: 'Owner organization',
          },
          contacts: userContact ? [userContact] : [],
          recordUpdated: new Date(),
          updateFrequency: 'unknown',
          otherLanguages: [],
          defaultLanguage: defaultLang,
          topics: [],
          keywords: [],
          licenses: [],
          legalConstraints: [NOT_KNOWN_CONSTRAINT],
          securityConstraints: [],
          otherConstraints: [],
          overviews: [],
          contactsForResource: userContact ? [userContact] : [],
          kind: 'dataset',
          status: 'ongoing',
          lineage: '',
          onlineResources: [],
          spatialExtents: [],
          temporalExtents: [],
        }
        return catalogRecord
      }),
      switchMap((catalogRecord) => {
        if (editorConfig?.NEW_RECORD_STANDARD === 'iso19115-3') {
          return from(this.iso191153Converter.writeRecord(catalogRecord)).pipe(
            map(
              (recordSource) =>
                [catalogRecord, recordSource, false] as [
                  CatalogRecord,
                  string,
                  false,
                ]
            )
          )
        }
        return of([catalogRecord, null, false] as [CatalogRecord, null, false])
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
