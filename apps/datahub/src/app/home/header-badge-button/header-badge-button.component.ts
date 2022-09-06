import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core'

@Component({
  selector: 'datahub-header-badge-button',
  templateUrl: './header-badge-button.component.html',
  styleUrls: ['./header-badge-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBadgeButtonComponent {
  @Input() label: string
  @Input() icon: string
  @Output() action = new EventEmitter<void>()

  onClick() {
    this.action.emit()
  }
}
