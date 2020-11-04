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
