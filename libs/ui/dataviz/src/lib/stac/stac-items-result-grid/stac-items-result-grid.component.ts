import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { StacItemCardComponent } from '../stac-item-card/stac-item-card.component'
import { StacItem } from '@camptocamp/ogc-client'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-stac-items-result-grid',
  standalone: true,
  imports: [CommonModule, StacItemCardComponent],
  templateUrl: './stac-items-result-grid.component.html',
  styleUrl: './stac-items-result-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StacItemsResultGridComponent {
  @Input() items: StacItem[] = []
}
