import { Gn4Repository } from './gn4-repository'
import {
  RecordsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, lastValueFrom, of, throwError } from 'rxjs'
import { ElasticsearchService } from './elasticsearch'
import { TestBed } from '@angular/core/testing'
import {
  EsSearchResponse,
  Gn4Converter,
} from '@geonetwork-ui/api/metadata-converter'
import {
  Aggregations,
  SearchResults,
} from '@geonetwork-ui/common/domain/model/search'
import {
  DATASET_RECORD_SIMPLE,
  DATASET_RECORD_SIMPLE_AS_XML,
  DATASET_RECORDS,
} from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { map } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'

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
  search = jest.fn((bucket, relatedType, payload) => {
    const body = JSON.parse(payload)
    const count = body.size || 1234
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

class RecordsApiServiceMock {
  getRecordAs = jest.fn((uuid) =>
    of(`<gmd:MD_Metadata>
  <gmd:fileIdentifier>
    <gco:CharacterString>${uuid}</gco:CharacterString>
  </gmd:fileIdentifier>
</gmd:MD_Metadata>`).pipe(map((xml) => ({ body: xml })))
  )
  insert = jest.fn(() =>
    of({
      metadataInfos: {
        1234: [
          {
            uuid: '1234-5678-9012',
          },
        ],
      },
    })
  )
}

describe('Gn4Repository', () => {
  let repository: Gn4Repository
  let gn4Helper: ElasticsearchService
  let gn4SearchApi: SearchApiService
  let gn4RecordsApi: RecordsApiService

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
          provide: RecordsApiService,
          useClass: RecordsApiServiceMock,
        },
        {
          provide: Gn4Converter,
          useClass: Gn4MetadataMapperMock,
        },
      ],
    })
    repository = TestBed.inject(Gn4Repository)
    gn4Helper = TestBed.inject(ElasticsearchService)
    gn4SearchApi = TestBed.inject(SearchApiService)
    gn4RecordsApi = TestBed.inject(RecordsApiService)
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
        { field1: '1234', field2: { abcd: true } },
        undefined,
        undefined,
        undefined
      )
    })
    it('returns the given results as records', () => {
      expect(results.count).toBe(12)
      expect(results.records).toStrictEqual(DATASET_RECORDS)
    })
  })
  describe('getMatchesCount', () => {
    let count: number
    beforeEach(async () => {
      count = await lastValueFrom(
        repository.getMatchesCount({
          field1: '1234',
          field2: {
            abcd: true,
          },
        })
      )
    })
    it('builds a payload with the specified uuid', () => {
      expect(gn4Helper.getSearchRequestBody).toHaveBeenCalledWith(
        {},
        0,
        0,
        undefined,
        undefined,
        { field1: '1234', field2: { abcd: true } }
      )
    })
    it('returns the result count', () => {
      expect(count).toStrictEqual(1234)
    })
  })
  describe('getRecord', () => {
    let record: CatalogRecord
    beforeEach(async () => {
      record = await lastValueFrom(repository.getRecord('1234-5678'))
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
        record = await lastValueFrom(repository.getRecord('1234-5678'))
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
      expect(results.count).toBe(1234)
      expect(results.records).toStrictEqual(DATASET_RECORDS)
    })
  })
  describe('openRecordForEdition', () => {
    let record: CatalogRecord
    let recordSource: string
    let savedOnce: boolean

    describe('if the record is present in the backend', () => {
      beforeEach(async () => {
        ;[record, recordSource, savedOnce] = await lastValueFrom(
          repository.openRecordForEdition('1234-5678')
        )
      })
      it('calls the API to get the record as XML', () => {
        expect(gn4RecordsApi.getRecordAs).toHaveBeenCalledWith(
          '1234-5678',
          undefined,
          expect.anything(),
          undefined,
          undefined,
          undefined,
          expect.anything(),
          expect.anything(),
          undefined,
          expect.anything()
        )
      })
      it('parses the XML record into a native object', () => {
        expect(record).toMatchObject({ uniqueIdentifier: '1234-5678' })
      })
      it('loads the source & tells the record is present in the backend', () => {
        expect(recordSource).toMatch(/<gmd:MD_Metadata>/)
        expect(savedOnce).toBe(true)
      })
    })
    describe('if the record is present as draft but not in the backend', () => {
      let recordSource: string
      beforeEach(async () => {
        recordSource = await firstValueFrom(
          repository.saveRecordAsDraft({
            ...DATASET_RECORD_SIMPLE,
            uniqueIdentifier: '1234-5678',
          })
        )
        ;(gn4RecordsApi.getRecordAs as jest.Mock).mockReturnValueOnce(
          throwError(() => new HttpErrorResponse({ status: 404 }))
        )
        ;[record, recordSource, savedOnce] = await lastValueFrom(
          repository.openRecordForEdition('1234-5678')
        )
      })
      it('tells the record it has not been saved yet', () => {
        expect(savedOnce).toBe(false)
      })
      it('returns the record as serialized', () => {
        expect(recordSource).toMatch(/<gmd:MD_Metadata/)
      })
    })
  })
  // note: we're using a simple record here otherwise there might be loss of information when converting
  describe('saveRecord', () => {
    let recordSource: string
    describe('with reference', () => {
      beforeEach(async () => {
        recordSource = await lastValueFrom(
          repository.saveRecord(
            DATASET_RECORD_SIMPLE,
            DATASET_RECORD_SIMPLE_AS_XML
          )
        )
      })
      it('uses a converter that matches the reference', () => {
        const recordXml = (gn4RecordsApi.insert as jest.Mock).mock.calls[0][14]
        expect(recordXml).toMatch(`<mdb:metadataIdentifier>
        <mcc:MD_Identifier>
            <mcc:code>
                <gco:CharacterString>my-dataset-001</gco:CharacterString>`)
      })
      it('calls the API to insert the record as XML', () => {
        expect(gn4RecordsApi.insert).toHaveBeenCalledWith(
          expect.anything(),
          undefined,
          undefined,
          undefined,
          expect.anything(),
          undefined,
          expect.anything(),
          undefined,
          undefined,
          undefined,
          expect.anything(),
          undefined,
          undefined,
          undefined,
          expect.stringMatching(`<mdb:metadataIdentifier>
        <mcc:MD_Identifier>
            <mcc:code>
                <gco:CharacterString>my-dataset-001</gco:CharacterString>`)
        )
      })
      it('returns the unique identifier of the record as it was saved', () => {
        expect(recordSource).toEqual('1234-5678-9012')
      })
    })
    describe('without reference', () => {
      beforeEach(async () => {
        await lastValueFrom(repository.saveRecord(DATASET_RECORDS[0]))
      })
      it('uses the ISO19139 converter by default', () => {
        const recordXml = (gn4RecordsApi.insert as jest.Mock).mock.calls[0][14]
        expect(recordXml).toMatch(`
    <gmd:fileIdentifier>
        <gco:CharacterString>${DATASET_RECORD_SIMPLE.uniqueIdentifier}</gco:CharacterString>
    </gmd:fileIdentifier>`)
      })
    })
  })
  describe('record draft', () => {
    beforeEach(async () => {
      // save a record, then a draft, then open the record again
      await lastValueFrom(
        repository.saveRecord(
          DATASET_RECORD_SIMPLE,
          DATASET_RECORD_SIMPLE_AS_XML
        )
      )
      await lastValueFrom(
        repository.saveRecordAsDraft(
          {
            ...DATASET_RECORD_SIMPLE,
            title: 'The title has been modified',
          },
          DATASET_RECORD_SIMPLE_AS_XML
        )
      )
    })
    describe('#openRecordForEdition', () => {
      it('loads the draft instead of the original one', async () => {
        const [record] = await lastValueFrom(
          repository.openRecordForEdition(
            DATASET_RECORD_SIMPLE.uniqueIdentifier
          )
        )
        expect(record).toStrictEqual({
          ...DATASET_RECORD_SIMPLE,
          title: 'The title has been modified',
        })
      })
    })
    describe('#clearRecordDraft', () => {
      beforeEach(() => {
        repository.clearRecordDraft(DATASET_RECORD_SIMPLE.uniqueIdentifier)
      })
      it('removes the record draft', async () => {
        const [record] = await lastValueFrom(
          repository.openRecordForEdition(
            DATASET_RECORD_SIMPLE.uniqueIdentifier
          )
        )
        expect(record?.title).not.toBe('The title has been modified')
        const hasDraft = repository.recordHasDraft(
          DATASET_RECORD_SIMPLE.uniqueIdentifier
        )

        expect(hasDraft).toBe(false)
      })
    })
    describe('#recordHasDraft', () => {
      it('returns true when there is a draft', () => {
        const hasDraft = repository.recordHasDraft(
          DATASET_RECORD_SIMPLE.uniqueIdentifier
        )
        expect(hasDraft).toBe(true)
      })
      it('returns false otherwise', () => {
        const hasDraft = repository.recordHasDraft('blargz')
        expect(hasDraft).toBe(false)
      })
    })
  })

  describe('#getAllDrafts', () => {
    beforeEach(async () => {
      window.localStorage.clear()
      // save 3 drafts
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...DATASET_RECORD_SIMPLE,
          uniqueIdentifier: 'DRAFT-1',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...DATASET_RECORD_SIMPLE,
          uniqueIdentifier: 'DRAFT-2',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...DATASET_RECORD_SIMPLE,
          uniqueIdentifier: 'DRAFT-3',
        })
      )
    })
    it('returns all drafts', async () => {
      const drafts = await lastValueFrom(repository.getAllDrafts())
      expect(drafts.length).toBe(3)
      expect(drafts.map((d) => d.uniqueIdentifier)).toEqual([
        'DRAFT-1',
        'DRAFT-2',
        'DRAFT-3',
      ])
    })
  })
})
