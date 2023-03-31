import { deepFreeze } from '../../utils/freeze'
import { RecordGeoJson } from '@geonetwork-ui/util/types/metadata/ogc/record.model'

export const OGC_RECORD_METADATA_FIXTURE = (): RecordGeoJson =>
  deepFreeze({
    id: 'urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone',
    conformsTo: [
      'http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/core',
      'http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/collections',
      'http://www.opengis.net/spec/ogcapi-common-1/1.0/conf/oas3',
      'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/core',
      'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/opensearch',
      'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/json',
      'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/xml',
      'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/html',
    ],
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-180, -90],
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90],
        ],
      ],
    },
    properties: {
      created: '2021-02-08T00:00:00Z',
      updated: '2021-02-08T00:00:00Z',
      type: 'dataset',
      title: 'Total Ozone - daily observations',
      description:
        'A measurement of the total amount of atmospheric ozone in a given column from the surface to the edge of the atmosphere. Ground based instruments such as spectrophotometers and ozonemeters are used to measure results daily',
      keywords: [
        'total',
        'ozone',
        'level 1.0',
        'column',
        'dobson',
        'brewer',
        'saoz',
      ],
      language: 'en',
      externalId: [
        {
          scheme: 'WMO:WIS',
          value:
            'urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone',
        },
      ],
      publisher: 'https://woudc.org',
      themes: [
        {
          concepts: [
            {
              id: 'dobson',
            },
            {
              id: 'brewer',
            },
            {
              id: 'vassey',
            },
            {
              id: 'pion',
            },
            {
              id: 'microtops',
            },
            {
              id: 'spectral',
            },
            {
              id: 'hoelper',
            },
            {
              id: 'saoz',
            },
            {
              id: 'filter',
            },
          ],
          scheme: 'https://geo.woudc.org/codelists.xml#WOUDC_InstrumentCode',
        },
        {
          concepts: [
            {
              id: 'atmosphericComposition',
            },
            {
              id: 'pollution',
            },
            {
              id: 'observationPlatform',
            },
            {
              id: 'rocketSounding',
            },
          ],
          scheme:
            'https://wis.wmo.int/2012/codelists/WMOCodeLists.xml#WMO_CategoryCode',
        },
      ],
      formats: ['CSV', 'GeoJSON'],
      contactPoint: 'https://woudc.org/contact.php',
      license: 'https://woudc.org/about/data-policy.php',
      extent: {
        spatial: {
          bbox: [[-180, -90, 180, 90]],
          crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
        },
        temporal: {
          interval: [['1924-08-18', null]],
          resolution: 'P1D',
          trs: 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian',
        },
      },
    },
    links: [
      {
        rel: 'alternate',
        type: 'text/html',
        title: 'This document as HTML',
        href: 'https://woudc.org/data/dataset_info.php?id=totalozone',
      },
      {
        rel: 'item',
        type: 'image/png',
        title: 'OGC Web Map Service (WMS)',
        href: 'https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetMap&crs={crs}&bbox={bbox}&layers=totalozone&width={width}&height={height}&format=image/png',
        templated: true,
        variables: {
          crs: {
            description: '...',
            type: 'string',
            enum: ['EPSG:4326', 'EPSG:3857'],
          },
          bbox: {
            description: '...',
            type: 'array',
            items: {
              type: 'number',
              format: 'double',
            },
            minItems: 4,
            maxItems: 4,
          },
          width: {
            description: '...',
            type: 'number',
            format: 'integer',
            minimum: 600,
            maximum: 5000,
          },
          height: {
            description: '...',
            type: 'number',
            format: 'integer',
            minimum: 600,
            maximum: 5000,
          },
        },
      },
      {
        rel: 'enclosure',
        type: 'text/html',
        title: 'Web Accessible Folder (WAF)',
        href: 'https://woudc.org/archive/Archive-NewFormat/TotalOzone_1.0_1',
        created: '2015-01-23T00:00:00Z',
        updated: '2015-01-23T00:00:00Z',
      },
      {
        rel: 'search',
        type: 'text/html',
        title: 'Data Search / Download User Interface',
        href: 'https://woudc.org/data/explore.php?dataset=totalozone',
      },
      {
        rel: 'enclosure',
        type: 'application/zip',
        title: 'Static dataset archive file',
        href: 'https://woudc.org/archive/Summaries/dataset-snapshots/totalozone.zip',
        created: '2015-01-23T00:00:00Z',
        updated: '2015-01-23T00:00:00Z',
      },
      {
        rel: 'service',
        type: 'application/xml',
        title: 'OGC Web Feature Service (WFS)',
        href: 'https://geo.woudc.org/ows',
      },
    ],
  })
