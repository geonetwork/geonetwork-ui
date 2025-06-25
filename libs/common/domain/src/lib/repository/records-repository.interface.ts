import { Observable } from 'rxjs'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  SearchParams,
  SearchResults,
} from '../model/search'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
  LanguageCode,
} from '../model/record'

export abstract class RecordsRepositoryInterface {
  abstract search(params: SearchParams): Observable<SearchResults>
  abstract getMatchesCount(filters: FieldFilters): Observable<number>
  abstract getRecord(uniqueIdentifier: string): Observable<CatalogRecord | null>
  abstract getFeatureCatalog(
    record: CatalogRecord
  ): Observable<DatasetFeatureCatalog | null>
  abstract aggregate(params: AggregationsParams): Observable<Aggregations>
  abstract getSimilarRecords(
    similarTo: CatalogRecord
  ): Observable<CatalogRecord[]>
  abstract getSources(record: CatalogRecord): Observable<CatalogRecord[]>
  abstract getSourceOf(record: CatalogRecord): Observable<CatalogRecord[]>
  abstract fuzzySearch(query: string): Observable<SearchResults>
  abstract canDuplicate(record: CatalogRecord): boolean
  abstract canDelete(record: CatalogRecord): Observable<boolean>
  abstract canEditRecord(uniqueIdentifier: string): Observable<boolean>
  abstract canEditIndexedRecord(record: CatalogRecord): Observable<boolean>
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
   * This emits once:
   * - record object with a new unique identifier and suffixed title
   * - serialized representation of the record as text
   * - false, as the duplicated record is always a draft
   * @param uniqueIdentifier
   * @returns Observable<[CatalogRecord, string, false] | null>
   */
  abstract openRecordForDuplication(
    uniqueIdentifier: string
  ): Observable<[CatalogRecord, string, true] | null>

  /**
   * @param record
   * @param referenceRecordSource
   * @returns Observable<string> Returns the unique identifier of the record as it was when saved
   */
  abstract saveRecord(
    record: CatalogRecord,
    referenceRecordSource?: string,
    publishToAll?: boolean
  ): Observable<string>

  /**
   * Try to duplicate the external record from given url. If it suceed, then it will save the record as draft and return its temporary id.
   *
   * @param recordDownloadUrl
   * @returns Observable<string>
   */
  abstract duplicateExternalRecord(
    recordDownloadUrl: string
  ): Observable<string>

  /**
   * @param uniqueIdentifier
   * @returns Observable<void> Returns when record is deleted
   */
  abstract deleteRecord(uniqueIdentifier: string): Observable<void>

  abstract generateTemporaryId(): string

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
  abstract getDraftsCount(): Observable<number>
  abstract draftsChanged$: Observable<void>
  abstract hasRecordChangedSinceDraft(
    localRecord: CatalogRecord
  ): Observable<{ user: string; date: Date }>
  abstract getRecordPublicationStatus(uuid: string): Observable<boolean>
  abstract getApplicationLanguages(): Observable<LanguageCode[]>
}
