import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirFilterList } from '@ng-icons/iconoir'
import { MatIconModule } from '@angular/material/icon'
import { SearchFiltersSummaryItemComponent } from '../search-filters-summary-item/search-filters-summary-item.component'

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

  ngOnInit(): void {
    this.searchConfig = this.searchFields.map((filter) => ({
      fieldName: filter,
      title: `search.filters.${filter}`,
    }))
  }
}
