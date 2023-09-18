import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { FieldsService } from '../utils/service/fields.service'
import { SearchService } from '../utils/service/search.service'
import { FilterDropdownComponent } from './filter-dropdown.component'

class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject<any>({})
}
class SearchServiceMock {
  updateFilters = jest.fn()
}

class FieldsServiceMock {
  getAvailableValues = jest.fn(() => EMPTY)
  buildFiltersFromFieldValues = jest.fn((fieldValues) =>
    of({
      'converted from values': fieldValues,
    })
  )
  readFieldValuesFromFilters = jest.fn((filters) =>
    of(
      Object.keys(filters).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: ['converted from filters', filters[curr]],
        }),
        {}
      )
    )
  )
}

@Component({
  selector: 'gn-ui-dropdown-multiselect',
  template: '<div></div>',
})
export class MockDropdownComponent {
  @Input() title: string
  @Input() ariaName: string
  @Input() choices: {
    value: unknown
    label: string
  }[]
  @Input() selected: unknown[]
  @Output() selectValues = new EventEmitter<unknown[]>()
}

describe('FilterDropdownComponent', () => {
  let facade: SearchFacadeMock
  let component: FilterDropdownComponent
  let dropdown: MockDropdownComponent
  let searchService: SearchService
  let fieldsService: FieldsService
  let fixture: ComponentFixture<FilterDropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDropdownComponent, MockDropdownComponent],
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
      .overrideComponent(FilterDropdownComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(FilterDropdownComponent)
    facade = TestBed.inject(SearchFacade) as any
    searchService = TestBed.inject(SearchService)
    fieldsService = TestBed.inject(FieldsService)
    component = fixture.componentInstance

    component.fieldName = 'Org'
    dropdown = fixture.debugElement.query(
      By.directive(MockDropdownComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('provides selected values initially', () => {
    fixture.detectChanges()
    expect(dropdown.selected).toEqual([])
  })

  describe('when selected values change', () => {
    const values = ['org1', 'org2', 34]
    beforeEach(fakeAsync(() => {
      dropdown.selectValues.emit(values)
      tick()
    }))
    it('converts values to filters', () => {
      expect(fieldsService.buildFiltersFromFieldValues).toHaveBeenCalledWith({
        Org: values,
      })
    })
    it('calls updateSearch on the search service', () => {
      expect(searchService.updateFilters).toHaveBeenCalledWith({
        'converted from values': {
          Org: values,
        },
      })
    })
  })

  describe('available choices', () => {
    describe('on init', () => {
      beforeEach(() => {
        component.ngOnInit()
      })
      it('reads available values', () => {
        expect(fieldsService.getAvailableValues).toHaveBeenCalledWith('Org')
      })
    })
    describe('when there are available values', () => {
      const values = [
        { label: 'First Org (4)', value: 'First Org' },
        { label: 'Second Org (2)', value: 'Second Org' },
        { label: 'Third Org (1)', value: 'Third Org' },
      ]
      beforeEach(() => {
        fieldsService.getAvailableValues = () => of(values)
        component.ngOnInit()
        fixture.detectChanges()
      })
      it('reads choices from the search response', () => {
        expect(dropdown.choices).toEqual(values)
      })
    })
    describe('no available values', () => {
      beforeEach(() => {
        fieldsService.getAvailableValues = () => of([])
        component.ngOnInit()
        fixture.detectChanges()
      })
      it('uses an empty array', () => {
        expect(dropdown.choices).toEqual([])
      })
    })
    describe('available values are numerical', () => {
      const values = [
        { label: '1 (4)', value: 1 },
        { label: '2 (2)', value: 2 },
        { label: '3 (1)', value: 3 },
      ]
      beforeEach(() => {
        fieldsService.getAvailableValues = () => of(values)
        component.ngOnInit()
        fixture.detectChanges()
      })
      it('converts values to string', () => {
        expect(dropdown.choices).toEqual([
          { label: '1 (4)', value: '1' },
          { label: '2 (2)', value: '2' },
          { label: '3 (1)', value: '3' },
        ])
      })
    })
  })

  describe('selected values', () => {
    const filters = {
      Org: 'bla',
    }
    beforeEach(() => {
      facade.searchFilters$.next(filters)
      fixture.detectChanges()
    })
    it('converts filters to values', () => {
      expect(fieldsService.readFieldValuesFromFilters).toHaveBeenCalledWith(
        filters
      )
    })
    it('shows selected values in the dropdown', () => {
      expect(dropdown.selected).toEqual(['converted from filters', 'bla'])
    })
  })

  describe('field is unsupported', () => {
    beforeEach(() => {
      fieldsService.getAvailableValues = () =>
        throwError(() => new Error('blah'))
      fieldsService.readFieldValuesFromFilters = () => {
        throw new Error('blah')
      }
      fieldsService.buildFiltersFromFieldValues = () => {
        throw new Error('blah')
      }
      component.ngOnInit()
      fixture.detectChanges()
    })
    it('still gives an array for choices', () => {
      expect(dropdown.choices).toEqual([])
    })
    it('still gives an array for selected', () => {
      expect(dropdown.selected).toEqual([])
    })
  })
})
