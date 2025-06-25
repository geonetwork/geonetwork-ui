import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core'
import { combineLatest, Observable, tap } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'
import { SearchError } from '../state/reducer'
import { ErrorType } from '@geonetwork-ui/ui/elements'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import {
  RECORD_DATASET_URL_TOKEN,
  RECORD_SERVICE_URL_TOKEN,
  RECORD_REUSE_URL_TOKEN,
} from '../record-url.token'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export type ResultsListShowMoreStrategy = 'auto' | 'button' | 'none'

@Component({
  selector: 'gn-ui-results-list-container',
  templateUrl: './results-list.container.component.html',
  styleUrls: ['./results-list.container.component.css'],
})
export class ResultsListContainerComponent implements OnInit {
  @Input() metadataQualityDisplay: boolean
  @Input() layout: string
  @Input() showMore: ResultsListShowMoreStrategy = 'auto'
  @Output() mdSelect = new EventEmitter<CatalogRecord>()

  layoutConfig$: Observable<ResultsLayoutConfigItem>

  error$: Observable<SearchError>
  errorCode$: Observable<number>
  errorMessage$: Observable<string>
  pipelineForQualityScoreActivated: Observable<boolean>
  allowShowMore$: Observable<boolean>

  errorTypes = ErrorType
  recordUrlGetter = this.getRecordUrl.bind(this)

  constructor(
    public facade: SearchFacade,
    @Inject(RESULTS_LAYOUT_CONFIG)
    private resultsLayoutConfig: ResultsLayoutConfigModel,
    @Optional()
    @Inject(RECORD_DATASET_URL_TOKEN)
    private recordDatasetUrlTemplate: string,
    @Optional()
    @Inject(RECORD_SERVICE_URL_TOKEN)
    private recordServiceUrlTemplate: string,
    @Optional()
    @Inject(RECORD_REUSE_URL_TOKEN)
    private recordReuseUrlTemplate: string
  ) {}

  ngOnInit(): void {
    this.layoutConfig$ = this.facade.layout$.pipe(
      map((layout) => this.resultsLayoutConfig[layout])
    )

    if (this.layout) {
      this.facade.setResultsLayout(this.layout)
    }

    this.pipelineForQualityScoreActivated = this.facade.results$.pipe(
      tap((records) => {
        if (records?.length > 0 && !records[0].extras?.qualityScore) {
          console.warn(
            'It looks like the metadata quality indicator is not available on these records, probably due to a missing indexing pipeline'
          )
        }
      }),
      map((records) => !!records[0]?.extras.qualityScore)
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
    this.allowShowMore$ = combineLatest([
      this.facade.isLoading$,
      this.facade.currentPage$,
      this.facade.totalPages$,
    ]).pipe(
      map(
        ([loading, currentPage, totalPages]) =>
          !loading && currentPage < totalPages
      )
    )
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.mdSelect.emit(metadata)
  }

  onShowMore() {
    this.facade.scroll()
  }

  getRecordUrl(metadata: CatalogRecord) {
    const tokenMap = {
      dataset: this.recordDatasetUrlTemplate,
      service: this.recordServiceUrlTemplate,
      reuse: this.recordReuseUrlTemplate,
    }
    if (
      !this.recordDatasetUrlTemplate &&
      !this.recordServiceUrlTemplate &&
      !this.recordReuseUrlTemplate
    )
      return null
    const urlKind = tokenMap[metadata.kind]
    return urlKind.replace('${uuid}', metadata.uniqueIdentifier)
  }
}
