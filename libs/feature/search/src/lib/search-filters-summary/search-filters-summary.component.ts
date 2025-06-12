import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Optional,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { first, map, Observable } from 'rxjs'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'
import { TranslatePipe } from '@ngx-translate/core'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'

export const FILTER_SUMMARY_IGNORE_LIST = new InjectionToken<string[]>(
  'FILTER_SUMMARY_IGNORE_LIST'
)
@Component({
  selector: 'gn-ui-search-filters-summary',
  imports: [CommonModule, SearchFiltersSummaryItemComponent, TranslatePipe],
  templateUrl: './search-filters-summary.component.html',
  styleUrls: ['./search-filters-summary.component.css'],
  standalone: true,
})
export class SearchFiltersSummaryComponent implements OnInit {
  @Input() searchFields: string[] = []
  filterSummaryIgnoreList: string[]

  searchFilterActive$: Observable<boolean>

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService,
    @Optional()
    @Inject(FILTER_SUMMARY_IGNORE_LIST)
    filterSummaryIgnoreList: string[]
  ) {
    const defaultIgnoreList = ['any']
    this.filterSummaryIgnoreList = [
      ...defaultIgnoreList,
      ...(filterSummaryIgnoreList ?? []),
    ]
  }

  ngOnInit(): void {
    this.searchFilterActive$ = this.searchFacade.searchFilters$.pipe(
      map((filters) => this.hasNonEmptyValues(filters))
    )
  }

  hasNonEmptyValues(filters: FieldFilters): boolean {
    const filteredFilters = {}
    for (const [key, value] of Object.entries(filters)) {
      if (!this.filterSummaryIgnoreList.includes(key)) {
        filteredFilters[key] = value
      }
    }
    return Object.values(filteredFilters).some(
      (value) =>
        value !== undefined &&
        (typeof value !== 'object' ||
          (typeof value === 'object' && Object.keys(value).length > 0))
    )
  }

  clearFilters() {
    this.searchFacade.searchFilters$
      .pipe(
        first(),
        map((filters) => {
          const newFilters = { ...filters }
          Object.keys(newFilters).forEach((key) => {
            if (!this.filterSummaryIgnoreList.includes(key)) {
              delete newFilters[key]
            }
          })
          return newFilters
        })
      )
      .subscribe((filters) => this.searchService.setFilters(filters))
  }
}
