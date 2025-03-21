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
import { TranslateService } from '@ngx-translate/core'
import { NOT_KNOWN_CONSTRAINT } from '@geonetwork-ui/feature/editor'

class TranslateServiceMock {
  instant = jest.fn((key: string) => key)
}

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
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    })

    TestBed.configureTestingModule({
      providers: [MockProvider(RecordsRepositoryInterface)],
    })
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

    it('creates a new empty record with connected user information as contact for ressource with the point_of_contact role.', () => {
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
          legalConstraints: [NOT_KNOWN_CONSTRAINT],
          licenses: [],
          title: 'editor.new.record.title',
          uniqueIdentifier: null,
        } as Partial<CatalogRecord>,
        null,
        false,
      ])
    })
  })
})
