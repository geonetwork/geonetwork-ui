import { AuthService, LOGIN_URL } from './auth.service'
import { Subject } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { MeApiService } from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'

let loginUrlTokenMock
const translateServiceMock = {
  currentLang: 'fr',
}
const me$ = new Subject()
const meApiMock = {
  getMe: () => me$,
}

describe('AuthService', () => {
  let service: AuthService
  beforeEach(() => {
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
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(AuthService)
    expect(service).toBeTruthy()
  })

  describe('#authReady', () => {
    it('emits a value on subscribe after auth was queried', () => {
      service = TestBed.inject(AuthService)
      let emitted = false
      service.authReady().subscribe(() => (emitted = true))
      me$.next()
      expect(emitted).toBeTruthy()
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
  describe('#mapToUserModel', () => {
    it('maps to UserModel', () => {
      expect(
        service['mapToUserModel']({
          id: '21737',
          profile: 'Administrator',
          username: 'C2C-gravin',
          name: 'Florent',
          surname: 'Gravin',
          email: 'florent.gravin@camptocamp.com',
          hash: '79efeb7b1f8faa9609b73d9bc89b6417',
          organisation: null,
          admin: true,
          groupsWithRegisteredUser: [],
          groupsWithEditor: [],
          groupsWithReviewer: [],
          groupsWithUserAdmin: [],
        })
      ).toEqual({
        id: '21737',
        profile: 'Administrator',
        username: 'C2C-gravin',
        name: 'Florent',
        surname: 'Gravin',
        email: 'florent.gravin@camptocamp.com',
        organisation: null,
        admin: true,
      })
    })
  })
})
