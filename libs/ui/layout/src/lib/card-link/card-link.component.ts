import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardLinkComponent {
  @Input() linkHref: string
  @Input() newTab = true
}
