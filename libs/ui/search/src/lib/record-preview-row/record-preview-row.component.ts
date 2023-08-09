import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { GnUiThumbnailImageObject } from '@geonetwork-ui/ui/elements'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  constructor(protected elementRef: ElementRef) {
    super(elementRef)
  }

  get images() {
    const imagesArray: GnUiThumbnailImageObject[] = []
    if (this.record.thumbnailUrl) {
      imagesArray.push({ url: this.record.thumbnailUrl, objectFit: 'cover' })
    }
    if (this.contact.logoUrl) {
      imagesArray.push({ url: this.contact.logoUrl, objectFit: 'contain' })
    }
    return imagesArray
  }
}
