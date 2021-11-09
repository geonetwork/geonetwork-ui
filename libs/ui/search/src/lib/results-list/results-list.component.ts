import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core'
import {
  MetadataRecord,
  ResultsListLayoutEnum,
} from '@geonetwork-ui/util/shared'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
  ResultsLayoutConfigModel,
} from './results-layout.config'

@Component({
  selector: 'gn-ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListComponent {
  @Input() records: MetadataRecord[]
  @Input() loading: boolean
  @Input() layout: ResultsListLayoutEnum = ResultsListLayoutEnum.CARD
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
  layoutEnum = ResultsListLayoutEnum

  get layoutConfig(): Partial<ResultsLayoutConfigItem> {
    return this.resultsLayoutConfig[this.layout] || {}
  }
  constructor(
    @Inject(RESULTS_LAYOUT_CONFIG)
    private resultsLayoutConfig: ResultsLayoutConfigModel
  ) {}
}
