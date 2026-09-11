import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'gn-ui-catalog-title',
  templateUrl: './catalog-title.component.html',
  styleUrls: ['./catalog-title.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class CatalogTitleComponent {
  @Input() name: string
  @Input() tooltip: string
  @Input() description: string
}
