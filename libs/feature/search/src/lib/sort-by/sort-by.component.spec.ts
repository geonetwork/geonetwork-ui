import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '../state/search.facade'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { SearchService } from '../utils/service/search.service'
import { SortByComponent } from './sort-by.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

const sortBySubject = new BehaviorSubject(['asc', 'title'])
class FacadeMock {
  sortBy$ = sortBySubject
  setSortBy = jest.fn()
}

class SearchServiceMock {
  updateSearchFilters = jest.fn()
  setSortBy = jest.fn()
}

describe('SortByComponent', () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSelectorComponent, TranslateDirective, TranslatePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideI18n(),
        {
          provide: SearchFacade,
          useClass: FacadeMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    }).compileComponents()
    searchService = TestBed.inject(SearchService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('dropwdown value', () => {
    let dropDownComponent: DropdownSelectorComponent
    beforeEach(() => {
      dropDownComponent = fixture.debugElement.query(
        By.directive(DropdownSelectorComponent)
      ).componentInstance
    })
    it('choices from component', () => {
      expect(dropDownComponent.choices).toEqual(component.choices)
    })
    it('initialized with state value (stringified)', () => {
      expect(dropDownComponent.selected).toEqual(['asc', 'title'])
    })
    it('updated from state', () => {
      sortBySubject.next(['desc', '_score'])
      fixture.detectChanges()
      expect(dropDownComponent.selected).toEqual(['desc', '_score'])
    })
  })
  describe('#changeSortBy', () => {
    let sort
    beforeEach(() => {
      sort = ['desc', '_score']
      component.changeSortBy(['desc', '_score']) // criteria is stringified when going through the dropdown component
    })
    it('dispatch search action', () => {
      expect(searchService.setSortBy).toHaveBeenCalledWith(sort)
    })
  })
})
