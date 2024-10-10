import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFiltersComponent } from './search-filters.component'

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SearchFiltersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
