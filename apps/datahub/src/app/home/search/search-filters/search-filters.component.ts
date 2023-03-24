import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import {
  AggregationsOrderEnum,
  AggregationsTypesEnum,
} from '@geonetwork-ui/util/shared'
import { map, pluck } from 'rxjs/operators'

@Component({
  selector: 'datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  ORDER = AggregationsOrderEnum
  TYPE = AggregationsTypesEnum
  publisher$ = this.searchFacade.searchFilters$.pipe(
    pluck('OrgForResource'),
    map((orgState) => orgState && Object.keys(orgState)[0])
  )
  constructor(
    public searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  isOpen = false

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  toggleSpatialFilter(enabled: boolean) {
    this.searchFacade.setSpatialFilterEnabled(enabled)
  }

  clearFilters() {
    this.searchService.updateFilters({
      OrgForResource: {},
      format: {},
      publicationYearForResource: {},
    })
  }
}
