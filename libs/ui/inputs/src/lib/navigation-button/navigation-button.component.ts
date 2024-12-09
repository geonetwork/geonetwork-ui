import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIcon } from '@ng-icons/core'

@Component({
  selector: 'gn-ui-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  standalone: true,
})
export class NavigationButtonComponent {
  @Input() label: string
  @Input() icon: string
}
