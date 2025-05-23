import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-metadata-catalog',
  templateUrl: './metadata-catalog.component.html',
  styleUrls: ['./metadata-catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateDirective],
})
export class MetadataCatalogComponent {
  @Input() sourceLabel: string
}
