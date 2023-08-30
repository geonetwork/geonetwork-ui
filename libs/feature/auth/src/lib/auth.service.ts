import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import {
  MeApiService,
  MeResponseApiModel,
} from '@geonetwork-ui/data-access/gn4'
import { LANG_2_TO_3_MAPPER } from '@geonetwork-ui/util/i18n'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { AvatarServiceInterface } from './avatar/avatar.service.interface'

export const DEFAULT_GN4_LOGIN_URL = `/geonetwork/srv/\${lang3}/catalog.signin?redirect=\${current_url}`
export const LOGIN_URL = new InjectionToken<string>('loginUrl')

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authReady$: Observable<UserModel>
  user$: Observable<UserModel>
  isAnonymous$ = this.authReady().pipe(map((user) => !user || !('id' in user)))

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
    private meApi: MeApiService,
    private translateService: TranslateService,
    private avatarService: AvatarServiceInterface
  ) {
    this.user$ = this.meApi.getMe().pipe(
      map((apiUser) => this.mapToUserModel(apiUser)),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  // TODO: refactor authReady
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
      admin,
      ...user
    } = apiUser
    const icon = this.avatarService.getProfileIcon(apiUser.hash)
    return { ...user, profileIcon: icon } as UserModel
  }
}
