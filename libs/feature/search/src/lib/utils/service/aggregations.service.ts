import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import {
  AggregationsOrderEnum,
  ElasticsearchService,
} from '@geonetwork-ui/util/shared'
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
    order: AggregationsOrderEnum = AggregationsOrderEnum.ASC
  ): Observable<any> {
    const payload = {
      [fieldName]: {
        terms: {
          field: fieldName,
          order: {
            _key: order,
          },
          size: 1000,
          exclude: '',
        },
      },
    }
    return this.getAggregation(fieldName, payload)
  }

  getHistogramAggregation(
    fieldName: string,
    order: AggregationsOrderEnum = AggregationsOrderEnum.ASC
  ): Observable<any> {
    const payload = {
      [fieldName]: {
        histogram: {
          field: fieldName,
          order: {
            _key: order,
          },
          interval: 1,
          min_doc_count: 1,
          format: '0',
        },
      },
    }
    return this.getAggregation(fieldName, payload)
  }

  getAggregation(fieldName: string, payload: unknown): Observable<any> {
    return this.searchApiService
      .search(
        'bucket',
        JSON.stringify(this.esService.getSearchRequestBody(payload))
      )
      .pipe(
        filter((response) => response.aggregations[fieldName]),
        map((response) => response.aggregations[fieldName])
      )
  }
}
