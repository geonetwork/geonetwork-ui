import { Injectable } from '@angular/core'
import { SearchFacade, SearchServiceI } from '@geonetwork-ui/feature/search'
import { SearchFilters, SortByEnum } from '@geonetwork-ui/util/shared'
import { first, map, withLatestFrom } from 'rxjs/operators'
import { ROUTE_PARAMS, SearchRouteParams } from '../constants'
import { stateToRouteParams } from '../router.mapper'
import { RouterFacade } from '../state/router.facade'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  constructor(
    private searchFacade: SearchFacade,
    private facade: RouterFacade
  ) {}

  setSortAndFilters(filters: SearchFilters, sort: SortByEnum) {
    this.facade.setSearch({
      ...stateToRouteParams(filters),
      ...this.buildSortByRouteParam(sort),
    })
  }

  setFilters(newFilters: SearchFilters): void {
    this.searchFacade.sortBy$
      .pipe(
        first(),
        map(this.buildSortByRouteParam),
        map((routeParams) => ({
          ...routeParams,
          ...stateToRouteParams(newFilters),
        }))
      )
      .subscribe((routeParams) => this.facade.setSearch(routeParams))
  }

  updateFilters(params: SearchFilters): void {
    this.searchFacade.searchFilters$
      .pipe(
        first(),
        map((filters) => ({ ...filters, ...params })),
        map((filters) => stateToRouteParams(filters))
      )
      .subscribe((params) => this.facade.updateSearch(params))
  }

  setSortBy(sortBy: string): void {
    this.facade.updateSearch(this.buildSortByRouteParam(sortBy))
  }

  buildSortByRouteParam(sortBy: string): SearchRouteParams {
    return { [ROUTE_PARAMS.SORT]: sortBy }
  }
}
