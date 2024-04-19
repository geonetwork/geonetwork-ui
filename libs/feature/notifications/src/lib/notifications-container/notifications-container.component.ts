import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationsService } from '../notifications.service'
import { NotificationComponent } from '@geonetwork-ui/ui/elements'
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations'

@Component({
  selector: 'gn-ui-notifications-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterExit', [
      transition(':enter', [
        animate(
          '150ms',
          keyframes([
            style({ transform: 'scale(1)', opacity: 0 }),
            style({ transform: 'scale(1.03)', opacity: 0.5 }),
            style({ transform: 'scale(1)', opacity: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(50px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class NotificationsContainerComponent {
  constructor(protected notificationsService: NotificationsService) {}

  trackById(index: number, notification: { id: number }) {
    return notification.id
  }
}
