import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { catchError, map, shareReplay, tap } from 'rxjs/operators'
import {
  MeApiService,
  RegistriesApiService,
  SiteApiService,
  ToolsApiService,
  UserfeedbackApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import {
  Organization,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { ltr } from 'semver'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus/thesaurus.model'
import { LangService } from '@geonetwork-ui/util/i18n'

const minApiVersion = '4.2.2'

@Injectable()
export class Gn4PlatformService implements PlatformServiceInterface {
  private readonly type = 'GeoNetwork'
  private readonly me$: Observable<UserModel>
  private readonly users$: Observable<UserModel[]>
  private readonly isUserAnonymous$: Observable<boolean>

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
    tap((version) => {
      if (ltr(version, minApiVersion)) {
        throw new Error(
          `Gn4 API version is not compatible.\nMinimum: ${minApiVersion}\nYour version: ${version}`
        )
      }
    }),
    shareReplay(1)
  )

  /**
   * A map of already loaded thesauri (groups of keywords); the key is a URI
   * @private
   */
  private thesauri: Record<string, Observable<ThesaurusModel>> = {}

  constructor(
    private siteApiService: SiteApiService,
    private meApi: MeApiService,
    private usersApi: UsersApiService,
    private mapper: Gn4PlatformMapper,
    private toolsApiService: ToolsApiService,
    private registriesApiService: RegistriesApiService,
    private langService: LangService,
    private userfeedbackApiService: UserfeedbackApiService
  ) {
    this.me$ = this.meApi.getMe().pipe(
      switchMap((apiUser) => this.mapper.userFromMeApi(apiUser)),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    this.isUserAnonymous$ = this.me$.pipe(
      map((user) => !user || !('id' in user))
    )

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

  getMe(): Observable<UserModel> {
    return this.me$
  }

  isAnonymous(): Observable<boolean> {
    return this.isUserAnonymous$
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
    // if the key is a URI, use the registries API to look for the translation
    if (key.match(/^https?:\/\//)) {
      // the thesaurus URI is inferred by removing a part of the keyword URI
      // this is not exact science but it's OK, we'll still end up loading a bunch of keywords at once anyway
      const thesaurusUri = key.replace(/\/([^/]+)$/, '/')
      return this.getThesaurusByUri(thesaurusUri).pipe(
        map((thesaurus) => {
          for (const item of thesaurus) {
            if (item.key === key) return item.label
          }
          return key
        })
      )
    }
    return this.keyTranslations$.pipe(map((translations) => translations[key]))
  }

  getThesaurusByUri(uri: string): Observable<ThesaurusModel> {
    if (this.thesauri[uri]) {
      return this.thesauri[uri]
    }
    this.thesauri[uri] = this.registriesApiService
      .searchKeywords(
        null,
        this.langService.iso3,
        1000,
        0,
        null,
        null,
        null,
        `${uri}*`
      )
      .pipe(
        map((thesaurus) =>
          this.mapper.thesaurusFromApi(
            thesaurus as any[],
            this.langService.iso3
          )
        ),
        shareReplay(1)
      )

    return this.thesauri[uri]
  }

  getUserFeedbacks(uuid: string): Observable<UserFeedback[]> {
    return this.userfeedbackApiService.getUserComments(uuid).pipe(
      map((userFeedbacks) =>
        userFeedbacks.map(this.mapper.userFeedbacksFromApi)
      ),
      catchError((error) => {
        console.error('Error fetching user feedbacks:', error)
        return of(undefined)
      })
    )
  }

  postUserFeedbacks(userFeedback: UserFeedback): Observable<void> {
    const mappedUserFeedBack = this.mapper.userFeedbacksToApi(userFeedback)
    return this.userfeedbackApiService.newUserFeedback(mappedUserFeedBack).pipe(
      map(() => undefined),
      catchError((error) => {
        console.error('Error posting user feedback:', error)
        return of(undefined)
      })
    )
  }
}
