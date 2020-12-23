import {
  ES_FIXTURE_AGGS_REQ_TERM,
  ES_FIXTURE_AGGS_RESPONSE_TERM,
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
    describe('when it is simple term', () => {
      requestAggregations = ES_FIXTURE_AGGS_REQ_TERM
      responseAggregations = ES_FIXTURE_AGGS_RESPONSE_TERM

      describe('when it is the first items of long list', () => {
        beforeEach(() => {
          result = service.createFacetModel(
            requestAggregations,
            responseAggregations,
            false
          )
        })
        it('should create the model', () => {
          expect(result.length).toBe(1)
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
      })

      describe('when it is the last items', () => {
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
  })
})
