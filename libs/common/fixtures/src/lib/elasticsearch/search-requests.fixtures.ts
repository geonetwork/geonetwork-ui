export const elasticRequestWithAggsFixture = () => ({
  from: 0,
  size: 30,
  sort: ['_score'],
  query: {
    function_score: {
      boost: '5',
      functions: [
        {
          filter: { exists: { field: 'parentUuid' } },
          weight: 0.3,
        },
        {
          filter: { match: { codelist_status: 'obsolete' } },
          weight: 0.3,
        },
        {
          gauss: {
            dateStamp: {
              scale: '365d',
              offset: '90d',
              decay: 0.5,
            },
          },
        },
      ],
      score_mode: 'multiply',
      query: {
        bool: {
          must: [
            {
              query_string: {
                query:
                  '(marine resourceTitleObject.default:(marine)^2) AND (tag:"Hungary")',
              },
            },
            { terms: { isTemplate: ['n'] } },
          ],
        },
      },
    },
  },
  aggregations: {
    codelist_hierarchyLevel_text: {
      terms: { field: 'codelist_hierarchyLevel_text' },
      aggs: { format: { terms: { field: 'format' } } },
    },
    codelist_spatialRepresentationType: {
      terms: {
        field: 'codelist_spatialRepresentationType',
        size: 10,
      },
    },
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
    thesaurus_geonetworkthesaurusexternalthemegemet_tree: {
      terms: {
        field: 'thesaurus_geonetworkthesaurusexternalthemegemet_tree',
        size: 100,
        order: { _key: 'asc' },
        include: '[^/]+/?[^/]+',
      },
    },
    tag: { terms: { field: 'tag', include: '.*', size: 21 } },
    thesaurus_geonetworkthesaurusexternalplaceregions_tree: {
      terms: {
        field: 'thesaurus_geonetworkthesaurusexternalplaceregions_tree',
        size: 100,
        order: { _key: 'asc' },
      },
    },
    resolutionScaleDenominator: {
      terms: {
        field: 'resolutionScaleDenominator',
        size: 10,
        order: { _key: 'asc' },
      },
    },
    creationYearForResource: {
      terms: {
        field: 'creationYearForResource',
        size: 10,
        order: { _key: 'desc' },
      },
    },
    OrgForResource: { terms: { field: 'OrgForResource', size: 15 } },
    codelist_maintenanceAndUpdateFrequency_text: {
      terms: {
        field: 'codelist_maintenanceAndUpdateFrequency_text',
        size: 10,
      },
    },
    codelist_status_text: {
      terms: {
        field: 'codelist_status_text',
        size: 10,
      },
    },
    dateStamp: { auto_date_histogram: { field: 'dateStamp', buckets: 50 } },
  },
  _source: {
    includes: [
      'uuid',
      'id',
      'creat*',
      'group*',
      'logo',
      'category',
      'topic*',
      'inspire*',
      'resource*',
      'draft',
      'overview.*',
      'owner*',
      'link*',
      'image*',
      'status*',
      'rating',
      'tag*',
      'geom',
      'contact*',
      '*Org*',
      'hasBoundingPolygon',
      'isTemplate',
      'valid',
      'isHarvested',
      'dateStamp',
      'documentStandard',
      'codelist_status*',
      'recordLink',
    ],
  },
  track_total_hits: true,
})
