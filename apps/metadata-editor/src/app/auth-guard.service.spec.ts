import { AuthGuardService } from './auth-guard.service'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { AuthService } from '@geonetwork-ui/api/repository'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

Object.defineProperty(window, 'location', {
  value: new URL('http://localhost'),
})

describe('AuthGuardService', () => {
  let service: AuthGuardService
  beforeEach(() => {
    return MockBuilder(AuthGuardService)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthService, {
          loginUrl: 'http://login.com/bla?',
        }),
        MockProvider(PlatformServiceInterface, {
          isAnonymous: () => of(true),
        }),
      ],
    })
    window.location.href = 'http://original.path'
    service = TestBed.inject(AuthGuardService)
  })

  it('returns true if the user is logged in', async () => {
    jest
      .spyOn(TestBed.inject(PlatformServiceInterface), 'isAnonymous')
      .mockReturnValue(of(false))
    expect(await service.canActivate()).toBe(true)
    expect(window.location.href).toBe('http://original.path/')
  })
  it('redirects the user to the login page if the user is not logged in', async () => {
    expect(await service.canActivate()).toBe(false)
    expect(window.location.href).toBe('http://login.com/bla?')
  })
})
