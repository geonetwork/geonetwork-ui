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
})
export class GnSearchInputComponent extends BaseComponent {
  @Input() forceTrackPosition = ''
  @Input() openOnSearch: string
  @Input() openOnSelect: string
  @Input() placeholder?: string
  @ViewChild('searchInput') searchInput: FuzzySearchComponent

  search(any: string) {
    if (this.openOnSearch) {
      const landingPage = this.openOnSearch.replace(/\$\{search}/, any)
      window.open(landingPage, '_self').focus()
    }
  }

  select(record: CatalogRecord) {
    if (this.openOnSelect) {
      const landingPage = this.openOnSelect.replace(
        /\$\{uuid}/,
        record.uniqueIdentifier
      )
      window.open(landingPage, '_self').focus()
    }
  }
}
