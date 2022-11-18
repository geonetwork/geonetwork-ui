import { Injectable } from '@angular/core'
import { SearchFacade, SearchServiceI } from '@geonetwork-ui/feature/search'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { first, map } from 'rxjs/operators'
import { ROUTE_PARAMS } from '../constants'
import { stateToRouteParams } from '../router.mapper'
import { RouterFacade } from '../state/router.facade'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  constructor(
    private searchFacade: SearchFacade,
    private facade: RouterFacade
  ) {}

  setSearch(params: SearchFilters): void {
    this.facade.setSearch(stateToRouteParams(params))
  }

  updateSearch(params: SearchFilters): void {
    this.searchFacade.searchFilters$
      .pipe(
        first(),
        map((filters) => ({ ...filters, ...params })),
        map((filters) => stateToRouteParams(filters))
      )
      .subscribe((params) => this.facade.updateSearch(params))
  }

  setSortBy(sort: string): void {
    this.facade.updateSearch({ [ROUTE_PARAMS.SORT]: sort })
  }
}
