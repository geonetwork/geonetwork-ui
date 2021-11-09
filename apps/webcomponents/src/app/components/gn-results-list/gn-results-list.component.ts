import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import {
  ResultsListLayoutEnum,
  SearchFilters,
  StateConfigFilters,
} from '@geonetwork-ui/util/shared'
import { SearchFacade, SearchStateParams } from '@geonetwork-ui/feature/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-results-list-component',
  templateUrl: './gn-results-list.html',
  styleUrls: ['./gn-results-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade],
})
export class GnResultsListComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() apiUrl = '/'
  @Input() searchId: string
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'
  @Input() layout: ResultsListLayoutEnum = ResultsListLayoutEnum.CARD
  @Input() size = 10
  @Input() query: string
  @Input() filter: string
  scrollDisabled: boolean
  @Input() set fixed(value: string) {
    this.scrollDisabled = value === 'true'
  }

  constructor(injector: Injector, private changeDetector: ChangeDetectorRef) {
    super(injector)
  }

  ngOnInit(): void {
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      // timeout cause must be the last subscriber to the change
      this.facade.isLoading$.subscribe(() => {
        this.changeDetector.detectChanges()
      })
    })
  }

  private setSearch_() {
    const filter = this.filter
    const query = this.query
    const searchActionPayload: SearchStateParams = {
      size: this.size,
      from: 0,
      filters: {},
    }
    if (query) {
      try {
        // we assume it's an object
        const queryFilters: SearchFilters = JSON.parse(query)
        searchActionPayload.filters = queryFilters
      } catch (e) {
        // we assume it's a string
        searchActionPayload.filters = {
          any: query,
        }
      }
    }
    if (filter) {
      const configFilters: StateConfigFilters = JSON.parse(filter)
      this.facade.setConfigFilters(configFilters)
    }
    this.facade.setSearch(searchActionPayload)
  }

  ngOnChanges(): void {
    super.ngOnChanges()
    this.setSearch_()
  }
}
