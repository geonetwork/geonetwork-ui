import { Injectable } from '@angular/core'
import { AvatarServiceInterface } from './avatar.service.interface'
import { Gn4SettingsService } from '@geonetwork-ui/api/repository/gn4'

@Injectable({
  providedIn: 'root',
})
export class GravatarService implements AvatarServiceInterface {
  private GRAVATAR_URL = 'https://www.gravatar.com/avatar/'
  private GRAVATAR_IDENTICON = 'mp'

  constructor(private gn4SettingsService: Gn4SettingsService) {
    this.gn4SettingsService.identicon$.subscribe(
      (identicon) =>
        (this.GRAVATAR_IDENTICON = identicon.replace('gravatar:', ''))
    )
  }

  placeholder = this.getProfileIcon('')

  getProfileIcon(hash: string): string {
    return `${this.GRAVATAR_URL}${hash}?d=${this.GRAVATAR_IDENTICON}`
  }
}
