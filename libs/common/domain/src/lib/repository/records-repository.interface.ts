import { Observable } from 'rxjs'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  SearchParams,
  SearchResults,
} from '../model/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/metadata.model'

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
