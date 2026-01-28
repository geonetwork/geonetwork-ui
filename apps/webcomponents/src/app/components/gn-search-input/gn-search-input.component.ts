import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'
import { FuzzySearchComponent } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-search-input',
  templateUrl: './gn-search-input.component.html',
  styleUrls: ['./gn-search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
  standalone: false,
})
export class GnSearchInputComponent extends BaseComponent {
  @Input() forceTrackPosition = ''
  @Input({ alias: 'open-on-search' }) openOnSearch: string
  @Input({ alias: 'open-on-select' }) openOnSelect: string
  @Input() placeholder?: string
  @ViewChild('searchInput') searchInput: FuzzySearchComponent

  search(any: string) {
    if (this.openOnSearch) {
      this.searchInput?.autocomplete?.triggerRef?.closePanel()
      const searchTerm = encodeURIComponent(any)
      const landingPage = this.openOnSearch
        .replace(/\$\{search}/g, searchTerm)
        .replace(/\$\{q}/g, searchTerm)

      window.location.href = landingPage
    }
  }

  select(record: CatalogRecord) {
    if (this.openOnSelect) {
      this.searchInput?.autocomplete?.triggerRef?.closePanel()
      const searchTerm = encodeURIComponent(record.title)
      const landingPage = this.openOnSelect
        .replace(/\$\{uuid}/g, record.uniqueIdentifier)
        .replace(/\$\{search}/g, searchTerm)
        .replace(/\$\{q}/g, searchTerm)

      window.location.href = landingPage
    }
  }
}
