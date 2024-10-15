import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFiltersComponent } from './search-filters.component'
import { MockBuilder } from 'ng-mocks'

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>

  beforeEach(() => {
    return MockBuilder(SearchFiltersComponent)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
