import { TestBed } from '@angular/core/testing'
import { FieldsService } from './fields.service'
import { EMPTY, lastValueFrom, of } from 'rxjs'
import {
  SearchApiService,
  ToolsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { OrganisationsServiceInterface } from '@geonetwork-ui/feature/catalog'

class SearchApiServiceMock {
  search = jest.fn(() => EMPTY)
}
class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn()
  registerRuntimeField = jest.fn()
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

describe('FieldsService', () => {
  let service: FieldsService
  let searchApiService: SearchApiService

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
        {
          provide: OrganisationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    })
    searchApiService = TestBed.inject(SearchApiService)
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
          'publisher',
          'format',
          'publicationYear',
          'topic',
          'inspireKeyword',
          'documentStandard',
          'isSpatial',
          'q',
          'license',
        ])
      })
    })
    describe('#getAvailableValues', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(service.getAvailableValues('publisher'))
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
    describe('#getFiltersForFieldValues', () => {
      let filters
      beforeEach(async () => {
        filters = await lastValueFrom(
          service.getFiltersForFieldValues({
            publisher: ['aa', 'bb'],
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
            service.getFiltersForFieldValues({
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
    describe('#getFieldValuesForFilters', () => {
      let values
      beforeEach(async () => {
        values = await lastValueFrom(
          service.getFieldValuesForFilters({
            format: { ascii: true, png: true },
          })
        )
      })
      it('calls the search api', () => {
        expect(values).toEqual({
          documentStandard: [],
          format: ['ascii', 'png'],
          inspireKeyword: [],
          isSpatial: [],
          license: [],
          publicationYear: [],
          publisher: ['orgB'],
          q: [],
          topic: [],
        })
      })
    })
  })
})
