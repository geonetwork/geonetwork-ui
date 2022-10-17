import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { BehaviorSubject } from 'rxjs'
import { SearchSummaryComponent } from './search-summary.component'
import { TranslateModule } from '@ngx-translate/core'

const state = { OrgForResource: { mel: true } } as SearchFilters
const searchFacadeMock = {
  searchFilters$: new BehaviorSubject(state),
}
const searchServiceMock = {
  updateSearch: jest.fn(),
}
describe('SearchSummaryComponent', () => {
  let component: SearchSummaryComponent
  let fixture: ComponentFixture<SearchSummaryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSummaryComponent],
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
      .overrideComponent(SearchSummaryComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
