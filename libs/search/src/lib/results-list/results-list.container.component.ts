import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  ResultsListLayout,
} from '@lib/common'
import { Subscription } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit, OnDestroy {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}

  scrollableConfig: InfiniteScrollModel
  subscription = new Subscription()

  constructor(public facade: SearchFacade) {}

  ngOnInit(): void {
    this.scrollableConfig = {
      ...InfiniteScrollOptionsDefault,
      ...this.scrollableOptions,
    }
    this.facade.setResultsLayout(this.layout)
    this.subscription.add(
      this.facade.isEndOfResults$
        .pipe(distinctUntilChanged())
        .subscribe((isTheEnd) => {
          this.scrollableConfig.disabled = isTheEnd
        })
    )
  }

  onScrollDown() {
    this.facade.scroll()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
