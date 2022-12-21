import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
  EventEmitter,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { SearchFilters } from '@geonetwork-ui/util/shared'
import { BehaviorSubject } from 'rxjs'
import { SearchFiltersComponent } from './search-filters.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'gn-ui-check-toggle',
  template: '<div></div>',
})
export class MockCheckToggleComponent {
  @Input() title: string
  @Input() label: string
  @Input() value: boolean
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Output() toggled = new EventEmitter()
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
describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent
  let fixture: ComponentFixture<SearchFiltersComponent>
  let searchFacade
  let searchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFiltersComponent, MockCheckToggleComponent],
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
      ],
    })
      .overrideComponent(SearchFiltersComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
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
    describe('when panel is opened', () => {
      beforeEach(() => {
        component.isOpen = true
        fixture.detectChanges()
      })
      it('does not show up', () => {
        expect(getMoreButton()).toBeFalsy()
      })
    })
    describe('when panel is closed & a spatial filter is unavailable', () => {
      beforeEach(() => {
        component.isOpen = false
        searchFacade.hasSpatialFilter$.next(false)
        fixture.detectChanges()
      })
      it('is hidden', () => {
        expect(getMoreButton().classes.invisible).toBeTruthy()
      })
    })
    describe('when panel is closed & a spatial filter is available', () => {
      beforeEach(() => {
        component.isOpen = false
        searchFacade.hasSpatialFilter$.next(true)
        fixture.detectChanges()
      })
      it('shows up', () => {
        expect(getMoreButton().classes.invisible).toBeFalsy()
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
          OrgForResource: {},
          format: {},
        })
      })
    })
  })
})
