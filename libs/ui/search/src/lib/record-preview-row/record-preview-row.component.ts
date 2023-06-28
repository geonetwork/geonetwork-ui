import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Optional,
} from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { IRightClickToken, RIGHT_CLICK_TOKEN } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  constructor(
    protected elementRef: ElementRef,
    @Optional()
    @Inject(RIGHT_CLICK_TOKEN)
    private rightClickService: IRightClickToken
  ) {
    super(elementRef)
  }

  getTargetUrl() {
    return this.rightClickService?.datasetUrl
      ? `${this.rightClickService?.datasetUrl}${this.record.uuid}`
      : null
  }
}
