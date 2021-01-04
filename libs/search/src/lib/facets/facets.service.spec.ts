import {
  ES_FIXTURE_AGGS_REQUEST,
  ES_FIXTURE_AGGS_RESPONSE,
} from '../elasticsearch/fixtures'
import { FacetsService } from './facets.service'

let requestAggregations
let responseAggregations

describe('FacetsService', () => {
  let service: FacetsService

  beforeEach(() => {
    service = new FacetsService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#createFacetModel', () => {
    let result
    requestAggregations = ES_FIXTURE_AGGS_REQUEST
    responseAggregations = ES_FIXTURE_AGGS_RESPONSE

    beforeEach(() => {
      result = service.createFacetModel(
        requestAggregations,
        responseAggregations,
        false
      )
    })

    it('should create the model', () => {
      expect(result.length).toBe(3)
    })

    describe('#Term aggregation', () => {
      it('should create the term aggregation', () => {
        const blockModel = result[0]
        expect(blockModel.type).toBe('terms')
        expect(blockModel.key).toBe('tag.default')
        expect(blockModel.size).toBe(10)
        expect(blockModel.more).toBe(true)
        expect(blockModel.items.length).toBe(6)

        const itemModel = blockModel.items[0]
        expect(itemModel.value).toBe('Hungary')
        expect(itemModel.count).toBe(20)
        expect(itemModel.path).toEqual(['tag.default', 'Hungary'])
      })

      describe('when there is no more documents for this agg', () => {
        beforeEach(() => {
          responseAggregations['tag.default'].sum_other_doc_count = 0
          result = service.createFacetModel(
            requestAggregations,
            responseAggregations,
            false
          )
        })
        it('more is false', () => {
          const blockModel = result[0]
          expect(blockModel.more).toBe(false)
        })
      })
    })

    describe('#Filters aggregation', () => {
      it('should create the filter aggregation', () => {
        const blockModel = result[1]
        expect(blockModel.type).toBe('filters')
        expect(blockModel.key).toBe('availableInServices')
        expect(blockModel.size).toBeUndefined()
        expect(blockModel.more).toBeUndefined()
        expect(blockModel.items.length).toBe(2)

        const itemModel = blockModel.items[1]
        expect(itemModel.value).toBe('availableInViewService')
        expect(itemModel.count).toBe(299)
        expect(itemModel.path).toEqual([
          'availableInServices',
          'availableInViewService',
        ])
        expect(itemModel.query_string).toEqual('+linkProtocol:/OGC:WMS.*/')
      })
    })

    describe('#Histogram aggregation', () => {
      it('should create the histogram aggregation', () => {
        const blockModel = result[2]
        expect(blockModel.type).toBe('histogram')
        expect(blockModel.key).toBe('resolutionScaleDenominator')
        expect(blockModel.size).toBeUndefined()
        expect(blockModel.more).toBeUndefined()
        expect(blockModel.items.length).toBe(12)

        const itemModel = blockModel.items[1]
        expect(itemModel.value).toBe('10000-20000')
        expect(itemModel.count).toBe(291)
        expect(itemModel.path).toEqual(['resolutionScaleDenominator', 10000])
        expect(itemModel.query_string).toEqual(
          '+resolutionScaleDenominator:[10000 TO 20000}'
        )
      })
    })
  })
})
