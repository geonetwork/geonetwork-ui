import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core'
import {
  FieldsService,
  FilterDropdownComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'

@Component({
  selector: 'datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  @ViewChildren(FilterDropdownComponent)
  filters: QueryList<FilterDropdownComponent>

  constructor(
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService
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
    const fieldNames = this.filters.map((component) => component.fieldName)
    const fieldValues = fieldNames.reduce(
      (prev, curr) => ({ ...prev, [curr]: [] }),
      {}
    )
    this.fieldsService
      .getFiltersForFieldValues(fieldValues)
      .subscribe((filters) => {
        this.searchService.updateFilters(filters)
      })
  }
}
