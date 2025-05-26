import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { NgIconComponent } from '@ng-icons/core'
import { TranslatePipe } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'datahub-header-badge-button',
  templateUrl: './header-badge-button.component.html',
  styleUrls: ['./header-badge-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgIconComponent, TranslatePipe],
})
export class HeaderBadgeButtonComponent {
  @Input() label: string
  @Input() icon: string
  @Input() toggled: boolean
  @Output() action = new EventEmitter<boolean>()

  toggle() {
    this.toggled = !this.toggled
    this.action.emit(this.toggled)
  }
}
