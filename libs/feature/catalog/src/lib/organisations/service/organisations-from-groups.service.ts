import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import {
  ElasticsearchService,
  getAsArray,
  getAsUrl,
  hydrateContactsWithRecordLogo,
  mapContact,
  MetadataContact,
  MetadataRecord,
  Organisation,
  SearchFilters,
  selectField,
  SourceWithUnknownProps,
} from '@geonetwork-ui/util-shared'
import { forkJoin, Observable, of } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { OrganisationsServiceInterface } from './organisations.service.interface'
import { TranslateService } from '@ngx-translate/core'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'

const IMAGE_URL = '/geonetwork/images/harvesting/'

@Injectable()
export class OrganisationsFromGroupsService
  implements OrganisationsServiceInterface
{
  private groups$: Observable<GroupApiModel[]> = this.groupsApiService
    .getGroups()
    .pipe(shareReplay())
  private groupsAggregation$ = this.searchApiService
    .search(
      'bucket',
      JSON.stringify(
        this.esService.getSearchRequestBody({
          groups: {
            terms: {
              field: 'groupOwner',
              size: 5000,
            },
          },
        })
      )
    )
    .pipe(
      map((response) => response.aggregations.groups.buckets),
      shareReplay()
    )
  organisations$ = forkJoin([this.groupsAggregation$, this.groups$]).pipe(
    map(([groupsAgg, groups]) => this.mapGroups(groupsAgg, groups)),
    shareReplay()
  )
  organisationsCount$ = this.organisations$.pipe(map((orgs) => orgs.length))

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService,
    private groupsApiService: GroupsApiService,
    private translateService: TranslateService
  ) {}

  private mapGroups(groupBuckets: any[], groups: GroupApiModel[]) {
    return groupBuckets
      .filter(({ key }) => !!groups.find((g) => g.id.toString() === key))
      .map(({ key, doc_count }) => {
        const group = groups.find((g) => g.id.toString() === key)
        const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
        return {
          name: group.label[lang3],
          recordCount: doc_count,
          ...(group.email && { email: group.email }),
          ...(group.description && { description: group.description }),
          ...(group.logo && { logoUrl: `${IMAGE_URL}${group.logo}` }),
        } as Organisation
      })
  }

  getFiltersForOrgs(organisations: Organisation[]): Observable<SearchFilters> {
    return this.groups$.pipe(
      map((allGroups) => {
        const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
        const groups = organisations.map((org) =>
          allGroups.find((group) => group.label[lang3] === org.name)
        )
        return {
          groupOwner: groups.reduce(
            (prev, curr) => ({ ...prev, [curr.id.toString()]: true }),
            {}
          ),
        }
      })
    )
  }

  getOrgsFromFilters(filters: SearchFilters): Observable<Organisation[]> {
    if (!('groupOwner' in filters)) return of([])
    return forkJoin([this.groups$, this.organisations$]).pipe(
      map(([groups, orgs]) => {
        const groupIds = Object.keys(filters.groupOwner)
        const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
        return groupIds.map((id) => {
          const group = groups.find((group) => group.id.toString() === id)
          return orgs.find((org) => org.name === group.label[lang3])
        })
      })
    )
  }

  private mapContactFromGroup(
    group: GroupApiModel,
    lang3: string
  ): MetadataContact {
    const website = getAsUrl(group.website)
    const logoUrl = getAsUrl(`${IMAGE_URL}${group.logo}`)
    return {
      name: group.label[lang3],
      organisation: group.label[lang3],
      email: group.email,
      ...(website && { website }),
      ...(logoUrl && { logoUrl }),
    }
  }

  addOrganisationToRecordFromSource(
    source: SourceWithUnknownProps,
    record: MetadataRecord
  ): Observable<MetadataRecord> {
    const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
    const groupId = parseInt(selectField(source, 'groupOwner'))
    const resourceContacts = getAsArray(
      selectField(source, 'contactForResource')
    ).map((contact) => mapContact(contact))
    return this.groups$.pipe(
      map((groups) => {
        const group = groups.find((g) => g.id === groupId)
        if (!group) return hydrateContactsWithRecordLogo(record, source)
        const contact = this.mapContactFromGroup(group, lang3)
        return hydrateContactsWithRecordLogo(
          {
            ...record,
            contact,
            resourceContacts: [contact, ...resourceContacts],
          },
          source
        )
      })
    )
  }
}
