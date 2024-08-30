import {
  elasticAggsRequestFixture,
  elasticAggsResponseFixture,
} from '@geonetwork-ui/common/fixtures'
import { ModelBlock, ModelItem } from '@geonetwork-ui/ui/search'
import { searchStateFiltersFixture } from '../state/fixtures/search-state.fixtures'
import { FacetsService } from './facets.service'

let requestAggregations
let responseAggregations

const logServiceMock = {
  warn: jest.fn(),
  log: jest.fn(),
  error: jest.fn(),
}
describe('FacetsService', () => {
  let service: FacetsService

  beforeEach(() => {
    service = new FacetsService(logServiceMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#createFacetModel', () => {
    let result
    requestAggregations = elasticAggsRequestFixture()
    responseAggregations = elasticAggsResponseFixture()

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
          const respAggsNoMoreDocs = {
            ...responseAggregations,
            'tag.default': {
              ...responseAggregations['tag.default'],
              sum_other_doc_count: 0,
            },
          }
          result = service.createFacetModel(
            requestAggregations,
            respAggsNoMoreDocs,
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
        expect(itemModel.path).toEqual(['resolutionScaleDenominator', '10000'])
        expect(itemModel.query_string).toEqual(
          '+resolutionScaleDenominator:[10000 TO 20000}'
        )
      })
    })
  })

  describe('#computeItemPathValue', () => {
    let block: ModelBlock
    let item: ModelItem
    beforeEach(() => {
      block = {
        excludeFilter: false,
        includeFilter: false,
        items: [],
        key: '',
        more: false,
        size: 0,
        type: 'terms',
        path: ['tag.default'],
      }
      item = {
        path: ['tag.default', 'land use'],
        value: 'land use',
        count: 500,
        selected: true,
        inverted: false,
      }
    })

    describe('when it is a term', () => {
      describe('when it is selected', () => {
        describe('when it is not inverted', () => {
          it('returns true', () => {
            const value = service.computeItemPathValue(block, item)
            expect(value).toBe(true)
          })
        })
        describe('when it is inverted', () => {
          beforeEach(() => {
            item = { ...item, inverted: true }
          })
          it('returns false', () => {
            const value = service.computeItemPathValue(block, item)
            expect(value).toBe(false)
          })
        })
      })
      describe('when it is not selected', () => {
        beforeEach(() => {
          item = { ...item, selected: false }
        })
        it('returns null', () => {
          const value = service.computeItemPathValue(block, item)
          expect(value).toBe(null)
        })
      })
    })

    describe('when it is a filter', () => {
      beforeEach(() => {
        block = { ...block, type: 'filters' }
        item = { ...item, query_string: '+linkProtocol:/OGC:WMS.*/' }
      })
      describe('when it is selected', () => {
        describe('when it is not inverted', () => {
          it('returns the query_string', () => {
            const value = service.computeItemPathValue(block, item)
            expect(value).toBe('+linkProtocol:/OGC:WMS.*/')
          })
        })
        describe('when it is inverted', () => {
          beforeEach(() => {
            item = { ...item, inverted: true }
          })
          it('returns excluded query_string', () => {
            const value = service.computeItemPathValue(block, item)
            expect(value).toBe('-(+linkProtocol:/OGC:WMS.*/)')
          })
        })
      })
      describe('when it is not selected', () => {
        beforeEach(() => {
          item = { ...item, selected: false }
        })
        it('returns null', () => {
          const value = service.computeItemPathValue(block, item)
          expect(value).toBe(null)
        })
      })
    })
  })

  describe('#.computeNewFiltersFromState', () => {
    let path
    let value
    let filters
    describe('when simple terms path', () => {
      beforeEach(() => {
        path = ['tag.default', 'Land use']
      })
      describe('when no previous filters', () => {
        beforeEach(() => {
          filters = {}
        })
        it('add filter in state', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            path,
            true
          )
          expect(stateFilters).toEqual({
            'tag.default': { 'Land use': true },
          })
        })
      })
      describe('when previous filters', () => {
        beforeEach(() => {
          filters = { 'tag.default': { national: true, marine: true } }
        })
        it('merges previous and new filters', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            path,
            true
          )
          expect(stateFilters).toEqual({
            'tag.default': { 'Land use': true, national: true, marine: true },
          })
        })
        it('removes previous filter', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            ['tag.default', 'national'],
            null
          )
          expect(stateFilters).toEqual({
            'tag.default': { marine: true },
          })
        })
        it('removes whole block if empty', () => {
          let stateFilters = service.computeNewFiltersFromState(
            filters,
            ['tag.default', 'national'],
            null
          )
          stateFilters = service.computeNewFiltersFromState(
            stateFilters,
            ['tag.default', 'marine'],
            null
          )
          expect(stateFilters).toEqual({})
        })
      })
    })
    describe('when histogram / filters path', () => {
      beforeEach(() => {
        path = ['resolutionScaleDenominator', '50000']
        value = '+resolutionScaleDenominator:[50000 TO 100000}'
      })
      describe('when no previous filters', () => {
        beforeEach(() => {
          filters = {}
        })
        it('add filter in state', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            path,
            value
          )
          expect(stateFilters).toEqual({
            resolutionScaleDenominator: {
              50000: value,
            },
          })
        })
      })
      describe('when no previous filters', () => {
        beforeEach(() => {
          filters = {
            resolutionScaleDenominator: {
              50000: '+resolutionScaleDenominator:[50000 TO 100000}',
            },
          }
        })
        it('add filter in state', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            path,
            null
          )
          expect(stateFilters).toEqual({})
        })
      })
    })
    describe('when nested terms', () => {
      beforeEach(() => {
        path = ['resourceType', 'service', 'serviceType', 'OGC:WMS']
        value = true
      })
      describe('when no previous filters', () => {
        beforeEach(() => {
          filters = {}
        })
        it('add filter in state', () => {
          const stateFilters = service.computeNewFiltersFromState(
            filters,
            path,
            value
          )
          expect(stateFilters).toEqual({
            resourceType: {
              service: {
                serviceType: {
                  'OGC:WMS': true,
                },
              },
            },
          })
        })
      })
    })
  })

  describe('#findSelectedPaths', () => {
    let searchFilters
    describe('when simple terms', () => {
      beforeEach(() => {
        searchFilters = searchStateFiltersFixture().simpleTerms
      })
      it('returns simple 2 elements paths', () => {
        const paths = service.findSelectedPaths(searchFilters)
        expect(paths).toEqual([
          ['tag.default', 'land use'],
          ['tag.default', 'national'],
        ])
      })
    })
    describe('when recursive terms', () => {
      beforeEach(() => {
        searchFilters = searchStateFiltersFixture().recursiveTerms
      })
      it('nested elements are appended to the path', () => {
        const paths = service.findSelectedPaths(searchFilters)
        expect(paths).toEqual([
          ['resourceType', 'service', 'serviceType', 'OGC:WMS'],
          ['resourceType', 'dataset'],
        ])
      })
    })
    describe('when histogram', () => {
      beforeEach(() => {
        searchFilters = searchStateFiltersFixture().histogram
      })
      it('nested elements are appended to the path', () => {
        const paths = service.findSelectedPaths(searchFilters)
        expect(paths).toEqual([['resolutionScaleDenominator', '10000']])
      })
    })
    describe('when filters', () => {
      beforeEach(() => {
        searchFilters = searchStateFiltersFixture().filters
      })
      it('nested elements are appended to the path', () => {
        const paths = service.findSelectedPaths(searchFilters)
        expect(paths).toEqual([
          ['availableInServices', 'availableInViewService'],
        ])
      })
    })
  })
})
