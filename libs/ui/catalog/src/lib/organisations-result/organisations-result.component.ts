import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-organisations-result',
  templateUrl: './organisations-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
  standalone: true,
})
export class OrganisationsResultComponent {
  @Input() hits: number
  @Input() total: number
}
