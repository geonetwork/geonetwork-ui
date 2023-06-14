import { Injectable } from '@angular/core'
import {
  FieldsService,
  SearchFacade,
  SearchServiceI,
} from '@geonetwork-ui/feature/search'
import {
  MetadataRecord,
  Organisation,
  SearchFilters,
  SortByEnum,
} from '@geonetwork-ui/util/shared'
import { ROUTER_ROUTE_DATASET, ROUTE_PARAMS } from '../constants'
import { RouterFacade } from '../state/router.facade'
import { firstValueFrom } from 'rxjs'
import { RouterService } from '../router.service'

@Injectable()
export class RouterSearchService implements SearchServiceI {
  constructor(
    private searchFacade: SearchFacade,
    private facade: RouterFacade,
    private fieldsService: FieldsService,
    private router: RouterService
  ) {}

  setSortAndFilters(filters: SearchFilters, sort: SortByEnum) {
    const fieldSearchParams = this.fieldsService.supportedFields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.fieldsService.getValuesForFilters(curr, filters),
      }),
      {}
    )
    this.facade.setSearch({
      ...fieldSearchParams,
      [ROUTE_PARAMS.SORT]: sort,
    })
  }

  async setFilters(newFilters: SearchFilters) {
    const sortBy = await firstValueFrom(this.searchFacade.sortBy$)
    const routeParams = this.fieldsService.supportedFields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.fieldsService.getValuesForFilters(curr, newFilters),
      }),
      { [ROUTE_PARAMS.SORT]: sortBy }
    )
    this.facade.setSearch(routeParams)
  }

  async updateFilters(newFilters: SearchFilters) {
    const currentFilters = await firstValueFrom(
      this.searchFacade.searchFilters$
    )
    const updatedFilters = { ...currentFilters, ...newFilters }
    const newParams = this.fieldsService.supportedFields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.fieldsService.getValuesForFilters(curr, updatedFilters),
      }),
      {}
    )
    this.facade.updateSearch(newParams)
  }

  setSortBy(sortBy: string) {
    this.facade.updateSearch({
      [ROUTE_PARAMS.SORT]: sortBy,
    })
  }

  getOrganisationTargetUrl(organisation: Organisation): string {
    return encodeURI(
      `${this.router.getSearchRoute()}?${ROUTE_PARAMS.PUBLISHER}=${
        organisation.name
      }`
    )
  }

  getMetadataRecordTargetUrl(record: MetadataRecord): string {
    return encodeURI(`${ROUTER_ROUTE_DATASET}/${record.uuid}`)
  }
}
