import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class GravatarService {
  private GRAVATAR_URL = 'https://www.gravatar.com/avatar/'

  public getUserProfileIconFromHash(hash: string, placeholder?: string) {
    return `${this.GRAVATAR_URL}${hash}?d=${
      placeholder ? placeholder.replace('gravatar:', '') : 'mp'
    }`
  }
}
