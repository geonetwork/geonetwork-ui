import { TestBed } from '@angular/core/testing'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { MockProvider } from 'ng-mocks'
import {
  CatalogRecord,
  Individual,
} from '@geonetwork-ui/common/domain/model/record'
import { NewRecordResolver } from './new-record.resolver'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { BehaviorSubject, of } from 'rxjs'
import {
  barbieIncOrganizationFixture,
  barbieUserFixture,
  someOrganizationsFixture,
} from '@geonetwork-ui/common/fixtures'

const user = barbieUserFixture()

class PlatformServiceInterfaceMock {
  getMe = jest.fn(() => new BehaviorSubject(user))
}

class OrganizationsServiceInterfaceMock {
  organisations$ = of(someOrganizationsFixture())
}

describe('NewRecordResolver', () => {
  let resolver: NewRecordResolver
  let resolvedData: [CatalogRecord, string, boolean]
  let recordsRepository: RecordsRepositoryInterface

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceInterfaceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganizationsServiceInterfaceMock,
        },
      ],
    })

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

    it('creates a new empty record with a pregenerated id and connected user information as contact for ressource with the point_of_contact role.', () => {
      const expectedContacts = [
        {
          firstName: user.name,
          lastName: user.surname,
          email: user.email,
          role: 'point_of_contact',
          organization: barbieIncOrganizationFixture(),
        } as Individual,
      ]

      expect(resolvedData).toMatchObject([
        {
          abstract: '',
          kind: 'dataset',
          recordUpdated: expect.any(Date),
          contactsForResource: expectedContacts,
          contacts: expectedContacts,
          status: 'ongoing',
          temporalExtents: [],
          licenses: [],
          title: expect.stringMatching(/^My new record/),
          uniqueIdentifier: null,
        } as Partial<CatalogRecord>,
        null,
        false,
      ])
    })
  })
})
