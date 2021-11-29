import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCardComponent {
  @Input() link: MetadataLinkValid
}
