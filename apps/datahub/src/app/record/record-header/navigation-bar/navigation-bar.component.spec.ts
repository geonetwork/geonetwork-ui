import { Location } from '@angular/common'
import { ElementRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { SearchService } from '@geonetwork-ui/feature/search'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NavigationBarComponent } from './navigation-bar.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
  getOptionalSearchConfig() {
    return {
      LIMIT: 10,
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

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent
  let fixture: ComponentFixture<NavigationBarComponent>
  let router: Router

  beforeEach(() => MockBuilder(NavigationBarComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(SearchService, {
          updateFilters: jest.fn(),
        }),
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: Location,
          useValue: locationMock,
        },
        MockProvider(PlatformServiceInterface, {
          supportsAuthentication: jest.fn(() => true),
        }),
      ],
    }).compileComponents()
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent)
    component = fixture.componentInstance
    component.mobileMenuRef = {
      nativeElement: document.createElement('div'),
    } as ElementRef
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('HostListeners', () => {
    describe('onWindowScroll', () => {
      it('should set displayMobileMenu to false', () => {
        component.displayMobileMenu = true
        component.onWindowScroll()
        expect(component.displayMobileMenu).toBe(false)
      })
    })

    describe('onDocumentClick', () => {
      it('should set displayMobileMenu to false if open and click outside', () => {
        component.displayMobileMenu = true
        const event = {
          target: document.createElement('div'),
        } as unknown as MouseEvent
        component.onDocumentClick(event)
        expect(component.displayMobileMenu).toBe(false)
      })

      it('should not set displayMobileMenu to false if click inside menu', () => {
        component.displayMobileMenu = true
        const event = {
          target: component.mobileMenuRef.nativeElement,
        } as MouseEvent
        component.onDocumentClick(event)
        expect(component.displayMobileMenu).toBe(true)
      })

      it('should do nothing if displayMobileMenu is false', () => {
        component.displayMobileMenu = false
        const event = {
          target: document.createElement('div'),
        } as unknown as MouseEvent
        component.onDocumentClick(event)
        expect(component.displayMobileMenu).toBe(false)
      })
    })
  })
  describe('#toggleMobileMenu', () => {
    it('should set displayMobileMenu true', () => {
      component.displayMobileMenu = false
      component.toggleMobileMenu()
      expect(component.displayMobileMenu).toBe(true)
    })
    it('should set displayMobileMenu false', () => {
      component.displayMobileMenu = true
      component.toggleMobileMenu()
      expect(component.displayMobileMenu).toBe(false)
    })
  })

  describe('#back', () => {
    it('should call the back function of Location if previous navigation', () => {
      router.lastSuccessfulNavigation.previousNavigation = {} as any
      component.back()
      expect(locationMock.back).toHaveBeenCalled()
    })

    it('should call the navigateByUrl function of Router to /search if no previous navigation', () => {
      router.lastSuccessfulNavigation.previousNavigation = null
      component.back()
      expect(router.navigateByUrl).toHaveBeenCalledWith('/search')
    })
  })
})
