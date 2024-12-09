import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-metadata-catalog',
  templateUrl: './metadata-catalog.component.html',
  styleUrls: ['./metadata-catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule],
})
export class MetadataCatalogComponent {
  @Input() sourceLabel: string
}
