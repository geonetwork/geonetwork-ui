import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFiltersComponent } from './search-filters.component'
import { MockBuilder } from 'ng-mocks'
import { By } from '@angular/platform-browser'
import { SearchFiltersSummaryComponent } from '@geonetwork-ui/feature/search'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>

  beforeEach(() => {
    return MockBuilder(SearchFiltersComponent).mock(
      SearchFiltersSummaryComponent
    )
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
    fixture = TestBed.createComponent(SearchFiltersComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('searchFields', () => {
    it('should correctly read searchFields and create searchConfig', () => {
      const searchFields = ['user', 'publisherOrg', 'format', 'isSpatial']
      component.searchFields = searchFields
      fixture.detectChanges()
      expect(component.searchConfig).toEqual([
        { fieldName: 'user', title: 'search.filters.user' },
        { fieldName: 'publisherOrg', title: 'search.filters.publisherOrg' },
        { fieldName: 'format', title: 'search.filters.format' },
        { fieldName: 'isSpatial', title: 'search.filters.isSpatial' },
      ])
    })
    it('should read empty searchFields and create empty searchConfig', () => {
      component.searchFields = []
      fixture.detectChanges()
      expect(component.searchConfig).toEqual([])
    })

    it('should pass searchFields to SearchFiltersSummaryComponent', () => {
      const searchFields = ['user', 'publisherOrg', 'format', 'isSpatial']
      component.searchFields = searchFields
      fixture.detectChanges()
      const summaryComponent = fixture.debugElement.query(
        By.directive(SearchFiltersSummaryComponent)
      ).componentInstance
      expect(summaryComponent.searchFields).toEqual(searchFields)
    })
  })
})
