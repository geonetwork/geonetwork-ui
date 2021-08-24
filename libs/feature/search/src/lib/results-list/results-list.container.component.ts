import { Component, Input, OnInit } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  RecordSummary,
  ResultsListLayout,
} from '@geonetwork-ui/util/shared'
import { iif, Observable, of } from 'rxjs'
import { distinctUntilChanged, mergeMap } from 'rxjs/operators'
import { MdViewFacade } from '../metadata-view/state/mdview.facade'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'gn-ui-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: ResultsListLayout = ResultsListLayout.CARD
  @Input() scrollableOptions: InfiniteScrollModel = {}

  scrollDisable$: Observable<boolean>
  scrollableConfig: InfiniteScrollModel

  constructor(
    public facade: SearchFacade,
    private mdViewFacade: MdViewFacade
  ) {}

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
    this.mdViewFacade.setUuid(metadata.uuid)
  }

  onScrollDown() {
    this.facade.scroll()
  }
}
