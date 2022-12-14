import { Injectable } from '@angular/core'
import { SearchFacade } from '../../state/search.facade'
import { SearchFilters, SortByEnum } from '@geonetwork-ui/util/shared'
import { first, map } from 'rxjs/operators'

export interface SearchServiceI {
  updateFilters: (params: SearchFilters) => void
  setFilters: (params: SearchFilters) => void
  setSortAndFilters: (filters: SearchFilters, sort: SortByEnum) => void
  setSortBy: (sort: string) => void
}

@Injectable()
export class SearchService implements SearchServiceI {
  constructor(private facade: SearchFacade) {}

  setSortAndFilters(filters: SearchFilters, sort: SortByEnum) {
    this.setFilters(filters)
    this.setSortBy(sort)
  }

  updateFilters(params: SearchFilters) {
    this.facade.searchFilters$
      .pipe(
        first(),
        map((filters) => ({ ...filters, ...params }))
      )
      .subscribe((filters) => this.facade.setFilters(filters))
  }

  setFilters(params: SearchFilters) {
    this.facade.setFilters(params)
  }

  clearFilters(filterKeys: string[]) {}

  setSortBy(sort: string): void {
    this.facade.setSortBy(sort)
  }
}
