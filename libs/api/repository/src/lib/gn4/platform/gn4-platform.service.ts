import { Injectable } from '@angular/core'
import { Observable, combineLatest, of, switchMap } from 'rxjs'
import { catchError, map, shareReplay, tap } from 'rxjs/operators'
import {
  MeApiService,
  RegistriesApiService,
  SiteApiService,
  ThesaurusInfoApiModel,
  ToolsApiService,
  UserfeedbackApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import {
  Keyword,
  Organization,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { ltr } from 'semver'
import { LangService } from '@geonetwork-ui/util/i18n'
import { HttpClient } from '@angular/common/http'

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
  private keyword: Record<string, Observable<Keyword[]>> = {}

  constructor(
    private siteApiService: SiteApiService,
    private meApi: MeApiService,
    private usersApi: UsersApiService,
    private mapper: Gn4PlatformMapper,
    private toolsApiService: ToolsApiService,
    private registriesApiService: RegistriesApiService,
    private langService: LangService,
    private userfeedbackApiService: UserfeedbackApiService,
    private httpClient: HttpClient
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
      return this.getKeywordsByUri(thesaurusUri).pipe(
        map((thesaurus) => {
          for (const item of thesaurus) {
            if (item.thesaurusKey === key) return item.label
          }
          return key
        })
      )
    }
    return this.keyTranslations$.pipe(map((translations) => translations[key]))
  }

  getAllThesaurus(): Observable<ThesaurusInfoApiModel[]> {
    return this.httpClient
      .get(
        `${this.registriesApiService.configuration.basePath}/thesaurus?_content_type=json`
      )
      .pipe(
        map((thesaurus) => {
          thesaurus[0].filter((thes) => thes.dname !== 'place')
          return thesaurus[0] as any[]
        })
      )
  }

  getKeywordsFromThesaurus(
    thesaurusId: string,
    query: string
  ): Observable<Keyword[]> {
    const keywords$ = this.registriesApiService
      .searchKeywords(
        query,
        this.langService.iso3,
        10,
        0,
        null,
        null,
        null,
        `*${query}*`
      )
      .pipe(
        map((thesaurus) => {
          return this.mapper.keywordsFromApi(
            thesaurus as any[],
            this.langService.iso3
          )
        })
      )

    return combineLatest([keywords$, this.getAllThesaurus()]).pipe(
      map(([keywords, thesaurus]) => {
        return keywords
          .map((keyword) => {
            const matchedThesaurus = thesaurus.find(
              (thes) => keyword.thesaurusKey === thes.key
            )
            return {
              ...keyword,
              thesaurus: {
                id: matchedThesaurus?.key,
                name: matchedThesaurus?.title,
                url: new URL(matchedThesaurus?.url),
                dname: matchedThesaurus?.dname,
              },
            }
          })
          .filter((keyword) => keyword.thesaurus.dname !== 'place')
      })
    )
  }
  getKeywordsByUri(uri: string): Observable<Keyword[]> {
    if (this.keyword[uri]) {
      return this.keyword[uri]
    }
    this.keyword[uri] = this.registriesApiService
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
          this.mapper.keywordsFromApi(thesaurus as any[], this.langService.iso3)
        ),
        shareReplay(1)
      )

    return this.keyword[uri]
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
