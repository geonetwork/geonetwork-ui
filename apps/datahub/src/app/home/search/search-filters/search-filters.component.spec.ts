import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FieldsService,
  FilterDropdownComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import {
  AggregationsOrderEnum,
  AggregationsTypesEnum,
  SearchFilters,
} from '@geonetwork-ui/util/shared'
import { BehaviorSubject } from 'rxjs'
import { SearchFiltersComponent } from './search-filters.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-check-toggle', // eslint-disable-line
  template: '<div></div>',
})
export class MockCheckToggleComponent {
  @Input() title: string
  @Input() label: string
  @Input() value: boolean
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Output() toggled = new EventEmitter()
}
@Component({
  selector: 'gn-ui-filter-dropdown', // eslint-disable-line
  template: '<div></div>',
  providers: [
    // this is needed to make the ViewChildren in the main component work
    // see: https://indepth.dev/posts/1184/angular-unit-testing-viewchild
    {
      provide: FilterDropdownComponent,
      useExisting: MockFilterDropdownComponent,
    },
  ],
})
export class MockFilterDropdownComponent {
  @Input() fieldName: string
  @Input() title: string
  @Input() order: AggregationsOrderEnum = AggregationsOrderEnum.ASC
  @Input() aggregationType: AggregationsTypesEnum = AggregationsTypesEnum.TERMS
}
const state = { OrgForResource: { mel: true } } as SearchFilters
class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject(state)
  hasSpatialFilter$ = new BehaviorSubject(false)
  spatialFilterEnabled$ = new BehaviorSubject(false)
  setSpatialFilterEnabled = jest.fn()
}
class SearchServiceMock {
  updateFilters = jest.fn()
}

class FieldsServiceMock {
  getFiltersForValues = jest.fn((fieldName, values) => ({
    ['filter_' + fieldName]: {},
  }))
}

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>
  let searchFacade
  let searchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchFiltersComponent,
        MockCheckToggleComponent,
        MockFilterDropdownComponent,
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
        {
          provide: FieldsService,
          useClass: FieldsServiceMock,
        },
      ],
    })
      .overrideComponent(SearchFiltersComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    searchFacade = TestBed.inject(SearchFacade)
    searchService = TestBed.inject(SearchService)
    fixture = TestBed.createComponent(SearchFiltersComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('spatial filter button', () => {
    function getCheckToggleDebugElement() {
      return fixture.debugElement.query(By.directive(MockCheckToggleComponent))
    }

    describe('when panel is closed', () => {
      beforeEach(() => {
        component.isOpen = false
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getCheckToggleDebugElement()).toBeFalsy()
      })
    })
    describe('when panel is opened & a spatial filter is unavailable', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(false)
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getCheckToggleDebugElement()).toBeFalsy()
      })
    })
    describe('when panel is opened & a spatial filter is available', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(true)
        searchFacade.spatialFilterEnabled$.next(true)
        fixture.detectChanges()
      })
      it('does show up', () => {
        expect(getCheckToggleDebugElement()).toBeTruthy()
      })
      it('has the value set in the state', () => {
        expect(
          getCheckToggleDebugElement().componentInstance.value
        ).toBeTruthy()
      })
    })
    describe('when clicked', () => {
      beforeEach(() => {
        component.isOpen = true
        searchFacade.hasSpatialFilter$.next(true)
        fixture.detectChanges()
      })
      it('emits a SetSpatialFilterEnabled action', () => {
        const checkToggleComponent =
          getCheckToggleDebugElement().componentInstance
        checkToggleComponent.toggled.emit(false)
        expect(searchFacade.setSpatialFilterEnabled).toHaveBeenCalledWith(false)
      })
    })
  })
  describe('advanced search button (more)', () => {
    function getMoreButton(): DebugElement {
      return fixture.debugElement.query(By.css('gn-ui-button'))
    }
    function getFilterButtons(): DebugElement[] {
      return fixture.debugElement.queryAll(
        By.directive(MockFilterDropdownComponent)
      )
    }
    describe('when panel is closed', () => {
      beforeEach(() => {
        component.isOpen = false
        fixture.detectChanges()
      })
      it('does show up', () => {
        expect(getMoreButton()).toBeTruthy()
      })
      it('first filter dropdown shows up (on desktop)', () => {
        expect(
          getFilterButtons()[0].nativeElement.classList.entries('sm:block')
        ).toBeTruthy()
      })
      it('second filter dropdown shows up (on desktop)', () => {
        expect(
          getFilterButtons()[1].nativeElement.classList.contains('sm:block')
        ).toBeTruthy()
      })
      it('third filter dropdown does not show up (on desktop)', () => {
        expect(
          getFilterButtons()[2].nativeElement.classList.contains('sm:block')
        ).toBeFalsy()
      })
    })
    describe('when panel is opened', () => {
      beforeEach(() => {
        component.isOpen = true
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getMoreButton()).toBeFalsy()
      })
      it('first filter dropdown shows up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[0].nativeElement.classList.entries('block')
        ).toBeTruthy()
      })
      it('second filter dropdown shows up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[1].nativeElement.classList.contains('block')
        ).toBeTruthy()
      })
      it('third filter dropdown does not show up (on desktop and mobile)', () => {
        expect(
          getFilterButtons()[2].nativeElement.classList.contains('block')
        ).toBeTruthy()
      })
    })
  })
  describe('clear button', () => {
    const getClearBtn = () => fixture.debugElement.query(By.css('.clear-btn'))
    beforeEach(() => {
      component.isOpen = true
      fixture.detectChanges()
    })
    it('shows up', () => {
      expect(getClearBtn()).toBeTruthy()
    })
    describe('when clicked', () => {
      beforeEach(() => {
        getClearBtn().nativeElement.click()
      })
      it('clear OrgForResource & format', () => {
        expect(searchService.updateFilters).toHaveBeenCalledWith({
          filter_format: {},
          filter_publicationYear: {},
          filter_isSpatial: {},
          filter_publisher: {},
          filter_topic: {},
          filter_license: {},
          filter_documentStandard: {},
          filter_inspireKeyword: {},
        })
      })
    })
  })
})
