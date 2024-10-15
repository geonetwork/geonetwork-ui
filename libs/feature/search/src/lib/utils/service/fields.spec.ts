import { lastValueFrom, of } from 'rxjs'
import {
  AbstractSearchField,
  FullTextSearchField,
  IsSpatialSearchField,
  TranslatedSearchField,
  LicenseSearchField,
  OrganizationSearchField,
  SimpleSearchField,
  MultilingualSearchField,
  UserSearchField,
} from './fields'
import { TestBed } from '@angular/core/testing'
import { Injector } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import {
  ElasticsearchService,
  METADATA_LANGUAGE,
} from '@geonetwork-ui/api/repository'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

class ElasticsearchServiceMock {
  registerRuntimeField = jest.fn()
}

class RecordsRepositoryMock {
  aggregate = jest.fn((aggregations) => {
    const aggName = Object.keys(aggregations)[0]
    const sortType = aggregations[aggName].sort[1]
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
    if (aggName === 'userinfo.keyword')
      return of({
        'userinfo.keyword': {
          buckets: [
            {
              term: 'admin|admin|admin|Administrator',
              count: 10,
            },
            {
              term: 'barbie|Roberts|Barbara|UserAdmin',
              count: 5,
            },
            {
              term: 'johndoe|Doe|John|Editor',
              count: 1,
            },
          ],
        },
      })
    const buckets = [
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
    ]
    if (sortType === 'count') {
      buckets.sort((a, b) => b.count - a.count)
    }
    return of({
      [aggName]: {
        buckets,
      },
    })
  })
}

class PlatformInterfaceMock {
  translateKey = jest.fn((key) => {
    switch (key) {
      case 'First value':
        return of('Translated first value')
      case 'Second value':
        return of('Hello')
      case 'Third value':
        return of('Bla')
      default:
        return of(null)
    }
  })
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
  let platformService: PlatformServiceInterface
  let injector: Injector
  let currentMetadataLanguage: string

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
          provide: PlatformServiceInterface,
          useClass: PlatformInterfaceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: METADATA_LANGUAGE,
          useFactory: () => currentMetadataLanguage,
        },
      ],
    })
    currentMetadataLanguage = null
    esService = TestBed.inject(ElasticsearchService)
    repository = TestBed.inject(RecordsRepositoryInterface)
    platformService = TestBed.inject(PlatformServiceInterface)
    injector = TestBed.inject(Injector)
  })

  describe('SimpleSearchField', () => {
    beforeEach(() => {
      searchField = new SimpleSearchField('myField', injector, 'desc')
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

  describe('TranslatedSearchField', () => {
    describe('sort by key', () => {
      beforeEach(() => {
        searchField = new TranslatedSearchField('cl_topic.key', injector, 'asc')
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
        it('calls translations 4 times', () => {
          expect(platformService.translateKey).toHaveBeenCalledTimes(4)
        })
      })
    })
    describe('sort by count', () => {
      beforeEach(() => {
        searchField = new TranslatedSearchField(
          'tag.default',
          injector,
          'desc',
          'count'
        )
      })
      describe('#getAvailableValues', () => {
        let values
        beforeEach(async () => {
          values = await lastValueFrom(searchField.getAvailableValues())
        })
        it('calls search with a simple unsorted terms', () => {
          expect(repository.aggregate).toHaveBeenCalledWith({
            'tag.default': {
              type: 'terms',
              limit: 1000,
              field: 'tag.default',
              sort: ['desc', 'count'],
            },
          })
        })
        it('returns a list of values sorted by count', () => {
          expect(values).toEqual([
            { label: 'Bla (12)', value: 'Third value' },
            { label: 'Translated first value (5)', value: 'First value' },
            { label: 'Hello (3)', value: 'Second value' },
            { label: 'Fourth value (1)', value: 'Fourth value' },
          ])
        })
      })
    })
  })

  describe('MultilingualSearchField', () => {
    describe('METADATA_LANGUAGE set to current', () => {
      beforeEach(async () => {
        currentMetadataLanguage = 'current'
        searchField = new MultilingualSearchField(
          'myField',
          injector,
          'desc',
          'count'
        )
        await lastValueFrom(searchField.getAvailableValues())
      })
      it('appends the field name with the default field', () => {
        expect(repository.aggregate).toHaveBeenCalledWith({
          'myField.default': {
            type: 'terms',
            limit: 1000,
            field: 'myField.default',
            sort: ['desc', 'count'],
          },
        })
      })
    })
    describe('METADATA_LANGUAGE set to an explicit language', () => {
      beforeEach(async () => {
        currentMetadataLanguage = 'swe'
        searchField = new MultilingualSearchField(
          'myField',
          injector,
          'desc',
          'count'
        )
        await lastValueFrom(searchField.getAvailableValues())
      })
      it('appends the field name with the given language', () => {
        expect(repository.aggregate).toHaveBeenCalledWith({
          'myField.langswe': {
            type: 'terms',
            limit: 1000,
            field: 'myField.langswe',
            sort: ['desc', 'count'],
          },
        })
      })
    })
    describe('METADATA_LANGUAGE unset', () => {
      beforeEach(async () => {
        currentMetadataLanguage = null
        searchField = new MultilingualSearchField(
          'myField',
          injector,
          'desc',
          'count'
        )
        await lastValueFrom(searchField.getAvailableValues())
      })
      it('appends the field name with the default field', () => {
        expect(repository.aggregate).toHaveBeenCalledWith({
          'myField.default': {
            type: 'terms',
            limit: 1000,
            field: 'myField.default',
            sort: ['desc', 'count'],
          },
        })
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
  describe('UserSearchField', () => {
    beforeEach(() => {
      searchField = new UserSearchField(injector)
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(searchField.getAvailableValues())
      })
      it('orders results by ascending key', () => {
        expect(repository.aggregate).toHaveBeenCalledWith({
          'userinfo.keyword': {
            type: 'terms',
            limit: 1000,
            field: 'userinfo.keyword',
            sort: ['asc', 'key'],
          },
        })
      })
      it('returns the available editors, order by ascending key (alphabetical)', () => {
        expect(values).toEqual([
          {
            label: 'admin admin (10)',
            value: 'admin|admin|admin|Administrator',
          },
          {
            label: 'Barbara Roberts (5)',
            value: 'barbie|Roberts|Barbara|UserAdmin',
          },
          {
            label: 'John Doe (1)',
            value: 'johndoe|Doe|John|Editor',
          },
        ])
      })
    })
  })
})
