import { TestBed } from '@angular/core/testing'

import { FieldsService } from './fields.service'
import { EMPTY, firstValueFrom, of } from 'rxjs'
import {
  SearchApiService,
  ToolsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'

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
      ],
    })
    service = TestBed.inject(FieldsService)
    searchApiService = TestBed.inject(SearchApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
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
    beforeEach(() => {
      service.getAvailableValues('publisher').subscribe()
    })
    it('calls the search api', () => {
      expect(searchApiService.search).toHaveBeenCalled()
    })
    it('throws for an unsupported field', () => {
      expect(() => service.getAvailableValues('blarg')).toThrowError(
        'Unsupported search field: blarg'
      )
    })
  })
  describe('#getFiltersForValues', () => {
    beforeEach(() => {
      service.getFiltersForValues('publisher', ['aa', 'bb'])
    })
    it('converts to filters', () => {
      expect(service.getFiltersForValues('publisher', ['aa', 'bb'])).toEqual({
        OrgForResource: {
          aa: true,
          bb: true,
        },
      })
    })
    it('throws for an unsupported field', () => {
      expect(() => service.getFiltersForValues('blarg', [])).toThrowError(
        'Unsupported search field: blarg'
      )
    })
  })
  describe('#getValuesForFilters', () => {
    beforeEach(() => {
      service.getValuesForFilters('publisher', {})
    })
    it('calls the search api', () => {
      expect(
        service.getValuesForFilters('publisher', {
          OrgForResource: {
            aa: true,
            bb: true,
          },
        })
      ).toEqual(['aa', 'bb'])
    })
    it('throws for an unsupported field', () => {
      expect(() => service.getValuesForFilters('blarg', {})).toThrowError(
        'Unsupported search field: blarg'
      )
    })
  })
})
