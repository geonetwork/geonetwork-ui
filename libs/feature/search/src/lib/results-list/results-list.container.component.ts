import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchError } from '../state/reducer'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'

export type ResultsListShowMoreStrategy = 'auto' | 'button' | 'none'

@Component({
  selector: 'gn-ui-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() layout: string
  @Input() showMore: ResultsListShowMoreStrategy = 'auto'
  @Output() mdSelect = new EventEmitter<MetadataRecord>()

  layoutConfig$: Observable<ResultsLayoutConfigItem>

  error$: Observable<SearchError>
  errorCode$: Observable<number>
  errorMessage$: Observable<string>

  errorTypes = ErrorType

  constructor(
    public facade: SearchFacade,
    @Inject(RESULTS_LAYOUT_CONFIG)
    private resultsLayoutConfig: ResultsLayoutConfigModel
  ) {}

  ngOnInit(): void {
    this.layoutConfig$ = this.facade.layout$.pipe(
      map((layout) => this.resultsLayoutConfig[layout])
    )

    if (this.layout) {
      this.facade.setResultsLayout(this.layout)
    }

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

  onShowMore() {
    this.facade.scroll()
  }
}
