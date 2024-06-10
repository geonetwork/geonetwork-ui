import { TestBed } from '@angular/core/testing'
import { EditorService } from './editor.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { DEFAULT_FIELDS } from '../fields.config'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { of } from 'rxjs'

const SAMPLE_RECORD: CatalogRecord = DATASET_RECORDS[0]

class RecordsRepositoryMock {
  openRecordForEdition = jest.fn(() => of(SAMPLE_RECORD))
  saveRecord = jest.fn(() => of('<xml>blabla</xml>'))
  saveRecordAsDraft = jest.fn(() => of('<xml>blabla</xml>'))
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
    let savedRecord: CatalogRecord
    beforeEach(() => {
      savedRecord = null
      service
        .saveRecord(SAMPLE_RECORD, DEFAULT_FIELDS)
        .subscribe((v) => (savedRecord = v))
    })
    it('calls recordUpdated after applying field processes', () => {
      const expected = {
        ...SAMPLE_RECORD,
        recordUpdated: expect.any(Date),
      }
      expect(repository.saveRecord).toHaveBeenCalledWith(expected)
      expect(savedRecord).toEqual([expected, '<xml>blabla</xml>'])
      expect(savedRecord.recordUpdated).not.toEqual(SAMPLE_RECORD.recordUpdated)
    })
  })

  describe('saveRecordAsDraft', () => {
    beforeEach(() => {
      service.saveRecordAsDraft(SAMPLE_RECORD).subscribe()
    })
    it('calls saveRecordAsDraft', () => {
      expect(repository.saveRecordAsDraft).toHaveBeenCalledWith(SAMPLE_RECORD)
    })
  })
})
