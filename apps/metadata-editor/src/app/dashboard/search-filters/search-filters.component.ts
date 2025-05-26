import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirFilterAlt } from '@ng-icons/iconoir'
import {
  FeatureSearchModule,
  SearchFiltersSummaryComponent,
} from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-search-filters',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    FeatureSearchModule,
    NgIconComponent,
    SearchFiltersSummaryComponent,
  ],
  providers: [
    provideIcons({
      iconoirFilterAlt,
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
