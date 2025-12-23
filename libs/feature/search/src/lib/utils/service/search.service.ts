import { Injectable, inject } from '@angular/core'
import { SearchFacade } from '../../state/search.facade.js'
import {
  FieldFilters,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search/index.js'
import { first, map } from 'rxjs/operators'

export interface SearchServiceI {
  updateFilters: (params: FieldFilters) => void
  setFilters: (params: FieldFilters) => void
  setSortAndFilters: (filters: FieldFilters, sort: SortByField) => void
  setSortBy: (sort: SortByField) => void
  setPage: (page: number) => void
}

@Injectable()
export class SearchService implements SearchServiceI {
  private facade = inject(SearchFacade)

  setSortAndFilters(filters: FieldFilters, sort: SortByField) {
    this.setFilters(filters)
    this.setSortBy(sort)
  }

  updateFilters(params: FieldFilters) {
    this.facade.searchFilters$
      .pipe(
        first(),
        map((filters) => ({ ...filters, ...params }))
      )
      .subscribe((filters) => this.facade.setFilters(filters))
  }

  setFilters(params: FieldFilters) {
    this.facade.setFilters(params)
  }

  setSortBy(sort: SortByField): void {
    this.facade.setSortBy(sort)
  }

  setPage(page: number): void {
    this.facade.paginate(page)
  }

  resetSearch(): void {
    this.facade.resetSearch()
  }
}
