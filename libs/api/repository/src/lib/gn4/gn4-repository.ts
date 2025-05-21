import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  assertValidXml,
  findConverterForDocument,
  Gn4Converter,
  Gn4SearchResults,
  Iso19139Converter,
} from '@geonetwork-ui/api/metadata-converter'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
} from '@geonetwork-ui/common/domain/model/search'
import {
  SearchParams,
  SearchResults,
} from '@geonetwork-ui/common/domain/model/search/search.model'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import {
  RecordsApiService,
  SearchApiService,
  FeatureResponseApiModel,
} from '@geonetwork-ui/data-access/gn4'
import {
  combineLatest,
  exhaustMap,
  forkJoin,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  throwError,
} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { lt } from 'semver'
import { ElasticsearchService } from './elasticsearch'

const minPublicationApiVersion = '4.2.5'

const TEMPORARY_ID_PREFIX = 'TEMP-ID-'

export type RecordAsXml = string

@Injectable()
export class Gn4Repository implements RecordsRepositoryInterface {
  _draftsChanged = new Subject<void>()
  draftsChanged$ = this._draftsChanged.asObservable()

  constructor(
    private httpClient: HttpClient,
    private gn4SearchApi: SearchApiService,
    private gn4SearchHelper: ElasticsearchService,
    private gn4Mapper: Gn4Converter,
    private gn4RecordsApi: RecordsApiService,
    private platformService: PlatformServiceInterface
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
        ['fcats'],
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

  getFeatureCatalog(
    record: CatalogRecord,
    visited: Set<string> = new Set() // prevent looping
  ): Observable<DatasetFeatureCatalog | null> {
    if (
      record.extras &&
      record.extras['featureTypes'] &&
      record.extras['featureTypes'][0]?.attributeTable &&
      Array.isArray(record.extras['featureTypes'][0].attributeTable)
    ) {
      return of({
        attributes: record.extras['featureTypes'][0]?.attributeTable?.map(
          (attr) => ({
            name: attr.name,
            title: attr.definition,
          })
        ),
      } as DatasetFeatureCatalog)
    }

    const featureCatalogIdentifier = record.extras[
      'featureCatalogIdentifier'
    ] as string
    if (featureCatalogIdentifier && !visited.has(featureCatalogIdentifier)) {
      visited.add(featureCatalogIdentifier)
      return this.getRecord(featureCatalogIdentifier).pipe(
        switchMap((record) =>
          record ? this.getFeatureCatalog(record, visited) : of(null)
        )
      )
    }

    return of(null)
  }

  getSimilarRecords(similarTo: CatalogRecord): Observable<CatalogRecord[]> {
    return this.gn4SearchApi
      .search(
        'bucket',
        null,
        JSON.stringify(
          this.gn4SearchHelper.getRelatedRecordPayload(similarTo, 3)
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

  getRecordPublicationStatus(uniqueIdentifier: string): Observable<boolean> {
    return uniqueIdentifier
      ? this.getRecord(uniqueIdentifier).pipe(
          map((record) => record.extras['isPublishedToAll'] as boolean)
        )
      : of(true)
  }

  canEditRecord(uniqueIdentifier: string): Observable<boolean> {
    return this.getRecord(uniqueIdentifier).pipe(
      map((record) => {
        return record.extras['edit'] as boolean
      })
    )
  }

  openRecordForEdition(
    uniqueIdentifier: string
  ): Observable<[CatalogRecord, string, boolean] | null> {
    const draft$ = of(this.getRecordFromLocalStorage(uniqueIdentifier))
    const recordAsXml$ = this.getRecordAsXml(uniqueIdentifier)

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

  openRecordForDuplication(
    uniqueIdentifier: string
  ): Observable<[CatalogRecord, string, true] | null> {
    return this.gn4RecordsApi
      .create(
        uniqueIdentifier,
        '2',
        'METADATA',
        '',
        false,
        undefined,
        true,
        false,
        undefined,
        'body',
        false,
        {
          httpHeaderAccept: 'application/json',
          httpContentTypeSelected: 'application/json;charset=UTF-8',
        }
      )
      .pipe(
        switchMap((uniqueIdentifier) => {
          return this.getRecordAsXml(uniqueIdentifier)
        }),
        switchMap((xml) => {
          return from(
            findConverterForDocument(xml)
              .readRecord(xml)
              .then((record) => {
                return [record, xml, true] as [CatalogRecord, string, true]
              })
          )
        })
      )
  }

  saveRecord(
    record: CatalogRecord,
    referenceRecordSource?: string,
    publishToAll = true
  ): Observable<string> {
    return this.platformService.getApiVersion().pipe(
      map((version) => {
        if (lt(version, minPublicationApiVersion)) {
          throw new PublicationVersionError(version)
        }
      }),
      switchMap(() => this.serializeRecordToXml(record, referenceRecordSource)),
      switchMap((recordXml) =>
        this.gn4RecordsApi.insert(
          'METADATA',
          undefined,
          undefined,
          undefined,
          publishToAll,
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
      ),
      map((response) => {
        const metadataId = Object.keys(response.metadataInfos)[0]
        return response.metadataInfos[metadataId][0].uuid
      })
    )
  }

  duplicateExternalRecord(recordDownloadUrl: string): Observable<string> {
    return this.getExternalRecordAsXml(recordDownloadUrl).pipe(
      exhaustMap(async (fetchedRecordAsXml: string) => {
        const converter = findConverterForDocument(fetchedRecordAsXml)
        const record = await converter.readRecord(fetchedRecordAsXml)
        const tempId = this.generateTemporaryId()

        record.title = `${record.title} (Copy)`
        record.uniqueIdentifier = tempId

        const recordAsXml = await converter.writeRecord(
          record,
          fetchedRecordAsXml
        )

        this.saveRecordToLocalStorage(recordAsXml, record.uniqueIdentifier)
        this._draftsChanged.next()

        return tempId
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  deleteRecord(uniqueIdentifier: string): Observable<void> {
    return this.gn4RecordsApi.deleteRecord(uniqueIdentifier)
  }

  generateTemporaryId(): string {
    return `${TEMPORARY_ID_PREFIX}${Date.now()}`
  }

  saveRecordAsDraft(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string> {
    return this.serializeRecordToXml(record, referenceRecordSource).pipe(
      tap((recordXml) => {
        this.saveRecordToLocalStorage(recordXml, record.uniqueIdentifier)
        this._draftsChanged.next()
      })
    )
  }

  clearRecordDraft(uniqueIdentifier: string): void {
    this.removeRecordFromLocalStorage(uniqueIdentifier)
    this._draftsChanged.next()
  }

  recordHasDraft(uniqueIdentifier: string): boolean {
    return this.getRecordFromLocalStorage(uniqueIdentifier) !== null
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
        drafts.map((draft) => {
          return findConverterForDocument(draft).readRecord(draft)
        })
      )
    )
  }

  getDraftsCount(): Observable<number> {
    const items = { ...window.localStorage }
    const draftCount = Object.keys(items)
      .filter((key) => key.startsWith('geonetwork-ui-draft-'))
      .map((key) => window.localStorage.getItem(key))
      .filter((draft) => draft !== null).length
    return of(draftCount)
  }

  hasRecordChangedSinceDraft(localRecord: CatalogRecord) {
    return of({
      isUnsaved: !localRecord.uniqueIdentifier,
      hasDraft: this.recordHasDraft(localRecord.uniqueIdentifier),
    }).pipe(
      switchMap(({ isUnsaved, hasDraft }) => {
        if (isUnsaved || !hasDraft) {
          return of({ user: undefined, date: undefined })
        }
        return forkJoin([
          this.getAllDrafts().pipe(
            map((drafts) => {
              const matchingRecord = drafts.find(
                (draft) =>
                  draft.uniqueIdentifier === localRecord.uniqueIdentifier
              )
              return matchingRecord?.recordUpdated || null
            })
          ),
          this.getRecord(localRecord.uniqueIdentifier),
        ]).pipe(
          map(([draftRecordUpdated, recentRecord]) => {
            if (recentRecord?.recordUpdated > draftRecordUpdated) {
              const user = recentRecord.extras?.['ownerInfo']
                ?.toString()
                ?.split('|')
              return {
                user: `${user[2]} ${user[1]}`,
                date: recentRecord.recordUpdated,
              }
            }
            return { user: undefined, date: undefined }
          })
        )
      })
    )
  }

  private getRecordAsXml(uniqueIdentifier: string): Observable<string | null> {
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

  private getExternalRecordAsXml(
    recordDownloadUrl: string
  ): Observable<string> {
    let headers = new HttpHeaders()
    const responseType_ = 'text'
    headers = headers.set('Accept', 'text/xml,application/xml')

    return this.httpClient
      .get<string>(recordDownloadUrl, {
        responseType: <any>responseType_,
        headers: headers,
        observe: 'body',
      })
      .pipe(
        map((recordAsXmlFile) => {
          assertValidXml(recordAsXmlFile)

          return recordAsXmlFile
        })
      )
  }

  private getLocalStorageKeyForRecord(recordId: string): string {
    return `geonetwork-ui-draft-${recordId}` // Never change this prefix as it is a breaking change
  }

  private saveRecordToLocalStorage(recordAsXml: RecordAsXml, recordId: string) {
    window.localStorage.setItem(
      this.getLocalStorageKeyForRecord(recordId),
      recordAsXml
    )
  }

  private getRecordFromLocalStorage(recordId: string): RecordAsXml {
    return window.localStorage.getItem(
      this.getLocalStorageKeyForRecord(recordId)
    )
  }

  private removeRecordFromLocalStorage(recordId: string): void {
    window.localStorage.removeItem(this.getLocalStorageKeyForRecord(recordId))
  }
}
