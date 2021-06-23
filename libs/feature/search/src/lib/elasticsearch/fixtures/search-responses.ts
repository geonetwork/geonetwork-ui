import { SearchResponse } from 'elasticsearch'

export const aggsOnly = {
  took: 7,
  timed_out: false,
  _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
  hits: { total: { value: 6073, relation: 'eq' }, max_score: null, hits: [] },
  aggregations: {
    results: {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 910,
      buckets: [
        { key: 'Habitat e biotopi', doc_count: 49 },
        { key: 'Habitats and biotopes', doc_count: 49 },
        { key: 'Habitats et biotopes', doc_count: 49 },
        { key: 'Lebensräume und Biotope', doc_count: 49 },
        { key: 'Schutzgebiete', doc_count: 41 },
        { key: 'Protected sites', doc_count: 39 },
        { key: 'Sites protégés', doc_count: 39 },
        { key: 'Siti protetti', doc_count: 39 },
        { key: 'Verkehrsnetze', doc_count: 32 },
        { key: 'Gebiete mit naturbedingten Risiken', doc_count: 31 },
        { key: 'Reti di trasporto', doc_count: 30 },
        { key: 'Réseaux de transport', doc_count: 30 },
        { key: 'Transport networks', doc_count: 30 },
        {
          key: 'Schutzgebiete Sites protégés Siti protetti Protected sites',
          doc_count: 27,
        },
        { key: 'Zones à risque naturel', doc_count: 26 },
        {
          key:
            'Habitats et biotopes Lebensräume und Biotope Habitat e biotopi Habitats and biotopes',
          doc_count: 25,
        },
        { key: 'Natural risk zones', doc_count: 25 },
        { key: 'Zone a rischio naturale', doc_count: 25 },
        {
          key:
            'Lebensräume und Biotope Habitats et biotopes Habitat e biotopi Habitats and biotopes',
          doc_count: 24,
        },
        {
          key:
            'Réseaux de transport Verkehrsnetze Reti di trasporto Transport networks',
          doc_count: 23,
        },
        { key: 'Geologia', doc_count: 22 },
        { key: 'Geologie', doc_count: 22 },
        { key: 'Geology', doc_count: 22 },
        { key: 'Géologie', doc_count: 22 },
        { key: 'Gewässernetz', doc_count: 20 },
        { key: 'Distribuzione delle specie', doc_count: 18 },
        { key: 'Dénominations géographiques', doc_count: 18 },
        { key: 'Geografische Bezeichnungen', doc_count: 18 },
        { key: 'Geographical names', doc_count: 18 },
        { key: 'Nomi geografici', doc_count: 18 },
        { key: 'Répartition des espèces', doc_count: 18 },
        { key: 'Species distribution', doc_count: 18 },
        { key: 'Verteilung der Arten', doc_count: 18 },
        { key: 'Gebäude', doc_count: 17 },
      ],
    },
  },
}

export const hitsOnly: any = {
  hits: {
    max_score: 1,
    hits: [
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
        _score: 1,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, ',
              url:
                'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png',
            },
          ],
          resourceDate: [
            {
              date: '2013-05-21T00:00:00.000Z',
              type: 'publication',
            },
            {
              date: '2013-05-21T00:00:00.000Z',
              type: 'creation',
            },
          ],
          resourceLanguage: ['eng'],
          resourceIdentifier: [
            {
              code: 'eea_v_3035_10_km_eea-ref-grid-de_2013',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default: 'The grid is based on proposal ',
            langeng: 'The grid is based on proposal ',
          },
          resourceTemporalDateRange: [
            {
              gte: '2013-05-21T00:00:00.000Z',
              lte: '2013-05-21T00:00:00.000Z',
            },
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2013-12-31T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default: 'EEA reference grid for Germany (10km), May 2013',
            langeng: 'EEA reference grid for Germany (10km), May 2013',
          },
          logo: '/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          id: '12456',
          uuid: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
          resourceTemporalExtentDateRange: [
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2013-12-31T00:00:00.000Z',
            },
          ],
          resourceType: ['dataset'],
        },
        edit: false,
        owner: false,
        isPublishedToAll: false,
        view: false,
        notify: false,
        download: false,
        dynamic: false,
        featured: false,
        guestdownload: false,
        selected: false,
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '5b35f06e-8c6b-4907-b8f4-39541d170360',
        _score: 1,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, ',
              url:
                'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/5b35f06e-8c6b-4907-b8f4-39541d170360.png',
            },
          ],
          resourceDate: [
            {
              date: '2017-11-01T00:00:00.000Z',
              type: 'creation',
            },
            {
              date: '2017-12-14T00:00:00.000Z',
              type: 'publication',
            },
          ],
          resourceLanguage: ['eng'],
          resourceIdentifier: [
            {
              code: 'eea_v_4258_100_m_uwwtd-sa-rivers_p_2013-2014_v05_r00',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default: 'Reference layer of the rivers sensitive areas, ',
            langeng: 'Reference layer of the rivers sensitive areas, ',
          },
          resourceTemporalDateRange: [
            {
              gte: '2017-11-01T00:00:00.000Z',
              lte: '2017-11-01T00:00:00.000Z',
            },
            {
              gte: '2017-12-14T00:00:00.000Z',
              lte: '2017-12-14T00:00:00.000Z',
            },
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2014-12-31T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
            langeng:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
          },
          logo: '/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          id: '12442',
          uuid: '5b35f06e-8c6b-4907-b8f4-39541d170360',
          resourceTemporalExtentDateRange: [
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2014-12-31T00:00:00.000Z',
            },
          ],
          resourceType: ['dataset'],
        },
        edit: false,
        owner: false,
        isPublishedToAll: false,
        view: false,
        notify: false,
        download: false,
        dynamic: false,
        featured: false,
        guestdownload: false,
        selected: false,
      },
    ],
  },
}
