import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { StacItem } from '@camptocamp/ogc-client'

@Component({
  selector: 'gn-ui-stac-items-result-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stac-items-result-grid.component.html',
  styleUrl: './stac-items-result-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StacItemsResultGridComponent {
  @Input() items: StacItem[] = []
}
