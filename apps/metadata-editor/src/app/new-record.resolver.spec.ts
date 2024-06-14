import { TestBed } from '@angular/core/testing'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NewRecordResolver } from './new-record.resolver'

describe('NewRecordResolver', () => {
  let resolver: NewRecordResolver
  let resolvedData: [CatalogRecord, string, boolean]

  beforeEach(() => {
    TestBed.configureTestingModule({})
    resolver = TestBed.inject(NewRecordResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('new record', () => {
    beforeEach(() => {
      resolvedData = undefined
      resolver.resolve().subscribe((r) => (resolvedData = r))
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
          uniqueIdentifier: expect.stringMatching(/^TEMP-ID-/),
        },
        null,
        false,
      ])
    })
  })
})
