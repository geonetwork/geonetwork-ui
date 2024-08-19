import { TestBed } from '@angular/core/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { MockProvider } from 'ng-mocks'
import { NewRecordResolver } from './new-record.resolver'

describe('NewRecordResolver', () => {
  let resolver: NewRecordResolver
  let resolvedData: [CatalogRecord, string, boolean]
  let recordsRepository: RecordsRepositoryInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(RecordsRepositoryInterface)],
    })
    resolver = TestBed.inject(NewRecordResolver)
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('new record', () => {
    beforeEach(() => {
      recordsRepository.generateTemporaryId = jest.fn(() => 'TEMP-ID-123')
      resolvedData = undefined
      resolver.resolve().subscribe((r) => (resolvedData = r))
      recordsRepository.generateTemporaryId = jest.fn(() => 'TEMP-ID-123')
    })
    it('creates a new empty record with a pregenerated id', () => {
      expect(resolvedData).toMatchObject([
        {
          abstract: '',
          kind: 'dataset',
          recordUpdated: expect.any(Date),
          status: 'ongoing',
          temporalExtents: [],
          title: expect.stringMatching(/^My new record/),
          uniqueIdentifier: 'TEMP-ID-123',
        },
        null,
        false,
      ])
    })
  })
})
