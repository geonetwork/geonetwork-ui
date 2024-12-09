import { Inject, Injectable, Optional } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { from, Observable, of } from 'rxjs'
import {
  AddSearch,
  ClearResults,
  DEFAULT_SEARCH_KEY,
  Paginate,
  RequestMoreOnAggregation,
  RequestMoreResults,
  RequestNewResults,
  SetConfigAggregations,
  SetConfigFilters,
  SetConfigRequestFields,
  SetFavoritesOnly,
  SetFilters,
  SetIncludeOnAggregation,
  SetPageSize,
  SetResultsLayout,
  SetSearch,
  SetSortBy,
  SetSpatialFilterEnabled,
  UpdateConfigAggregations,
  UpdateFilters,
} from './actions'
import { SearchError, SearchState, SearchStateParams } from './reducer'
import {
  currentPage,
  getError,
  getFavoritesOnly,
  getPageSize,
  getSearchConfigAggregations,
  getSearchFilters,
  getSearchResults,
  getSearchResultsAggregations,
  getSearchResultsHits,
  getSearchResultsLayout,
  getSearchResultsLoading,
  getSearchSortBy,
  getSpatialFilterEnabled,
  totalPages,
} from './selectors'
import { FILTER_GEOMETRY } from '../filter-geometry.token'
import { Geometry } from 'geojson'
import { catchError, map, shareReplay } from 'rxjs/operators'
import {
  Aggregations,
  AggregationsParams,
  FieldFilters,
  FieldName,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Injectable()
export class SearchFacade {
  results$: Observable<CatalogRecord[]>
  layout$: Observable<string>
  sortBy$: Observable<SortByField>
  isLoading$: Observable<boolean>
  totalPages$: Observable<number>
  currentPage$: Observable<number>
  pageSize$: Observable<number>
  searchFilters$: Observable<FieldFilters>
  configAggregations$: Observable<AggregationsParams>
  resultsAggregations$: Observable<Aggregations>
  resultsHits$: Observable<number>
  favoritesOnly$: Observable<boolean>
  error$: Observable<SearchError>
  spatialFilterEnabled$: Observable<boolean>
  hasSpatialFilter$ = from(this.filterGeometry ?? of(null)).pipe(
    map((geom) => !!geom),
    catchError(() => of(false)),
    shareReplay(1)
  )

  searchId: string

  constructor(
    private store: Store<SearchState>,
    @Optional()
    @Inject(FILTER_GEOMETRY)
    private filterGeometry: Promise<Geometry>
  ) {}

  init(searchId: string = DEFAULT_SEARCH_KEY): void {
    if (this.searchId)
      throw new Error(
        `This SearchFacade instance was already initialized with the following searchId: ${this.searchId}`
      )

    this.searchId = searchId
    this.store.dispatch(new AddSearch(searchId))

    this.results$ = this.store.pipe(select(getSearchResults, searchId))
    this.layout$ = this.store.pipe(select(getSearchResultsLayout, searchId))
    this.isLoading$ = this.store.pipe(select(getSearchResultsLoading, searchId))
    this.searchFilters$ = this.store.pipe(select(getSearchFilters, searchId))
    this.resultsHits$ = this.store.pipe(select(getSearchResultsHits, searchId))
    this.totalPages$ = this.store.pipe(select(totalPages, searchId))
    this.currentPage$ = this.store.pipe(select(currentPage, searchId))
    this.pageSize$ = this.store.pipe(select(getPageSize, searchId))
    this.configAggregations$ = this.store.pipe(
      select(getSearchConfigAggregations, searchId)
    )
    this.resultsAggregations$ = this.store.pipe(
      select(getSearchResultsAggregations, searchId)
    )
    this.sortBy$ = this.store.pipe(select(getSearchSortBy, searchId))
    this.favoritesOnly$ = this.store.pipe(select(getFavoritesOnly, searchId))
    this.error$ = this.store.pipe(select(getError, searchId))
    this.spatialFilterEnabled$ = this.store.pipe(
      select(getSpatialFilterEnabled, searchId)
    )
  }

  clearResults(): SearchFacade {
    this.store.dispatch(new ClearResults(this.searchId))
    return this
  }

  setConfigAggregations(config: any): SearchFacade {
    this.store.dispatch(new SetConfigAggregations(config, this.searchId))
    return this
  }

  updateConfigAggregations(config: any): SearchFacade {
    this.store.dispatch(new UpdateConfigAggregations(config, this.searchId))
    return this
  }

  setConfigRequestFields(fields: FieldName[]): SearchFacade {
    this.store.dispatch(new SetConfigRequestFields(fields, this.searchId))
    return this
  }

  setConfigFilters(filters: FieldFilters): SearchFacade {
    this.store.dispatch(new SetConfigFilters(filters, this.searchId))
    return this
  }

  requestMoreResults(): SearchFacade {
    this.store.dispatch(new RequestMoreResults(this.searchId))
    return this
  }

  requestNewResults(): SearchFacade {
    this.store.dispatch(new RequestNewResults(this.searchId))
    return this
  }

  requestMoreOnAggregation(key: string, increment: number): SearchFacade {
    this.store.dispatch(
      new RequestMoreOnAggregation(key, increment, this.searchId)
    )
    return this
  }

  setResultsLayout(layout: string): SearchFacade {
    this.store.dispatch(new SetResultsLayout(layout, this.searchId))
    return this
  }

  setFilters(filters: FieldFilters): SearchFacade {
    this.store.dispatch(new SetFilters(filters, this.searchId))
    return this
  }

  updateFilters(filters: FieldFilters): SearchFacade {
    this.store.dispatch(new UpdateFilters(filters, this.searchId))
    return this
  }

  setSearch(params: SearchStateParams): SearchFacade {
    this.store.dispatch(new SetSearch(params, this.searchId))
    return this
  }

  setFavoritesOnly(favoritesOnly: boolean): SearchFacade {
    this.store.dispatch(new SetFavoritesOnly(favoritesOnly, this.searchId))
    return this
  }

  setIncludeOnAggregation(key: string, include: string): SearchFacade {
    this.store.dispatch(
      new SetIncludeOnAggregation(key, include, this.searchId)
    )
    return this
  }

  setPageSize(size: number): SearchFacade {
    this.store.dispatch(new SetPageSize(size, this.searchId))
    return this
  }

  paginate(pageNumber: number): SearchFacade {
    this.store.dispatch(new Paginate(pageNumber, this.searchId))
    return this
  }

  scroll(): SearchFacade {
    this.store.dispatch(new RequestMoreResults(this.searchId))
    return this
  }

  setSortBy(sortBy: SortByField) {
    this.store.dispatch(new SetSortBy(sortBy, this.searchId))
    return this
  }

  setSpatialFilterEnabled(enabled: boolean) {
    this.store.dispatch(new SetSpatialFilterEnabled(enabled, this.searchId))
    return this
  }

  resetSearch() {
    this.store.dispatch(new Paginate(1, this.searchId))
    this.store.dispatch(new SetFilters({}, this.searchId))
    this.store.dispatch(new SetSortBy([], this.searchId))
    this.store.dispatch(new SetFavoritesOnly(false, this.searchId))
    return this
  }
}
