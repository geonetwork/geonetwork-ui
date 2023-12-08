import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-organisations-result',
  templateUrl: './organisations-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationsResultComponent {
  @Input() hits: number
  @Input() total: number
}
