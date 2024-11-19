import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFiltersSummaryComponent } from './search-filters-summary.component'

describe('SearchFiltersSummaryComponent', () => {
  let component: SearchFiltersSummaryComponent
  let fixture: ComponentFixture<SearchFiltersSummaryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersSummaryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchFiltersSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
