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
  ResultsListLayout,
  SearchFilters,
  StateConfigFilters,
} from '@lib/common'
import { SearchFacade, SearchStateParams } from '@lib/search'
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
  implements OnInit, OnChanges {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
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
    super.ngOnInit()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      // timeout cause must be the last subscriber to the change
      this.facade.isLoading$.subscribe((v) => {
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

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes)
    this.setSearch_()
  }
}
