import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBarComponent } from './navigation-bar.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SearchService } from '@geonetwork-ui/feature/search'
import { ElementRef } from '@angular/core'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
}))

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent
  let fixture: ComponentFixture<NavigationBarComponent>

  beforeEach(() => MockBuilder(NavigationBarComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(SearchService, {
          updateFilters: jest.fn(),
        }),
      ],
    }).compileComponents()
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
    it('searchFilter updateSearch', () => {
      const searchService = TestBed.inject(SearchService)
      component.back()
      expect(searchService.updateFilters).toHaveBeenCalledWith({})
    })
  })
})
