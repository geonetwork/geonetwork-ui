import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchResultsErrorComponent } from './search-results-error.component'

describe('SearchResultsErrorComponent', () => {
  let component: SearchResultsErrorComponent
  let fixture: ComponentFixture<SearchResultsErrorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsErrorComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
