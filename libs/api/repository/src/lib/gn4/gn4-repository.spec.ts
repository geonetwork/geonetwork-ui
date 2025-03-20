import { Gn4Repository } from './gn4-repository'
import {
  RecordsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, lastValueFrom, of, throwError } from 'rxjs'
import { ElasticsearchService } from './elasticsearch'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import {
  EsSearchResponse,
  Gn4Converter,
} from '@geonetwork-ui/api/metadata-converter'
import {
  Aggregations,
  SearchResults,
  FieldFilters,
} from '@geonetwork-ui/common/domain/model/search'
import {
  datasetRecordsFixture,
  simpleDatasetRecordAsXmlFixture,
  simpleDatasetRecordFixture,
  simpleDatasetRecordWithFcatsFixture,
  duplicateDatasetRecordAsXmlFixture,
} from '@geonetwork-ui/common/fixtures'
import {
  CatalogRecord,
  DatasetFeatureCatalog,
} from '@geonetwork-ui/common/domain/model/record'
import { map } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { PublicationVersionError } from '@geonetwork-ui/common/domain/model/error'
import { TranslateService } from '@ngx-translate/core'

class Gn4MetadataMapperMock {
  readRecords = jest.fn((records) =>
    Promise.all(records.map((r) => this.readRecord(r)))
  )
  readRecord = jest.fn((record) => Promise.resolve(record))
}

const configFilters: FieldFilters = {
  resourceType: {
    service: false,
    map: false,
    'map/static': false,
    mapDigital: false,
  },
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
  search(bucket, relatedType, payload) {
    const body = JSON.parse(payload)
    const count = body.size || 1234
    const result: EsSearchResponse = {
      hits: {
        hits: datasetRecordsFixture(),
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
  }
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
        1234: {
          uuid: '1234-5678-9012',
        },
      },
    })
  )
  deleteRecord = jest.fn(() => of({}))
  create = jest.fn(() => of('1234-5678'))
}

class PlatformServiceInterfaceMock {
  getApiVersion = jest.fn(() => of('4.2.5'))
}

const SAMPLE_RECORD = {
  ...datasetRecordsFixture()[0],
  extras: {
    ownerInfo: 'Owner|SomeDetails',
    edit: true,
  },
}

const translateServiceMock = {
  currentLang: 'fr',
}

describe('Gn4Repository', () => {
  let repository: Gn4Repository
  let gn4Helper: ElasticsearchService
  let gn4SearchApi: SearchApiService
  let gn4RecordsApi: RecordsApiService
  let platformService: PlatformServiceInterface
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
    repository = TestBed.inject(Gn4Repository)
    gn4Helper = TestBed.inject(ElasticsearchService)
    gn4SearchApi = TestBed.inject(SearchApiService)
    gn4RecordsApi = TestBed.inject(RecordsApiService)
    platformService = TestBed.inject(PlatformServiceInterface)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    // Verify that no other requests are outstanding
    httpTestingController.verify()
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
      expect(results.records).toStrictEqual(datasetRecordsFixture())
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
      expect(record).toStrictEqual(datasetRecordsFixture()[0])
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

  describe('getFeatureCatalog', () => {
    let catalog: DatasetFeatureCatalog
    let metadata: CatalogRecord
    const spySearch = jest.spyOn(SearchApiServiceMock.prototype, 'search')

    describe('when extras feature catalog is defined ', () => {
      beforeEach(async () => {
        jest.clearAllMocks()
        metadata = datasetRecordsFixture()[0]
        catalog = await lastValueFrom(repository.getFeatureCatalog(metadata))
      })

      it('should not call the feature catalog API (extras contain the answer) ', () => {
        expect(spySearch).not.toHaveBeenCalled()
      })

      it('returns the feature catalog with mapped features', () => {
        expect(catalog).toEqual({
          featureTypes: [
            {
              name: "Catalogue d'attributs N°1",
              definition: 'Définition du catalogue d attributs N°1',
              attributes: [
                {
                  code: 'OBJECTID',
                  name: 'OBJECTID',
                  title: 'Object identifier',
                  type: 'OID',
                },
                {
                  code: 'NOM',
                  name: 'Nom',
                  title: 'Nom de la rue',
                  type: 'String (48)',
                },
                { code: 'RUE', name: 'Rue', title: '', type: 'String (50)' },
              ],
            },
            {
              name: "Catalogue d'attributs N°2",
              definition: 'Définition du catalogue d attributs N°2',
              attributes: [
                {
                  code: 'UniqueObject',
                  name: 'unique object ',
                  title: 'this is the only object of this catalog',
                  type: 'String (50)',
                },
              ],
            },
          ],
        })
      })
    })
    describe('when feature catalog exists, no extras defined', () => {
      beforeEach(async () => {
        metadata = simpleDatasetRecordWithFcatsFixture()
        spySearch.mockReturnValue(
          of({ hits: { hits: datasetRecordsFixture(), total: { value: 0 } } })
        )
        catalog = await lastValueFrom(repository.getFeatureCatalog(metadata))
      })

      afterEach(() => {
        spySearch.mockRestore()
      })

      it('calls the API with correct parameters', () => {
        expect(spySearch).toHaveBeenCalledWith(
          'bucket',
          ['fcats'],
          '{"uuids":["feature-catalog-identifier"]}'
        )
      })

      it('returns the attributes coming from the linked feature catalog', () => {
        expect(catalog).toEqual({
          featureTypes: [
            {
              name: "Catalogue d'attributs N°1",
              definition: 'Définition du catalogue d attributs N°1',
              attributes: [
                {
                  code: 'OBJECTID',
                  name: 'OBJECTID',
                  title: 'Object identifier',
                  type: 'OID',
                },
                {
                  code: 'NOM',
                  name: 'Nom',
                  title: 'Nom de la rue',
                  type: 'String (48)',
                },
                { code: 'RUE', name: 'Rue', title: '', type: 'String (50)' },
              ],
            },
            {
              name: "Catalogue d'attributs N°2",
              definition: 'Définition du catalogue d attributs N°2',
              attributes: [
                {
                  code: 'UniqueObject',
                  name: 'unique object ',
                  title: 'this is the only object of this catalog',
                  type: 'String (50)',
                },
              ],
            },
          ],
        })
      })

      it('prevent looping', async () => {
        metadata = {
          ...simpleDatasetRecordWithFcatsFixture(),
          extras: {
            ...simpleDatasetRecordWithFcatsFixture().extras,
            featureCatalogIdentifier: 'my-dataset-with-fcats',
          },
        }
        spySearch.mockReturnValue(
          of({
            hits: {
              hits: metadata,
              total: { value: 0 },
            },
          })
        )
        repository.getRecord = jest.fn().mockReturnValue(of(metadata))
        catalog = await lastValueFrom(repository.getFeatureCatalog(metadata))
        expect(catalog).toEqual(null)
      })
    })

    describe('when feature catalog does not exist, nor in extras', () => {
      beforeEach(async () => {
        metadata = {
          ...simpleDatasetRecordFixture(),
          extras: {},
        }
        catalog = await lastValueFrom(repository.getFeatureCatalog(metadata))
      })
      it('returns null', () => {
        expect(catalog).toEqual(null)
      })
    })
  })

  describe('getSimilarRecords', () => {
    let results: CatalogRecord[]
    beforeEach(async () => {
      results = await lastValueFrom(
        repository.getSimilarRecords(datasetRecordsFixture()[0])
      )
    })
    it('uses a related record ES payload', () => {
      const record = datasetRecordsFixture()[0]
      expect(gn4Helper.getRelatedRecordPayload).toHaveBeenCalledWith(record, 3)
    })
    it('returns the given results as records', () => {
      expect(results).toStrictEqual(datasetRecordsFixture())
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
      results = await lastValueFrom(
        repository.aggregate(aggParams, configFilters)
      )
    })
    it('builds an aggregation payload', () => {
      expect(gn4Helper.getSearchRequestBody).toHaveBeenCalledWith(
        aggParams,
        expect.any(Number),
        expect.any(Number),
        undefined,
        undefined,
        configFilters
      )
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
      expect(results.records).toStrictEqual(datasetRecordsFixture())
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
            ...simpleDatasetRecordFixture(),
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
  describe('openRecordForDuplication', () => {
    let record: CatalogRecord
    let recordSource: string
    let savedOnce: boolean

    const date = new Date('2024-07-11')
    jest.useFakeTimers().setSystemTime(date)

    beforeEach(async () => {
      ;(gn4RecordsApi.getRecordAs as jest.Mock).mockReturnValueOnce(
        of(duplicateDatasetRecordAsXmlFixture()).pipe(
          map((xml) => ({ body: xml }))
        )
      )
      ;[record, recordSource, savedOnce] = await lastValueFrom(
        repository.openRecordForDuplication('1234-5678')
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
    it('parses the XML record into a native object, and updates the id and title', () => {
      expect(record).toMatchObject({
        uniqueIdentifier: `my-dataset-001`,
        title:
          'Copy of record A very interesting dataset (un jeu de données très intéressant)',
      })
    })
    it('tells the record it has been saved', () => {
      expect(savedOnce).toBe(true)
    })
    it('returns the record as serialized', () => {
      expect(recordSource).toMatch(/<mdb:MD_Metadata/)
    })
  })
  // note: we're using a simple record here otherwise there might be loss of information when converting
  describe('saveRecord', () => {
    let recordSource: string
    describe('version error', () => {
      it('throws an error if the publication API version is too low', async () => {
        ;(platformService.getApiVersion as jest.Mock).mockReturnValueOnce(
          of('4.2.4')
        )
        let error
        await lastValueFrom(
          repository.saveRecord(
            simpleDatasetRecordFixture(),
            simpleDatasetRecordAsXmlFixture()
          )
        ).catch((e) => (error = e))
        expect(error).toEqual(new PublicationVersionError('4.2.4'))
      })
    })
    describe('Existing record - with reference', () => {
      beforeEach(async () => {
        ;(gn4RecordsApi.insert as jest.Mock).mockReturnValueOnce(
          of({
            metadataInfos: {
              1234: [{ uuid: '1234-5678-9012' }],
            },
          })
        )
        recordSource = await lastValueFrom(
          repository.saveRecord(
            simpleDatasetRecordFixture(),
            simpleDatasetRecordAsXmlFixture(),
            true
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
      it('calls the API to insert the record as XML for existing records', () => {
        expect(gn4RecordsApi.insert).toHaveBeenCalledWith(
          expect.anything(),
          undefined,
          undefined,
          undefined,
          true,
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
      it('returns the unique identifier of the record and the draft status as it was saved', () => {
        expect(recordSource).toEqual('1234-5678-9012')
      })
    })
    describe('Existing record - without reference', () => {
      beforeEach(async () => {
        ;(gn4RecordsApi.insert as jest.Mock).mockReturnValueOnce(
          of({
            metadataInfos: {
              1234: [{ uuid: '1234-5678-9012' }],
            },
          })
        )
        await lastValueFrom(repository.saveRecord(datasetRecordsFixture()[0]))
      })
      it('uses the ISO19139 converter by default', () => {
        const recordXml = (gn4RecordsApi.insert as jest.Mock).mock.calls[0][14]
        expect(recordXml).toMatch(`
    <gmd:fileIdentifier>
        <gco:CharacterString>${
          simpleDatasetRecordFixture().uniqueIdentifier
        }</gco:CharacterString>
    </gmd:fileIdentifier>`)
      })
    })
  })
  describe('record draft', () => {
    beforeEach(async () => {
      ;(gn4RecordsApi.insert as jest.Mock).mockReturnValueOnce(
        of({
          metadataInfos: {
            1234: [{ uuid: '1234-5678-9012' }],
          },
        })
      )
      // save a record, then a draft, then open the record again
      await lastValueFrom(
        repository.saveRecord(
          simpleDatasetRecordFixture(),
          simpleDatasetRecordAsXmlFixture()
        )
      )
      await lastValueFrom(
        repository.saveRecordAsDraft(
          {
            ...simpleDatasetRecordFixture(),
            title: 'The title has been modified',
          },
          simpleDatasetRecordAsXmlFixture()
        )
      )
    })
    describe('#openRecordForEdition', () => {
      it('loads the draft instead of the original one', async () => {
        const [record] = await lastValueFrom(
          repository.openRecordForEdition(
            simpleDatasetRecordFixture().uniqueIdentifier
          )
        )
        expect(record).toStrictEqual({
          ...simpleDatasetRecordFixture(),
          title: 'The title has been modified',
        })
      })
    })
    describe('#clearRecordDraft', () => {
      beforeEach(() => {
        repository.clearRecordDraft(
          simpleDatasetRecordFixture().uniqueIdentifier
        )
      })
      it('removes the record draft', async () => {
        const [record] = await lastValueFrom(
          repository.openRecordForEdition(
            simpleDatasetRecordFixture().uniqueIdentifier
          )
        )
        expect(record?.title).not.toBe('The title has been modified')
        const hasDraft = repository.recordHasDraft(
          simpleDatasetRecordFixture().uniqueIdentifier
        )

        expect(hasDraft).toBe(false)
      })
    })
    describe('#recordHasDraft', () => {
      it('returns true when there is a draft', () => {
        const hasDraft = repository.recordHasDraft(
          simpleDatasetRecordFixture().uniqueIdentifier
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
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-1',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-2',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
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

  describe('#getDraftsCount', () => {
    beforeEach(async () => {
      window.localStorage.clear()
      // save 3 drafts
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-1',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-2',
        })
      )
      await firstValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-3',
        })
      )
    })
    it('returns all drafts', async () => {
      const draftCount = await lastValueFrom(repository.getDraftsCount())
      expect(draftCount).toBe(3)
    })
  })

  describe('importRecordFromExternalFileUrlAsDraft', () => {
    const recordDownloadUrl = 'https://example.com/record/xml'
    const mockXml = simpleDatasetRecordAsXmlFixture()

    it('should fetch the external record and save it immediately', fakeAsync(() => {
      repository.duplicateExternalRecord(recordDownloadUrl).subscribe((id) => {
        expect(id).toMatch('my-dataset-001')
        expect(repository.saveRecord).toHaveBeenCalled()
      })

      const req = httpTestingController.expectOne(recordDownloadUrl)

      expect(req.request.headers.get('Accept')).toEqual(
        'text/xml,application/xml'
      )
      expect(req.request.method).toEqual('GET')

      req.flush(mockXml)

      tick()
    }))

    it('should handle an error response when fetching the external record', fakeAsync(() => {
      let errorResponse: any

      repository.duplicateExternalRecord(recordDownloadUrl).subscribe({
        error: (error) => {
          errorResponse = error
        },
      })

      const req = httpTestingController.expectOne(recordDownloadUrl)

      req.flush('Error fetching record', {
        status: 404,
        statusText: 'Not Found',
      })

      tick()

      expect(errorResponse).toBeDefined()
      expect(errorResponse.status).toBe(404)
      expect(errorResponse.statusText).toBe('Not Found')
    }))
  })

  describe('deleteRecord', () => {
    it('calls the API to delete the record by unique identifier', fakeAsync(() => {
      repository.deleteRecord('1234-5678').subscribe()

      // Simulate async passage of time
      tick()

      // Ensure the API method was called correctly
      expect(gn4RecordsApi.deleteRecord).toHaveBeenCalledWith('1234-5678')
    }))
  })

  describe('saveRecordAsDraft', () => {
    beforeEach(async () => {
      await lastValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-123',
        })
      )
    })

    it('saves the record to localStorage with the correct key', () => {
      const hasDraft = repository.recordHasDraft('DRAFT-123')
      expect(hasDraft).toBe(true)
    })

    it('emits a draft changed notification', async () => {
      const draftsChangedSpy = jest.spyOn(repository._draftsChanged, 'next')

      await lastValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-456',
        })
      )

      expect(draftsChangedSpy).toHaveBeenCalled()
    })
  })

  describe('generateTemporaryId', () => {
    it('generates a temporary ID with the correct prefix', () => {
      const tempId = repository.generateTemporaryId()
      expect(tempId).toMatch(/^TEMP-ID-\d+$/)
    })
  })

  describe('clearRecordDraft', () => {
    beforeEach(async () => {
      await lastValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-123',
        })
      )
      repository.clearRecordDraft('DRAFT-123')
    })

    it('removes the draft from localStorage', () => {
      const hasDraft = repository.recordHasDraft('DRAFT-123')
      expect(hasDraft).toBe(false)
    })

    it('emits a draft changed notification after clearing', () => {
      const draftsChangedSpy = jest.spyOn(repository._draftsChanged, 'next')
      repository.clearRecordDraft('DRAFT-123')
      expect(draftsChangedSpy).toHaveBeenCalled()
    })
  })

  describe('recordHasDraft', () => {
    it('returns true if the draft exists', async () => {
      await lastValueFrom(
        repository.saveRecordAsDraft({
          ...simpleDatasetRecordFixture(),
          uniqueIdentifier: 'DRAFT-123',
        })
      )
      expect(repository.recordHasDraft('DRAFT-123')).toBe(true)
    })

    it('returns false if the draft does not exist', () => {
      expect(repository.recordHasDraft('NON_EXISTENT_DRAFT')).toBe(false)
    })
  })

  describe('hasRecordChangedSinceDraft', () => {
    it('should return an empty array if the record is unsaved', () => {
      // Mock dependencies
      repository.recordHasDraft = jest.fn().mockReturnValue(true)

      repository
        .hasRecordChangedSinceDraft(SAMPLE_RECORD)
        .subscribe((result) => {
          expect(result).toEqual([])
        })
    })

    it('should return an empty array if there is no draft', () => {
      // Mock dependencies
      repository.recordHasDraft = jest.fn().mockReturnValue(false)

      repository
        .hasRecordChangedSinceDraft(SAMPLE_RECORD)
        .subscribe((result) => {
          expect(result).toEqual([])
        })
    })

    it('should return updated date and owner info if the recent record is newer than the draft', () => {
      const mockDrafts = [
        {
          uniqueIdentifier: 'my-dataset-001',
          recordUpdated: new Date('2023-01-01'),
        },
      ]
      const mockRecentRecord = {
        uniqueIdentifier: 'my-dataset-001',
        recordUpdated: new Date('2024-01-01'),
        extras: { ownerInfo: 'Owner|SomeDetails' },
      }

      // Mock dependencies
      repository.recordHasDraft = jest.fn().mockReturnValue(true)
      repository.getAllDrafts = jest.fn().mockReturnValue(of(mockDrafts))
      repository.getRecord = jest.fn().mockReturnValue(of(mockRecentRecord))

      repository
        .hasRecordChangedSinceDraft(SAMPLE_RECORD)
        .subscribe((result) => {
          expect(result).toEqual([expect.any(String), 'Owner'])
        })
    })

    it('should return an empty array if the draft is more recent than the recent record', () => {
      const mockDrafts = [
        {
          uniqueIdentifier: 'my-dataset-001',
          recordUpdated: new Date('2024-01-01'),
        },
      ]
      const mockRecentRecord = {
        uniqueIdentifier: 'my-dataset-001',
        recordUpdated: new Date('2023-01-01'),
      }

      // Mock dependencies
      repository.recordHasDraft = jest.fn().mockReturnValue(true)
      repository.getAllDrafts = jest.fn().mockReturnValue(of(mockDrafts))
      repository.getRecord = jest.fn().mockReturnValue(of(mockRecentRecord))

      repository
        .hasRecordChangedSinceDraft(SAMPLE_RECORD)
        .subscribe((result) => {
          expect(result).toEqual([])
        })
    })
  })
  describe('getRecordPublicationStatus', () => {
    it('should return the publication status of a record', () => {
      repository
        .getRecordPublicationStatus('my-dataset-001')
        .subscribe((publicationStatus) => {
          expect(publicationStatus).toEqual(true)
        })
    })
  })
  describe('canEditRecord', () => {
    it('should return the editing rights', () => {
      repository.canEditRecord('my-dataset-001').subscribe((canEdit) => {
        expect(canEdit).toEqual(true)
      })
    })
  })
})
