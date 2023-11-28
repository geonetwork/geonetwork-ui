import {
  MeApiService,
  SiteApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TestBed } from '@angular/core/testing'
import { Gn4PlatformService } from './gn4-platform.service'
import { firstValueFrom, lastValueFrom, of, Subject } from 'rxjs'
import { AvatarServiceInterface } from '../auth/avatar.service.interface'
import { Gn4PlatformMapper } from './gn4-platform.mapper'

let geonetworkVersion: string

const userMock = {
  id: '21737',
  profile: 'Administrator',
  username: 'C2C-gravin',
  name: 'Florent',
  surname: 'Gravin',
  email: 'florent.gravin@camptocamp.com',
  hash: 'girafe',
  organisation: null,
  admin: true,
  groupsWithRegisteredUser: [],
  groupsWithEditor: [],
  groupsWithReviewer: [],
  groupsWithUserAdmin: [],
}

const me$ = new Subject()
class MeApiMock {
  getMe() {
    return me$
  }
}

class AvatarServiceInterfaceMock {
  placeholder = 'http://placeholder.com'
  getProfileIcon = jest.fn((hash: string) => `http://icon_service.com/${hash}`)
}

class SiteApiServiceMock {
  getSiteOrPortalDescription = jest.fn(() =>
    of({
      'system/platform/version': geonetworkVersion,
    })
  )
}
class UsersApiServiceMock {
  getUsers() {
    return of([
      {
        username: 'ken',
        email: 'ken@sf2.com',
        id: 1,
      },
      {
        username: 'ryu',
        email: 'ryu@sf2.com',
        id: 2,
      },
    ])
  }
}

describe('Gn4PlatformService', () => {
  let service: Gn4PlatformService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Gn4PlatformService,
        Gn4PlatformMapper,
        {
          provide: SiteApiService,
          useClass: SiteApiServiceMock,
        },
        {
          provide: UsersApiService,
          useClass: UsersApiServiceMock,
        },
        {
          provide: MeApiService,
          useClass: MeApiMock,
        },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
      ],
    })
    service = TestBed.inject(Gn4PlatformService)
  })

  it('creates', () => {
    expect(service).toBeTruthy()
  })

  it('fetches version from settings', async () => {
    geonetworkVersion = '4.2.0'
    const version = await firstValueFrom(service.getApiVersion())
    expect(version).toEqual('4.2.0')
  })
  it('fetches users from api', async () => {
    const users = await firstValueFrom(service.getUsers())
    expect(users).toEqual([
      {
        username: 'ken',
        email: 'ken@sf2.com',
        id: '1',
      },
      {
        username: 'ryu',
        email: 'ryu@sf2.com',
        id: '2',
      },
    ])
  })
  it('is of type GeoNetwork', async () => {
    expect(service.getTye()).toEqual('GeoNetwork')
  })
  describe('MeService', () => {
    let me
    beforeEach(() => {
      service.getMe().subscribe((response) => (me = response))
    })
    describe('When user is logged in', () => {
      beforeEach(() => {
        me$.next(userMock)
      })
      it('returns mapped user ', async () => {
        expect(me).toEqual({
          id: '21737',
          profile: 'Administrator',
          username: 'C2C-gravin',
          name: 'Florent',
          surname: 'Gravin',
          email: 'florent.gravin@camptocamp.com',
          profileIcon: 'http://icon_service.com/girafe',
          organisation: null,
        })
      })
      it('is not anonymous ', async () => {
        const isAnonymous = await firstValueFrom(service.isAnonymous())
        expect(isAnonymous).toBe(false)
      })
    })
    describe('When no user is logged in', () => {
      beforeEach(() => {
        me$.next({})
      })
      it('returns no user ', async () => {
        const me = await firstValueFrom(service.getMe())
        expect(me).toEqual({ profileIcon: 'http://icon_service.com/undefined' })
      })
      it('is anonymous ', async () => {
        const isAnonymous = await firstValueFrom(service.isAnonymous())
        expect(isAnonymous).toBe(true)
      })
    })
  })
})
