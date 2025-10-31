import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { StacItem } from '@camptocamp/ogc-client'

@Component({
  selector: 'gn-ui-stac-item-card',
  standalone: true,
  imports: [],
  templateUrl: './stac-item-card.component.html',
  styleUrl: './stac-item-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StacItemCardComponent {
  @Input() item: StacItem
}
