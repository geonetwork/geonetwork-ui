import {
  AggregationParams,
  Aggregations,
  AggregationsParams,
} from '@geonetwork-ui/common/domain/model/search'

export const TERMS_AGGREGATION: AggregationParams = {
  type: 'terms',
  field: 'myField',
  sort: ['desc', 'count'],
  filter: 'abc.*',
  limit: 50,
}
export const HISTOGRAM_AGGREGATION: AggregationParams = {
  type: 'histogram',
  field: 'myValueField',
  interval: 100,
}
export const FILTERS_AGGREGATION: AggregationParams = {
  type: 'filters',
  filters: {
    firstValue: 'field = value1',
    secondValueOnly: {
      field: {
        value1: false,
        value2: true,
        value3: false,
      },
    },
  },
}
export const SAMPLE_AGGREGATIONS_PARAMS = (): AggregationsParams => ({
  myField: TERMS_AGGREGATION,
  myValueField: HISTOGRAM_AGGREGATION,
  myFilters: FILTERS_AGGREGATION,
})

export const SAMPLE_AGGREGATIONS_RESULTS = (): Aggregations => ({
  myField: {
    buckets: [
      { term: 'Hungary', count: 20 },
      {
        term: 'Austria',
        count: 3,
      },
      { term: 'Belgium', count: 8 },
      {
        term: 'Bulgaria',
        count: 2,
      },
      { term: 'Croatia', count: 15 },
      {
        term: 'Cyprus',
        count: 5,
      },
    ],
  },
  myValueField: { buckets: [] },
  myFilters: {
    firstValue: 123,
    secondValueOnly: 45,
  },
})
export const SAMPLE_AGGREGATION_MORE_RESULTS = {
  buckets: [
    { term: 'Spain', count: 86 },
    { term: 'United Kingdom', count: 84 },
  ],
}
