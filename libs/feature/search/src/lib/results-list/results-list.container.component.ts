import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  RecordSummary,
  ResultsListLayout,
} from '@geonetwork-ui/util/shared'
import { iif, Observable, of } from 'rxjs'
import { distinctUntilChanged, mergeMap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}
  @Output() mdSelect = new EventEmitter<RecordSummary>()

  scrollDisable$: Observable<boolean>
  scrollableConfig: InfiniteScrollModel

  constructor(public facade: SearchFacade) {}

  ngOnInit(): void {
    this.scrollableConfig = {
      ...InfiniteScrollOptionsDefault,
      ...this.scrollableOptions,
    }
    this.facade.setResultsLayout(this.layout)

    this.scrollDisable$ = of(this.scrollableConfig.disabled).pipe(
      mergeMap((disabled) =>
        iif(() => !!disabled, of(true), this.facade.isEndOfResults$)
      ),
      distinctUntilChanged()
    )
  }

  onMetadataSelection(metadata: RecordSummary): void {
    this.mdSelect.emit(metadata)
  }

  onScrollDown() {
    this.facade.scroll()
  }
}
