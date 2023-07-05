import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  FieldsService,
  FilterDropdownComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent implements OnInit {
  @ViewChildren(FilterDropdownComponent)
  filters: QueryList<FilterDropdownComponent>
  searchConfig: { fieldName: string; title: string }[]
  isOpen = false

  constructor(
    public searchFacade: SearchFacade,
    private searchService: SearchService,
    private fieldsService: FieldsService
  ) {}

  ngOnInit(): void {
    this.searchConfig = (
      getOptionalSearchConfig().ADVANCED_FILTERS || [
        'publisher',
        'format',
        'publicationYear',
        'topic',
        'isSpatial',
        'license',
      ]
    )
      .filter((adv_filter) => {
        if (this.fieldsService.supportedFields?.includes(adv_filter)) {
          return true
        } else {
          console.warn(
            `WARNING: the configuration file contains an unsupported filter field: '${adv_filter}'. This field will be ignored.`
          )
          return false
        }
      })
      .map((filter) => {
        switch (filter) {
          case 'publisher':
            return {
              fieldName: filter,
              title: marker('search.filters.byOrganisation'),
            }
          case 'format':
            return {
              fieldName: filter,
              title: marker('search.filters.byFormat'),
            }
          case 'standard':
            return {
              fieldName: filter,
              title: marker('search.filters.byStandard'),
            }
          case 'inspireKeyword':
            return {
              fieldName: filter,
              title: marker('search.filters.byInspireKeyword'),
            }
          case 'topic':
            return {
              fieldName: filter,
              title: marker('search.filters.byTopic'),
            }
          case 'publicationYear':
            return {
              fieldName: filter,
              title: marker('search.filters.byPublicationYear'),
            }
          case 'isSpatial':
            return {
              fieldName: filter,
              title: marker('search.filters.isSpatial'),
            }
          case 'license':
            return {
              fieldName: filter,
              title: marker('search.filters.byLicense'),
            }
          default:
            return { fieldName: filter, title: filter }
        }
      })
  }

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
      .buildFiltersFromFieldValues(fieldValues)
      .subscribe((filters) => {
        this.searchService.updateFilters(filters)
      })
  }

  getClassForFilter(index: number) {
    return (
      (this.isOpen ? 'block' : 'hidden') + ' ' + (index < 2 ? 'sm:block' : '')
    )
  }
}
