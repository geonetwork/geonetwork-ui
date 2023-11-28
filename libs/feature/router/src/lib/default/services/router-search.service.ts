import { Injectable } from '@angular/core'
import {
  FieldsService,
  SearchFacade,
  SearchServiceI,
} from '@geonetwork-ui/feature/search'
import {
  FieldFilters,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { ROUTE_PARAMS, SearchRouteParams } from '../constants'
import { RouterFacade } from '../state/router.facade'
import { firstValueFrom } from 'rxjs'
import { sortByToString } from '@geonetwork-ui/util/shared'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  constructor(
    private searchFacade: SearchFacade,
    private facade: RouterFacade,
    private fieldsService: FieldsService
  ) {}

  setSortAndFilters(filters: FieldFilters, sortBy: SortByField) {
    this.fieldsService
      .readFieldValuesFromFilters(filters)
      .subscribe((values) => {
        this.facade.setSearch({
          ...values,
          [ROUTE_PARAMS.SORT]: sortByToString(sortBy),
        })
      })
  }

  async setFilters(newFilters: FieldFilters) {
    const sortBy = await firstValueFrom(this.searchFacade.sortBy$)
    const fieldSearchParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(newFilters)
    )
    this.facade.setSearch({
      ...fieldSearchParams,
      [ROUTE_PARAMS.SORT]: sortBy ? sortByToString(sortBy) : undefined,
    })
  }

  async updateFilters(newFilters: FieldFilters) {
    const currentFilters = await firstValueFrom(
      this.searchFacade.searchFilters$
    )
    const updatedFilters = { ...currentFilters, ...newFilters }
    const newParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(updatedFilters)
    )
    this.facade.updateSearch(newParams as SearchRouteParams)
  }

  setSortBy(sortBy: SortByField) {
    this.facade.updateSearch({
      [ROUTE_PARAMS.SORT]: sortByToString(sortBy),
    })
  }

  setPage(page: number): void {
    this.facade.updateSearch({
      [ROUTE_PARAMS.PAGE]: page,
    })
  }
}
