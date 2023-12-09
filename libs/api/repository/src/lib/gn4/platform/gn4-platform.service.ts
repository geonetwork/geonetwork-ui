import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { catchError, map, shareReplay, tap } from 'rxjs/operators'
import {
  MeApiService,
  RegistriesApiService,
  SiteApiService,
  ToolsApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus/thesaurus.model'

const minApiVersion = '4.2.0'
@Injectable()
export class Gn4PlatformService implements PlatformServiceInterface {
  private readonly type = 'GeoNetwork'
  private me$: Observable<UserModel>
  private users$: Observable<UserModel[]>
  private isAnonymous$: Observable<boolean>

  private keyTranslations$ = this.toolsApiService
    .getTranslationsPackage1('gnui')
    .pipe(
      catchError(() => {
        console.warn('Error while loading gnui language package')
        return of({})
      }),
      shareReplay(1)
    )

  private settings$ = of(true).pipe(
    switchMap(() => this.siteApiService.getSiteOrPortalDescription()),
    shareReplay(1)
  )

  private readonly apiVersion$ = this.settings$.pipe(
    map((info) => info['system/platform/version'] as string),
    shareReplay(1)
  )

  private readonly isApiCompatible$ = this.apiVersion$.pipe(
    tap(
      (version) =>
        version < minApiVersion &&
        console.warn(`The GeoNetwork Api version is too low ${version}`)
    ),
    map((version) => version >= minApiVersion)
  )

  constructor(
    private siteApiService: SiteApiService,
    private meApi: MeApiService,
    private usersApi: UsersApiService,
    private mapper: Gn4PlatformMapper,
    private toolsApiService: ToolsApiService,
    private registriesApiService: RegistriesApiService
  ) {
    this.me$ = this.meApi.getMe().pipe(
      switchMap((apiUser) => this.mapper.userFromMeApi(apiUser)),
      shareReplay({ bufferSize: 1, refCount: true })
    )
    this.isAnonymous$ = this.me$.pipe(map((user) => !user || !('id' in user)))
    this.users$ = this.usersApi.getUsers().pipe(
      map((users) => users.map((user) => this.mapper.userFromApi(user))),
      shareReplay()
    )
  }

  getType(): string {
    return this.type
  }

  getApiVersion(): Observable<string> {
    return this.apiVersion$
  }
  isApiCompatible(): Observable<boolean> {
    return this.isApiCompatible$
  }

  getMe(): Observable<UserModel> {
    return this.me$
  }

  isAnonymous(): Observable<boolean> {
    return this.isAnonymous$
  }

  getOrganizations(): Observable<Organization[]> {
    return undefined
  }

  getUsersByOrganization(organisation: Organization): Observable<UserModel[]> {
    return undefined
  }

  getUsers(): Observable<UserModel[]> {
    return this.users$
  }

  translateKey(key: string): Observable<string> {
    return this.keyTranslations$.pipe(map((translations) => translations[key]))
  }

  getThesaurusByLang(
    thesaurusName: string,
    lang: string
  ): Observable<ThesaurusModel> {
    return this.registriesApiService
      .searchKeywords(null, lang, 1000, 0, null, [thesaurusName])
      .pipe(
        map((thesaurus) => this.mapper.thesaurusFromApi(thesaurus as any[]))
      )
  }
}
