import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-catalog-title',
  templateUrl: './catalog-title.component.html',
  styleUrls: ['./catalog-title.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CatalogTitleComponent {
  @Input() name: string
  @Input() tooltip: string
  @Input() description: string
}
