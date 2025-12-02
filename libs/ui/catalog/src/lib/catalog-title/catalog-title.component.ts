import { Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-catalog-title',
  templateUrl: './catalog-title.component.html',
  styleUrls: ['./catalog-title.component.css'],
  standalone: true,
  imports: [],
})
export class CatalogTitleComponent {
  @Input() name: string
  @Input() tooltip: string
  @Input() description: string
}
