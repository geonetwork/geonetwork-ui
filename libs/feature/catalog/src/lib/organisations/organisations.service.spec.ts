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
          {
            key: 'Agence de test',
            doc_count: 5,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'test@agence.com',
                  doc_count: 3,
                },
                {
                  key: 'test2@agence.com',
                  doc_count: 1,
                },
              ],
            },
          },
          {
            key: 'Association pour le testing',
            doc_count: 1,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'testing@assoc.net',
                  doc_count: 1,
                },
              ],
            },
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
    name: 'agence de test',
    label: { eng: 'AGENCE-DE-TEST' },
    description: 'une agence',
    email: 'test@test.net',
    logo: 'logo-ag.png',
  },
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
    email: 'testing@assoc.net',
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
      it('call search service', () => {
        expect(searchApiServiceMock.search).toHaveBeenCalledWith(
          'bucket',
          JSON.stringify({
            aggregations: {
              contact: {
                nested: { path: 'contactForResource' },
                aggs: {
                  org: {
                    terms: {
                      field: 'contactForResource.organisation',
                      exclude: '',
                      size: 5000,
                      order: { _key: 'asc' },
                    },
                    aggs: {
                      mail: {
                        terms: {
                          size: 50,
                          exclude: '',
                          field: 'contactForResource.email.keyword',
                        },
                      },
                    },
                  },
                },
              },
            },
            from: 0,
            size: 0,
            query: {
              bool: {
                must: [{ terms: { isTemplate: ['n'] } }],
                must_not: {
                  terms: {
                    resourceType: [
                      'service',
                      'map',
                      'map/static',
                      'mapDigital',
                    ],
                  },
                },
                should: [],
                filter: [],
              },
            },
            _source: [],
          })
        )
      })
      it('get rough organisations', () => {
        expect(organisations).toEqual([
          {
            description: null,
            emails: ['test@agence.com', 'test2@agence.com'],
            logoUrl: null,
            name: 'Agence de test',
            recordCount: 5,
          },
          {
            description: null,
            emails: ['testing@assoc.net'],
            logoUrl: null,
            name: 'Association pour le testing',
            recordCount: 1,
          },
        ])
      })
    })
    describe('when groups tick', () => {
      beforeEach(() => {
        organisations = null
        service.hydratedOrganisations$
          .pipe(take(2))
          .subscribe((orgs) => (organisations = orgs))
      })
      it('get organisations hydrated from groups via name or email mapping', () => {
        expect(organisations).toEqual([
          {
            description: 'une agence',
            email: 'test@test.net',
            emails: ['test@agence.com', 'test2@agence.com'],
            logoUrl: '/geonetwork/images/harvesting/logo-ag.png',
            name: 'Agence de test',
            recordCount: 5,
          },
          {
            description: 'une association',
            email: 'testing@assoc.net',
            emails: ['testing@assoc.net'],
            logoUrl: '/geonetwork/images/harvesting/logo-asso.png',
            name: 'Association pour le testing',
            recordCount: 1,
          },
        ])
      })
    })
  })
  describe('#normalizeString', () => {
    it('should match "ATMO Haut de France" and "ATMO Haut-de-France"', () => {
      expect(service.normalizeString('ATMO Haut de France')).toEqual(
        service.normalizeString('ATMO Haut-de-France')
      )
    })
    it('should match "ATMO Haut de France" and "ATMOHautdeFrance"', () => {
      expect(service.normalizeString('ATMO Haut de France')).toEqual(
        service.normalizeString('ATMOHautdeFrance')
      )
    })
    it('should NOT match "ATMO Haut de France" and "ATMO HDF"', () => {
      expect(service.normalizeString('ATMO Haut de France')).not.toEqual(
        service.normalizeString('ATMO HDF')
      )
    })
  })
  describe('#compareNormalizedString', () => {
    it('should match "ATMO Haut de France" and "ATMO Haut-de-France"', () => {
      expect(
        service.equalsNormalizedStrings(
          'ATMO Haut de France',
          'ATMO Haut-de-France'
        )
      ).toBeTruthy()
    })
    it('should NOT match "ATMO Haut de France" and "ATMO Haut-de-France" (not replacing special chars)', () => {
      expect(
        service.equalsNormalizedStrings(
          'ATMO Haut de France',
          'ATMO Haut-de-France',
          false
        )
      ).toBeFalsy()
    })
    it('should match email adresses (not replacing special chars)', () => {
      expect(
        service.equalsNormalizedStrings(
          'Some.user@C2C.com',
          'some.user@c2c.com',
          false
        )
      ).toBeTruthy()
    })
  })
})
