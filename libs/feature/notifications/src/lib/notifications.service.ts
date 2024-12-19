import { Injectable } from '@angular/core'
import { NotificationContent } from './notification.model'
import { BehaviorSubject } from 'rxjs'

type NotificationWithIdentity = NotificationContent & { id: number }

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications$ = new BehaviorSubject<NotificationWithIdentity[]>([])

  showNotification(
    content: NotificationContent,
    timeoutMs?: number,
    error?: Error
  ) {
    error && console.error(error)
    const id = Math.floor(Math.random() * 1000000)
    this.notifications$.next([...this.notifications$.value, { ...content, id }])
    if (typeof timeoutMs === 'undefined') return
    setTimeout(() => {
      this.removeNotificationById(id)
    }, timeoutMs)
  }

  removeNotificationById(id: number) {
    this.notifications$.next(
      this.notifications$.value.filter((n) => n.id !== id)
    )
  }
}
