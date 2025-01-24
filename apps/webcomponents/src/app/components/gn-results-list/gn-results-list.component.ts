import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import {
  ResultsListShowMoreStrategy,
  SearchFacade,
  SearchStateParams,
} from '@geonetwork-ui/feature/search'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { BaseComponent } from '../base.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'wc-gn-results-list-component',
  templateUrl: './gn-results-list.html',
  styleUrls: ['./gn-results-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnResultsListComponent extends BaseComponent {
  @Input() layout = 'CARD'
  @Input() size = '10' // will be converted to number later
  @Input() query: string
  @Input() filter: string
  @Input() catalogUrl: string
  @Input() showMore: ResultsListShowMoreStrategy = 'none'

  constructor(
    injector: Injector,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector)
  }

  private setSearch_() {
    const filter = this.filter
    const query = this.query
    const searchActionPayload: SearchStateParams = {
      pageSize: parseInt(this.size),
      currentPage: 0,
      filters: {},
    }
    if (query) {
      try {
        // we assume it's an object
        searchActionPayload.filters = JSON.parse(query)
      } catch (e) {
        // we assume it's a string
        searchActionPayload.filters = {
          any: query,
        }
      }
    }
    if (filter) {
      const configFilters: FieldFilters = JSON.parse(filter)
      this.facade.setConfigFilters(configFilters)
    }
    this.facade.setSearch(searchActionPayload)
  }

  init(): void {
    super.init()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      // timeout cause must be the last subscriber to the change
      this.facade.isLoading$.subscribe(() => {
        this.changeDetector.detectChanges()
      })
    })
    this.setSearch_()
  }

  onMdClick(metadata: CatalogRecord) {
    if (this.catalogUrl) {
      const landingPage = this.catalogUrl.replace(
        /{uuid}/,
        metadata.uniqueIdentifier
      )
      window.open(landingPage, '_blank').focus()
    }
  }

  changes(): void {
    super.changes()
    this.setSearch_()
  }
}
