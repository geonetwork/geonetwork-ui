import { Component, Input, OnInit } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  ResultsListLayout,
} from '@lib/common'
import { SearchFacade } from '../state/search.facade'
import { pipe } from 'rxjs'

@Component({
  selector: 'search-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}

  scrollableConfig: InfiniteScrollModel

  constructor(public facade: SearchFacade) {}

  ngOnInit(): void {
    this.scrollableConfig = {
      ...InfiniteScrollOptionsDefault,
      ...this.scrollableOptions,
    }
    this.facade.setResultsLayout(this.layout)
    this.facade.isEndOfResults$.subscribe((isTheEnd) => {
      this.scrollableConfig.disabled = isTheEnd
    })
  }

  onScrollDown() {
    this.facade.scroll()
  }
}
