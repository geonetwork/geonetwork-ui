import { Observable } from 'rxjs'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  SearchParams,
  SearchResults,
} from './search'
import { CatalogRecord } from './record/metadata.model'

export abstract class RecordsRepositoryInterface {
  abstract search(params: SearchParams): Observable<SearchResults>
  abstract getMatchesCount(filters: FieldFilters): Observable<number>
  abstract getByUniqueIdentifier(
    uniqueIdentifier: string
  ): Observable<CatalogRecord | null>
  abstract aggregate(params: AggregationsParams): Observable<Aggregations>
  abstract getSimilarRecords(
    similarTo: CatalogRecord
  ): Observable<CatalogRecord[]>
  abstract fuzzySearch(query: string): Observable<SearchResults>
}
