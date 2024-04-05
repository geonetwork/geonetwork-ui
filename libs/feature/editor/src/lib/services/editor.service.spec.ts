import { TestBed } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { DEFAULT_FIELDS } from '../fields.config'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

const SAMPLE_RECORD: CatalogRecord = DATASET_RECORDS[0]

describe('EditorService', () => {
  let service: EditorService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    })
    service = TestBed.inject(EditorService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    http.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('loadRecordByUuid', () => {
    let record: CatalogRecord
    beforeEach(() => {
      service.loadRecordByUuid('1234-5678').subscribe((v) => (record = v))
      http.expectOne(
        (req) => req.url.indexOf('/records/1234-5678/formatters/xml') > -1
      ).flush(`
<gmd:MD_Metadata>
    <gmd:fileIdentifier>
        <gco:CharacterString>1234-5678</gco:CharacterString>
    </gmd:fileIdentifier>
</gmd:MD_Metadata>`)
    })
    it('parses the XML record into a native object', () => {
      expect(record).toMatchObject({ uniqueIdentifier: '1234-5678' })
    })
  })

  describe('saveRecord', () => {
    describe('after a record was set as current', () => {
      let savedRecord: CatalogRecord
      beforeEach(() => {
        service
          .saveRecord(SAMPLE_RECORD, DEFAULT_FIELDS)
          .subscribe((v) => (savedRecord = v))
      })
      it('sends a record as XML to the API after applying field processes', () => {
        const match = http.expectOne(
          (req) => req.method === 'PUT' && req.url.indexOf('/records') > -1
        )
        match.flush('ok')
        expect(match.request.body).toContain(`
    <gmd:fileIdentifier>
        <gco:CharacterString>${SAMPLE_RECORD.uniqueIdentifier}</gco:CharacterString>
    </gmd:fileIdentifier>`)
        expect(savedRecord).toEqual({
          ...SAMPLE_RECORD,
          recordUpdated: expect.any(Date),
        })
        expect(savedRecord.recordUpdated).not.toEqual(
          SAMPLE_RECORD.recordUpdated
        )
      })
    })
  })
})
