import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { map } from 'rxjs'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'

@Component({
  selector: 'md-editor-search-filters-summary',
  standalone: true,
  imports: [CommonModule, SearchFiltersSummaryItemComponent],
  templateUrl: './search-filters-summary.component.html',
  styleUrls: ['./search-filters-summary.component.css'],
})
export class SearchFiltersSummaryComponent {
  @Input() searchFields: string[] = []

  searchFilterActive$ = this.searchFacade.searchFilters$.pipe(
    map((filters) => this.hasNonEmptyValues(filters))
  )

  constructor(private searchFacade: SearchFacade) {}

  hasNonEmptyValues(filters: any): boolean {
    return Object.values(filters).some(
      (value) =>
        value !== undefined &&
        (typeof value !== 'object' ||
          (typeof value === 'object' && Object.keys(value).length > 0))
    )
  }
}
