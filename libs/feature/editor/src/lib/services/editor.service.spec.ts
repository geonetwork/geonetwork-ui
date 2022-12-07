import { TestBed } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord, RecordStatus } from '@geonetwork-ui/metadata-converter'
import { readFirst } from '@nrwl/angular/testing'

const SAMPLE_RECORD: any = {
  uniqueIdentifier: '1234-5678',
  kind: 'dataset',
  title: 'my title',
  abstract: 'my abstract',
  status: RecordStatus.ON_GOING,
}

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

  describe('setCurrentRecord', () => {
    let fields
    beforeEach(async () => {
      service.setCurrentRecord(SAMPLE_RECORD)
      fields = await readFirst(service.fields$)
    })
    it('updates the fields$ values', () => {
      expect(fields).toEqual([
        {
          config: expect.objectContaining({
            model: 'title',
            type: 'text',
          }),
          value: 'my title',
        },
        {
          config: expect.objectContaining({
            model: 'abstract',
            type: 'rich',
          }),
          value: 'my abstract',
        },
        {
          config: expect.objectContaining({
            model: 'uniqueIdentifier',
            type: 'text',
          }),
          value: '1234-5678',
        },
      ])
    })
  })
})
