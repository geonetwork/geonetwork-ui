import { Injectable } from '@angular/core'
import { SearchFacade } from '../../state/search.facade'
import {
  Organisation,
  SearchFilters,
  SortByEnum,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { first, map } from 'rxjs/operators'

export interface SearchServiceI {
  updateFilters: (params: SearchFilters) => void
  setFilters: (params: SearchFilters) => void
  setSortAndFilters: (filters: SearchFilters, sort: SortByEnum) => void
  setSortBy: (sort: string) => void
  getOrganisationTargetUrl: (organisation: Organisation) => string
  getMetadataRecordTargetUrl: (record: MetadataRecord) => string
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

  setSortBy(sort: string): void {
    this.facade.setSortBy(sort)
  }

  getOrganisationTargetUrl(organisation: Organisation): string {
    return null
  }

  getMetadataRecordTargetUrl(record: MetadataRecord): string {
    return null
  }
}
