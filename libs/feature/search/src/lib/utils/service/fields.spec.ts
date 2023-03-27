import {
  SearchApiService,
  ToolsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { lastValueFrom, of } from 'rxjs'
import {
  AbstractSearchField,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  SimpleSearchField,
  TopicSearchField,
} from './fields'
import { TestBed } from '@angular/core/testing'
import { Injector } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

class SearchApiServiceMock {
  search = jest.fn((bucketName, payloadString) => {
    const payload = JSON.parse(payloadString)
    const aggName = Object.keys(payload.aggregations)[0]
    if (aggName.startsWith('is'))
      return of({
        aggregations: {
          isSpatial: {
            buckets: [
              {
                key: 'yes',
                doc_count: 5,
              },
              {
                key: 'no',
                doc_count: 3,
              },
            ],
          },
        },
      })
    return of({
      aggregations: {
        [aggName]: {
          buckets: [
            {
              key: 'First value',
              doc_count: 5,
            },
            {
              key: 'Second value',
              doc_count: 3,
            },
            {
              key: 'Third value',
              doc_count: 12,
            },
            {
              key: 'Fourth value',
              doc_count: 1,
            },
          ],
        },
      },
    })
  })
}
class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn((aggregations) => ({
    aggregations,
  }))
  registerRuntimeField = jest.fn()
}
class ToolsApiServiceMock {
  getTranslationsPackage1 = jest.fn(() =>
    of({
      'First value': 'Translated first value',
      'Second value': 'Hello',
      'Third value': 'Bla',
    })
  )
}

describe('search fields implementations', () => {
  let searchField: AbstractSearchField
  let esService: ElasticsearchService
  let searchApiService: SearchApiService
  let toolsService: ToolsApiService
  let injector: Injector

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: SearchApiService,
          useClass: SearchApiServiceMock,
        },
        {
          provide: ElasticsearchService,
          useClass: ElasticsearchServiceMock,
        },
        {
          provide: ToolsApiService,
          useClass: ToolsApiServiceMock,
        },
      ],
    })
    esService = TestBed.inject(ElasticsearchService)
    searchApiService = TestBed.inject(SearchApiService)
    toolsService = TestBed.inject(ToolsApiService)
    injector = TestBed.inject(Injector)
  })

  describe('SimpleSearchField', () => {
    beforeEach(() => {
      searchField = new SimpleSearchField('myField', 'desc', injector)
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('calls search with a simple terms aggregation', () => {
        expect(searchApiService.search).toHaveBeenCalledWith(
          expect.any(String),
          JSON.stringify({
            aggregations: {
              myField: {
                terms: {
                  size: 1000,
                  field: 'myField',
                  order: {
                    _key: 'desc',
                  },
                },
              },
            },
          })
        )
      })
      it('returns a list of values from the buckets', () => {
        expect(values).toEqual([
          { label: 'First value (5)', value: 'First value' },
          { label: 'Second value (3)', value: 'Second value' },
          { label: 'Third value (12)', value: 'Third value' },
          {
            label: 'Fourth value (1)',
            value: 'Fourth value',
          },
        ])
      })
    })
    describe('#getFiltersForValues', () => {
      let filter
      beforeEach(() => {
        filter = searchField.getFiltersForValues([
          'First value',
          'Second value',
        ])
      })
      it('returns appropriate filters', () => {
        expect(filter).toEqual({
          myField: {
            'First value': true,
            'Second value': true,
          },
        })
      })
    })
    describe('#getValuesForFilters', () => {
      let values
      describe('with several values', () => {
        beforeEach(() => {
          values = searchField.getValuesForFilter({
            myField: {
              'First value': true,
              'Second value': true,
            },
          })
        })
        it('returns filtered values', () => {
          expect(values).toEqual(['First value', 'Second value'])
        })
      })
      describe('with a unique value', () => {
        beforeEach(() => {
          values = searchField.getValuesForFilter({
            myField: 'Single value',
          })
        })
        it('returns the only value', () => {
          expect(values).toEqual(['Single value'])
        })
      })
      describe('no filter present', () => {
        beforeEach(() => {
          values = searchField.getValuesForFilter({
            somethingElse: { entirely: true },
          })
        })
        it('returns an empty array', () => {
          expect(values).toEqual([])
        })
      })
    })
  })

  describe('TopicSearchField', () => {
    beforeEach(() => {
      searchField = new TopicSearchField(injector)
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('calls search with a simple unsorted terms', () => {
        expect(searchApiService.search).toHaveBeenCalledWith(
          expect.any(String),
          JSON.stringify({
            aggregations: {
              topic: {
                terms: {
                  size: 1000,
                  field: 'cl_topic.key',
                },
              },
            },
          })
        )
      })
      it('returns a list of values sorted by translated labels', () => {
        expect(values).toEqual([
          { label: 'Bla (12)', value: 'Third value' },
          { label: 'Fourth value (1)', value: 'Fourth value' },
          { label: 'Hello (3)', value: 'Second value' },
          { label: 'Translated first value (5)', value: 'First value' },
        ])
      })
      it('only calls the translations service once', () => {
        expect(toolsService.getTranslationsPackage1).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('FullTextSearchField', () => {
    beforeEach(() => {
      searchField = new FullTextSearchField()
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('returns an empty array', () => {
        expect(values).toEqual([])
      })
    })
    describe('#getFiltersForValues', () => {
      let filter
      beforeEach(() => {
        filter = searchField.getFiltersForValues(['Unique value'])
      })
      it('returns appropriate filter', () => {
        expect(filter).toEqual({
          any: 'Unique value',
        })
      })
    })
    describe('#getValuesForFilters', () => {
      let values
      beforeEach(() => {
        values = searchField.getValuesForFilter({
          any: 'single value',
        })
      })
      it('returns the unique value', () => {
        expect(values).toEqual(['single value'])
      })
    })
  })

  describe('IsSpatialSearchField', () => {
    beforeEach(() => {
      searchField = new IsSpatialSearchField(injector)
    })
    it('registers a runtime field', () => {
      expect(esService.registerRuntimeField).toHaveBeenCalledWith(
        'isSpatial',
        expect.any(String)
      )
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('returns the available values', () => {
        expect(values).toEqual([
          {
            label: 'search.filters.isSpatial.yes (5)',
            value: 'yes',
          },
          {
            label: 'search.filters.isSpatial.no (3)',
            value: 'no',
          },
        ])
      })
    })
    describe('#getFiltersForValues', () => {
      let filter
      beforeEach(() => {
        filter = searchField.getFiltersForValues(['yes', 'no'])
      })
      it('returns filter for the latest value only', () => {
        expect(filter).toEqual({
          isSpatial: { no: true },
        })
      })
    })
    describe('#getValuesForFilters', () => {
      let values
      beforeEach(() => {
        values = searchField.getValuesForFilter({
          isSpatial: { no: true, yes: true },
        })
      })
      it('returns the first value only', () => {
        expect(values).toEqual(['no'])
      })
    })
  })

  describe('LicenseSearchField', () => {
    beforeEach(() => {
      searchField = new LicenseSearchField(injector)
    })
    it('registers a runtime field', () => {
      expect(esService.registerRuntimeField).toHaveBeenCalledWith(
        'license',
        expect.any(String)
      )
    })
  })
})
