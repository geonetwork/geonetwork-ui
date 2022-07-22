import { Injectable } from '@angular/core'
import {
  GroupApiModel,
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService, Organisation } from '@geonetwork-ui/util/shared'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

const IMAGE_URL = '/geonetwork/images/harvesting/'

interface OrganisationApiModel {
  key: string
  doc_count: number
}
@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  groups$: Observable<GroupApiModel[]> = this.groupsApiService.getGroups()
  organisations$: Observable<OrganisationApiModel[]> = this.searchApiService
    .search(
      'bucket',
      JSON.stringify(
        this.esService.getSearchRequestBody(
          {
            org: {
              terms: {
                size: 1000,
                field: 'Org',
                order: {
                  _key: 'asc',
                },
                exclude: '',
              },
            },
          },
          0,
          0,
          '',
          '',
          {},
          {}
        )
      )
    )
    .pipe(
      filter((response) => response.aggregations.org),
      map((response) => response.aggregations.org.buckets)
    )

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService,
    private groupsApiService: GroupsApiService
  ) {}

  getOrganisationsWithGroups(): Observable<Organisation[]> {
    return combineLatest([this.organisations$, this.groups$]).pipe(
      map(([organisations, groups]) =>
        organisations.map((organisation) => {
          const group = groups.find(
            (group) =>
              (group.label.eng
                ? this.normalizeName(group.label.eng)
                : this.normalizeName(group.name)) ===
              this.normalizeName(organisation.key)
          )
          return {
            name: organisation.key,
            description: group?.description,
            logoUrl: group?.logo ? `${IMAGE_URL}${group.logo}` : undefined,
            recordCount: organisation.doc_count,
          } as Organisation
        })
      )
    )
  }

  normalizeName(name: string): string {
    return name
      .normalize('NFD') // decompose graphemes to remove accents from letters
      .replace(/[\u0300-\u036f]/g, '') // remove accent characters
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // replace all except letters & numbers
  }
}
