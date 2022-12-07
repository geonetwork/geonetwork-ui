import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import {
  MeApiService,
  MeResponseApiModel,
} from '@geonetwork-ui/data-access/gn4'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'
import { UserModel } from '@geonetwork-ui/util/shared'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

export const DEFAULT_GN4_LOGIN_URL = `/geonetwork/srv/\${lang3}/catalog.signin?redirect=\${current_url}`
export const LOGIN_URL = new InjectionToken<string>('loginUrl')

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authReady$: Observable<MeResponseApiModel>
  baseLoginUrl = this.baseLoginUrlToken || DEFAULT_GN4_LOGIN_URL
  get loginUrl() {
    return this.baseLoginUrl
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
    private meApi: MeApiService,
    private translateService: TranslateService
  ) {}

  authReady(): Observable<UserModel> {
    if (!this.authReady$) {
      this.authReady$ = this.meApi.getMe().pipe(
        map((apiUser) => this.mapToUserModel(apiUser)),
        shareReplay({ bufferSize: 1, refCount: true })
      )
    }
    return this.authReady$
  }

  private mapToUserModel(apiUser: MeResponseApiModel): UserModel {
    if (!apiUser) return null
    const {
      hash,
      groupsWithRegisteredUser,
      groupsWithEditor,
      groupsWithReviewer,
      groupsWithUserAdmin,
      ...user
    } = apiUser
    return user
  }
}
