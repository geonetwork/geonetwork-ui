import { TestBed } from '@angular/core/testing'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { of } from 'rxjs'
import { take } from 'rxjs/operators'
import { GroupService } from '../group/group.service'

import { OrganisationsService } from './organisations.service'

const organisationsAggregationMock = {
  aggregations: {
    contact: {
      org: {
        buckets: [
          { key: ['Agence de test', 'test@agence.com'], doc_count: 5 },
          {
            key: ['Association pour le testing', 'testing@assoc.net'],
            doc_count: 3,
          },
        ],
      },
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

const groupServiceMock = {
  groups$: of(groupsApiMock),
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
          provide: GroupService,
          useValue: groupServiceMock,
        },
      ],
    })
    service = TestBed.inject(OrganisationsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('hydratedOrganisations$', () => {
    let organisations
    describe('initially', () => {
      beforeEach(() => {
        service.hydratedOrganisations$
          .pipe(take(1))
          .subscribe((orgs) => (organisations = orgs))
      })
      it('get rough organisations', () => {
        expect(organisations).toEqual([
          {
            name: 'Agence de test',
            email: 'test@agence.com',
            description: null,
            logoUrl: null,
            recordCount: 5,
          },
          {
            name: 'Association pour le testing',
            email: 'testing@assoc.net',
            description: null,
            logoUrl: null,
            recordCount: 3,
          },
        ])
      })
    })
    describe('when users tick', () => {
      beforeEach(() => {
        service.hydratedOrganisations$
          .pipe(take(2))
          .subscribe((orgs) => (organisations = orgs))
      })
      it('get organisations hydrated from groups ', () => {
        expect(organisations).toEqual([
          {
            name: 'Agence de test',
            description: 'une agence',
            email: 'test@agence.com',
            logoUrl: '/geonetwork/images/harvesting/logo-ag.png',
            recordCount: 5,
          },
          {
            name: 'Association pour le testing',
            email: 'testing@assoc.net',
            description: undefined,
            logoUrl: undefined,
            recordCount: 3,
          },
        ])
      })
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
