import { AuthService, LOGIN_URL } from './auth.service'
import { TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MockProvider } from 'ng-mocks'
import { Location } from '@angular/common'

let loginUrlTokenMock
const translateServiceMock = {
  currentLang: 'fr',
}

let windowLocation

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
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        MockProvider(Location, {
          path: () => windowLocation,
        }),
      ],
      imports: [HttpClientTestingModule],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(AuthService)
    expect(service).toBeTruthy()
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
      windowLocation = '/datahub/?org=Abcd&keywords=bla;bla&location'
      loginUrlTokenMock = '${current_url}?login&something=else'
      service = TestBed.inject(AuthService)
    })
    it('should construct a login URL based on the injected value', () => {
      expect(service.loginUrl).toEqual(
        'http://localhost/datahub/?org=Abcd&keywords=bla;bla&location&login&something=else'
      )
    })
  })

  describe('Logout', () => {
    beforeEach(() => {
      service = TestBed.inject(AuthService)
    })
    it('should return the logout url', () => {
      expect(service.logoutUrl).toEqual('/geonetwork/signout')
    })
  })
  describe('Settings', () => {
    beforeEach(() => {
      service = TestBed.inject(AuthService)
    })
    it('should return the logout url', () => {
      expect(service.settingsUrl).toEqual(
        '/geonetwork/srv/fre/admin.console#/organization/users?userOrGroup='
      )
    })
  })
})
