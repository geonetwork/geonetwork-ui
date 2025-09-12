import { Location } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { someOrganizationsFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { OrganizationHeaderComponent } from './organization-header.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
}))

const routerMock: Partial<Router> = {
  lastSuccessfulNavigation: {
    previousNavigation: null,
  } as any,
  navigateByUrl: jest.fn(),
}
const locationMock: Partial<Location> = {
  back: jest.fn(),
}

describe('OrganizationHeaderComponent', () => {
  let component: OrganizationHeaderComponent
  let fixture: ComponentFixture<OrganizationHeaderComponent>
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: Location,
          useValue: locationMock,
        },
      ],
    }).compileComponents()
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHeaderComponent)
    component = fixture.componentInstance
    component.organization = someOrganizationsFixture()[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#back', () => {
    it('should call the back function of Location if previous navigation', () => {
      router.lastSuccessfulNavigation.previousNavigation = {} as any
      component.back()
      expect(locationMock.back).toHaveBeenCalled()
    })

    it('should call the navigateByUrl function of Router to /organisations if no previous navigation', () => {
      router.lastSuccessfulNavigation.previousNavigation = null
      component.back()
      expect(router.navigateByUrl).toHaveBeenCalledWith('/organisations')
    })
  })
})
