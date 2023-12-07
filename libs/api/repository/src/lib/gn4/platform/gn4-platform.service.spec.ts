import {
  MeApiService,
  SiteApiService,
  UsersApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TestBed } from '@angular/core/testing'
import { Gn4PlatformService } from './gn4-platform.service'
import { firstValueFrom, of, Subject } from 'rxjs'
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

class MeApiMock {
  getMe() {
    return this._me$
  }

  _me$ = new Subject()
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
  let meApiService: MeApiService

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
    meApiService = TestBed.inject(MeApiService)
  })

  it('creates', () => {
    expect(service).toBeTruthy()
  })

  describe('version', () => {
    describe('when version is lower than 4.2.2', () => {
      beforeEach(() => {
        geonetworkVersion = '4.2.0'
      })
      it('throws an error', async () => {
        let error
        await firstValueFrom(service.getApiVersion()).catch((e) => (error = e))
        expect(error).toEqual(
          new Error(
            'Gn4 API version is not compatible.\nMinimum: 4.2.2\nYour version: 4.2.0'
          )
        )
      })
    })
    describe('when version is euqal or greater than 4.2.2', () => {
      beforeEach(() => {
        geonetworkVersion = '4.2.2'
      })
      it('fetches version from settings', async () => {
        const version = await firstValueFrom(service.getApiVersion())
        expect(version).toEqual('4.2.2')
      })
    })
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
    expect(service.getType()).toEqual('GeoNetwork')
  })
  describe('MeService', () => {
    let me
    beforeEach(() => {
      service.getMe().subscribe((response) => (me = response))
    })
    describe('When user is logged in', () => {
      beforeEach(() => {
        ;(meApiService as any)._me$.next(userMock)
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
        ;(meApiService as any)._me$.next({})
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
