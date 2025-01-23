import { AuthGuardService } from './auth-guard.service'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { AuthService } from '@geonetwork-ui/api/repository'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

/* FIXME: this is commented out because we don't currently have a way to test
    that `window.location.assign` is indeed called by the service; this is a limitation of jsdom, see:
    https://github.com/jsdom/jsdom/issues/3492
    Note: this is covered by E2E tests */
describe.skip('AuthGuardService', () => {
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
        MockProvider(PlatformServiceInterface, { isAnonymous: () => of(true) }),
      ],
    })
    // window.location.href = 'http://original.path'
    service = TestBed.inject(AuthGuardService)
    jest.spyOn(window.location, 'assign')
  })

  it('returns true if the user is logged in', async () => {
    jest
      .spyOn(TestBed.inject(PlatformServiceInterface), 'isAnonymous')
      .mockReturnValue(of(false))
    expect(await service.canActivate()).toBe(true)
    expect(window.location.assign).not.toHaveBeenCalled()
  })
  it('redirects the user to the login page if the user is not logged in', async () => {
    expect(await service.canActivate()).toBe(false)
    expect(window.location.assign).toHaveBeenCalledWith('http://login.com/bla?')
  })
})
