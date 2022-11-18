import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BehaviorSubject } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FilterDropdownComponent } from './filter-dropdown.component'

class SearchFacadeMock {
  updateConfigAggregations = jest.fn()
  resultsAggregations$ = new BehaviorSubject<any>({})
  searchFilters$ = new BehaviorSubject<any>({})
}
class SearchServiceMock {
  updateSearch = jest.fn()
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
  let component: FilterDropdownComponent
  let dropdown: MockDropdownComponent
  let facade: SearchFacade
  let searchService: SearchService
  let fixture: ComponentFixture<FilterDropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDropdownComponent, MockDropdownComponent],
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
    }).compileComponents()

    fixture = TestBed.createComponent(FilterDropdownComponent)
    facade = TestBed.inject(SearchFacade)
    searchService = TestBed.inject(SearchService)
    component = fixture.componentInstance
    component.fieldName = 'Org'
    dropdown = fixture.debugElement.query(
      By.directive(MockDropdownComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('at initialization', () => {
    it('adds an aggregation in the search config', () => {
      expect(facade.updateConfigAggregations).toHaveBeenCalledWith({
        Org: { terms: { field: 'Org', size: 100 } },
      })
    })
  })

  describe('when selected values change', () => {
    beforeEach(() => {
      dropdown.selectValues.emit([['org1'], ['org2'], [34]])
    })
    it('calls updateSearch on the search service', () => {
      expect(searchService.updateSearch).toHaveBeenCalledWith({
        Org: { org1: true, org2: true, 34: true },
      })
    })
  })

  describe('available choices', () => {
    describe('when an aggregation is available', () => {
      beforeEach(() => {
        ;(facade as any).resultsAggregations$.next({
          Org: {
            buckets: [
              { doc_count: 4, key: 'First Org' },
              { doc_count: 2, key: 'Second Org' },
              { doc_count: 1, key: 'Third Org' },
            ],
          },
        })
        fixture.detectChanges()
      })
      it('reads choices from the search response', () => {
        expect(dropdown.choices).toEqual([
          { label: 'First Org (4)', value: ['First Org'] },
          { label: 'Second Org (2)', value: ['Second Org'] },
          { label: 'Third Org (1)', value: ['Third Org'] },
        ])
      })
    })
    describe('when an aggregation is not available', () => {
      beforeEach(() => {
        ;(facade as any).resultsAggregations$.next({ anotherAgg: [] })
        fixture.detectChanges()
      })
      it('uses an empty array', () => {
        expect(dropdown.choices).toEqual([])
      })
    })
    describe('a numerical aggregation is available', () => {
      beforeEach(() => {
        ;(facade as any).resultsAggregations$.next({
          Org: {
            buckets: [
              { doc_count: 4, key: 1 },
              { doc_count: 2, key: 2 },
              { doc_count: 1, key: 3 },
            ],
          },
        })
        fixture.detectChanges()
      })
      it('converts values to string', () => {
        expect(dropdown.choices).toEqual([
          { label: '1 (4)', value: ['1'] },
          { label: '2 (2)', value: ['2'] },
          { label: '3 (1)', value: ['3'] },
        ])
      })
    })
  })

  describe('selected values', () => {
    describe('when a filter is available', () => {
      beforeEach(() => {
        ;(facade as any).resultsAggregations$.next({
          Org: {
            buckets: [
              { doc_count: 4, key: 'First Org' },
              { doc_count: 2, key: 'Second Org' },
              { doc_count: 1, key: 'Third Org' },
            ],
          },
        })
        ;(facade as any).searchFilters$.next({
          Org: {
            'First Org': true,
            'Second Org': true,
            'Another unknown value': true,
          },
        })
        fixture.detectChanges()
      })
      it('reads selected values from the search filters (excluding values not in choices)', () => {
        expect(dropdown.selected).toEqual([['First Org'], ['Second Org']])
      })
    })
    describe('when a filter is not available', () => {
      beforeEach(() => {
        ;(facade as any).searchFilters$.next({
          anoterField: {
            value1: true,
          },
        })
        fixture.detectChanges()
      })
      it('uses an empty array', () => {
        expect(dropdown.selected).toEqual([])
      })
    })
  })

  describe('with a label factory', () => {
    beforeEach(() => {
      component.labelFactory = (bucketKey) => {
        if (bucketKey.startsWith('OGC:WMS')) return `WMS Service`
        if (bucketKey.startsWith('OGC:WFS')) return `WFS Service`
        return 'Other'
      }
      ;(facade as any).resultsAggregations$.next({
        Org: {
          buckets: [
            { doc_count: 4, key: 'OGC:WMS' },
            { doc_count: 2, key: 'OGC:WMS-1.3.0' },
            { doc_count: 1, key: 'OGC:WFS' },
            { doc_count: 2, key: 'OGC:WCS' },
            { doc_count: 1, key: 'WWW:DOWNLOAD' },
          ],
        },
      })
      fixture.detectChanges()
    })
    it('groups choices with identical labels', () => {
      expect(dropdown.choices).toEqual([
        { label: 'WMS Service (6)', value: ['OGC:WMS', 'OGC:WMS-1.3.0'] },
        { label: 'WFS Service (1)', value: ['OGC:WFS'] },
        { label: 'Other (3)', value: ['OGC:WCS', 'WWW:DOWNLOAD'] },
      ])
    })
    describe('when clicking an option that covers several values', () => {
      beforeEach(() => {
        component.onSelectedValues([['OGC:WFS'], ['OGC:WMS', 'OGC:WMS-1.3.0']])
        fixture.detectChanges()
      })
      it('adds all values to the search params', () => {
        expect(searchService.updateSearch).toHaveBeenCalledWith({
          Org: { 'OGC:WFS': true, 'OGC:WMS': true, 'OGC:WMS-1.3.0': true },
        })
      })
    })
    describe('when some filters are already set', () => {
      beforeEach(() => {
        ;(facade as any).searchFilters$.next({
          Org: {
            'OGC:WMS': true,
            'OGC:WMS-1.3.0': true,
            'OGC:WFS': true,
            'OGC:WCS': true,
          },
        })
        fixture.detectChanges()
      })
      it('sets groups of values as selected according to the existing choices', () => {
        expect(dropdown.selected).toEqual([
          ['OGC:WMS', 'OGC:WMS-1.3.0'],
          ['OGC:WFS'],
        ])
      })
    })
  })
})
