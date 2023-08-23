import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'
import { FuzzySearchComponent } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'wc-gn-search-input',
  templateUrl: './gn-search-input.component.html',
  styleUrls: ['./gn-search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
})
export class GnSearchInputComponent
  extends BaseComponent
  implements AfterViewChecked
{
  @Input() openOnSearch: string
  @Input() openOnSelect: string
  @ViewChild('searchInput') searchInput: FuzzySearchComponent

  ngAfterViewChecked() {
    if (this.openOnSearch) {
      this.searchInput.inputSubmitted.subscribe(this.search.bind(this))
    }
    if (this.openOnSelect) {
      this.searchInput.itemSelected.subscribe(this.select.bind(this))
    }
  }

  search(any: string) {
    const landingPage = this.openOnSearch.replace(/\$\{search}/, any)
    window.open(landingPage, '_self').focus()
  }

  select(record: CatalogRecord) {
    const landingPage = this.openOnSelect.replace(
      /\$\{uuid}/,
      record.uniqueIdentifier
    )
    window.open(landingPage, '_self').focus()
  }
}
