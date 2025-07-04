import { Injectable } from '@angular/core'
import {
  catchError,
  filter,
  map,
  mergeMap,
  shareReplay,
  tap,
} from 'rxjs/operators'
import {
  MeApiService,
  RecordsApiService,
  RegistriesApiService,
  SiteApiService,
  ToolsApiService,
  UserfeedbackApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import {
  PlatformServiceInterface,
  UploadEvent,
} from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import {
  CatalogRecord,
  Keyword,
  Organization,
  UserFeedback,
} from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { ltr } from 'semver'
import { HttpClient, HttpEventType } from '@angular/common/http'
import {
  KeywordApiResponse,
  ThesaurusApiResponse,
} from '@geonetwork-ui/api/metadata-converter'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'
import { noDuplicateFileName } from '@geonetwork-ui/util/shared'
import {
  combineLatest,
  forkJoin,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { getLang3FromLang2 } from '@geonetwork-ui/util/i18n'

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

  private readonly allowEditHarvestedMd$ = this.settings$.pipe(
    map((info) => {
      return info['system/harvester/enableEditing'] as boolean
    }),
    shareReplay(1)
  )

  /**
   * A map of already loaded thesauri (groups of keywords); the key is a URI
   * @private
   */
  private keywordsByThesauri: Record<string, Observable<Keyword[]>> = {}

  private get lang3() {
    return getLang3FromLang2(this.translateService.currentLang)
  }

  constructor(
    private siteApiService: SiteApiService,
    private meApi: MeApiService,
    private usersApi: UsersApiService,
    private mapper: Gn4PlatformMapper,
    private toolsApiService: ToolsApiService,
    private registriesApiService: RegistriesApiService,
    private translateService: TranslateService,
    private userfeedbackApiService: UserfeedbackApiService,
    private httpClient: HttpClient,
    private recordsApiService: RecordsApiService
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

  getAllowEditHarvestedMd(): Observable<boolean> {
    return this.allowEditHarvestedMd$
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
            if (item.key === key) return item.label
          }
          return key
        })
      )
    }
    return this.keyTranslations$.pipe(map((translations) => translations[key]))
  }

  private allThesaurus$ = this.httpClient
    .get(
      `${this.registriesApiService.configuration.basePath}/thesaurus?_content_type=json`
    )
    .pipe(
      map((thesaurus) => {
        return thesaurus[0] as ThesaurusApiResponse[]
      }),
      shareReplay(1)
    )

  searchKeywords(
    query: string,
    keywordTypes: KeywordType[]
  ): Observable<Keyword[]> {
    const keywords$: Observable<KeywordApiResponse[]> = this.allThesaurus$.pipe(
      switchMap((thesaurus) => {
        const selectedThesauri = []
        keywordTypes.map((keywordType) => {
          selectedThesauri.push(
            ...thesaurus.filter((thes) => thes.dname === keywordType)
          )
        })

        return this.registriesApiService.searchKeywords(
          query,
          this.lang3,
          10,
          0,
          null,
          selectedThesauri.map((thes) => thes.key),
          null,
          `*${query}*`
        ) as Observable<KeywordApiResponse[]>
      })
    )

    return combineLatest([keywords$, this.allThesaurus$]).pipe(
      map(([keywords, thesaurus]) => {
        return this.mapper.keywordsFromApi(keywords, thesaurus, this.lang3)
      })
    )
  }

  getKeywordsByUri(uri: string): Observable<Keyword[]> {
    if (this.keywordsByThesauri[uri]) {
      return this.keywordsByThesauri[uri]
    }
    const keywords$ = this.registriesApiService.searchKeywords(
      null,
      this.lang3,
      1000,
      0,
      null,
      null,
      null,
      `${uri}*`
    ) as Observable<KeywordApiResponse[]>

    this.keywordsByThesauri[uri] = combineLatest([
      keywords$,
      this.allThesaurus$,
    ]).pipe(
      map(([keywords, thesaurus]) => {
        return this.mapper.keywordsFromApi(keywords, thesaurus, this.lang3)
      }),
      shareReplay(1)
    )

    return this.keywordsByThesauri[uri]
  }

  searchKeywordsInThesaurus(query: string, thesaurusId: string) {
    return this.allThesaurus$.pipe(
      switchMap((thesauri) => {
        const strippedThesaurusId = thesaurusId.replace(
          'geonetwork.thesaurus.',
          ''
        )
        if (!thesauri.find((thes) => thes.key === strippedThesaurusId))
          return of([])
        return this.registriesApiService
          .searchKeywords(
            query,
            this.lang3,
            100,
            0,
            null,
            [strippedThesaurusId],
            null
          )
          .pipe(
            map((keywords: KeywordApiResponse[]) =>
              this.mapper.keywordsFromApi(keywords, thesauri, this.lang3)
            )
          )
      })
    )
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

  getRecordAttachments(recordUuid: string) {
    return this.recordsApiService.getAllResources(recordUuid).pipe(
      map((resources) =>
        resources.map((r) => ({
          url: new URL(r.url),
          fileName: r.filename,
        }))
      )
    )
  }

  cleanRecordAttachments(record: CatalogRecord): Observable<void> {
    return combineLatest([
      this.recordsApiService.getAssociatedResources(record.uniqueIdentifier),
      this.recordsApiService.getAllResources(record.uniqueIdentifier),
    ]).pipe(
      map(([associated, attachments]) => {
        const { onlines = [], thumbnails = [] } = associated

        const urlsToKeep = [
          ...(Array.isArray(onlines) ? onlines : []),
          ...(Array.isArray(thumbnails) ? thumbnails : []),
        ].map((resource) => Object.values(resource.url)[0])

        const fileToDelete = attachments
          .filter((attachment) => !urlsToKeep.includes(attachment.url))
          .map((attachment) => attachment.filename)

        return fileToDelete
      }),
      mergeMap((filesToDelete) =>
        filesToDelete.length
          ? forkJoin(
              filesToDelete.map((filename) =>
                this.recordsApiService.delResource(
                  record.uniqueIdentifier,
                  filename
                )
              )
            ).pipe(map(() => undefined))
          : of(undefined)
      ),
      catchError((error) => {
        console.error('Error while cleaning attachments:', error)
        throw error
      })
    )
  }

  private uploadFile(recordUuid: string, file: File): Observable<UploadEvent> {
    let sizeBytes = -1
    return this.recordsApiService
      .putResource(recordUuid, file, 'public', undefined, 'events', true)
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            sizeBytes = event.total
            return {
              type: 'progress',
              progress: event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0,
            } as UploadEvent
          }
          if (event.type === HttpEventType.Response) {
            return {
              type: 'success',
              attachment: {
                url: new URL(event.body.url),
                fileName: event.body.filename,
              },
              sizeBytes,
            } as UploadEvent
          }
          return undefined
        }),
        filter((event) => !!event),
        catchError((error) => {
          return throwError(
            () => new Error(error.error?.message ?? error.message)
          )
        })
      )
  }

  attachFileToRecord(
    recordUuid: string,
    file: File,
    removeDuplicate = false
  ): Observable<UploadEvent> {
    return this.getRecordAttachments(recordUuid).pipe(
      map((recordAttachments) => recordAttachments.map((r) => r.fileName)),
      switchMap((fileNames) => {
        const fileName = file.name

        if (removeDuplicate && fileNames.includes(file.name)) {
          return this.recordsApiService.delResource(recordUuid, fileName).pipe(
            switchMap(() => {
              const fileCopy = new File([file], fileName, { type: file.type })
              return this.uploadFile(recordUuid, fileCopy)
            })
          )
        } else {
          const finalFileName = noDuplicateFileName(fileName, fileNames)
          const fileCopy = new File([file], finalFileName, { type: file.type })
          return this.uploadFile(recordUuid, fileCopy)
        }
      })
    )
  }
}
