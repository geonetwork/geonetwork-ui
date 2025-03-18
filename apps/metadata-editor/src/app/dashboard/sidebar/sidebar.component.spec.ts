import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/api/repository'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateModule } from '@ngx-translate/core'
import { MockBuilder, MockProvider, MockProviders } from 'ng-mocks'
import { SidebarComponent } from './sidebar.component'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>
  let service: AuthService

  class OrganizationsServiceInterfaceMock {
    organisations$ = of(someOrganizationsFixture())
    getOrganisations() {
      return this.organisations$
    }
  }
  beforeEach(() => {
    return MockBuilder(SidebarComponent)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        MockProviders(PlatformServiceInterface, AvatarServiceInterface),
        MockProvider(OrganizationsServiceInterface, {
          getOrganisations: jest
            .fn()
            .mockImplementation(() => of(someOrganizationsFixture())),
        }),
        MockProvider(AuthService, {
          logoutUrl: 'http://logout.com/bla?',
        }),
      ],
    }).compileComponents()

    service = TestBed.inject(AuthService)
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('logOut', () => {
    it('should log out', async () => {
      jest.spyOn(window, 'fetch').mockResolvedValue({
        ok: true,
      } as Response)

      const originalUrl = window.origin

      await component.logOut()

      expect(window.fetch).toHaveBeenCalledWith(service.logoutUrl, {
        method: 'GET',
      })
      expect(window.location.href.slice(0, -1)).toBe(originalUrl)
    })
  })
})
