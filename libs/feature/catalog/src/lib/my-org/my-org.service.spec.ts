import { TestBed } from '@angular/core/testing'
import { MyOrgService } from './my-org.service'
import { AuthService } from '@geonetwork-ui/api/repository/gn4'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { UserApiModel } from '@geonetwork-ui/data-access/gn4'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateService } from '@ngx-translate/core'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository/gn4'

const translateServiceMock = {
  currentLang: 'fr',
}

class AvatarServiceInterfaceMock {
  placeholder = 'http://placeholder.com'
  getProfileIcon = (hash: string) => `${hash}`
}

const orgs = [
  { name: 'Géo2France', logoUrl: { href: 'logo-url' }, recordCount: 10 },
]
const orgs$ = of(orgs)

class orgServiceMock {
  organisations$ = orgs$
}

describe('MyOrgService', () => {
  let myOrgService: MyOrgService
  let authService: AuthService
  let orgService: OrganizationsServiceInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyOrgService,
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
        { provide: OrganizationsServiceInterface, useClass: orgServiceMock },
        AuthService,
      ],
      imports: [HttpClientTestingModule],
    })
    myOrgService = TestBed.inject(MyOrgService)
    authService = TestBed.inject(AuthService)
    orgService = TestBed.inject(OrganizationsServiceInterface)
  })

  it('should be created', () => {
    expect(myOrgService).toBeTruthy()
  })

  it('should update myOrgDataSubject when authService user$ emits a user', () => {
    const userSubject = new BehaviorSubject<UserModel | null>(null)
    const user: UserModel = {
      organisation: 'Géo2France',
      id: '2',
      profile: 'profile',
      username: 'username',
      name: 'name',
      surname: 'surname',
      email: 'email@email',
      profileIcon: 'icon.com',
    }
    authService.user$ = userSubject.asObservable()

    userSubject.next(user)

    myOrgService.myOrgData$.subscribe((data) => {
      expect(data.orgName).toEqual('Géo2France')
    })
  })

  it('should update myOrgDataSubject when orgService organisations$ emits organizations', () => {
    const orgsSubject = new BehaviorSubject<any[]>([])
    const orgs = [
      { name: 'Géo2France', logoUrl: { href: 'logo-url' }, recordCount: 10 },
    ]
    orgService.organisations$ = orgsSubject.asObservable()

    orgsSubject.next(orgs)

    myOrgService.myOrgData$.subscribe((data) => {
      expect(data.orgName).toEqual('Géo2France')
      expect(data.logoUrl).toEqual('logo-url')
      expect(data.recordCount).toEqual(10)
    })
  })

  it('should update myOrgDataSubject when authService allUsers$ emits users', () => {
    const allUsersSubject = new BehaviorSubject<UserApiModel[]>([])
    const users: UserApiModel[] = [
      { organisation: 'Géo2France' },
      { organisation: 'Géo2France' },
    ]
    authService.allUsers$ = allUsersSubject.asObservable()

    allUsersSubject.next(users)

    myOrgService.myOrgData$.subscribe((data) => {
      expect(data.orgName).toEqual('Géo2France')
      expect(data.userList.length).toEqual(2)
    })
  })
})
