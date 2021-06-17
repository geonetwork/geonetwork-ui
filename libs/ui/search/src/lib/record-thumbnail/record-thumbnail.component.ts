import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-record-thumbnail',
  templateUrl: './record-thumbnail.component.html',
})
export class RecordThumbnailComponent {
  @Input() thumbnailUrl: string
}
