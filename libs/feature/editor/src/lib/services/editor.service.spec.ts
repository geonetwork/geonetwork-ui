import { TestBed } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
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
      beforeEach(() => {
        service.saveRecord(SAMPLE_RECORD).subscribe()
      })
      it('sends the record as XML to the API', () => {
        http.expectOne(
          (req) => req.method === 'PUT' && req.url.indexOf('/records') > -1
        )
      })
    })
  })
})
