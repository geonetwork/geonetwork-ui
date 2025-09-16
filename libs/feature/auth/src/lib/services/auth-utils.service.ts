import { Injectable } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'

@Injectable({
  providedIn: 'root',
})
export class AuthUtilsService {
  isAuthDisabled(): boolean {
    try {
      return getGlobalConfig().DISABLE_AUTH === true
    } catch {
      return false
    }
  }
}
