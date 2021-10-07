import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-apis-list',
  templateUrl: './apis-list.component.html',
  styleUrls: ['./apis-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApisListComponent {
  @Input() links: MetadataLink[]
}
