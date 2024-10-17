import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matCheckCircleOutline } from '@ng-icons/material-icons/baseline'
import {
  matErrorOutlineOutline,
  matWarningAmberOutline,
  matInfoOutline,
  matCloseOutline,
} from '@ng-icons/material-icons/outline'

@Component({
  selector: 'gn-ui-notification',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgIconComponent],
  providers: [
    provideIcons({
      matCheckCircleOutline,
      matErrorOutlineOutline,
      matWarningAmberOutline,
      matInfoOutline,
      matCloseOutline,
    }),
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() type: 'info' | 'warning' | 'error' | 'success' = 'info'
  @Input() title: string
  @Input() text: string
  @Input() closeMessage?: string
  @Output() notificationClose = new EventEmitter<void>()

  handleClose(event?: Event) {
    event?.preventDefault()
    this.notificationClose.emit()
  }

  getIconName(type: string): string {
    switch (type) {
      case 'success':
        return 'matCheckCircleOutline'
      case 'info':
        return 'matInfoOutline'
      case 'warning':
        return 'matWarningAmberOutline'
      case 'error':
        return 'matErrorOutlineOutline'
      default:
        return ''
    }
  }
}
