import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationsService } from '../notifications.service'
import { NotificationComponent } from '@geonetwork-ui/ui/elements'

@Component({
  selector: 'gn-ui-notifications-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsContainerComponent {
  constructor(protected notificationsService: NotificationsService) {}

  trackById(index: number, notification: { id: number }) {
    return notification.id
  }
}
