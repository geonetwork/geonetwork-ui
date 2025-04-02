import { NO_ERRORS_SCHEMA } from '@angular/core'
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
      schemas: [NO_ERRORS_SCHEMA],
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
})
