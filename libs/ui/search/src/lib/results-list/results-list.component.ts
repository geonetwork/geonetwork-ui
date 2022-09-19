import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
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
  @Input() layoutConfig: ResultsLayoutConfigItem =
    DEFAULT_RESULTS_LAYOUT_CONFIG['CARD']
  @Input() favoriteTemplate: TemplateRef<{ $implicit: MetadataRecord }>
  @Output() mdSelect = new EventEmitter<MetadataRecord>()
}
