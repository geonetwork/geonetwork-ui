import { TestBed } from '@angular/core/testing'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { of } from 'rxjs'

import { OrganisationsService } from './organisations.service'

const organisationsAggregationMock = {
  aggregations: {
    org: {
      buckets: [
        { key: 'Agence de test', doc_count: 5 },
        { key: 'Association pour le testing', doc_count: 3 },
      ],
    },
  },
}

const searchApiServiceMock = {
  search: jest.fn(() => of(organisationsAggregationMock)),
}

const groupsApiMock = [
  {
    name: 'agence',
    label: { eng: 'AGENCE-DE-TEST' },
    description: 'une agence',
    logo: 'logo-ag.png',
  },
  {
    name: 'association',
    label: { eng: 'Association National du testing' },
    description: 'une association',
    logo: 'logo-asso.png',
  },
]

const groupsApiServiceMock = {
  getGroups: jest.fn(() => of(groupsApiMock)),
}

describe('OrganisationsService', () => {
  let service: OrganisationsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchApiService,
          useValue: searchApiServiceMock,
        },
        {
          provide: GroupsApiService,
          useValue: groupsApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(OrganisationsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('#getOrganisationsWithGroups', () => {
    let organisations
    beforeEach(() => {
      service
        .getOrganisationsWithGroups()
        .subscribe((orgs) => (organisations = orgs))
    })
    it('should get organisations, enriching first one with description, logoUrl from groups', () => {
      expect(organisations).toEqual([
        {
          name: 'Agence de test',
          description: 'une agence',
          logoUrl: '/geonetwork/images/harvesting/logo-ag.png',
          recordCount: 5,
        },
        {
          name: 'Association pour le testing',
          description: undefined,
          logoUrl: undefined,
          recordCount: 3,
        },
      ])
    })
  })
  describe('#normalizeName', () => {
    it('should match "ATMO Haut de France" and "ATMO Haut-de-France"', () => {
      expect(service.normalizeName('ATMO Haut de France')).toEqual(
        service.normalizeName('ATMO Haut-de-France')
      )
    })
    it('should match "ATMO Haut de France" and "ATMOHautdeFrance"', () => {
      expect(service.normalizeName('ATMO Haut de France')).toEqual(
        service.normalizeName('ATMOHautdeFrance')
      )
    })
    it('should NOT match "ATMO Haut de France" and "ATMO HDF"', () => {
      expect(service.normalizeName('ATMO Haut de France')).not.toEqual(
        service.normalizeName('ATMO HDF')
      )
    })
  })
})
