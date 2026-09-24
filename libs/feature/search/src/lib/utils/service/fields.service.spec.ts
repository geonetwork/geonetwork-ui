import { TestBed } from '@angular/core/testing'
import {
  CUSTOM_FILTERS,
  FieldsService,
  SUPPORTED_CUSTOM_FILTER_BASE_FILTERS,
} from './fields.service'
import { EMPTY, lastValueFrom, of } from 'rxjs'
import { ToolsApiService } from '@geonetwork-ui/data-access/gn4'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { ElasticsearchService } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class RecordsRepositoryMock {
  aggregate = jest.fn(() => EMPTY)
}
class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn()
  registerRuntimeField = jest.fn()
  registerFieldAlias = jest.fn()
}
class ToolsApiServiceMock {
  getTranslationsPackage1 = jest.fn(() => EMPTY)
}
class OrganisationsServiceMock {
  organisations$ = of([{ name: 'orgA', recordCount: 10 }])
  getOrgsFromFilters = jest.fn(() => of([{ name: 'orgB' }]))
  getFiltersForOrgs = jest.fn(() =>
    of({
      orgFilter: true,
    })
  )
}

class PlatformServiceInterfaceMock {
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

describe('FieldsService', () => {
  let service: FieldsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
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
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(FieldsService)
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(FieldsService)
    })
    describe('#supportedFields', () => {
      it('returns a list of fields', () => {
        expect(service.supportedFields).toEqual([
          'organization',
          'format',
          'resourceType',
          'recordKind',
          'representationType',
          'publicationYear',
          'topic',
          'inspireKeyword',
          'keyword',
          'documentStandard',
          'isSpatial',
          'q',
          'license',
          'owner',
          'producerOrg',
          'publisherOrg',
          'user',
          'changeDate',
          'resourceCreationRevisionDate',
          'availableServices',
          'spatialExtent',
        ])
      })
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(service.getAvailableValues('organization'))
      })
      it('gets the values from the orgs service', () => {
        expect(values).toEqual([{ label: 'orgA (10)', value: 'orgA' }])
      })
      it('throws for an unsupported field', () => {
        expect(() => service.getAvailableValues('blarg')).toThrowError(
          'Unsupported search field: blarg'
        )
      })
    })
    describe('#buildFiltersFromFieldValues', () => {
      let filters
      beforeEach(async () => {
        filters = await lastValueFrom(
          service.buildFiltersFromFieldValues({
            organization: ['aa', 'bb'],
            format: ['cc', 'dd'],
            publicationYear: '2022',
            q: 'any',
            unknownField: 'abcd',
          })
        )
      })
      it('converts to filters', () => {
        expect(filters).toEqual({
          format: {
            cc: true,
            dd: true,
          },
          orgFilter: true,
          publicationYearForResource: {
            '2022': true,
          },
          any: 'any',
        })
      })
      describe('when no field value matches', () => {
        beforeEach(async () => {
          filters = await lastValueFrom(
            service.buildFiltersFromFieldValues({
              unknownField: 'abcd',
              unknownField2: ['efgh', 'ijkl'],
            })
          )
        })
        it('returns empty filters', () => {
          expect(filters).toEqual({})
        })
      })
    })
    describe('#readFieldValuesFromFilters', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(
          service.readFieldValuesFromFilters({
            format: { ascii: true, png: true },
          })
        )
      })
      it('calls the search api', () => {
        expect(values).toEqual({
          documentStandard: [],
          format: ['ascii', 'png'],
          inspireKeyword: [],
          keyword: [],
          isSpatial: [],
          license: [],
          publicationYear: [],
          organization: ['orgB'],
          q: [],
          representationType: [],
          resourceType: [],
          spatialExtent: [],
          topic: [],
          owner: [],
          producerOrg: [],
          publisherOrg: [],
          user: [],
          changeDate: [],
          resourceCreationRevisionDate: [],
          availableServices: [],
          recordKind: [],
        })
      })
    })
    describe('#getFieldType', () => {
      it('returns the field type', () => {
        expect(service.getFieldType('organization')).toEqual('values')
        expect(service.getFieldType('publicationYear')).toEqual('values')
        expect(service.getFieldType('format')).toEqual('values')
        expect(service.getFieldType('changeDate')).toEqual('dateRange')
        expect(service.getFieldType('resourceCreationRevisionDate')).toEqual(
          'dateRange'
        )
        expect(service.getFieldType('spatialExtent')).toEqual('spatialExtent')
      })
    })
  })

  describe('every supported base filter', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => undefined)
      TestBed.configureTestingModule({
        providers: [
          {
            provide: CUSTOM_FILTERS,
            useValue: SUPPORTED_CUSTOM_FILTER_BASE_FILTERS.map(
              (baseFilter) => ({ name: `myOrg:${baseFilter}`, baseFilter })
            ),
          },
        ],
      })
      service = TestBed.inject(FieldsService)
    })
    afterEach(() => {
      jest.mocked(console.warn).mockRestore()
    })

    it('can be used as the base of a custom filter', () => {
      SUPPORTED_CUSTOM_FILTER_BASE_FILTERS.forEach((baseFilter) => {
        expect(service.supportedFields).toContain(`myOrg:${baseFilter}`)
      })
      expect(console.warn).not.toHaveBeenCalled()
    })
    it('keeps the custom filter selection under its own filter key', async () => {
      for (const baseFilter of SUPPORTED_CUSTOM_FILTER_BASE_FILTERS) {
        const name = `myOrg:${baseFilter}`
        const filters = await lastValueFrom(
          service.buildFiltersFromFieldValues({ [name]: ['aValue'] })
        )
        expect(Object.keys(filters)).toEqual([name])
        const fieldValues = await lastValueFrom(
          service.readFieldValuesFromFilters(filters)
        )
        expect(fieldValues[name]).toEqual(['aValue'])
      }
    })
  })

  describe('custom filters', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => undefined)
      TestBed.configureTestingModule({
        providers: [
          {
            provide: CUSTOM_FILTERS,
            useValue: [
              { name: 'myOrg:myFilter', baseFilter: 'keyword' },
              {
                name: 'myOrg:labelled',
                baseFilter: 'keyword',
                labelKey: 'myOrg.labelled',
              },
              // not a SimpleSearchField, and not in the supported list
              { name: 'myOrg:unsupported', baseFilter: 'organization' },
              // a SimpleSearchField, but deliberately not in the supported list
              { name: 'myOrg:unsupportedDate', baseFilter: 'changeDate' },
              // no such field at all
              { name: 'myOrg:unknownBase', baseFilter: 'notAField' },
            ],
          },
        ],
      })
      service = TestBed.inject(FieldsService)
    })
    afterEach(() => {
      jest.mocked(console.warn).mockRestore()
    })

    it('adds a field for the custom filter', () => {
      expect(service.supportedFields).toContain('myOrg:myFilter')
    })
    describe('#getLabelKey', () => {
      it('labels a built-in field with its own key', () => {
        expect(service.getLabelKey('keyword')).toEqual('search.filters.keyword')
      })
      it('labels a custom filter with its configured key', () => {
        expect(service.getLabelKey('myOrg:labelled')).toEqual('myOrg.labelled')
      })
      it('falls back to the base filter label when no key is configured', () => {
        expect(service.getLabelKey('myOrg:myFilter')).toEqual(
          'search.filters.keyword'
        )
      })
    })
    it('ignores a custom filter based on a field that is not a supported base filter', () => {
      expect(service.supportedFields).not.toContain('myOrg:unsupportedDate')
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("unsupported base_filter 'changeDate'")
      )
    })
    it('ignores a custom filter based on an unknown field', () => {
      expect(service.supportedFields).not.toContain('myOrg:unknownBase')
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("unsupported base_filter 'notAField'")
      )
    })
    it('keeps the other fields when a custom filter is ignored', () => {
      expect(service.supportedFields).toContain('keyword')
      expect(service.supportedFields).toContain('myOrg:myFilter')
    })
    it('ignores a custom filter based on an unsupported filter', () => {
      expect(service.supportedFields).not.toContain('myOrg:unsupported')
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("unsupported base_filter 'organization'")
      )
    })
    describe('when two custom filters on the same base filter have a value', () => {
      it('keeps them in two distinct filters', async () => {
        const filters = await lastValueFrom(
          service.buildFiltersFromFieldValues({
            'myOrg:myFilter': ['firstValue'],
            'myOrg:labelled': ['secondValue'],
          })
        )
        expect(filters).toEqual({
          'myOrg:myFilter': { firstValue: true },
          'myOrg:labelled': { secondValue: true },
        })
        const fieldValues = await lastValueFrom(
          service.readFieldValuesFromFilters(filters)
        )
        expect(fieldValues['myOrg:myFilter']).toEqual(['firstValue'])
        expect(fieldValues['myOrg:labelled']).toEqual(['secondValue'])
      })
    })
    describe('when both the custom filter and its base filter have a value', () => {
      let filters
      beforeEach(async () => {
        filters = await lastValueFrom(
          service.buildFiltersFromFieldValues({
            keyword: ['firstValue'],
            'myOrg:myFilter': ['secondValue'],
          })
        )
      })
      it('keeps them in two distinct filters', () => {
        expect(filters).toEqual({
          'tag.default': { firstValue: true },
          'myOrg:myFilter': { secondValue: true },
        })
      })
      it('reads back only its own value for each field', async () => {
        const fieldValues = await lastValueFrom(
          service.readFieldValuesFromFilters(filters)
        )
        expect(fieldValues['keyword']).toEqual(['firstValue'])
        expect(fieldValues['myOrg:myFilter']).toEqual(['secondValue'])
      })
    })
  })
})
