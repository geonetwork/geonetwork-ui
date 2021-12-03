import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { ThemeService, MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadItemComponent implements OnInit {
  @Input() link: MetadataLinkValid
  @Output() exportUrl = new EventEmitter<string>()
  color: string

  ngOnInit(): void {
    this.color = ThemeService.generateLabelColor(this.link.format, 0.6, 0.5)
  }

  openUrl() {
    this.exportUrl.emit(this.link.url)
  }
}
