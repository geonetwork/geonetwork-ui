import { Injectable } from '@angular/core'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { combineLatest, map, Observable } from 'rxjs'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class MyOrgService {
  myOrgData$: Observable<{
    orgName: string
    logoUrl: string
    recordCount: number
    userCount: number
    userList: UserModel[]
  }>

  constructor(
    private platformService: PlatformServiceInterface,
    private orgService: OrganizationsServiceInterface
  ) {
    this.myOrgData$ = combineLatest([
      this.platformService.getMe(),
      this.platformService.getUsers(),
      this.orgService.organisations$,
    ]).pipe(
      map(([user, allUsers, orgs]) => {
        const orgName = user.organisation
        const org = orgs.find((org) => org.name === orgName)
        const logoUrl = org?.logoUrl?.toString()
        const recordCount = org?.recordCount
        const userList = allUsers.filter(
          (user) => user.organisation === orgName
        )
        const userCount = userList.length
        return {
          orgName,
          logoUrl,
          recordCount,
          userList,
          userCount,
        }
      }),
      shareReplay(1)
    )
  }
}
