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
  selector: 'gn-ui-apis-list-item',
  templateUrl: './apis-list-item.component.html',
  styleUrls: ['./apis-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApisListItemComponent implements OnInit {
  @Input() link: MetadataLinkValid
  @Output() apiUrl = new EventEmitter<string>()
  color: string

  ngOnInit(): void {
    this.color = ThemeService.generateLabelColor(this.link.protocol, 0.6, 0.5)
  }

  copyUrl() {
    navigator.clipboard.writeText(this.link.url)
    this.apiUrl.emit(this.link.url)
  }
}
