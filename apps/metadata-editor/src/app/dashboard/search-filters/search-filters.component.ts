import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'md-editor-search-filters',
  standalone: true,
  imports: [CommonModule, TranslateModule, FeatureSearchModule, MatIconModule],
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
