import { Injectable } from '@angular/core'
import { SearchFacade } from '../../state/search.facade'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { first, map } from 'rxjs/operators'

export interface SearchServiceI {
  updateSearch: (params: SearchFilters) => void
  setSearch: (params: SearchFilters) => void
  setSortBy: (sort: string) => void
}

@Injectable()
export class SearchService implements SearchServiceI {
  constructor(private facade: SearchFacade) {}

  updateSearch(params: SearchFilters) {
    this.facade.searchFilters$
      .pipe(
        first(),
        map((filters) => ({ ...filters, ...params }))
      )
      .subscribe((filters) => this.facade.setFilters(filters))
  }

  setSearch(params: SearchFilters) {
    this.facade.setFilters(params)
  }

  setSortBy(sort: string): void {
    this.facade.setSortBy(sort)
  }
}
