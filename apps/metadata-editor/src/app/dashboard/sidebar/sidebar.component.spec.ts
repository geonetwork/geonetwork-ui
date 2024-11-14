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

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>
  let service: AuthService

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
        MockProviders(
          PlatformServiceInterface,
          AvatarServiceInterface,
          OrganizationsServiceInterface
        ),
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

      delete window.location
      Object.defineProperty(window, 'location', {
        value: { href: 'http://app-url.com' },
        writable: true,
      })

      await component.logOut()

      expect(window.fetch).toHaveBeenCalledWith(service.logoutUrl, {
        method: 'GET',
      })
      expect(window.location.href).toBe('http://localhost:4200')
    })
  })
})
