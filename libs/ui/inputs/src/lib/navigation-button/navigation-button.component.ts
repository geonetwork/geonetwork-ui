import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonComponent {
  @Input() label: string
  @Input() icon: string
}
