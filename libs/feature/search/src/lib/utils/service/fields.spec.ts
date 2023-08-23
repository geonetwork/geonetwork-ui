import { ToolsApiService } from '@geonetwork-ui/data-access/gn4'
import { lastValueFrom, of } from 'rxjs'
import {
  AbstractSearchField,
  FullTextSearchField,
  IsSpatialSearchField,
  LicenseSearchField,
  OrganizationSearchField,
  SimpleSearchField,
  TopicSearchField,
} from './fields'
import { TestBed } from '@angular/core/testing'
import { Injector } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { Organization } from '@geonetwork-ui/common/domain/record'
import { ElasticsearchService } from '@geonetwork-ui/api/repository/gn4'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

class ElasticsearchServiceMock {
  registerRuntimeField = jest.fn()
}

class RecordsRepositoryMock {
  aggregate = jest.fn((aggregations) => {
    const aggName = Object.keys(aggregations)[0]
    if (aggName.startsWith('is'))
      return of({
        [aggName]: {
          buckets: [
            {
              term: 'yes',
              count: 5,
            },
            {
              term: 'no',
              count: 3,
            },
          ],
        },
      })
    if (aggName === 'license')
      return of({
        license: {
          buckets: [
            {
              term: 'etalab',
              count: 2359,
            },
            {
              term: 'unknown',
              count: 2278,
            },
            {
              term: 'etalab-v2',
              count: 1489,
            },
            {
              term: 'odbl',
              count: 446,
            },
            {
              term: 'pddl',
              count: 300,
            },
            {
              term: 'cc-by',
              count: 32,
            },
            {
              term: 'odc-by',
              count: 4,
            },
          ],
        },
      })
    if (aggName === 'groupOwner')
      return of({
        groupOwner: {
          buckets: [
            {
              term: '20',
              count: 2359,
            },
            {
              term: '10',
              count: 2278,
            },
            {
              term: '30',
              count: 1489,
            },
          ],
        },
      })
    return of({
      [aggName]: {
        buckets: [
          {
            term: 'First value',
            count: 5,
          },
          {
            term: 'Second value',
            count: 3,
          },
          {
            term: 'Third value',
            count: 12,
          },
          {
            term: 'Fourth value',
            count: 1,
          },
        ],
      },
    })
  })
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

const sampleOrgs: Organization[] = [
  {
    name: 'Office fédéral de la communication OFCOM',
    recordCount: 10,
  },
  {
    name: 'Office fédéral du développement territorial ARE',
    description: 'A description for ARE',
    recordCount: 20,
  },
  {
    name: 'Municipalité de Köniz',
    description: 'A description for Köniz Municipality',
    recordCount: 30,
  },
]

class OrganisationsServiceMock {
  organisations$ = of(sampleOrgs)
  getOrgsFromFilters = jest.fn(() => of(sampleOrgs.slice(0, 2)))
  getFiltersForOrgs = jest.fn((orgs) =>
    of({
      orgs: orgs.reduce((prev, curr) => ({ ...prev, [curr.name]: true }), {}),
    })
  )
}

class TranslateServiceMock {
  currentLang = 'fr'
  get = jest.fn((key) => of(key))
}

describe('search fields implementations', () => {
  let searchField: AbstractSearchField
  let esService: ElasticsearchService
  let repository: RecordsRepositoryInterface
  let toolsService: ToolsApiService
  let injector: Injector

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
        {
          provide: ElasticsearchService,
          useClass: ElasticsearchServiceMock,
        },
        {
          provide: ToolsApiService,
          useClass: ToolsApiServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    })
    esService = TestBed.inject(ElasticsearchService)
    repository = TestBed.inject(RecordsRepositoryInterface)
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
        expect(repository.aggregate).toHaveBeenCalledWith({
          myField: {
            type: 'terms',
            limit: 1000,
            field: 'myField',
            sort: ['desc', 'key'],
          },
        })
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
      beforeEach(async () => {
        filter = await lastValueFrom(
          searchField.getFiltersForValues(['First value', 'Second value'])
        )
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
        beforeEach(async () => {
          values = await lastValueFrom(
            searchField.getValuesForFilter({
              myField: {
                'First value': true,
                'Second value': true,
              },
            })
          )
        })
        it('returns filtered values', () => {
          expect(values).toEqual(['First value', 'Second value'])
        })
      })
      describe('with a unique value', () => {
        beforeEach(async () => {
          values = await lastValueFrom(
            searchField.getValuesForFilter({
              myField: 'Single value',
            })
          )
        })
        it('returns the only value', () => {
          expect(values).toEqual(['Single value'])
        })
      })
      describe('no filter present', () => {
        beforeEach(async () => {
          values = await lastValueFrom(
            searchField.getValuesForFilter({
              somethingElse: { entirely: true },
            })
          )
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
        expect(repository.aggregate).toHaveBeenCalledWith({
          'cl_topic.key': {
            type: 'terms',
            limit: 1000,
            field: 'cl_topic.key',
            sort: ['asc', 'key'],
          },
        })
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
      beforeEach(async () => {
        filter = await lastValueFrom(
          searchField.getFiltersForValues(['Unique value'])
        )
      })
      it('returns appropriate filter', () => {
        expect(filter).toEqual({
          any: 'Unique value',
        })
      })
    })
    describe('#getValuesForFilters', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(
          searchField.getValuesForFilter({
            any: 'single value',
          })
        )
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
      beforeEach(async () => {
        filter = await lastValueFrom(
          searchField.getFiltersForValues(['yes', 'no'])
        )
      })
      it('returns filter for the latest value only', () => {
        expect(filter).toEqual({
          isSpatial: { no: true },
        })
      })
    })
    describe('#getValuesForFilters', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(
          searchField.getValuesForFilter({
            isSpatial: { no: true, yes: true },
          })
        )
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
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('orders results by descending count', () => {
        expect(repository.aggregate).toHaveBeenCalledWith({
          license: {
            type: 'terms',
            limit: 10,
            field: 'license',
            sort: ['desc', 'count'],
          },
        })
      })
      it('returns the available licenses, order by descending count', () => {
        expect(values).toEqual([
          {
            label: 'search.filters.license.etalab (2359)',
            value: 'etalab',
          },
          {
            label: 'search.filters.license.unknown (2278)',
            value: 'unknown',
          },
          {
            label: 'search.filters.license.etalab-v2 (1489)',
            value: 'etalab-v2',
          },
          {
            label: 'search.filters.license.odbl (446)',
            value: 'odbl',
          },
          {
            label: 'search.filters.license.pddl (300)',
            value: 'pddl',
          },
          {
            label: 'search.filters.license.cc-by (32)',
            value: 'cc-by',
          },
          {
            label: 'search.filters.license.odc-by (4)',
            value: 'odc-by',
          },
        ])
      })
    })
  })

  describe('OrganizationSearchField', () => {
    beforeEach(() => {
      searchField = new OrganizationSearchField(injector)
    })
    describe('#getFiltersForValues', () => {
      let filters
      beforeEach(async () => {
        filters = await lastValueFrom(
          searchField.getFiltersForValues([
            'Municipalité de Köniz',
            'Office fédéral de la communication OFCOM',
            'Non existent org',
          ])
        )
      })
      it('returns the filters provided by the orgs service', () => {
        expect(filters).toEqual({
          orgs: {
            'Municipalité de Köniz': true,
            'Office fédéral de la communication OFCOM': true,
          },
        })
      })
    })
    describe('#getValuesForFilter', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(
          searchField.getValuesForFilter({ abc: 'def' })
        )
      })
      it('returns the values provided by the orgs service', () => {
        expect(values).toEqual([
          'Office fédéral de la communication OFCOM',
          'Office fédéral du développement territorial ARE',
        ])
      })
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('returns the groups ordered by label', () => {
        expect(values).toEqual([
          {
            label: 'Municipalité de Köniz (30)',
            value: 'Municipalité de Köniz',
          },
          {
            label: 'Office fédéral de la communication OFCOM (10)',
            value: 'Office fédéral de la communication OFCOM',
          },
          {
            label: 'Office fédéral du développement territorial ARE (20)',
            value: 'Office fédéral du développement territorial ARE',
          },
        ])
      })
    })
  })
})
