import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchFiltersSummaryItemComponent } from './search-filters-summary-item.component'

describe('SearchFiltersSummaryComponent', () => {
  let component: SearchFiltersSummaryItemComponent
  let fixture: ComponentFixture<SearchFiltersSummaryItemComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchFiltersSummaryItemComponent],
    })
    fixture = TestBed.createComponent(SearchFiltersSummaryItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
