import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { forkJoin, Observable, of } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { getLang3FromLang2 } from '@geonetwork-ui/util/i18n'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { ElasticsearchService } from '../elasticsearch'
import { getAsUrl, MetadataObject } from '@geonetwork-ui/api/metadata-converter'

const IMAGE_URL = '/geonetwork/images/harvesting/'

@Injectable()
export class OrganizationsFromGroupsService
  implements OrganizationsServiceInterface
{
  private groups$: Observable<GroupApiModel[]> = this.groupsApiService
    .getGroups()
    .pipe(shareReplay())
  private groupsAggregation$ = this.searchApiService
    .search(
      'bucket',
      null,
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

  private get lang3() {
    return getLang3FromLang2(this.translateService.currentLang)
  }

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
        const org = this.mapOrgFromGroup(group)
        return {
          ...org,
          recordCount: doc_count,
        } as Organization
      })
  }

  private mapOrgFromGroup(group: GroupApiModel) {
    return {
      name: group.label[this.lang3],
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
        const groups = orgs.map((org) =>
          allGroups.find((group) => group.label[this.lang3] === org.name)
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
        return groupIds.map((id) => {
          const group = groups.find((group) => group.id.toString() === id)
          return orgs.find((org) => org.name === group.label[this.lang3])
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
