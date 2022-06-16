import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  InfiniteScrollModel,
  InfiniteScrollOptionsDefault,
  MetadataRecord,
} from '@geonetwork-ui/util/shared'
import { iif, Observable, of } from 'rxjs'
import { distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchError } from '../state/reducer'
import { ErrorType } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'gn-ui-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: string
  @Input() scrollableOptions: InfiniteScrollModel = {}
  @Output() mdSelect = new EventEmitter<MetadataRecord>()

  scrollDisable$: Observable<boolean>
  scrollableConfig: InfiniteScrollModel

  error$: Observable<SearchError>
  errorCode$: Observable<number>
  errorMessage$: Observable<string>

  errorTypes = ErrorType

  constructor(public facade: SearchFacade) {}

  ngOnInit(): void {
    this.scrollableConfig = {
      ...InfiniteScrollOptionsDefault,
      ...this.scrollableOptions,
    }
    if (this.layout) {
      this.facade.setResultsLayout(this.layout)
    }

    this.scrollDisable$ = of(this.scrollableConfig.disabled).pipe(
      mergeMap((disabled) =>
        iif(() => !!disabled, of(true), this.facade.isEndOfResults$)
      ),
      distinctUntilChanged()
    )

    this.error$ = this.facade.error$
    this.errorCode$ = this.error$.pipe(
      filter((error) => error !== null),
      map((error) => error.code)
    )
    this.errorMessage$ = this.error$.pipe(
      filter((error) => error !== null),
      map((error) => error.message)
    )
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.mdSelect.emit(metadata)
  }

  onScrollDown() {
    this.facade.scroll()
  }
}
