import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import {
  DEFAULT_RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigItem,
} from './results-layout.config.js'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'
import { ResultsListItemComponent } from '../results-list-item/results-list-item.component.js'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ResultsListItemComponent],
})
export class ResultsListComponent {
  @Input() records: CatalogRecord[]
  @Input() layoutConfig: ResultsLayoutConfigItem =
    DEFAULT_RESULTS_LAYOUT_CONFIG['CARD']
  @Input() favoriteTemplate: TemplateRef<{ $implicit: CatalogRecord }>
  @Input() recordUrlGetter: (record: CatalogRecord) => string
  @Input() metadataQualityDisplay: boolean
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
}
