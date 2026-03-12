import { inject, Injectable } from '@angular/core'
import {
  FieldsService,
  SearchFacade,
  SearchServiceI,
} from '@geonetwork-ui/feature/search'
import {
  FieldFilters,
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { ROUTE_PARAMS, SearchRouteParams } from '../constants'
import { RouterFacade } from '../state/router.facade'
import { firstValueFrom } from 'rxjs'
import { sortByToString } from '@geonetwork-ui/util/shared'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  private searchFacade = inject(SearchFacade)
  private facade = inject(RouterFacade)
  private fieldsService = inject(FieldsService)

  setSortAndFilters(filters: FieldFilters, sortBy: SortByField) {
    console.log('RouterSearchService - setSortAndFilters', { filters, sortBy })
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
    let sortBy = await firstValueFrom(this.searchFacade.sortBy$)
    const fieldSearchParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(newFilters)
    )
    // apply relevancy sort if a full text criteria is given
    sortBy = newFilters['any'] ? SortByEnum.RELEVANCY : sortBy
    this.facade.setSearch({
      ...fieldSearchParams,
      [ROUTE_PARAMS.SORT]: sortBy ? sortByToString(sortBy) : undefined,
    })
  }

  async updateFilters(newFilters: FieldFilters) {
    console.log('RouterSearchService - updateFilters', newFilters)
    const currentFilters = await firstValueFrom(
      this.searchFacade.searchFilters$
    )
    const updatedFilters = { ...currentFilters, ...newFilters }
    let newParams = await firstValueFrom(
      this.fieldsService.readFieldValuesFromFilters(updatedFilters)
    )
    if (newFilters['any']) {
      newParams = {
        ...newParams,
        [ROUTE_PARAMS.SORT]: sortByToString(SortByEnum.RELEVANCY),
      }
    }
    console.log('RouterSearchService - updateFilters - newParams', newParams)
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
