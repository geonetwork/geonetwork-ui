export const SEARCH_STATE_FILTERS_FIXTURE = {
  recursiveTerms: {
    resourceType: {
      service: {
        serviceType: {
          'OGC:WMS': true,
        },
      },
      dataset: true,
    },
  },

  simpleTerms: {
    'tag.default': {
      'land use': true,
      national: true,
    },
  },
  histogram: {
    resolutionScaleDenominator: {
      10000: '+resolutionScaleDenominator:[10000 TO 20000}',
    },
  },
  filters: {
    availableInServices: {
      availableInViewService: '+linkProtocol:/OGC:WMS.*/',
    },
  },
}
