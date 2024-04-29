import { Injectable } from '@angular/core'
import { AvatarServiceInterface } from './avatar.service.interface'
import { Gn4SettingsService } from '../settings/gn4-settings.service'
import { map } from 'rxjs/operators'
import { firstValueFrom, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GravatarService implements AvatarServiceInterface {
  private GRAVATAR_URL = 'https://www.gravatar.com/avatar/'
  private GRAVATAR_IDENTICON = 'mp'

  private readonly identicon$ = this.gn4SettingsService.identicon$.pipe(
    map((identicon) => identicon?.replace('gravatar:', ''))
  )

  constructor(private gn4SettingsService: Gn4SettingsService) {}

  getPlaceholder(): Observable<string> {
    return this.getProfileIcon('')
  }

  getProfileIcon(hash: string): Observable<string> {
    return this.identicon$.pipe(
      map((identicon) => identicon || this.GRAVATAR_IDENTICON),
      map((identicon) => `${this.GRAVATAR_URL}${hash}?d=${identicon}`)
    )
  }

  async getProfileIconUrl(userId: string) {
    let iconUrl = ''
    try {
      iconUrl = await firstValueFrom(this.getProfileIcon(userId))
    } catch (error) {
      return ''
    }
    return iconUrl
  }
}
