import { NotificationsService } from './notifications.service'
import { NotificationContent } from './notification.model'
import { fakeAsync, tick } from '@angular/core/testing'
import { firstValueFrom, take } from 'rxjs'

describe('NotificationsService', () => {
  let service: NotificationsService

  beforeEach(() => {
    service = new NotificationsService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('showNotification', () => {
    it('should show a notification', async () => {
      const content: NotificationContent = {
        type: 'info',
        title: 'Hello',
        text: 'World',
      }
      service.showNotification(content)
      expect(await firstValueFrom(service.notifications$)).toStrictEqual([
        { ...content, id: expect.any(Number) },
      ])
    })
    it('should remove a notification after a timeout', fakeAsync(() => {
      const content: NotificationContent = {
        type: 'info',
        title: 'Hello',
        text: 'World',
      }
      service.showNotification(content, 100)
      service.notifications$.pipe(take(1)).subscribe((notifications) => {
        expect(notifications.length).toBe(1)
      })
      tick(100)
      service.notifications$.pipe(take(1)).subscribe((notifications) => {
        expect(notifications.length).toBe(0)
      })
    }))
  })

  describe('removeNotificationById', () => {
    it('should remove a notification by id', async () => {
      const content: NotificationContent = {
        type: 'info',
        title: 'Hello',
        text: 'World',
      }
      service.showNotification(content)
      const notification = await firstValueFrom(service.notifications$)
      expect(await firstValueFrom(service.notifications$)).toStrictEqual([
        { ...content, id: expect.any(Number) },
      ])
      service.removeNotificationById(notification[0].id)
      expect(await firstValueFrom(service.notifications$)).toStrictEqual([])
    })
  })
})
