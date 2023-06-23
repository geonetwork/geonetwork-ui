import { TestBed } from '@angular/core/testing'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, lastValueFrom, of } from 'rxjs'
import { take } from 'rxjs/operators'
import { OrganisationsFromMetadataService } from './organisations-from-metadata.service'
import {
  ES_FIXTURE_FULL_RESPONSE,
  GROUPS_FIXTURE,
} from '@geonetwork-ui/util/shared/fixtures'
import { MetadataRecord, Organisation } from '@geonetwork-ui/util/shared'

const sampleOrgA: Organisation = {
  description: 'A description for ARE',
  emails: ['rolf.giezendanner@are.admin.ch', 'john.doe@are.admin.ch'],
  email: 'rolf.giezendanner@are.admin.ch',
  logoUrl:
    '/geonetwork/images/harvesting/047a5cb4-b942-41dc-9ffa-ffd229da064d.png',
  name: 'ARE',
  recordCount: 5,
}
const sampleOrgB: Organisation = {
  emails: ['christian.meier@bakom.admin.ch'],
  email: 'christian.meier@bakom.admin.ch',
  logoUrl: '/geonetwork/images/harvesting/bakom.png',
  name: 'BAKOM',
  recordCount: 1,
  description: null,
}

const organisationsAggregationMock = {
  aggregations: {
    contact: {
      org: {
        buckets: [
          {
            key: 'ARE',
            doc_count: 5,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'rolf.giezendanner@are.admin.ch',
                  doc_count: 3,
                },
                {
                  key: 'john.doe@are.admin.ch',
                  doc_count: 1,
                },
              ],
            },
          },
          {
            key: 'BAKOM',
            doc_count: 1,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'christian.meier@bakom.admin.ch',
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

class SearchApiServiceMock {
  search = jest.fn(() => of(organisationsAggregationMock))
}

class GoupsApiServiceMock {
  getGroups = jest.fn(() => of(GROUPS_FIXTURE))
}

describe('OrganisationsFromMetadataService', () => {
  let service: OrganisationsFromMetadataService
  let searchService: SearchApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganisationsFromMetadataService,
        {
          provide: GroupsApiService,
          useClass: GoupsApiServiceMock,
        },
        {
          provide: SearchApiService,
          useClass: SearchApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(OrganisationsFromMetadataService)
    searchService = TestBed.inject(SearchApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('organisations$', () => {
    let organisations
    describe('initially', () => {
      beforeEach(() => {
        service.organisations$
          .pipe(take(1))
          .subscribe((orgs) => (organisations = orgs))
      })
      it('call search service', () => {
        expect(searchService.search).toHaveBeenCalledWith(
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
            emails: ['rolf.giezendanner@are.admin.ch', 'john.doe@are.admin.ch'],
            logoUrl: null,
            name: 'ARE',
            recordCount: 5,
          },
          {
            description: null,
            emails: ['christian.meier@bakom.admin.ch'],
            logoUrl: null,
            name: 'BAKOM',
            recordCount: 1,
          },
        ])
      })
    })
    describe('when groups tick', () => {
      beforeEach(() => {
        organisations = null
        service.organisations$
          .pipe(take(2))
          .subscribe((orgs) => (organisations = orgs))
      })
      it('get organisations hydrated from groups via name or email mapping', () => {
        expect(organisations).toEqual([sampleOrgA, sampleOrgB])
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
  describe('#getFiltersForOrgs', () => {
    let filters
    beforeEach(async () => {
      filters = await firstValueFrom(
        service.getFiltersForOrgs([sampleOrgA, sampleOrgB])
      )
    })
    it('generates filters', () => {
      expect(filters).toEqual({
        OrgForResource: { ARE: true, BAKOM: true },
      })
    })
  })
  describe('#getOrgsFromFilters', () => {
    let orgs
    beforeEach(async () => {
      orgs = await lastValueFrom(
        service.getOrgsFromFilters({
          OrgForResource: {
            ARE: true, // org A
            BAKOM: true, // org B
          },
        })
      )
    })
    it('generates filters', () => {
      expect(orgs).toEqual([sampleOrgA, sampleOrgB])
    })
  })
  describe('#addOrganisationToRecordFromSource', () => {
    let record
    beforeEach(async () => {
      const source = {
        ...ES_FIXTURE_FULL_RESPONSE.hits.hits[0]._source,
      }
      record = await lastValueFrom(
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
          name: "Cellule d'administration Quadrige",
          organisation: 'Ifremer',
          email: 'q2suppor@ifremer.fr',
          website: 'https://www.ifremer.fr/',
          logoUrl:
            'http://localhost/geonetwork/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
        },
        resourceContacts: [
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
