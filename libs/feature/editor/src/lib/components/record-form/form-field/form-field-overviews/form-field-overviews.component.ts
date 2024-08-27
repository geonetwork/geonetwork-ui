import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'
import { OverviewUploadComponent } from '../../../overview-upload/overview-upload.component'

@Component({
  selector: 'gn-ui-form-field-overviews',
  templateUrl: './form-field-overviews.component.html',
  styleUrls: ['./form-field-overviews.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, OverviewUploadComponent],
})
export class FormFieldOverviewsComponent {
  @Input() metadataUuid: string
  @Input() value: Array<GraphicOverview>
  @Output() valueChange: EventEmitter<Array<GraphicOverview>> =
    new EventEmitter()

  get firstOverview() {
    return this.value[0]
  }

  handleOverviewChange(overView: GraphicOverview | null) {
    this.valueChange.emit(overView ? [overView] : [])
  }
}
