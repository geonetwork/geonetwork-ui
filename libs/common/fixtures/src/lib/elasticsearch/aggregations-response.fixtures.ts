const elasticBucketsFixture = () => [
  { key: 'Hungary', doc_count: 20 },
  {
    key: 'Austria',
    doc_count: 3,
  },
  { key: 'Belgium', doc_count: 8 },
  {
    key: 'Bulgaria',
    doc_count: 2,
  },
  { key: 'Croatia', doc_count: 15 },
  {
    key: 'Cyprus',
    doc_count: 5,
  },
]

export const elasticAggsResponseFixture = () => ({
  'tag.default': {
    doc_count_error_upper_bound: 0,
    sum_other_doc_count: 458,
    buckets: elasticBucketsFixture(),
  },
  availableInServices: {
    buckets: {
      availableInDownloadService: { doc_count: 0 },
      availableInViewService: { doc_count: 299 },
    },
  },
  resolutionScaleDenominator: {
    meta: { collapsed: true },
    buckets: {
      '0.0': { key: 0, doc_count: 2 },
      '10000.0': { key: 10000, doc_count: 291 },
      '20000.0': { key: 20000, doc_count: 1 },
      '50000.0': { key: 50000, doc_count: 9 },
      '100000.0': { key: 100000, doc_count: 135 },
      '250000.0': { key: 250000, doc_count: 54 },
      '1000000.0': { key: 1000000, doc_count: 55 },
      '2000000.0': { key: 2000000, doc_count: 3 },
      '3000000.0': { key: 3000000, doc_count: 10 },
      '1.0E7': { key: 10000000, doc_count: 93 },
      '2.0E7': { key: 20000000, doc_count: 9 },
      '6.0E7': { key: 60000000, doc_count: 8 },
    },
  },
  resolutionScaleDenominatorArray: {
    meta: { collapsed: true },
    buckets: [
      { key: 0, doc_count: 2 },
      { key: 10000, doc_count: 291 },
      { key: 20000, doc_count: 1 },
      { key: 50000, doc_count: 9 },
      { key: 100000, doc_count: 135 },
      { key: 250000, doc_count: 54 },
      { key: 1000000, doc_count: 55 },
      { key: 2000000, doc_count: 3 },
      { key: 3000000, doc_count: 10 },
      { key: 10000000, doc_count: 93 },
      { key: 20000000, doc_count: 9 },
      { key: 60000000, doc_count: 8 },
    ],
  },
})

export const elasticAggsResponseMoreFixture = () => ({
  'tag.default': {
    doc_count_error_upper_bound: 0,
    sum_other_doc_count: 456,
    buckets: [
      ...elasticBucketsFixture(),
      { key: 'Spain', doc_count: 86 },
      { key: 'United Kingdom', doc_count: 84 },
    ],
  },
})
