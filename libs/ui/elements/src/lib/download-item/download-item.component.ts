import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadItemComponent {
  @Input() link: DatasetDistribution
  @Input() color: string
  @Input() format: string
  @Input() isFromWfs: boolean
  @Output() exportUrl = new EventEmitter<string>()

  openUrl() {
    this.exportUrl.emit(this.link.url.toString())
  }
}
