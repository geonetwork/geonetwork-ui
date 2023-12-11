import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'
import {
  MeApiService,
  SiteApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'
import { ltr } from 'semver'

const minApiVersion = '4.2.2'
@Injectable()
export class Gn4PlatformService implements PlatformServiceInterface {
  private readonly type = 'GeoNetwork'
  private me$: Observable<UserModel>
  private users$: Observable<UserModel[]>
  private isAnonymous$: Observable<boolean>

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

  constructor(
    private siteApiService: SiteApiService,
    private meApi: MeApiService,
    private usersApi: UsersApiService,
    private mapper: Gn4PlatformMapper
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
}
