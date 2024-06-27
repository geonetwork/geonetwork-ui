import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { OverviewUploadComponent } from '../../../overview-upload/overview-upload.component'
import { FormControl } from '@angular/forms'
import { GraphicOverview } from '@geonetwork-ui/common/domain/model/record'

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
  @Input() control!: FormControl

  handleOverViewChange(overView: GraphicOverview | null) {
    this.control.setValue(overView ? [overView] : [])
  }
}
