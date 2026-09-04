import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchFiltersSummaryItemComponent } from './search-filters-summary-item.component'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { DateService } from '@geonetwork-ui/util/shared'
import { TranslateService } from '@ngx-translate/core'
import { FieldsService } from '../utils/service/fields.service'
import { FieldType } from '../utils/service/fields'

const FIELD_VALUES_FROM_FILTERS_MOCK = {
  organization: [],
  format: [],
  resourceType: [],
  representationType: [],
  publicationYear: [],
  topic: [],
  inspireKeyword: [],
  keyword: [],
  documentStandard: [],
  isSpatial: [],
  q: [],
  license: [],
  owner: [],
  producerOrg: [],
  publisherOrg: [],
  user: ['admin|admin|admin|Administrator', 'barbie|Roberts|Barbara|UserAdmin'],
  changeDate: {
    start: new Date('2024-11-01T00:00:00.000Z'),
    end: new Date('2024-11-29T00:00:00.000Z'),
  },
}
/*  searchFilters$ is only used to trigger change detection.
 ** its value is replaced by FIELD_VALUES_FROM_FILTERS_MOCK in stream
 */
class SearchFacadeMock {
  searchFilters$ = new BehaviorSubject<FieldFilters>({})
}
class SearchServiceMock {
  setFilters = jest.fn()
}

class TranslateServiceMock {
  get = jest.fn(() => of(''))
}

class DateServiceMock {
  formatDate = jest.fn((date: Date, options?: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString('fr', options)
  )
}

const PADDED_DATE: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

describe('SearchFiltersSummaryItemComponent', () => {
  let component: SearchFiltersSummaryItemComponent
  let fixture: ComponentFixture<SearchFiltersSummaryItemComponent>
  let searchFacade: SearchFacade
  let translateService: TranslateService
  let fieldsService: FieldsService
  let dateService: DateService

  beforeEach(() => {
    return MockBuilder(SearchFiltersSummaryItemComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(SearchFacade, SearchFacadeMock, 'useClass'),
        MockProvider(SearchService, SearchServiceMock, 'useClass'),
        MockProvider(FieldsService),
        MockProvider(TranslateService, TranslateServiceMock, 'useClass'),
        MockProvider(DateService, DateServiceMock, 'useClass'),
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(SearchFiltersSummaryItemComponent)
    component = fixture.componentInstance
    searchFacade = TestBed.inject(SearchFacade)
    fieldsService = TestBed.inject(FieldsService)
    translateService = TestBed.inject(TranslateService)
    dateService = TestBed.inject(DateService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set fieldValues$ observable for empty filters', async () => {
    const fieldValues = await firstValueFrom(component.fieldValues$)
    expect(fieldValues).toEqual([])
  })

  describe('fieldValues$', () => {
    beforeEach(() => {
      fieldsService.getFieldType = jest.fn(
        (field: 'changeDate' | 'user') =>
          (field === 'changeDate' ? 'dateRange' : 'values') as FieldType
      )
      fieldsService.readFieldValuesFromFilters = jest.fn(() =>
        of(FIELD_VALUES_FROM_FILTERS_MOCK)
      )
      ;(searchFacade.searchFilters$ as BehaviorSubject<FieldFilters>).next({})
    })
    it('should set fieldValues$ observable for user values filters', async () => {
      component.fieldName = 'user'
      const fieldValues = await firstValueFrom(component.fieldValues$)
      expect(fieldValues).toEqual([
        {
          value: 'admin|admin|admin|Administrator',
          label: 'admin admin',
        },
        {
          value: 'barbie|Roberts|Barbara|UserAdmin',
          label: 'Barbara Roberts',
        },
      ])
    })
    it('should set fieldValues$ observable for changeDate dateRange filters', async () => {
      component.fieldName = 'changeDate'
      fixture.detectChanges()
      const fieldValues = await firstValueFrom(component.fieldValues$)
      expect(fieldValues).toEqual([
        {
          value: {
            start: new Date('2024-11-01T00:00:00.000Z'),
            end: new Date('2024-11-29T00:00:00.000Z'),
          },
          label: '01/11/2024 - 29/11/2024',
        },
      ])
    })
    it('shows an ellipsis for the unset bound of an open interval', () => {
      component.fieldName = 'changeDate'
      component.fieldType = 'dateRange'

      const startOnly = component.getReadableValues([
        { start: new Date('2024-11-01T00:00:00.000Z') },
      ])
      const endOnly = component.getReadableValues([
        { end: new Date('2024-11-29T00:00:00.000Z') },
      ])

      expect(startOnly[0].label).toBe('01/11/2024 - …')
      expect(endOnly[0].label).toBe('… - 29/11/2024')
    })
    it('formats both bounds through the date service', () => {
      component.fieldName = 'changeDate'
      component.fieldType = 'dateRange'
      const start = new Date('2024-11-01T00:00:00.000Z')
      const end = new Date('2024-11-29T00:00:00.000Z')

      component.getReadableValues([{ start, end }])

      expect(dateService.formatDate).toHaveBeenCalledWith(start, PADDED_DATE)
      expect(dateService.formatDate).toHaveBeenCalledWith(end, PADDED_DATE)
    })
  })

  describe('translateLabel', () => {
    const fieldName = 'user'
    const labelKey = `search.filters.summaryLabel.${fieldName}`
    const fallbackKey = `search.filters.${fieldName}`
    beforeEach(() => {
      component.fieldName = fieldName
      fixture.detectChanges()
      translateService.get = jest.fn((key) => {
        if (key === labelKey) {
          return of(labelKey) // Simulate missing translation
        } else if (key === fallbackKey) {
          return of('Fallback Label')
        }
        return of('')
      })
    })
    it('should translate label with fallback if necessary', () => {
      component.translateLabel()
      expect(component.translatedLabel).toBe('Fallback Label')
    })
  })
})
