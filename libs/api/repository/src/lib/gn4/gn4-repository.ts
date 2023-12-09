import { Injectable } from '@angular/core'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from './elasticsearch'
import { Observable, of, switchMap } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import {
  SearchParams,
  SearchResults,
} from '@geonetwork-ui/common/domain/model/search/search.model'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
} from '@geonetwork-ui/common/domain/model/search'
import { map } from 'rxjs/operators'
import {
  Gn4MetadataMapper,
  Gn4SearchResults,
} from '@geonetwork-ui/api/metadata-converter'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Injectable()
export class Gn4Repository implements RecordsRepositoryInterface {
  constructor(
    private gn4SearchApi: SearchApiService,
    private gn4SearchHelper: ElasticsearchService,
    private gn4Mapper: Gn4MetadataMapper
  ) {}

  search({
    filters,
    fields,
    offset,
    limit,
    sort,
    filterIds,
    filterGeometry,
  }: SearchParams): Observable<SearchResults> {
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(
          this.gn4SearchHelper.getSearchRequestBody(
            {},
            limit,
            offset,
            sort,
            fields,
            filters,
            undefined,
            filterIds,
            filterGeometry
          )
        )
      )
      .pipe(
        switchMap((results: Gn4SearchResults) =>
          this.gn4Mapper.readRecords(results.hits.hits).then((records) => ({
            count: results.hits.total?.value || 0,
            records,
          }))
        )
      )
  }

  getMatchesCount(filters: FieldFilters): Observable<number> {
    return this.gn4SearchApi
      .search(
        'records-count',
        null,
        JSON.stringify({
          ...this.gn4SearchHelper.getSearchRequestBody(
            {},
            0,
            0,
            undefined,
            undefined,
            filters
          ),
          track_total_hits: true,
        })
      )
      .pipe(map((results: Gn4SearchResults) => results.hits.total?.value || 0))
  }

  getByUniqueIdentifier(
    uniqueIdentifier: string
  ): Observable<CatalogRecord | null> {
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(
          this.gn4SearchHelper.getMetadataByIdPayload(uniqueIdentifier)
        )
      )
      .pipe(
        map((results: Gn4SearchResults) => results.hits.hits[0]),
        switchMap((record) =>
          record ? this.gn4Mapper.readRecord(record) : of(null)
        )
      )
  }

  getSimilarRecords(similarTo: CatalogRecord): Observable<CatalogRecord[]> {
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(
          this.gn4SearchHelper.getRelatedRecordPayload(
            similarTo.title,
            similarTo.uniqueIdentifier,
            3
          )
        )
      )
      .pipe(
        switchMap((results: Gn4SearchResults) =>
          this.gn4Mapper.readRecords(results.hits.hits)
        )
      )
  }
  aggregate(params: AggregationsParams): Observable<Aggregations> {
    // if aggregations are empty, return an empty object right away
    if (Object.keys(params).length === 0) return of({})

    const aggregations = this.gn4SearchHelper.buildAggregationsPayload(params)
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(this.gn4SearchHelper.getSearchRequestBody(aggregations))
      )
      .pipe(
        map((response: Gn4SearchResults) =>
          Object.keys(response.aggregations).reduce(
            (prev, curr) => ({
              ...prev,
              [curr]: this.gn4SearchHelper.parseAggregationResult(
                response.aggregations[curr],
                params[curr]
              ),
            }),
            {}
          )
        )
      )
  }

  fuzzySearch(query: string): Observable<SearchResults> {
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(this.gn4SearchHelper.buildAutocompletePayload(query))
      )
      .pipe(
        switchMap((results: Gn4SearchResults) =>
          this.gn4Mapper.readRecords(results.hits.hits).then((records) => ({
            count: results.hits.total?.value || 0,
            records,
          }))
        )
      )
  }
}
