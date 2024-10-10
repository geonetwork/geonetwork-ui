import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-search-filters',
  standalone: true,
  imports: [CommonModule, TranslateModule, FeatureSearchModule],
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css'],
})
export class SearchFiltersComponent implements OnInit {
  searchConfig: { fieldName: string; title: string }[]

  ngOnInit(): void {
    this.searchConfig = ['user'].map((filter) => ({
      fieldName: filter,
      title: `search.filters.${filter}`,
    }))
  }
}
