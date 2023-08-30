import { AuthService, LOGIN_URL } from './auth.service'
import { Subject } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { MeApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import { AvatarServiceInterface } from './avatar/avatar.service.interface'

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
let loginUrlTokenMock
const translateServiceMock = {
  currentLang: 'fr',
}
const me$ = new Subject()
const meApiMock = {
  getMe: () => me$,
}
class AvatarServiceInterfaceMock {
  placeholder = 'http://placeholder.com'
  getProfileIcon = jest.fn((hash: string) => `http://icon_service.com/${hash}`)
}

let windowLocation
Object.defineProperties((global as any).window, {
  location: {
    get: () => new URL(windowLocation),
  },
})

describe('AuthService', () => {
  let service: AuthService
  beforeEach(() => {
    windowLocation = 'http://localhost'

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOGIN_URL,
          useFactory: () => loginUrlTokenMock,
        },
        {
          provide: MeApiService,
          useValue: meApiMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(AuthService)
    expect(service).toBeTruthy()
  })

  describe('authentication', () => {
    beforeEach(() => {
      service = TestBed.inject(AuthService)
    })
    describe('#authReady', () => {
      it('emits a value on subscribe after auth was queried', () => {
        let emitted = false
        service.authReady().subscribe(() => (emitted = true))
        me$.next(null)
        expect(emitted).toBeTruthy()
      })
    })
    describe('#isAnonymous', () => {
      it('returns true for anonymous user', () => {
        let isAnonymous = false
        service.isAnonymous$.subscribe((anonymous) => (isAnonymous = anonymous))
        me$.next(null)
        expect(isAnonymous).toBeTruthy()
      })
      it('returns false for authenticated user', () => {
        let isAnonymous = true
        service.isAnonymous$.subscribe((anonymous) => (isAnonymous = anonymous))
        me$.next(userMock)
        expect(isAnonymous).toBeFalsy()
      })
    })
  })
  describe('login URL (default)', () => {
    beforeEach(() => {
      loginUrlTokenMock = undefined
      service = TestBed.inject(AuthService)
    })
    it('should construct a localised GN login URL by default', () => {
      expect(service.loginUrl).toEqual(
        '/geonetwork/srv/fre/catalog.signin?redirect=http://localhost/'
      )
    })
  })
  describe('login URL from config (with lang2 code)', () => {
    beforeEach(() => {
      loginUrlTokenMock = '${lang2}/cas/login?service=${current_url}'
      service = TestBed.inject(AuthService)
    })
    it('should construct a login URL based on the injected value', () => {
      expect(service.loginUrl).toEqual('fr/cas/login?service=http://localhost/')
    })
  })
  describe('login URL from config (starting with current url)', () => {
    beforeEach(() => {
      loginUrlTokenMock = '${current_url}?login'
      service = TestBed.inject(AuthService)
    })
    it('should construct a login URL based on the injected value', () => {
      expect(service.loginUrl).toEqual('http://localhost/?login')
    })
  })
  describe('login URL from config (special georchestra case, appending a query param with existing query params)', () => {
    beforeEach(() => {
      windowLocation =
        'https://my.georchestra/datahub/?org=Abcd&keywords=bla;bla&location'
      loginUrlTokenMock = '${current_url}?login&something=else'
      service = TestBed.inject(AuthService)
    })
    it('should construct a login URL based on the injected value', () => {
      expect(service.loginUrl).toEqual(
        'https://my.georchestra/datahub/?org=Abcd&keywords=bla;bla&location&login&something=else'
      )
    })
  })
  describe('#mapToUserModel', () => {
    it('maps to UserModel', () => {
      expect(service['mapToUserModel'](userMock)).toEqual({
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
  })
})
