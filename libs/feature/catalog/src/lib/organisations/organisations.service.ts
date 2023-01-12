import { Injectable } from '@angular/core'
import { GroupApiModel, SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService, Organisation } from '@geonetwork-ui/util/shared'
import { combineLatest, Observable } from 'rxjs'
import { filter, map, shareReplay, startWith, tap } from 'rxjs/operators'
import { GroupService } from '../group/group.service'

const IMAGE_URL = '/geonetwork/images/harvesting/'

interface OrganisationAggsBucket {
  key: string
  doc_count: number
}
@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  organisationsAggs$: Observable<OrganisationAggsBucket[]> =
    this.fetchOrgForResourceAggs().pipe(
      map((response) => response.buckets),
      shareReplay()
    )
  organisations$: Observable<Organisation[]> = this.organisationsAggs$.pipe(
    map((buckets) =>
      buckets.map((bucket) => ({
        name: bucket.key[0],
        email: bucket.key[1],
        recordCount: bucket.doc_count,
        description: null,
        logoUrl: null,
      }))
    )
  )
  organisationsCount$ = this.organisationsAggs$.pipe(
    map((organisations) => organisations.length)
  )
  hydratedOrganisations$ = combineLatest([
    this.organisations$,
    this.groupService.groups$.pipe(startWith(null)),
  ]).pipe(
    map(([organisations, groups]) => {
      return !groups ? organisations : this.mapWithGroups(organisations, groups)
    })
  )

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService,
    private groupService: GroupService
  ) {}

  equalsNormalizedStrings(
    str1: string,
    str2: string,
    replaceSpecialChars = true
  ): boolean {
    if (!str1 || !str2) return false
    return (
      this.normalizeString(str1, replaceSpecialChars) ===
      this.normalizeString(str2, replaceSpecialChars)
    )
  }

  normalizeString(str: string, replaceSpecialChars = true): string {
    function normalize(str: string) {
      return str
        .normalize('NFD') // decompose graphemes to remove accents from letters
        .replace(/[\u0300-\u036f]/g, '') // remove accent characters
        .toLowerCase()
    }
    if (replaceSpecialChars) {
      return normalize(str).replace(/[^a-z0-9]/g, '') // replace all except letters & numbers
    } else {
      return normalize(str)
    }
  }

  private fetchOrgForResourceAggs() {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            contact: {
              nested: {
                path: 'contactForResource',
              },
              aggs: {
                org: {
                  multi_terms: {
                    size: 1000,
                    order: { _key: 'asc' },
                    terms: [
                      {
                        field: 'contactForResource.organisation',
                      },
                      {
                        field: 'contactForResource.email.keyword',
                      },
                    ],
                  },
                },
              },
            },
          })
        )
      )
      .pipe(
        filter((response) => response.aggregations.contact.org),
        map((response) => response.aggregations.contact.org)
      )
  }

  private mapWithGroups(
    organisations: Organisation[],
    groups: GroupApiModel[]
  ) {
    return organisations.map((organisation) => {
      const group =
        groups.find((group) =>
          this.equalsNormalizedStrings(
            group.label.eng ? group.label.eng : group.name,
            organisation.name
          )
        ) ??
        groups.find((group) =>
          this.equalsNormalizedStrings(group.email, organisation.email, false)
        )
      return {
        ...organisation,
        description: group?.description || undefined,
        logoUrl: group?.logo ? `${IMAGE_URL}${group.logo}` : undefined,
      } as Organisation
    })
  }
}
