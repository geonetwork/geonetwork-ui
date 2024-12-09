import { TestBed } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { DEFAULT_CONFIGURATION } from '../fields.config'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { firstValueFrom, of } from 'rxjs'

const SAMPLE_RECORD: CatalogRecord = datasetRecordsFixture()[0]

class RecordsRepositoryMock {
  openRecordForEdition = jest.fn(() =>
    of([
      { ...SAMPLE_RECORD, recordUpdated: new Date() },
      '<xml>blabla</xml>',
      false,
    ])
  )
  saveRecord = jest.fn(() => of('<xml>blabla</xml>'))
  saveRecordAsDraft = jest.fn(() => of('<xml>blabla</xml>'))
  clearRecordDraft = jest.fn()
}

describe('EditorService', () => {
  let service: EditorService
  let http: HttpTestingController
  let repository: RecordsRepositoryInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    })
    service = TestBed.inject(EditorService)
    http = TestBed.inject(HttpTestingController)
    repository = TestBed.inject(RecordsRepositoryInterface)
  })

  afterEach(() => {
    http.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('saveRecord', () => {
    let savedRecord: [CatalogRecord, string]
    beforeEach(async () => {
      savedRecord = await firstValueFrom(
        service.saveRecord(
          SAMPLE_RECORD,
          '<xml>blabla</xml>',
          DEFAULT_CONFIGURATION
        )
      )
    })
    it('calls repository.saveRecord and repository.clearRecordDraft', () => {
      const expected = {
        ...SAMPLE_RECORD,
        recordUpdated: expect.any(Date),
      }
      expect(repository.saveRecord).toHaveBeenCalledWith(
        expected,
        '<xml>blabla</xml>'
      )
      expect(repository.clearRecordDraft).toHaveBeenCalledWith(
        SAMPLE_RECORD.uniqueIdentifier
      )
      expect(savedRecord).toEqual([expected, '<xml>blabla</xml>'])
    })
    it('applies field processes (update date in record)', () => {
      const arg = (repository.saveRecord as jest.Mock).mock.calls[0][0]
      expect(arg.recordUpdated).not.toEqual(SAMPLE_RECORD.recordUpdated)
    })
    describe('if a new one has to be generated', () => {
      beforeEach(() => {
        service
          .saveRecord(
            SAMPLE_RECORD,
            '<xml>blabla</xml>',
            DEFAULT_CONFIGURATION,
            true
          )
          .subscribe()
      })
      it('clears the unique identifier of the record', () => {
        const expected = {
          ...SAMPLE_RECORD,
          recordUpdated: expect.any(Date),
          uniqueIdentifier: null,
        }
        expect(repository.saveRecord).toHaveBeenCalledWith(
          expected,
          '<xml>blabla</xml>'
        )
      })
    })
  })

  describe('saveRecordAsDraft', () => {
    beforeEach(() => {
      service.saveRecordAsDraft(SAMPLE_RECORD, '<xml>blabla</xml>').subscribe()
    })
    it('calls saveRecordAsDraft', () => {
      expect(repository.saveRecordAsDraft).toHaveBeenCalledWith(
        SAMPLE_RECORD,
        '<xml>blabla</xml>'
      )
    })
  })
})
