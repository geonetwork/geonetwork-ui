import { Gn4Repository } from './gn4-repository'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { lastValueFrom, of } from 'rxjs'
import { ElasticsearchService } from './elasticsearch'
import { TestBed } from '@angular/core/testing'
import {
  EsSearchResponse,
  Gn4MetadataMapper,
} from '@geonetwork-ui/api/metadata-converter'
import {
  Aggregations,
  SearchResults,
} from '@geonetwork-ui/common/domain/search'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

class Gn4MetadataMapperMock {
  readRecords = jest.fn((records) =>
    Promise.all(records.map((r) => this.readRecord(r)))
  )
  readRecord = jest.fn((record) => Promise.resolve(record))
}

class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn((aggregations = {}, size = 0) => ({
    aggregations,
    size,
  }))
  getMetadataByIdPayload = jest.fn((uuid) => ({
    uuids: [uuid],
  }))
  getRelatedRecordPayload = jest.fn(() => ({}))
  buildAutocompletePayload = jest.fn(() => ({}))
  buildAggregationsPayload = jest.fn((aggs) => aggs)
  parseAggregationResult = jest.fn((agg) => agg)
}

class SearchApiServiceMock {
  search = jest.fn((bucket, payload) => {
    const body = JSON.parse(payload)
    const count = body.size ?? 20
    const result: EsSearchResponse = {
      hits: {
        hits: DATASET_RECORDS,
        total: { value: count },
      },
    }
    if (body.aggregations) {
      result.aggregations = {
        myTerm: {
          buckets: [{ term: 'value1', count: 123 }],
        },
      }
    }
    return of(result)
  })
}

describe('Gn4Repository', () => {
  let repository: Gn4Repository
  let gn4Helper: ElasticsearchService
  let gn4SearchApi: SearchApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Gn4Repository,
        {
          provide: ElasticsearchService,
          useClass: ElasticsearchServiceMock,
        },
        {
          provide: SearchApiService,
          useClass: SearchApiServiceMock,
        },
        {
          provide: Gn4MetadataMapper,
          useClass: Gn4MetadataMapperMock,
        },
      ],
    })
    repository = TestBed.inject(Gn4Repository)
    gn4Helper = TestBed.inject(ElasticsearchService)
    gn4SearchApi = TestBed.inject(SearchApiService)
  })
  it('creates', () => {
    expect(repository).toBeTruthy()
  })
  describe('search', () => {
    let results: SearchResults
    beforeEach(async () => {
      results = await lastValueFrom(
        repository.search({
          filters: {
            field1: '1234',
            field2: {
              abcd: true,
            },
          },
          offset: 4,
          limit: 12,
          fields: ['field1', 'field2', 'field3'],
          sort: ['asc', 'field1'],
        })
      )
    })
    it('builds a payload using the given parameter', () => {
      expect(gn4Helper.getSearchRequestBody).toHaveBeenCalledWith(
        {},
        12,
        4,
        ['asc', 'field1'],
        ['field1', 'field2', 'field3'],
        { field1: '1234', field2: { abcd: true } }
      )
    })
    it('returns the given results as records', () => {
      expect(results.count).toBe(12)
      expect(results.records).toStrictEqual(DATASET_RECORDS)
    })
  })
  describe('getByUniqueIdentifier', () => {
    let record: CatalogRecord
    beforeEach(async () => {
      record = await lastValueFrom(
        repository.getByUniqueIdentifier('1234-5678')
      )
    })
    it('builds a payload with the specified uuid', () => {
      expect(gn4Helper.getMetadataByIdPayload).toHaveBeenCalledWith('1234-5678')
    })
    it('returns the given result as record', () => {
      expect(record).toStrictEqual(DATASET_RECORDS[0])
    })
    describe('if record is not found', () => {
      beforeEach(async () => {
        ;(gn4SearchApi as any).search = () =>
          of({
            hits: {
              hits: [],
            },
          })
        record = await lastValueFrom(
          repository.getByUniqueIdentifier('1234-5678')
        )
      })
      it('returns null', () => {
        expect(record).toBe(null)
      })
    })
  })
  describe('getSimilarRecords', () => {
    let results: CatalogRecord[]
    beforeEach(async () => {
      results = await lastValueFrom(
        repository.getSimilarRecords(DATASET_RECORDS[0])
      )
    })
    it('uses a related record ES payload', () => {
      expect(gn4Helper.getRelatedRecordPayload).toHaveBeenCalledWith(
        'A very interesting dataset (un jeu de données très intéressant)',
        'my-dataset-001',
        3
      )
    })
    it('returns the given results as records', () => {
      expect(results).toStrictEqual(DATASET_RECORDS)
    })
  })
  describe('aggregate', () => {
    let results: Aggregations
    const aggParams = {
      myTerm: {
        type: 'terms',
        sort: ['asc', 'key'],
        field: 'field2',
        limit: 30,
        filter: 'field1 < 100',
      },
    }
    beforeEach(async () => {
      results = await lastValueFrom(repository.aggregate(aggParams))
    })
    it('builds an aggregation payload', () => {
      expect(gn4Helper.getSearchRequestBody).toHaveBeenCalledWith(aggParams)
    })
    it('returns the aggregation results', () => {
      expect(results).toStrictEqual({
        myTerm: {
          buckets: [{ term: 'value1', count: 123 }],
        },
      })
    })
  })
  describe('fuzzySearch', () => {
    let results: SearchResults
    beforeEach(async () => {
      results = await lastValueFrom(repository.fuzzySearch('blargz'))
    })
    it('uses an autocomplete ES payload', () => {
      expect(gn4Helper.buildAutocompletePayload).toHaveBeenCalledWith('blargz')
    })
    it('returns the given results as records', () => {
      expect(results.count).toBe(20)
      expect(results.records).toStrictEqual(DATASET_RECORDS)
    })
  })
})
