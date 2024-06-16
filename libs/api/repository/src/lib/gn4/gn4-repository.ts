import { Injectable } from '@angular/core'
import {
  RecordsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from './elasticsearch'
import {
  combineLatest,
  from,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs'
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
import { catchError, map, tap } from 'rxjs/operators'
import {
  findConverterForDocument,
  Gn4Converter,
  Gn4SearchResults,
  Iso19139Converter,
} from '@geonetwork-ui/api/metadata-converter'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class Gn4Repository implements RecordsRepositoryInterface {
  constructor(
    private gn4SearchApi: SearchApiService,
    private gn4SearchHelper: ElasticsearchService,
    private gn4Mapper: Gn4Converter,
    private gn4RecordsApi: RecordsApiService
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

  getRecord(uniqueIdentifier: string): Observable<CatalogRecord | null> {
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

  /**
   * Returns null if the record is not found
   */
  private loadRecordAsXml(uniqueIdentifier: string): Observable<string | null> {
    return this.gn4RecordsApi
      .getRecordAs(
        uniqueIdentifier,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        'application/xml',
        'response',
        undefined,
        { httpHeaderAccept: 'text/xml,application/xml' as 'application/xml' } // this is to make sure that the response is parsed as text
      )
      .pipe(
        map((response) => response.body),
        catchError((error: HttpErrorResponse) =>
          error.status === 404 ? of(null) : throwError(() => error)
        )
      )
  }

  private getLocalStorageKeyForRecord(uniqueIdentifier: string) {
    return `geonetwork-ui-draft-${uniqueIdentifier}`
  }

  openRecordForEdition(
    uniqueIdentifier: string
  ): Observable<[CatalogRecord, string, boolean] | null> {
    const draft$ = of(
      window.localStorage.getItem(
        this.getLocalStorageKeyForRecord(uniqueIdentifier)
      )
    )
    const recordAsXml$ = this.loadRecordAsXml(uniqueIdentifier)
    return combineLatest([draft$, recordAsXml$]).pipe(
      switchMap(([draft, recordAsXml]) => {
        const xml = draft ?? recordAsXml
        const isSavedAlready = recordAsXml !== null
        return findConverterForDocument(xml)
          .readRecord(xml)
          .then(
            (record) =>
              [record, xml, isSavedAlready] as [CatalogRecord, string, boolean]
          )
      })
    )
  }

  private serializeRecordToXml(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string> {
    // if there's a reference record, use that standard; otherwise, use iso19139
    const converter = referenceRecordSource
      ? findConverterForDocument(referenceRecordSource)
      : new Iso19139Converter()
    return from(converter.writeRecord(record, referenceRecordSource))
  }

  saveRecord(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string> {
    return this.serializeRecordToXml(record, referenceRecordSource).pipe(
      switchMap((recordXml) =>
        this.gn4RecordsApi
          .insert(
            'METADATA',
            undefined,
            undefined,
            undefined,
            true,
            undefined,
            'OVERWRITE',
            undefined,
            undefined,
            undefined,
            '_none_',
            undefined,
            undefined,
            undefined,
            recordXml
          )
          .pipe(
            map((response) => {
              const metadataId = Object.keys(response.metadataInfos)[0]
              return response.metadataInfos[metadataId][0].uuid
            })
          )
      )
    )
  }

  saveRecordAsDraft(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string> {
    return this.serializeRecordToXml(record, referenceRecordSource).pipe(
      tap((recordXml) =>
        window.localStorage.setItem(
          this.getLocalStorageKeyForRecord(record.uniqueIdentifier),
          recordXml
        )
      )
    )
  }

  clearRecordDraft(uniqueIdentifier: string): void {
    window.localStorage.removeItem(
      this.getLocalStorageKeyForRecord(uniqueIdentifier)
    )
  }

  recordHasDraft(uniqueIdentifier: string): boolean {
    return (
      window.localStorage.getItem(
        this.getLocalStorageKeyForRecord(uniqueIdentifier)
      ) !== null
    )
  }

  // generated by copilot
  getAllDrafts(): Observable<CatalogRecord[]> {
    const items = { ...window.localStorage }
    const drafts = Object.keys(items)
      .filter((key) => key.startsWith('geonetwork-ui-draft-'))
      .map((key) => window.localStorage.getItem(key))
      .filter((draft) => draft !== null)
    return from(
      Promise.all(
        drafts.map((draft) => findConverterForDocument(draft).readRecord(draft))
      )
    )
  }
}
