export const elasticAggsRequestFixture = () => ({
  'tag.default': { terms: { field: 'tag.default', include: '.*', size: 10 } },
  availableInServices: {
    filters: {
      filters: {
        availableInViewService: {
          query_string: { query: '+linkProtocol:/OGC:WMS.*/' },
        },
        availableInDownloadService: {
          query_string: { query: '+linkProtocol:/OGC:WFS.*/' },
        },
      },
    },
  },
  resolutionScaleDenominator: {
    histogram: {
      field: 'resolutionScaleDenominator',
      interval: 10000,
      keyed: true,
      min_doc_count: 1,
    },
    meta: { collapsed: true },
  },
})
