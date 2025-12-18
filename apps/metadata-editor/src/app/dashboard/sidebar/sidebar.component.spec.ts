import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/api/repository'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { MockBuilder, MockProvider, MockProviders } from 'ng-mocks'
import { SidebarComponent } from './sidebar.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import fetchMock from 'fetch-mock-jest'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>
  let service: AuthService

  beforeEach(() => {
    fetchMock.reset()
  })

  beforeEach(() => {
    return MockBuilder(SidebarComponent)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
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
      fetchMock.get('http://logout.com/bla?', () => ({
        ok: true,
      }))

      const originalUrl = window.origin

      await component.logOut()

      expect(fetchMock.called('http://logout.com/bla?')).toBe(true)
      expect(window.location.href.slice(0, -1)).toBe(originalUrl)
    })
  })
})
