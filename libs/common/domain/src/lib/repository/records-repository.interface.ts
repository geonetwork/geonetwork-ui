import { Observable } from 'rxjs'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  SearchParams,
  SearchResults,
} from '../model/search'
import { CatalogRecord } from '../model/record'

export abstract class RecordsRepositoryInterface {
  abstract search(params: SearchParams): Observable<SearchResults>
  abstract getMatchesCount(filters: FieldFilters): Observable<number>
  abstract getRecord(uniqueIdentifier: string): Observable<CatalogRecord | null>
  abstract aggregate(params: AggregationsParams): Observable<Aggregations>
  abstract getSimilarRecords(
    similarTo: CatalogRecord
  ): Observable<CatalogRecord[]>
  abstract fuzzySearch(query: string): Observable<SearchResults>

  /**
   * This emits once:
   * - record object; if a draft exists, this will return it
   * - serialized representation of the record as text
   * - boolean indicating if the record has been saved at least once in a final version (i.e. not only as draft)
   * @param uniqueIdentifier
   * @returns Observable<[CatalogRecord, string, boolean] | null>
   */
  abstract openRecordForEdition(
    uniqueIdentifier: string
  ): Observable<[CatalogRecord, string, boolean] | null>

  /**
   * @param record
   * @param referenceRecordSource
   * @returns Observable<string> Returns the unique identifier of the record as it was when saved
   */
  abstract saveRecord(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string>

  /**
   * @param record
   * @param referenceRecordSource
   * @returns Observable<string> Returns the source of the record as it was serialized when saved
   */
  abstract saveRecordAsDraft(
    record: CatalogRecord,
    referenceRecordSource?: string
  ): Observable<string>

  abstract clearRecordDraft(uniqueIdentifier: string): void
  abstract recordHasDraft(uniqueIdentifier: string): boolean

  /** will return all pending drafts, both published and not published */
  abstract getAllDrafts(): Observable<CatalogRecord[]>
}
