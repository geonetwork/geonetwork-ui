import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'gn-ui-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class BadgeComponent {
  @Input() clickable? = false
  @Input() removable? = false
  @Output() badgeClicked = new EventEmitter<void>()

  removeBadge() {
    this.badgeClicked.emit()
  }
}
