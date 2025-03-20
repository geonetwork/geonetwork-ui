import { TestBed } from '@angular/core/testing'
import { firstValueFrom, of } from 'rxjs'
import { OrganizationsFromGroupsService } from './organizations-from-groups.service'
import {
  GroupsApiService,
  SearchApiService,
} from '@geonetwork-ui/data-access/gn4'
import { TranslateService } from '@ngx-translate/core'
import {
  CatalogRecord,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import {
  elasticFullResponseFixture,
  groupsFixture,
} from '@geonetwork-ui/common/fixtures'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
import { ElasticsearchService } from '../elasticsearch'

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
        {
          key: '-1', // this has no matching group
          doc_count: 8,
        },
      ],
    },
  },
}

const sampleOrgA: Organization = {
  logoUrl: new URL(
    'http://localhost/geonetwork/images/harvesting/gemeinde_koeniz_weiss.png'
  ),
  name: 'Municipalité de Köniz',
  recordCount: 80,
  description: 'A description for Köniz Municipality',
  website: new URL('https://www.koeniz.ch/'),
  email: 'reto.jau@koeniz.ch',
}
const sampleOrgB: Organization = {
  logoUrl: new URL('http://localhost/geonetwork/images/harvesting/bakom.png'),
  name: 'Office fédéral de la communication OFCOM',
  recordCount: 50,
  website: new URL('http://www.bakom.admin.ch/'),
  email: 'christian.meier@bakom.admin.ch',
}
const sampleOrgC: Organization = {
  logoUrl: new URL(
    'http://localhost/geonetwork/images/harvesting/047a5cb4-b942-41dc-9ffa-ffd229da064d.png'
  ),
  name: 'Office fédéral du développement territorial ARE',
  recordCount: 20,
  description: 'A description for ARE',
  website: new URL('http://www.are.admin.ch/'),
  email: 'rolf.giezendanner@are.admin.ch',
}

const configFilters: FieldFilters = {
  resourceType: {
    service: false,
    map: false,
    'map/static': false,
    mapDigital: false,
  },
}

class SearchApiServiceMock {
  search = jest.fn(() => of(groupsAggregationMock))
}

class GoupsApiServiceMock {
  getGroups = jest.fn(() => of(groupsFixture()))
}

class TranslateServiceMock {
  currentLang = 'fr'
  get = jest.fn((key) => of(key))
}
class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn((...args) => args)
}

describe('OrganizationsFromGroupsService', () => {
  let service: OrganizationsFromGroupsService
  let searchApiService: SearchApiServiceMock
  let esService: ElasticsearchServiceMock

  beforeEach(() => {
    searchApiService = new SearchApiServiceMock()
    esService = new ElasticsearchServiceMock()
    TestBed.configureTestingModule({
      providers: [
        OrganizationsFromGroupsService,
        {
          provide: GroupsApiService,
          useClass: GoupsApiServiceMock,
        },
        {
          provide: SearchApiService,
          useValue: searchApiService,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: ElasticsearchService,
          useValue: esService,
        },
      ],
    })
    service = TestBed.inject(OrganizationsFromGroupsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('organisations$', () => {
    it('get organisations with record count', () => {
      let organisations = null
      service.getOrganisations({}).subscribe((orgs) => (organisations = orgs))
      expect(organisations).toEqual([sampleOrgA, sampleOrgB, sampleOrgC])
    })
    it('get organisations with configFilter', (done) => {
      service.getOrganisations(configFilters).subscribe(() => {
        expect(searchApiService.search).toHaveBeenCalledWith(
          'bucket',
          null,
          JSON.stringify(
            esService.getSearchRequestBody(
              {
                groups: {
                  terms: {
                    field: 'groupOwner',
                    size: 5000,
                  },
                },
              },
              0,
              0,
              undefined,
              undefined,
              configFilters
            )
          )
        )
        done()
      })
    })
  })
  describe('#getFiltersForOrgs', () => {
    let filters
    beforeEach(async () => {
      service.getOrganisations({})
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
      service.getOrganisations({})
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
  describe('#addOrganizationToRecordFromSource', () => {
    let record
    beforeEach(async () => {
      service.getOrganisations({})
      const source = {
        ...elasticFullResponseFixture().hits.hits[0]._source,
        groupOwner: '34838580',
      }
      record = await firstValueFrom(
        service.addOrganizationToRecordFromSource(source, {
          title: 'Surval - Données par paramètre',
          uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        } as CatalogRecord)
      )
    })
    it('adds an owner organization to the record (using the groups)', () => {
      expect(record).toMatchObject({
        title: 'Surval - Données par paramètre',
        uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        ownerOrganization: {
          logoUrl: new URL(
            'http://localhost/geonetwork/images/harvesting/gemeinde_koeniz_weiss.png'
          ),
          name: 'Municipalité de Köniz',
          description: 'A description for Köniz Municipality',
          website: new URL('https://www.koeniz.ch/'),
        },
      })
    })
    describe('when a non existent group is the owner', () => {
      beforeEach(async () => {
        const source = {
          ...elasticFullResponseFixture().hits.hits[0]._source,
          groupOwner: '-1',
        }
        record = await firstValueFrom(
          service.addOrganizationToRecordFromSource(source, {
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          } as CatalogRecord)
        )
      })
      it('does nothing', () => {
        expect(record).toMatchObject({
          title: 'Surval - Données par paramètre',
          uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        })
      })
    })
  })
})
