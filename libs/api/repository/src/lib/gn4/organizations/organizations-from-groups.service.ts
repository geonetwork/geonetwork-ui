import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { forkJoin, Observable, of } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { ElasticsearchService } from '../elasticsearch'
import {
  getAsUrl,
  MetadataObject,
  SearchFilters,
} from '@geonetwork-ui/api/metadata-converter'

const IMAGE_URL = '/geonetwork/images/harvesting/'

@Injectable()
export class OrganizationsFromGroupsService
  implements OrganizationsServiceInterface
{
  private groups$: Observable<GroupApiModel[]>
  private groupsAggregation$: Observable<any[]>
  organisations$: Observable<Organization[]>
  organisationsCount$: Observable<number>

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService,
    private groupsApiService: GroupsApiService,
    private translateService: TranslateService
  ) {}

  getOrganisations(configFilters: SearchFilters): Observable<Organization[]> {
    this.groups$ = this.groupsApiService.getGroups().pipe(shareReplay())
    this.groupsAggregation$ = this.searchApiService
      .search(
        'bucket',
        null,
        JSON.stringify(
          this.esService.getSearchRequestBody(
            {
              groups: {
                terms: {
                  field: 'groupOwner',
                  size: 5000,
                },
              },
            },
            0,
            0,
            undefined,
            undefined,
            configFilters
          )
        )
      )
      .pipe(
        map((response) => response.aggregations.groups.buckets),
        shareReplay()
      )
    this.organisations$ = forkJoin([
      this.groupsAggregation$,
      this.groups$,
    ]).pipe(
      map(([groupsAgg, groups]) => this.mapGroups(groupsAgg, groups)),
      shareReplay()
    )
    this.organisationsCount$ = this.organisations$.pipe(
      map((orgs) => orgs.length)
    )
    return this.organisations$
  }

  private mapGroups(groupBuckets: any[], groups: GroupApiModel[]) {
    return groupBuckets
      .filter(({ key }) => !!groups.find((g) => g.id.toString() === key))
      .map(({ key, doc_count }) => {
        const group = groups.find((g) => g.id.toString() === key)
        const org = this.mapOrgFromGroup(group)
        return {
          ...org,
          recordCount: doc_count,
        } as Organization
      })
  }

  private mapOrgFromGroup(group: GroupApiModel) {
    const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
    return {
      name: group.label[lang3],
      ...(group.description && { description: group.description }),
      ...(group.email && { email: group.email }),
      ...(group.logo && {
        logoUrl: getAsUrl(`${IMAGE_URL}${group.logo}`),
      }),
      ...(group.website && {
        website: getAsUrl(group.website),
      }),
    } as Organization
  }

  getFiltersForOrgs(orgs: Organization[]): Observable<FieldFilters> {
    return this.groups$.pipe(
      map((allGroups) => {
        const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
        const groups = orgs.map((org) =>
          allGroups.find((group) => group.label[lang3] === org.name)
        )
        return {
          groupOwner: groups.reduce(
            (prev, curr) => ({ ...prev, [curr.id.toString()]: true }),
            {} as Record<string, boolean>
          ),
        }
      })
    )
  }

  getOrgsFromFilters(filters: FieldFilters): Observable<Organization[]> {
    if (!('groupOwner' in filters)) return of([])
    return forkJoin([this.groups$, this.organisations$]).pipe(
      map(([groups, orgs]) => {
        const groupIds = Object.keys(filters['groupOwner'])
        const lang3 = LANG_2_TO_3_MAPPER[this.translateService.currentLang]
        return groupIds.map((id) => {
          const group = groups.find((group) => group.id.toString() === id)
          return orgs.find((org) => org.name === group.label[lang3])
        })
      })
    )
  }

  addOrganizationToRecordFromSource(
    source: MetadataObject,
    record: CatalogRecord
  ): Observable<CatalogRecord> {
    if (!('groupOwner' in source)) return of(record)

    const groupId = parseInt(source.groupOwner as string)
    return this.groups$.pipe(
      map((groups) => {
        const group = groups.find((g) => g.id === groupId)
        if (!group) return record
        const ownerOrganization = this.mapOrgFromGroup(group)
        return {
          ...record,
          ownerOrganization,
        }
      })
    )
  }
}
