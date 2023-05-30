import { TestBed } from '@angular/core/testing'
import { firstValueFrom, of } from 'rxjs'
import { take } from 'rxjs/operators'
import { OrganisationsFromGroupsService } from './organisations-from-groups.service'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import {
  ES_FIXTURE_FULL_RESPONSE,
  GROUPS_FIXTURE,
} from '@geonetwork-ui/util/shared/fixtures'
import { MetadataRecord, Organisation } from '@geonetwork-ui/util/shared'

const groupsAggregationMock = {
  aggregations: {
    groups: {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
      buckets: [
        {
          key: '34838580',
          doc_count: 80,
        },
        {
          key: '27',
          doc_count: 50,
        },
        {
          key: '22',
          doc_count: 20,
        },
      ],
    },
  },
}

const sampleOrgA: Organisation = {
  email: 'reto.jau@koeniz.ch',
  logoUrl: '/geonetwork/images/harvesting/gemeinde_koeniz_weiss.png',
  name: 'Municipalité de Köniz',
  recordCount: 80,
  description: 'A description for Köniz Municipality',
}
const sampleOrgB: Organisation = {
  email: 'christian.meier@bakom.admin.ch',
  logoUrl: '/geonetwork/images/harvesting/bakom.png',
  name: 'Office fédéral de la communication OFCOM',
  recordCount: 50,
}
const sampleOrgC: Organisation = {
  email: 'rolf.giezendanner@are.admin.ch',
  logoUrl:
    '/geonetwork/images/harvesting/047a5cb4-b942-41dc-9ffa-ffd229da064d.png',
  name: 'Office fédéral du développement territorial ARE',
  recordCount: 20,
  description: 'A description for ARE',
}

class SearchApiServiceMock {
  search = jest.fn(() => of(groupsAggregationMock))
}

class GoupsApiServiceMock {
  getGroups = jest.fn(() => of(GROUPS_FIXTURE))
}

class TranslateServiceMock {
  currentLang = 'fr'
  get = jest.fn((key) => of(key))
}

describe('OrganisationsFromGroupsService', () => {
  let service: OrganisationsFromGroupsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganisationsFromGroupsService,
        {
          provide: GroupsApiService,
          useClass: GoupsApiServiceMock,
        },
        {
          provide: SearchApiService,
          useClass: SearchApiServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    })
    service = TestBed.inject(OrganisationsFromGroupsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('organisations$', () => {
    let organisations
    beforeEach(() => {
      organisations = null
      service.organisations$
        .pipe(take(2))
        .subscribe((orgs) => (organisations = orgs))
    })
    it('get organisations with record count', () => {
      expect(organisations).toEqual([sampleOrgA, sampleOrgB, sampleOrgC])
    })
  })
  describe('#getFiltersForOrgs', () => {
    let filters
    beforeEach(async () => {
      filters = await firstValueFrom(
        service.getFiltersForOrgs([sampleOrgA, sampleOrgB])
      )
    })
    it('generates filters', () => {
      expect(filters).toEqual({
        groupOwner: { '34838580': true, '27': true },
      })
    })
  })
  describe('#getOrgsFromFilters', () => {
    let orgs
    beforeEach(async () => {
      orgs = await firstValueFrom(
        service.getOrgsFromFilters({
          groupOwner: {
            '34838580': true, // org A
            '27': true, // org B
          },
        })
      )
    })
    it('generates filters', () => {
      expect(orgs).toEqual([sampleOrgB, sampleOrgA])
    })
  })
  describe('#addOrganisationToRecordFromSource', () => {
    let record
    beforeEach(async () => {
      const source = {
        ...ES_FIXTURE_FULL_RESPONSE.hits.hits[0]._source,
        groupOwner: '34838580',
      }
      record = await firstValueFrom(
        service.addOrganisationToRecordFromSource(source, {
          title: 'Surval - Données par paramètre',
          uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        } as MetadataRecord)
      )
    })
    it('adds contacts to the record (using the groups)', () => {
      expect(record).toMatchObject({
        title: 'Surval - Données par paramètre',
        uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        contact: {
          email: 'reto.jau@koeniz.ch',
          logoUrl:
            'http://localhost/geonetwork/images/harvesting/gemeinde_koeniz_weiss.png',
          name: 'Municipalité de Köniz',
          organisation: 'Municipalité de Köniz',
          website: 'https://www.koeniz.ch/',
        },
        resourceContacts: [
          {
            email: 'reto.jau@koeniz.ch',
            logoUrl:
              'http://localhost/geonetwork/images/harvesting/gemeinde_koeniz_weiss.png',
            name: 'Municipalité de Köniz',
            organisation: 'Municipalité de Köniz',
            website: 'https://www.koeniz.ch/',
          },
          {
            email: 'q2_support@ifremer.fr',
            logoUrl:
              'http://localhost/geonetwork/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
            name: "Cellule d'Administration Quadrige",
            organisation: 'Ifremer',
          },
          {
            email: 'q2_support@ifremer.fr',
            logoUrl:
              'http://localhost/geonetwork/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
            name: 'Quadrige',
            organisation: 'Ifremer',
          },
          {
            email: 'q2_support@ifremer.fr',
            logoUrl:
              'http://localhost/geonetwork/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
            name: 'Quadrige',
            organisation: 'Ifremer',
          },
        ],
      })
    })
  })
})
