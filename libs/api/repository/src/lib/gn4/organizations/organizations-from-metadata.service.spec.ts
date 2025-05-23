import { TestBed } from '@angular/core/testing'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, lastValueFrom, of } from 'rxjs'
import { take } from 'rxjs/operators'
import { OrganizationsFromMetadataService } from './organizations-from-metadata.service'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import {
  elasticFullResponseFixture,
  groupsFixture,
} from '@geonetwork-ui/common/fixtures'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TranslateService } from '@ngx-translate/core'

const sampleOrgA: Organization = {
  description: 'A description for ARE',
  logoUrl: new URL(
    'http://localhost/geonetwork/images/harvesting/047a5cb4-b942-41dc-9ffa-ffd229da064d.png'
  ),
  name: 'ARE',
  recordCount: 5,
  website: new URL('http://www.are.admin.ch/'),
  email: 'rolf.giezendanner@are.admin.ch',
}
const sampleOrgB: Organization = {
  logoUrl: new URL('http://localhost/geonetwork/images/harvesting/bakom.png'),
  name: 'BAKOM',
  recordCount: 2,
  website: new URL('http://www.bakom.admin.ch/'),
  email: 'christian.meier@bakom.admin.ch',
}
const sampleOrgC: Organization = {
  logoUrl: new URL('http://localhost/geonetwork/images/harvesting/ifremer.png'),
  name: 'Ifremer',
  recordCount: 1,
  description: "Institut français de recherche pour l'exploitation de la mer",
  website: new URL('https://www.ifremer.fr/'),
  email: 'ifremer.ifremer@ifremer.admin.fr',
}

let geonetworkVersion: string

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
            logoUrl: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [],
            },
          },
          {
            key: 'BAKOM',
            doc_count: 17,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'christian.meier@bakom.admin.ch',
                  doc_count: 17,
                },
              ],
            },
            logoUrl: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'https://ids.fr/geonetwork/images/harvesting/logo_min.png',
                  doc_count: 1,
                },
              ],
            },
          },
          {
            key: 'Ifremer',
            doc_count: 1,
            mail: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [
                {
                  key: 'ifremer.ifremer@ifremer.admin.ch',
                  doc_count: 1,
                },
              ],
            },
            logoUrl: {
              doc_count_error_upper_bound: 0,
              sum_other_doc_count: 0,
              buckets: [],
            },
          },
        ],
      },
    },
    orgForResource: {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
      buckets: [
        {
          key: 'ARE',
          doc_count: 5,
        },
        {
          key: 'BAKOM',
          doc_count: 2,
        },
        {
          key: 'IFremerWrongName',
          doc_count: 17,
        },
      ],
    },
  },
}

class SearchApiServiceMock {
  search = jest.fn(() => of(organisationsAggregationMock))
}

class GroupsApiServiceMock {
  getGroups = jest.fn(() => of(groupsFixture()))
}

class Gn4PlatformServiceMock {
  getApiVersion = jest.fn(() => of(geonetworkVersion))
}

class TranslateServiceMock {
  currentLang = 'de'
}

describe.each(['4.2.2-00', '4.2.3-xx', '4.2.5-xx'])(
  'OrganizationsFromMetadataService (gn v%s)',
  (gnVersion) => {
    let service: OrganizationsFromMetadataService
    let searchService: SearchApiService

    beforeEach(() => {
      geonetworkVersion = gnVersion
    })

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          OrganizationsFromMetadataService,
          {
            provide: GroupsApiService,
            useClass: GroupsApiServiceMock,
          },
          {
            provide: SearchApiService,
            useClass: SearchApiServiceMock,
          },
          {
            provide: TranslateService,
            useClass: TranslateServiceMock,
          },
          {
            provide: PlatformServiceInterface,
            useClass: Gn4PlatformServiceMock,
          },
        ],
      })
      service = TestBed.inject(OrganizationsFromMetadataService)
      searchService = TestBed.inject(SearchApiService)
    })

    it('should be created', () => {
      expect(service).toBeTruthy()
    })

    let contactOrgField: string
    let orgField: string
    let emailField: string

    beforeEach(() => {
      contactOrgField = geonetworkVersion.startsWith('4.2.2')
        ? 'organisation'
        : 'organisationObject.default.keyword'
      orgField = geonetworkVersion.startsWith('4.2.2')
        ? 'OrgForResource'
        : 'OrgForResourceObject.default'
      emailField = geonetworkVersion.startsWith('4.2.5')
        ? 'email'
        : 'email.keyword'
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
            null,
            JSON.stringify({
              aggregations: {
                contact: {
                  nested: { path: 'contactForResource' },
                  aggs: {
                    org: {
                      terms: {
                        field: `contactForResource.${contactOrgField}`,
                        exclude: '',
                        size: 5000,
                        order: { _key: 'asc' },
                      },
                      aggs: {
                        mail: {
                          terms: {
                            size: 50,
                            exclude: '',
                            field: `contactForResource.${emailField}`,
                          },
                        },
                        logoUrl: {
                          terms: {
                            size: 1,
                            exclude: '',
                            field: `contactForResource.logo.keyword`,
                          },
                        },
                      },
                    },
                  },
                },
                orgForResource: {
                  terms: {
                    size: 5000,
                    exclude: '',
                    field: orgField,
                    order: {
                      _key: 'asc',
                    },
                  },
                },
              },
              from: 0,
              size: 0,
              query: {
                bool: {
                  must: [],
                  must_not: [
                    {
                      query_string: {
                        query:
                          'resourceType:featureCatalog AND !resourceType:dataset AND !cl_level.key:dataset',
                      },
                    },
                  ],
                  should: [],
                  filter: [{ terms: { isTemplate: ['n'] } }],
                },
              },
            })
          )
        })
        it('get rough organisations', () => {
          expect(organisations).toEqual([
            {
              emails: [
                'rolf.giezendanner@are.admin.ch',
                'john.doe@are.admin.ch',
              ],
              name: 'ARE',
              recordCount: 5,
            },
            {
              emails: ['christian.meier@bakom.admin.ch'],
              logoUrl: new URL(
                'https://ids.fr/geonetwork/images/harvesting/logo_min.png'
              ),
              name: 'BAKOM',
              recordCount: 2,
            },
            {
              emails: ['ifremer.ifremer@ifremer.admin.ch'],
              name: 'Ifremer',
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
          expect(organisations).toEqual([sampleOrgA, sampleOrgB, sampleOrgC])
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
          service.getFiltersForOrgs([sampleOrgA, sampleOrgB, sampleOrgC])
        )
      })
      it('generates filters', () => {
        expect(filters).toEqual({
          [orgField]: { ARE: true, BAKOM: true, Ifremer: true },
        })
      })
    })
    describe('#getOrgsFromFilters', () => {
      let orgs
      beforeEach(async () => {
        orgs = await lastValueFrom(
          service.getOrgsFromFilters({
            [orgField]: {
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
    describe('#addOrganizationToRecordFromSource', () => {
      let record
      beforeEach(async () => {
        const source = {
          ...elasticFullResponseFixture().hits.hits[0]._source,
        }
        record = await lastValueFrom(
          service.addOrganizationToRecordFromSource(source, {
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          } as CatalogRecord)
        )
      })
      it('adds an owner organization to the record (using the org of the first resource contact)', () => {
        expect(record).toMatchObject({
          title: 'Surval - Données par paramètre',
          uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          ownerOrganization: {
            logoUrl: new URL(
              'http://localhost/geonetwork/images/harvesting/ifremer.png'
            ),
            name: 'Ifremer',
            description:
              "Institut français de recherche pour l'exploitation de la mer",
          },
        })
      })
      describe('when no resource contacts', () => {
        beforeEach(async () => {
          const source = {
            ...elasticFullResponseFixture().hits.hits[0]._source,
            contactForResource: [],
          }
          record = await lastValueFrom(
            service.addOrganizationToRecordFromSource(source, {
              title: 'Surval - Données par paramètre',
              uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            } as CatalogRecord)
          )
        })
        it('uses the contacts array', () => {
          expect(record).toMatchObject({
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            ownerOrganization: {
              logoUrl: new URL(
                'http://localhost/geonetwork/images/harvesting/ifremer.png'
              ),
              name: 'Ifremer',
              description:
                "Institut français de recherche pour l'exploitation de la mer",
            },
          })
        })
      })
      describe('when no logoUrl can be found by organisation name/email matching', () => {
        beforeEach(async () => {
          const source = {
            ...elasticFullResponseFixture().hits.hits[0]._source,
            contactForResource: [
              {
                organisation: 'WrongIfremerName',
                role: 'pointOfContact',
                email: '',
                website: '',
                logo: '',
                individual: "Cellule d'Administration Quadrige",
                position: '',
                phone: '',
                address: '',
              },
            ],
            contact: [
              {
                organisation: 'WrongIfremerName',
                role: 'pointOfContact',
                email: '',
                website: 'https://www.ifremer.fr',
                logo: '',
                individual: "Cellule d'administration Quadrige",
                position: "Cellule d'administration Quadrige",
                phone: '',
                address: '',
              },
            ],
          }
          record = await lastValueFrom(
            service.addOrganizationToRecordFromSource(source, {
              title: 'Surval - Données par paramètre',
              uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            } as CatalogRecord)
          )
        })
        it('gets logoUrl from group', async () => {
          expect(record.ownerOrganization.logoUrl).toEqual(
            new URL('http://localhost/geonetwork/images/harvesting/ifremer.png')
          )
        })
      })
    })
  }
)
