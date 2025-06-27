import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBarComponent } from './navigation-bar.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SearchService } from '@geonetwork-ui/feature/search'

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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#back', () => {
    it('searchFilter updateSearch', () => {
      const searchService = TestBed.inject(SearchService)
      component.back()
      expect(searchService.updateFilters).toHaveBeenCalledWith({})
    })
  })

  describe('#toggleMobileNavBar', () => {
    const tpl = {} as any
    let emitSpy

    beforeEach(() => {
      component.navBarTpl = tpl
      emitSpy = jest.spyOn(component.mobileNavBarToggled, 'emit')
    })
    it('should set displayMobileNavBar true and emit the template', () => {
      component.displayMobileNavBar = false
      component.toggleMobileNavBar()
      expect(component.displayMobileNavBar).toBe(true)
      expect(emitSpy).toHaveBeenCalledWith(tpl)
    })
    it('should set displayMobileNavBar false and emit undefined', () => {
      component.displayMobileNavBar = true
      component.toggleMobileNavBar()
      expect(component.displayMobileNavBar).toBe(false)
      expect(emitSpy).toHaveBeenCalledWith(undefined)
    })
  })
})
