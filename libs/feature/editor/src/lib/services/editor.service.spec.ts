import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'
import { firstValueFrom } from 'rxjs'

const SAMPLE_RECORD: CatalogRecord = {
  uniqueIdentifier: '1234-5678',
  kind: 'dataset',
  title: 'my title',
  abstract: 'my abstract',
  status: 'ongoing',
  contacts: [],
  contactsForResource: [],
  ownerOrganization: {
    name: 'bla',
  },
  lineage: '',
  licenses: [],
  recordUpdated: new Date(),
  accessConstraints: [],
  keywords: [],
  themes: [],
  useLimitations: [],
  updateFrequency: 'unknown',
  overviews: [],
  distributions: [],
  spatialExtents: [],
  temporalExtents: [],
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
      fields = await firstValueFrom(service.fields$)
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

  describe('saveCurrentRecord', () => {
    describe('after a record was set as current', () => {
      beforeEach(fakeAsync(() => {
        service.setCurrentRecord(SAMPLE_RECORD)
        service.saveCurrentRecord().subscribe()
        tick()
      }))
      it('sends the record as XML to the API', () => {
        http.expectOne(
          (req) => req.method === 'PUT' && req.url.indexOf('/records') > -1
        )
      })
    })
    describe('when no record was set as current', () => {
      it('throws an error', async () => {
        await expect(
          service.saveCurrentRecord().toPromise()
        ).rejects.toThrowError('Save record failed')
      })
    })
  })
})
