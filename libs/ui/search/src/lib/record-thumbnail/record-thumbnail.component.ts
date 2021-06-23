import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-record-thumbnail',
  templateUrl: './record-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordThumbnailComponent {
  @Input() thumbnailUrl: string
}
