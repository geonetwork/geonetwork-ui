import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AggregationsService {
  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService
  ) {}

  getFullSearchTermAggregation(
    fieldName: string,
    order: 'asc' | 'desc' = 'asc'
  ): Observable<any> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(
          this.esService.getSearchRequestBody({
            agg: {
              terms: {
                size: 1000,
                field: fieldName,
                order: {
                  _key: order,
                },
                exclude: '',
              },
            },
          })
        )
      )
      .pipe(
        filter((response) => response.aggregations.agg),
        map((response) => response.aggregations.agg)
      )
  }
}
