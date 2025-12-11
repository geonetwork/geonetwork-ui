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
      this.facade.updateFilters({ any })

      const searchTerm = encodeURIComponent(any)
      const landingPage = this.openOnSearch.replace(
        /\$\{search}/g,
        searchTerm
      ).replace(
        /\$\{q}/g,
        searchTerm
      )

      setTimeout(() => {
        window.location.href = landingPage
      }, 100)
      return
    }

    this.facade.updateFilters({ any })
  }

  select(record: CatalogRecord) {
    if (this.openOnSelect) {
      this.facade.updateFilters({ any: record.title })

      const searchTerm = encodeURIComponent(record.title)
      const landingPage = this.openOnSelect.replace(
        /\$\{uuid}/g,
        record.uniqueIdentifier
      ).replace(
        /\$\{search}/g,
        searchTerm
      ).replace(
        /\$\{q}/g,
        searchTerm
      )

      setTimeout(() => {
        window.location.href = landingPage
      }, 100)
      return
    }

    this.facade.updateFilters({ any: record.title })
  }
}
