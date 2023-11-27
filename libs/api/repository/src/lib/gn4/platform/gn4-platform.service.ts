import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'
import {
  MeApiService,
  SiteApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  MeUserModel,
  UserModel,
} from '@geonetwork-ui/common/domain/model/user/user.model'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { Gn4PlatformMapper } from './gn4-platform.mapper'

const minApiVersion = '4.2.0'
@Injectable()
export class Gn4PlatformService implements PlatformServiceInterface {
  private readonly type = 'GeoNetwork'
  private me$: Observable<MeUserModel>
  private users$: Observable<UserModel[]>
  isAnonymous$: Observable<boolean>

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
    private mapper: Gn4PlatformMapper
  ) {
    this.me$ = this.meApi.getMe().pipe(
      map((apiUser) => this.mapper.userFromApi(apiUser)),
      shareReplay({ bufferSize: 1, refCount: true })
    )
    this.isAnonymous$ = this.me$.pipe(map((user) => !user || !('id' in user)))
    this.users$ = this.usersApi.getUsers().pipe(shareReplay())
  }

  getTye(): string {
    return this.type
  }

  getApiVersion(): Observable<string> {
    return this.apiVersion$
  }
  isApiCompatible(): Observable<boolean> {
    return this.isApiCompatible$
  }

  getMe(): Observable<MeUserModel> {
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
