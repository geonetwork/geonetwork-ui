import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirFilterList } from '@ng-icons/iconoir'
import {
  FeatureSearchModule,
  SearchFacade,
} from '@geonetwork-ui/feature/search'
import { MatIconModule } from '@angular/material/icon'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'
import { map } from 'rxjs'

@Component({
  selector: 'md-editor-search-filters',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FeatureSearchModule,
    NgIconComponent,
    MatIconModule,
    SearchFiltersSummaryItemComponent,
  ],
  providers: [
    provideIcons({
      iconoirFilterList,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
})
export class SearchFiltersComponent implements OnInit {
  @Input() searchFields: string[] = []
  searchConfig: { fieldName: string; title: string }[]

  searchFilterActive$ = this.searchFacade.searchFilters$.pipe(
    map((filters) => this.hasNonEmptyValues(filters))
  )

  constructor(private searchFacade: SearchFacade) {}

  ngOnInit(): void {
    this.searchConfig = this.searchFields.map((filter) => ({
      fieldName: filter,
      title: `search.filters.${filter}`,
    }))
  }

  hasNonEmptyValues(filters: any): boolean {
    return Object.values(filters).some(
      (value) =>
        value !== undefined &&
        (typeof value !== 'object' ||
          (typeof value === 'object' && Object.keys(value).length > 0))
    )
  }
}
