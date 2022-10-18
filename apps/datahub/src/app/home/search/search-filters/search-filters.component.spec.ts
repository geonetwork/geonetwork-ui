import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { BehaviorSubject } from 'rxjs'
import { SearchFiltersComponent } from './search-filters.component'
import { TranslateModule } from '@ngx-translate/core'

const state = { OrgForResource: { mel: true } } as SearchFilters
const searchFacadeMock = {
  searchFilters$: new BehaviorSubject(state),
}
const searchServiceMock = {
  updateSearch: jest.fn(),
}
describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFiltersComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeMock,
        },
        {
          provide: SearchService,
          useValue: searchServiceMock,
        },
      ],
    })
      .overrideComponent(SearchFiltersComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
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
