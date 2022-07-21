import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService, Organisation } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  organisations$: Observable<any> = this.searchApiService.search(
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
        10,
        0,
        '',
        '',
        {},
        {}
      )
    )
  )

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService
  ) {}

  getOrganisations(): Observable<Organisation[]> {
    return this.organisations$.pipe(
      filter((response) => response.aggregations.org),
      map((response) =>
        response.aggregations.org.buckets
          .map(
            (organisation) =>
              ({
                name: organisation.key,
                description: null,
                logoUrl: null,
                recordCount: organisation.doc_count,
              } as Organisation)
          )
          //filter duplicates
          .filter(
            (org, i, orgs) =>
              orgs.findIndex(
                (firstOrg) =>
                  firstOrg.name.toLowerCase() === org.name.toLowerCase()
              ) === i
          )
      )
    )
  }
}
