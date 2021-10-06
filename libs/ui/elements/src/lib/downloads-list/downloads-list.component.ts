import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-downloads-list',
  templateUrl: './downloads-list.component.html',
  styleUrls: ['./downloads-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsListComponent {
  @Input() links: MetadataLink[]
}
