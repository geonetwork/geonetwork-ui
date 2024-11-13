import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { map } from 'rxjs'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'md-editor-search-filters-summary',
  imports: [CommonModule, SearchFiltersSummaryItemComponent, TranslateModule],
  templateUrl: './search-filters-summary.component.html',
  styleUrls: ['./search-filters-summary.component.css'],
  standalone: true,
})
export class SearchFiltersSummaryComponent {
  @Input() searchFields: string[] = []

  searchFilterActive$ = this.searchFacade.searchFilters$.pipe(
    map((filters) => this.hasNonEmptyValues(filters))
  )

  constructor(
    private searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  hasNonEmptyValues(filters: any): boolean {
    return Object.values(filters).some(
      (value) =>
        value !== undefined &&
        (typeof value !== 'object' ||
          (typeof value === 'object' && Object.keys(value).length > 0))
    )
  }

  clearFilters() {
    this.searchService.setFilters({})
  }
}
