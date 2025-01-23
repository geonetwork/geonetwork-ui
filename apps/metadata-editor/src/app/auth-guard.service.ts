import { Injectable } from '@angular/core'
import { AuthService } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { firstValueFrom } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(
    private platformService: PlatformServiceInterface,
    private authService: AuthService
  ) {}

  // this will redirect the user to the authentication form if required
  async canActivate(): Promise<boolean> {
    const notLoggedIn = await firstValueFrom(this.platformService.isAnonymous())
    if (notLoggedIn) {
      window.location.assign(this.authService.loginUrl)
      return false
    }
    return true
  }
}
