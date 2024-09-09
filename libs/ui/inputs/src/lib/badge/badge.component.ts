import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'gn-ui-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule],
})
export class BadgeComponent {
  @Input() clickable? = false
  @Input() removable? = false
  @Output() badgeRemoveClicked = new EventEmitter<void>()

  removeBadge() {
    this.badgeRemoveClicked.emit()
  }
}
