import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { ColorService, MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-downloads-list-item',
  templateUrl: './downloads-list-item.component.html',
  styleUrls: ['./downloads-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsListItemComponent implements OnInit {
  @Input() link: MetadataLinkValid
  @Output() exportUrl = new EventEmitter<string>()
  color: string

  ngOnInit(): void {
    this.color = ColorService.generateLabelColor(this.link.format, 0.6, 0.5)
  }

  openUrl() {
    this.exportUrl.emit(this.link.url)
  }
}
