import { Injectable } from '@angular/core'
import {
  FieldsService,
  SearchFacade,
  SearchServiceI,
} from '@geonetwork-ui/feature/search'
import { SearchFilters, SortByEnum } from '@geonetwork-ui/util-shared'
import { ROUTE_PARAMS, SearchRouteParams } from '../constants'
import { RouterFacade } from '../state/router.facade'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  constructor(
    private searchFacade: SearchFacade,
    private facade: RouterFacade,
    private fieldsService: FieldsService
  ) {}

  setSortAndFilters(filters: SearchFilters, sort: SortByEnum) {
    this.fieldsService
      .readFieldValuesFromFilters(filters)
      .subscribe((values) => {
        this.facade.setSearch({
          ...values,
          [ROUTE_PARAMS.SORT]: sort,
        })
      })
  }

  async setFilters(newFilters: SearchFilters) {
    const sortBy = await firstValueFrom(this.searchFacade.sortBy$)
    const fieldSearchParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(newFilters)
    )
    this.facade.setSearch({
      ...fieldSearchParams,
      [ROUTE_PARAMS.SORT]: sortBy,
    })
  }

  async updateFilters(newFilters: SearchFilters) {
    const currentFilters = await firstValueFrom(
      this.searchFacade.searchFilters$
    )
    const updatedFilters = { ...currentFilters, ...newFilters }
    const newParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(updatedFilters)
    )
    this.facade.updateSearch(newParams as SearchRouteParams)
  }

  setSortBy(sortBy: string) {
    this.facade.updateSearch({
      [ROUTE_PARAMS.SORT]: sortBy,
    })
  }
}
