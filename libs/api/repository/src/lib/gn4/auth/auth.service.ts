import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'
import { TranslateService } from '@ngx-translate/core'

export const DEFAULT_GN4_LOGIN_URL = `/geonetwork/srv/\${lang3}/catalog.signin?redirect=\${current_url}`
export const LOGIN_URL = new InjectionToken<string>('loginUrl')

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseLoginUrl = this.baseLoginUrlToken || DEFAULT_GN4_LOGIN_URL
  get loginUrl() {
    let baseUrl = this.baseLoginUrl
    const locationHasQueryParams = !!window.location.search
    // this is specific to georchestra login URL based on a ?login query param
    if (baseUrl.startsWith('${current_url}?') && locationHasQueryParams) {
      baseUrl = baseUrl.replace('?', '&')
    }
    return baseUrl
      .replace('${current_url}', window.location.toString())
      .replace('${lang2}', this.translateService.currentLang)
      .replace(
        '${lang3}',
        LANG_2_TO_3_MAPPER[this.translateService.currentLang]
      )
  }
  constructor(
    @Optional()
    @Inject(LOGIN_URL)
    private baseLoginUrlToken: string,
    private translateService: TranslateService
  ) {}
}
