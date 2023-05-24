import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCardComponent {
  @Input() link: MetadataLink
}
