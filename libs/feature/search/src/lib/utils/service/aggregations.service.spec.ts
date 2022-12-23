import { TestBed } from '@angular/core/testing'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { of } from 'rxjs'

import { AggregationsService } from './aggregations.service'

const organisationsAggregationMock = {
  aggregations: {
    OrgForResource: {
      buckets: [
        { key: 'Agence de test', doc_count: 5 },
        { key: 'Association pour le testing', doc_count: 3 },
      ],
    },
  },
}

class SearchApiServiceMock {
  search = jest.fn(() => of(organisationsAggregationMock))
}
class ElasticsearchServiceMock {
  getSearchRequestBody = jest.fn()
}
describe('AggregationsService', () => {
  let service: AggregationsService
  let esService: ElasticsearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchApiService,
          useClass: SearchApiServiceMock,
        },
        {
          provide: ElasticsearchService,
          useClass: ElasticsearchServiceMock,
        },
      ],
    })
    service = TestBed.inject(AggregationsService)
    esService = TestBed.inject(ElasticsearchService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getFullSearchTermAggregation', () => {
    let aggregation
    beforeEach(() => {
      service
        .getFullSearchTermAggregation('OrgForResource')
        .subscribe((orgs) => (aggregation = orgs))
    })
    it('should call ElasticsearchService getSearchRequestBody', () => {
      expect(esService.getSearchRequestBody).toHaveBeenCalledWith({
        OrgForResource: {
          terms: {
            size: 1000,
            field: 'OrgForResource',
            order: {
              _key: 'asc',
            },
            exclude: '',
          },
        },
      })
    })
    it('should get aggregation', () => {
      expect(aggregation).toEqual({
        buckets: [
          { doc_count: 5, key: 'Agence de test' },
          { doc_count: 3, key: 'Association pour le testing' },
        ],
      })
    })
  })
})
