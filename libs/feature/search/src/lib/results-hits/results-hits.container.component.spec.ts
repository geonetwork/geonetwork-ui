import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ResultsHitsContainerComponent } from './results-hits.container.component'
import { of } from 'rxjs'
import { CommonModule } from '@angular/common'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldsService } from '../utils/service/fields.service'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { By } from '@angular/platform-browser'
import { ResultsHitsSearchKindComponent } from '@geonetwork-ui/ui/search'
import { MockComponent } from 'ng-mocks'

describe('ResultsHitsContainerComponent', () => {
  let component: ResultsHitsContainerComponent
  let fixture: ComponentFixture<ResultsHitsContainerComponent>

  const searchFacadeMock = {
    resultsHits$: of(10),
    isLoading$: of(false),
    searchFilters$: of({ type: ['dataset'] }),
  }

  const fieldsServiceMock = {
    buildFiltersFromFieldValues: jest
      .fn()
      .mockReturnValue(of({ recordKind: ['dataset'] })),
    getAvailableValues: jest.fn().mockReturnValue(
      of([
        { value: 'dataset', label: 'Dataset', count: 5 },
        { value: 'service', label: 'Service', count: 3 },
      ])
    ),
    readFieldValuesFromFilters: jest
      .fn()
      .mockReturnValue(of({ recordKind: ['dataset'] })),
  }

  const searchServiceMock = {
    updateFilters: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultsHitsContainerComponent,
        MockComponent(ResultsHitsSearchKindComponent),
      ],
      providers: [
        provideI18n(),
        { provide: SearchFacade, useValue: searchFacadeMock },
        { provide: SearchService, useValue: searchServiceMock },
        { provide: FieldsService, useValue: fieldsServiceMock },
      ],
      imports: [CommonModule, TranslateDirective, TranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHitsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize filterChoices$ observable correctly', () => {
    component.filterChoices$.subscribe((choices) => {
      expect(choices).toBeDefined()
      expect(choices.length).toBe(4) // (3 + with 'all')
    })
  })

  it('should display the count for the filter choice', () => {
    const filterChoices = component.filterChoices$
    filterChoices.subscribe((choices) => {
      const count = choices.find((choice) => choice.value === 'dataset')?.count
      expect(count).toBe(5)
    })
  })

  it('should call updateFilters when onSelectionChanged is triggered', () => {
    component.onSelectionChanged(['dataset'])

    expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({
      recordKind: ['dataset'],
    })
  })
  describe('displayRecordKindFilter', () => {
    it('should display ResultsHitsSearchKindComponent by default', () => {
      expect(
        fixture.debugElement.query(By.directive(ResultsHitsSearchKindComponent))
      ).toBeTruthy()
    })

    it('should not display ResultsHitsSearchKindComponent when RECORD_KIND_QUICK_FILTER is false in searchConfig', () => {
      component.displayRecordKindFilter = false
      fixture.detectChanges()
      expect(
        fixture.debugElement.query(By.directive(ResultsHitsSearchKindComponent))
      ).toBeFalsy()
    })
  })
})
