import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'

@Component({
  selector: 'gn-ui-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgIconComponent],
  providers: [
    provideIcons({
      matClose,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
})
export class BadgeComponent {
  @Input() clickable? = false
  @Input() removable? = false
  @Output() badgeRemoveClicked = new EventEmitter<void>()

  removeBadge() {
    this.badgeRemoveClicked.emit()
  }
}
