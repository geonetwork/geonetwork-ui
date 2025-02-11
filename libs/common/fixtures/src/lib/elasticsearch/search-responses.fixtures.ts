export const elasticAggsOnlyFixture = () => ({
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
          key: 'Habitats et biotopes Lebensräume und Biotope Habitat e biotopi Habitats and biotopes',
          doc_count: 25,
        },
        { key: 'Natural risk zones', doc_count: 25 },
        { key: 'Zone a rischio naturale', doc_count: 25 },
        {
          key: 'Lebensräume und Biotope Habitats et biotopes Habitat e biotopi Habitats and biotopes',
          doc_count: 24,
        },
        {
          key: 'Réseaux de transport Verkehrsnetze Reti di trasporto Transport networks',
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
})

export const elasticHitsOnlyFixture = () => ({
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
              url: 'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png',
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
          sourceCatalogue: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          link: [],
        },
        edit: true,
        owner: false,
        isPublishedToAll: true,
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
              url: 'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/5b35f06e-8c6b-4907-b8f4-39541d170360.png',
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
          sourceCatalogue: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          userSavedCount: '4',
          link: [],
        },
        edit: true,
        owner: false,
        isPublishedToAll: true,
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
})

export const elasticSimpleWithAggsFixture = () => ({
  hits: { hits: [] },
  aggregations: { abc: {} },
})

export const elasticSummaryHitsFixture = () => ({
  took: 3,
  timed_out: false,
  _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
  hits: {
    total: { value: 4035, relation: 'eq' },
    max_score: null,
    hits: [
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'cde8a11b-2343-42ac-a366-6971f67d2fc6',
        _score: null,
        _source: {
          overview: [
            {
              url: 'https://dev.geo2france.fr/geonetwork/srv/api/records/cde8a11b-2343-42ac-a366-6971f67d2fc6/attachments/cde8a11b-2343-42ac-a366-6971f67d2fc6.png',
            },
            {
              url: 'http://public.sig.rennesmetropole.fr/ressources/catalogue/apercus/trp_rout_v_rva_troncon_hierarchie.png',
            },
          ],
          Org: 'Rennes Métropole - Direction de la Voirie - Services généraux Patrimoine',
          resourceTemporalDateRange: [
            {
              gte: '2017-12-01T00:00:00.000Z',
              lte: '2017-12-01T00:00:00.000Z',
            },
            {
              gte: '2020-02-19T00:00:00.000Z',
              lte: '2020-02-19T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default: 'Hiérarchisation des axes routiers de Rennes Métropole',
            langfre: 'Hiérarchisation des axes routiers de Rennes Métropole',
          },
          uuid: 'cde8a11b-2343-42ac-a366-6971f67d2fc6',
          resourceDate: [
            { date: '2017-12-01T00:00:00.000Z', type: 'creation' },
            { date: '2020-02-19T00:00:00.000Z', type: 'revision' },
          ],
          resourceLanguage: ['fre'],
          resourceIdentifier: [
            {
              code: 'https://public.sig.rennesmetropole.fr/geonetwork/srv/fre/xml.metadata.get?uuid=cde8a11b-2343-42ac-a366-6971f67d2fc6',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default:
              "Cette couche représente la hiérarchisation des voiries de Rennes Métropole. Cette dernière hiérarchise les tronçons du réseau routier qu'elle gère dans un souci d'adapter son niveau de service aux enjeux de circulation, de sécurité et de gestion. \n2 types de hiérarchisation sont proposés : \nLa hiérarchisation de la Direction de la Voirie qui se décompose en 5 niveaux :\n- Route nationale ;\n- Réseau de transit ;\n- Réseau structurant ;\n- Réseau de distribution ;\n- Réseau de desserte.\n\n=> Le \"Réseau de transit\" correspond au réseau stratégique comportant 4 axes convergeant vers Rennes et la deuxième ceinture rennaise (anciennes routes départementales de catégorie A et B) ;\n=> Le \"Réseau structurant\" correspond au réseau structurant la métropole et les communes (anciennes routes départementales de catégorie C, et anciennes routes communales de type voies artérielles, ceinture de desserte d'agglomération, voie structurant l'aire urbaine) ;\n=> Le \"Réseau de distribution\" correspond au maillage de distribution à l'échelle d'un quartier ou d'une commune (anciennes routes départementales de catégorie D, et anciennes voies communales de type voies de distribution, voie principale communale, voie communale principale hors agglomération, voie de desserte urbaine) ;\n=> Le \"Réseau de desserte\" correspond au maillage fin de desserte de proximité intra-quartier ou de desserte rurale (anciennes voies communales de type voies de desserte, voie inter quartier, voie de desserte locale).\n\nLa hiérarchisation du Plan de Déplacements Urbains (PDU) qui se décompose en 6 niveaux :\n- Réseau national ;\n- Réseau d'armature ;\n- Réseau d'appui ;\n- Réseau de distribution principal ;\n- Réseau de distribution secondaire ;\n- Réseau de desserte.\n\nCette couche est donc représentée sous la forme de 2 styles sur le Portail de données géographiques.",
            langfre:
              "Cette couche représente la hiérarchisation des voiries de Rennes Métropole. Cette dernière hiérarchise les tronçons du réseau routier qu'elle gère dans un souci d'adapter son niveau de service aux enjeux de circulation, de sécurité et de gestion. \n2 types de hiérarchisation sont proposés : \nLa hiérarchisation de la Direction de la Voirie qui se décompose en 5 niveaux :\n- Route nationale ;\n- Réseau de transit ;\n- Réseau structurant ;\n- Réseau de distribution ;\n- Réseau de desserte.\n\n=> Le \"Réseau de transit\" correspond au réseau stratégique comportant 4 axes convergeant vers Rennes et la deuxième ceinture rennaise (anciennes routes départementales de catégorie A et B) ;\n=> Le \"Réseau structurant\" correspond au réseau structurant la métropole et les communes (anciennes routes départementales de catégorie C, et anciennes routes communales de type voies artérielles, ceinture de desserte d'agglomération, voie structurant l'aire urbaine) ;\n=> Le \"Réseau de distribution\" correspond au maillage de distribution à l'échelle d'un quartier ou d'une commune (anciennes routes départementales de catégorie D, et anciennes voies communales de type voies de distribution, voie principale communale, voie communale principale hors agglomération, voie de desserte urbaine) ;\n=> Le \"Réseau de desserte\" correspond au maillage fin de desserte de proximité intra-quartier ou de desserte rurale (anciennes voies communales de type voies de desserte, voie inter quartier, voie de desserte locale).\n\nLa hiérarchisation du Plan de Déplacements Urbains (PDU) qui se décompose en 6 niveaux :\n- Réseau national ;\n- Réseau d'armature ;\n- Réseau d'appui ;\n- Réseau de distribution principal ;\n- Réseau de distribution secondaire ;\n- Réseau de desserte.\n\nCette couche est donc représentée sous la forme de 2 styles sur le Portail de données géographiques.",
          },
          contact: [
            {
              organisation:
                'Rennes Métropole - Direction de la Voirie - Services généraux Patrimoine',
            },
          ],
          changeDate: '2022-08-11T00:05:16Z',
          logo: '/images/logos/c40cf0bb-3c55-4132-b616-64e8db7b8dde.png',
          id: '15245112',
          createDate: '2022-08-11T00:05:16Z',
          resourceType: ['dataset'],
          linkProtocol: [
            'OGC:WMS',
            'OGC:WFS',
            'WWW:LINK-1.0-http--link',
            'OGC:GML',
          ],
          userSavedCount: '5',
        },
        sort: [1660176316000],
        edit: true,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '431c9d9a-6493-4e0a-9024-c179720b7745',
        _score: null,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAIwAAABRCAYAAAAAYE7PAAADJklEQVR4Xu3dS09aQRiA4f7m/oVumq7aRX9GE+2iF5taw9JgqwklMVUBRSKXgigXuU4zmJj4FZTvnNEzc877bCQfcaOvZA5nBl8YQOGFHAAPIRioEAxUCAYqBAMVgoEKwUCFYKBCMFAhGKgQDFQIBioE46F86ad5+e2V2chvmqvBlXw6UQTjqd5NzwzHQzlOHMFAhWA8N56OzWw2k+PEEIzHGt2G2T3aNfP5XD61llKzbOYm2veuQjAptpn/aGrtmhzHQjCe6w66cpQogoFK5oLZK/+SI2/ZNYxvMhdMKNq9thx5gWCgkvlg7KKy1nF7JZFmQQVj3yrv9Dpy/KDxZCxHiCGoYEaTkWleNeX4Qeft88VXX9cEoQkqGB+vGrImqGDSbDqbLl5BfUcwDtlXwLef3snxWorVotmv7MuxdwjGIbtOKjVKcryWwWggR14iGIfsXeXhyL9NTy55E4zdYXZYO5RjeMabYBAGgoEKwUCFYKBCMFAhGKgQjFB2sNN+2Ztw9ct65N3/PiEYx+w9IRvHZDq5N5/N/TlbFAfBOGYPntnz0Gl4NVmGYKCSmWD6N31zPbyW45UuLi/kCCZDwYSy38R3mQkGbhAMVAgGKkEG0+l3zHZhW47xDIIMJip7ROW0dSbHa3nsUxTsG3XVv1U5Tp1MBfOU7BVYFi7FCQYqBAMVgoEKwUAl2GDssRQ8v2CDef092pFUxBNsMPifvcH61Jf2BJMif+pHZqPwWY6dIpgU6Y/6Jn+cl2OnCCZFmt2m2fm9I8dOEUzKLNtsbvcXHzdO5DiSRII5a1cXxznSxtdLfRtR4bwox5EkEsyPw5zpDf384cbxYW/j7rH9JdltGGkTO5iLbt3bv6zn9uXg691jexjOx/+oFlesYOwekDe596Z6yQcjW4WzghylTqxgThol07puyTESUGlW5OhOpXW69PhuFLGCwX1xz2Q/lXKj7OwkJsE4tHWwJUepQzAO5Yo5OVqw563tfZ40IBiHVl0V2WO6q54LDcE8wi4m7RoAtwgGKgRjbtcYWA/BmNs1BtZDMFAhGKgQDFQIBioEAxWCgco/tgVrOeLNkM0AAAAASUVORK5CYII=',
              url: 'https://dev.geo2france.fr/geonetwork/srv/api/records/431c9d9a-6493-4e0a-9024-c179720b7745/attachments/431c9d9a-6493-4e0a-9024-c179720b7745.png',
            },
            {
              url: 'http://public.sig.rennesmetropole.fr/ressources/catalogue/apercus/espace_public_gev_verger_partage.png',
            },
          ],
          Org: 'Ville de Rennes',
          resourceTemporalDateRange: [
            {
              gte: '2022-07-29T00:00:00.000Z',
              lte: '2022-07-29T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default: 'Vergers partagés sur Rennes',
            langfre: 'Vergers partagés sur Rennes',
          },
          uuid: '431c9d9a-6493-4e0a-9024-c179720b7745',
          resourceDate: [
            { date: '2022-07-29T00:00:00.000Z', type: 'creation' },
            { date: '2022-07-29T00:00:00.000Z', type: 'revision' },
          ],
          resourceLanguage: ['fre'],
          resourceIdentifier: [
            {
              code: 'https://public.sig.rennesmetropole.fr/geonetwork/srv/fre/xml.metadata.get?uuid=431c9d9a-6493-4e0a-9024-c179720b7745',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default:
              "Cette couche localise les vergers partagés installés sur le domaine public et ayant fait l'objet d'un conventionnement avec la Ville de Rennes ou en gestion directe par la Direction des Jardins et de la Biodiversité (DJB).\nSous la forme de polygones définissant l'emprise concernée, les vergers sont localisés au sein d'un site \"espace vert\" référencé dans le champ \"site\" (voir métadonnée UUID = 63b90b59-c031-4546-b73e-a450173b2b6a).\nParmi les champs décrivant cette donnée :\n- site = identifiant du site de gestion de la DJB\n- denomination = la dénomination du site de gestion de la DJB; \n- quartier = le quartier de Rennes ;\n- nom_verger = le nom donnée au verger ;\n- date_creation = sa date de création ; \n- personne_morale / personne_physique = le nom de la personne morale ou physique gérant le verger (donnée accessible uniquement en interne) ;\n- surface = la surface du verger ;\n- nombre_arbres = le nombre d'arbres ;\n- surface_arbustive = la surface arbustive en m² ;\n- convention = verger ayant fait l'objet d'une convention pour sa gestion.\n\nCette couche de données est gérée dans QGIS.",
            langfre:
              "Cette couche localise les vergers partagés installés sur le domaine public et ayant fait l'objet d'un conventionnement avec la Ville de Rennes ou en gestion directe par la Direction des Jardins et de la Biodiversité (DJB).\nSous la forme de polygones définissant l'emprise concernée, les vergers sont localisés au sein d'un site \"espace vert\" référencé dans le champ \"site\" (voir métadonnée UUID = 63b90b59-c031-4546-b73e-a450173b2b6a).\nParmi les champs décrivant cette donnée :\n- site = identifiant du site de gestion de la DJB\n- denomination = la dénomination du site de gestion de la DJB; \n- quartier = le quartier de Rennes ;\n- nom_verger = le nom donnée au verger ;\n- date_creation = sa date de création ; \n- personne_morale / personne_physique = le nom de la personne morale ou physique gérant le verger (donnée accessible uniquement en interne) ;\n- surface = la surface du verger ;\n- nombre_arbres = le nombre d'arbres ;\n- surface_arbustive = la surface arbustive en m² ;\n- convention = verger ayant fait l'objet d'une convention pour sa gestion.\n\nCette couche de données est gérée dans QGIS.",
          },
          contact: [{ organisation: 'Ville de Rennes' }],
          changeDate: '2022-08-10T00:02:19Z',
          logo: '/images/logos/c40cf0bb-3c55-4132-b616-64e8db7b8dde.png',
          id: '15245111',
          createDate: '2022-08-10T00:02:19Z',
          resourceType: ['dataset'],
          linkProtocol: [
            'OGC:WMS',
            'OGC:WFS',
            'WWW:LINK-1.0-http--link',
            'OGC:GML',
            'WWW:LINK-1.0-http--link',
          ],
          userSavedCount: '0',
        },
        sort: [1660089739000],
        edit: true,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'c641b8bb248823b649d739edb58fc65dcf1a11ab',
        _score: null,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAIwAAAA6CAYAAABiU7FWAAABK0lEQVR4Xu3WvUoDQQCF0W0sfAnBBxF8AsF3E6xs1E4QBCsbaxFEm6jEiIhI/MHCIlhsdgTLgUgubLWcU96Z8mOYpkCgqQf4j2CICIZI8/T+WG+wULO1v1FvsFBz/3pbb7CQPwwRwRARDBHBEBEMEcEQEQwRwRARDBHBEBEMEcEQEQwRwRARDBHBEBEMEcEQEQwRwRARDBHBEBEMEcEQEQwRwRARDBHBEBEMEcH0YN7Ny/norMx+ZvXR4AimB3fPo7K2u1JOb47L29f0L6ChEkwPuq4rV5PL8vAyLus7q+Xk+qi+MhiC6VHbtuXwYq98fn/UR4MhGCKCISIYIoIhIhgigiEiGCKCISIYIoIhIhgigmFpk+lYMCxv+2BTMCzPC0NMMEQEQ0QwRH4BYOBZv6hkGnkAAAAASUVORK5CYII=',
              url: 'https://dev.geo2france.fr/geonetwork/srv/api/records/c641b8bb248823b649d739edb58fc65dcf1a11ab/attachments/c641b8bb248823b649d739edb58fc65dcf1a11ab.png',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2022-08-11T00:01:54.000Z',
              lte: '2022-08-11T00:01:54.000Z',
            },
          ],
          resourceTitleObject: {
            default: 'Stations de comptages des vélos sur Rennes Métropole',
            langfre: 'Stations de comptages des vélos sur Rennes Métropole',
          },
          uuid: 'c641b8bb248823b649d739edb58fc65dcf1a11ab',
          resourceDate: [
            { date: '2022-08-11T00:01:54.000Z', type: 'revision' },
          ],
          resourceLanguage: [''],
          resourceAbstractObject: {
            default:
              'Cette couche recense les différentes stations de comptage vélo sur Rennes Métropole.',
            langfre:
              'Cette couche recense les différentes stations de comptage vélo sur Rennes Métropole.',
          },
          contact: [{ organisation: '' }],
          changeDate: '2022-08-10T00:02:09Z',
          logo: '/images/logos/c40cf0bb-3c55-4132-b616-64e8db7b8dde.png',
          id: '15245110',
          createDate: '2022-08-10T00:02:09Z',
          resourceType: ['dataset'],
          linkProtocol: [
            'OGC:WMS-1.3.0-http-get-map',
            'text/html',
            'text/xml',
            'image/png',
          ],
          userSavedCount: '0',
        },
        sort: [1660089729000],
        edit: true,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
      },
    ],
  },
})

export const elasticServiceMetadataHistsFixture = () => ({
  hits: {
    max_score: 1,
    hits: [
      {
        _index: 'gn-records',
        _id: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
        _score: 8.415642,
        _ignored: ['overview.data.keyword'],
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
          standardNameObject: {
            default: 'ISO 19119',
            langfre: 'ISO 19119',
          },
          standardVersionObject: {
            default: '2005/Amd.1:2008',
            lang: '2005/Amd.1:2008',
          },
          indexingDate: 1737025488038,
          dateStamp: '2024-10-15T07:37:39.350704Z',
          mainLanguage: 'fre',
          cl_characterSet: [
            {
              key: 'utf8',
              default: 'Utf8',
              langfre: 'Utf8',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_CharacterSetCode',
            },
          ],
          resourceType: ['service'],
          resourceTypeNameObject: {
            default: 'Service',
            langfre: 'Service',
          },
          OrgObject: {
            default:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            langfre:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
          },
          pointOfContactOrg_tree: [
            'SPW',
            'SPW - Secrétariat général',
            'SPW - Secrétariat général - SPW Digital',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée',
          ],
          pointOfContactOrgObject: {
            default:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            langfre:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
          },
          contact: [
            {
              organisationObject: {
                default:
                  'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                langfre:
                  'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
              },
              role: 'pointOfContact',
              email: 'helpdesk.carto@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          cl_resourceScope: [
            {
              key: 'service',
              default: 'Service',
              langfre: 'Service',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode',
            },
          ],
          cl_function: [
            {
              key: 'completeMetadata',
              default: 'Métadonnées intégrales',
              langfre: 'Métadonnées intégrales',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
            {
              key: 'information',
              default: 'Information',
              langfre: 'Information',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
            {
              key: 'browsing',
              default: 'Consultation',
              langfre: 'Consultation',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
          ],
          cl_type: [
            {
              key: 'theme',
              default: 'Thème',
              langfre: 'Thème',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_KeywordTypeCode',
            },
          ],
          cl_accessConstraints: [
            {
              key: 'otherRestrictions',
              default: 'Autres restrictions',
              langfre: 'Autres restrictions',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_RestrictionCode',
            },
          ],
          cl_couplingType: [
            {
              key: 'loose',
              default: 'Libre',
              langfre: 'Libre',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#SV_CouplingType',
            },
          ],
          cl_distributedComputingPlatform: [
            {
              key: 'webservices',
              default: 'webservices',
              langfre: 'webservices',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#DCPList',
            },
          ],
          resourceTitleObject: {
            default: 'Service OGC API Records du catalogue NAP-ITS-Wallonia',
            langfre: 'Service OGC API Records du catalogue NAP-ITS-Wallonia',
          },
          resourceLastUpdateDate: '2023-12-18',
          publicationDateForResource: ['2023-12-17T23:00:00.000Z'],
          publicationYearForResource: '2023',
          publicationMonthForResource: '2023-12',
          revisionDateForResource: ['2023-12-17T23:00:00.000Z'],
          revisionYearForResource: '2023',
          revisionMonthForResource: '2023-12',
          resourceDate: [
            {
              type: 'publication',
              date: '2023-12-17T23:00:00.000Z',
            },
            {
              type: 'revision',
              date: '2023-12-17T23:00:00.000Z',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2023-12-17T23:00:00.000Z',
              lte: '2023-12-17T23:00:00.000Z',
            },
          ],
          resourceIdentifier: [
            {
              code: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
              codeSpace: 'http://geodata.wallonie.be/id/',
              link: '',
            },
          ],
          'mw-gp-globalIdentifier':
            'http://geodata.wallonie.be/id/fe1c1a3d-c75b-435c-a1d1-48426818f54d',
          resourceAbstractObject: {
            default:
              "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
            langfre:
              "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
          },
          infrasig_ReportingINSPIRE: 'false',
          resourceHookAbstractObject: {
            default:
              "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
            langfre:
              "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
          },
          OrgForResourceObject: [
            {
              default:
                'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
              langfre:
                'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            },
            {
              default:
                'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
              langfre:
                'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            },
            {
              default: 'Service public de Wallonie (SPW)',
              langfre: 'Service public de Wallonie (SPW)',
            },
          ],
          pointOfContactOrgForResource_tree: [
            'SPW',
            'SPW - Secrétariat général',
            'SPW - Secrétariat général - SPW Digital',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée',
          ],
          pointOfContactOrgForResourceObject: {
            default:
              'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            langfre:
              'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
          },
          contactForResource: [
            {
              organisationObject: {
                default:
                  'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                langfre:
                  'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
              },
              role: 'pointOfContact',
              email: 'helpdesk.carto@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
            {
              organisationObject: {
                default:
                  'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
                langfre:
                  'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
              },
              role: 'custodian',
              email: 'helpdesk.carto@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
            {
              organisationObject: {
                default: 'Service public de Wallonie (SPW)',
                langfre: 'Service public de Wallonie (SPW)',
              },
              role: 'owner',
              email: '',
              website: 'https://geoportail.wallonie.be',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          custodianOrgForResource_tree: [
            'SPW',
            'SPW - Secrétariat général',
            'SPW - Secrétariat général - SPW Digital',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales',
            'SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée',
          ],
          custodianOrgForResourceObject: {
            default:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
            langfre:
              'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
          },
          ownerOrgForResource_tree: 'SPW',
          ownerOrgForResourceObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          hasOverview: 'true',
          inspireThemeNumber: '0',
          hasInspireTheme: 'false',
          tag: [
            {
              default: 'métadonnées',
              langfre: 'métadonnées',
            },
            {
              default: 'ISO',
              langfre: 'ISO',
            },
            {
              default: 'CSW',
              langfre: 'CSW',
            },
            {
              default: '19115',
              langfre: '19115',
            },
            {
              default: '19139',
              langfre: '19139',
            },
            {
              default: 'description',
              langfre: 'description',
            },
            {
              default: 'MobilityDCAT',
              langfre: 'MobilityDCAT',
            },
            {
              default: 'DCAT',
              langfre: 'DCAT',
            },
            {
              default: 'MMTIS',
              langfre: 'MMTIS',
            },
            {
              default: 'SRTI',
              langfre: 'SRTI',
            },
            {
              default: 'ITS',
              langfre: 'ITS',
            },
            {
              default: 'NAP',
              langfre: 'NAP',
            },
            {
              default: 'transportdata',
              langfre: 'transportdata',
            },
            {
              default: 'RTTI',
              langfre: 'RTTI',
            },
            {
              default: 'SSTP',
              langfre: 'SSTP',
            },
            {
              default: 'Régional',
              langfre: 'Régional',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
            },
            {
              default: 'Service de catalogue',
              langfre: 'Service de catalogue',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
            },
            {
              default: 'transport',
              langfre: 'transport',
              key: 'http://www.eionet.europa.eu/gemet/theme/37',
            },
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              key: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
            {
              default: 'Mobilité (autre)',
              langfre: 'Mobilité (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
            },
            {
              default: 'Données de base (autre)',
              langfre: 'Données de base (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
            },
            {
              default: 'Mobilité',
              langfre: 'Mobilité',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
            },
            {
              default: 'Données de base',
              langfre: 'Données de base',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
            },
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          tagNumber: '24',
          isOpenData: 'false',
          'keywordType-theme': [
            {
              default: 'Régional',
              langfre: 'Régional',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
            },
            {
              default: 'Service de catalogue',
              langfre: 'Service de catalogue',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
            },
            {
              default: 'transport',
              langfre: 'transport',
              link: 'http://www.eionet.europa.eu/gemet/theme/37',
            },
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
            {
              default: 'Mobilité (autre)',
              langfre: 'Mobilité (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
            },
            {
              default: 'Données de base (autre)',
              langfre: 'Données de base (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
            },
            {
              default: 'Mobilité',
              langfre: 'Mobilité',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
            },
            {
              default: 'Données de base',
              langfre: 'Données de base',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
            },
          ],
          'keywordType-place': [
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          'th_otherKeywords-Number': '15',
          'th_otherKeywords-': [
            {
              default: 'métadonnées',
              langfre: 'métadonnées',
            },
            {
              default: 'ISO',
              langfre: 'ISO',
            },
            {
              default: 'CSW',
              langfre: 'CSW',
            },
            {
              default: '19115',
              langfre: '19115',
            },
            {
              default: '19139',
              langfre: '19139',
            },
            {
              default: 'description',
              langfre: 'description',
            },
            {
              default: 'MobilityDCAT',
              langfre: 'MobilityDCAT',
            },
            {
              default: 'DCAT',
              langfre: 'DCAT',
            },
            {
              default: 'MMTIS',
              langfre: 'MMTIS',
            },
            {
              default: 'SRTI',
              langfre: 'SRTI',
            },
            {
              default: 'ITS',
              langfre: 'ITS',
            },
            {
              default: 'NAP',
              langfre: 'NAP',
            },
            {
              default: 'transportdata',
              langfre: 'transportdata',
            },
            {
              default: 'RTTI',
              langfre: 'RTTI',
            },
            {
              default: 'SSTP',
              langfre: 'SSTP',
            },
          ],
          'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScopeNumber':
            '1',
          'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope': [
            {
              default: 'Régional',
              langfre: 'Régional',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
            },
          ],
          'th_httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategoryNumber':
            '1',
          'th_httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory':
            [
              {
                default: 'Service de catalogue',
                langfre: 'Service de catalogue',
                link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
              },
            ],
          'th_gemet-themeNumber': '1',
          'th_gemet-theme': [
            {
              default: 'transport',
              langfre: 'transport',
              link: 'http://www.eionet.europa.eu/gemet/theme/37',
            },
          ],
          th_infraSIGNumber: '1',
          th_infraSIG: [
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
          ],
          th_Themes_geoportail_wallon_hierarchyNumber: '4',
          th_Themes_geoportail_wallon_hierarchy: [
            {
              default: 'Mobilité (autre)',
              langfre: 'Mobilité (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
            },
            {
              default: 'Données de base (autre)',
              langfre: 'Données de base (autre)',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
            },
            {
              default: 'Mobilité',
              langfre: 'Mobilité',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
            },
            {
              default: 'Données de base',
              langfre: 'Données de base',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
            },
          ],
          allKeywords: {
            'th_otherKeywords-': {
              title: 'otherKeywords-',
              theme: '',
              keywords: [
                {
                  default: 'métadonnées',
                  langfre: 'métadonnées',
                },
                {
                  default: 'ISO',
                  langfre: 'ISO',
                },
                {
                  default: 'CSW',
                  langfre: 'CSW',
                },
                {
                  default: '19115',
                  langfre: '19115',
                },
                {
                  default: '19139',
                  langfre: '19139',
                },
                {
                  default: 'description',
                  langfre: 'description',
                },
                {
                  default: 'MobilityDCAT',
                  langfre: 'MobilityDCAT',
                },
                {
                  default: 'DCAT',
                  langfre: 'DCAT',
                },
                {
                  default: 'MMTIS',
                  langfre: 'MMTIS',
                },
                {
                  default: 'SRTI',
                  langfre: 'SRTI',
                },
                {
                  default: 'ITS',
                  langfre: 'ITS',
                },
                {
                  default: 'NAP',
                  langfre: 'NAP',
                },
                {
                  default: 'transportdata',
                  langfre: 'transportdata',
                },
                {
                  default: 'RTTI',
                  langfre: 'RTTI',
                },
                {
                  default: 'SSTP',
                  langfre: 'SSTP',
                },
              ],
            },
            'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope':
              {
                id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
                title: 'Champ géographique',
                theme: 'theme',
                link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
                keywords: [
                  {
                    default: 'Régional',
                    langfre: 'Régional',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
                  },
                ],
              },
            'th_httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory':
              {
                id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
                title: 'Classification of spatial data services',
                theme: 'theme',
                link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
                keywords: [
                  {
                    default: 'Service de catalogue',
                    langfre: 'Service de catalogue',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
                  },
                ],
              },
            'th_gemet-theme': {
              id: 'geonetwork.thesaurus.external.theme.gemet-theme',
              title: 'GEMET themes',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme',
              keywords: [
                {
                  default: 'transport',
                  langfre: 'transport',
                  link: 'http://www.eionet.europa.eu/gemet/theme/37',
                },
              ],
            },
            th_infraSIG: {
              id: 'geonetwork.thesaurus.external.theme.infraSIG',
              title: 'Mots-clés InfraSIG',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.infraSIG',
              keywords: [
                {
                  default: 'Reporting INSPIRENO',
                  langfre: 'Reporting INSPIRENO',
                  link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
                },
              ],
            },
            th_Themes_geoportail_wallon_hierarchy: {
              id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
              title: 'Thèmes du géoportail wallon',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy',
              keywords: [
                {
                  default: 'Mobilité (autre)',
                  langfre: 'Mobilité (autre)',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
                },
                {
                  default: 'Données de base (autre)',
                  langfre: 'Données de base (autre)',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
                },
                {
                  default: 'Mobilité',
                  langfre: 'Mobilité',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
                },
                {
                  default: 'Données de base',
                  langfre: 'Données de base',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
                },
              ],
            },
          },
          'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope_tree':
            {
              default: ['Régional'],
              key: [
                'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
              ],
            },
          'th_httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory_tree':
            {
              default: [
                'Services de gestion des modèles/informations géographiques',
                'Services de gestion des modèles/informations géographiques^Service de catalogue',
              ],
              key: [
                'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoManagementService',
                'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoManagementService^http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
              ],
            },
          'th_gemet-theme_tree': {
            default: ['transport'],
            key: ['http://www.eionet.europa.eu/gemet/theme/37'],
          },
          th_infraSIG_tree: {
            default: ['Reporting INSPIRENO'],
            key: [
              'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            ],
          },
          th_Themes_geoportail_wallon_hierarchy_tree: {
            default: [
              'Données de base',
              'Données de base^Données de base (autre)',
              'Mobilité',
              'Mobilité^Mobilité (autre)',
            ],
            key: [
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/30^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/3099',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5099',
            ],
          },
          'mw-gp-keywords': {
            'th_otherKeywords-': {
              title: 'otherKeywords-',
              theme: '',
              keywords: [
                {
                  default: 'métadonnées',
                  langfre: 'métadonnées',
                },
                {
                  default: 'ISO',
                  langfre: 'ISO',
                },
                {
                  default: 'CSW',
                  langfre: 'CSW',
                },
                {
                  default: '19115',
                  langfre: '19115',
                },
                {
                  default: '19139',
                  langfre: '19139',
                },
                {
                  default: 'description',
                  langfre: 'description',
                },
                {
                  default: 'MobilityDCAT',
                  langfre: 'MobilityDCAT',
                },
                {
                  default: 'DCAT',
                  langfre: 'DCAT',
                },
                {
                  default: 'MMTIS',
                  langfre: 'MMTIS',
                },
                {
                  default: 'SRTI',
                  langfre: 'SRTI',
                },
                {
                  default: 'ITS',
                  langfre: 'ITS',
                },
                {
                  default: 'NAP',
                  langfre: 'NAP',
                },
                {
                  default: 'transportdata',
                  langfre: 'transportdata',
                },
                {
                  default: 'RTTI',
                  langfre: 'RTTI',
                },
                {
                  default: 'SSTP',
                  langfre: 'SSTP',
                },
              ],
            },
            'th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope':
              {
                id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
                title: 'Champ géographique',
                theme: 'theme',
                link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
                keywords: [
                  {
                    default: 'Régional',
                    langfre: 'Régional',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
                  },
                ],
              },
            'th_httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory':
              {
                id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
                title: 'Classification of spatial data services',
                theme: 'theme',
                link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
                keywords: [
                  {
                    default: 'Service de catalogue',
                    langfre: 'Service de catalogue',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoCatalogueService',
                  },
                ],
              },
            'th_gemet-theme': {
              id: 'geonetwork.thesaurus.external.theme.gemet-theme',
              title: 'GEMET themes',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme',
              keywords: [
                {
                  default: 'transport',
                  langfre: 'transport',
                  link: 'http://www.eionet.europa.eu/gemet/theme/37',
                },
              ],
            },
          },
          cl_topic: [
            {
              key: 'transportation',
              default: 'Infrastructures de transport',
              langfre: 'Infrastructures de transport',
            },
          ],
          MD_LegalConstraintsOtherConstraintsObject: [
            {
              default: 'No limitations to public access',
              langfre: 'No limitations to public access',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
            },
            {
              default: "Aucune contrainte d'utilisation ne s'applique",
              langfre: "Aucune contrainte d'utilisation ne s'applique",
            },
          ],
          'mw-gp-constraintsObject': [
            {
              default: 'No limitations to public access',
              langfre: 'No limitations to public access',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
            },
            {
              default: "Aucune condition ne s'applique",
              langfre: "Aucune condition ne s'applique",
            },
            {
              default: "Aucune contrainte d'utilisation ne s'applique",
              langfre: "Aucune contrainte d'utilisation ne s'applique",
            },
          ],
          MD_LegalConstraintsaccessConstraints: 'otherRestrictions',
          MD_ConstraintsUseLimitationObject: [
            {
              default: "Aucune condition ne s'applique",
              langfre: "Aucune condition ne s'applique",
            },
          ],
          MD_LegalConstraintsuseConstraints: 'otherRestrictions',
          licenseObject: [
            {
              default: 'No limitations to public access',
              langfre: 'No limitations to public access',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
            },
            {
              default: "Aucune contrainte d'utilisation ne s'applique",
              langfre: "Aucune contrainte d'utilisation ne s'applique",
            },
          ],
          extentDescriptionObject: [
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          geom: [
            {
              type: 'Polygon',
              coordinates: [
                [
                  [2.75, 49.45],
                  [6.5, 49.45],
                  [6.5, 50.85],
                  [2.75, 50.85],
                  [2.75, 49.45],
                ],
              ],
            },
          ],
          location: '50.150000000000006,4.625',
          serviceType: 'discovery',
          inspireServiceType: 'discovery',
          serviceTypeVersion: '',
          featureTypes: [],
          OrgForDistributionObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          distributorOrgForDistribution_tree: 'SPW',
          distributorOrgForDistributionObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          contactForDistribution: [
            {
              organisationObject: {
                default: 'Service public de Wallonie (SPW)',
                langfre: 'Service public de Wallonie (SPW)',
              },
              role: 'distributor',
              email: 'helpdesk.carto@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          orderingInstructionsObject: [
            {
              default:
                'Connexion libre pour la visualisation du contenu du catalogue.',
              langfre:
                'Connexion libre pour la visualisation du contenu du catalogue.',
            },
          ],
          linkUrl:
            'https://metawal.wallonie.be/geonetwork/api/collections/napits',
          linkProtocol: ['OGC API - Records'],
          linkUrlProtocolOGCAPIRecords:
            'https://metawal.wallonie.be/geonetwork/api/collections/napits',
          link: [
            {
              protocol: 'OGC API - Records',
              mimeType: '',
              urlObject: {
                default:
                  'https://metawal.wallonie.be/geonetwork/api/collections/napits',
                langfre:
                  'https://metawal.wallonie.be/geonetwork/api/collections/napits',
              },
              nameObject: {
                default: "Point d'accès OGC API Records pour NAP-ITS-Wallonia",
                langfre: "Point d'accès OGC API Records pour NAP-ITS-Wallonia",
              },
              descriptionObject: {
                default: "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
                langfre: "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
              },
              function: 'browsing',
              applicationProfile: '',
              group: 0,
            },
          ],
          recordOperateOn: [
            '41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
            'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
          ],
          recordLink: [
            {
              type: 'datasets',
              to: '41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
              title: '',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
              title: 'Catalogue NAP-ITS-Wallonia',
              origin: 'catalog',
            },
          ],
          recordLink_datasets: ['', 'Catalogue NAP-ITS-Wallonia'],
          recordLink_datasets_uuid: [
            '41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
            'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
          ],
          recordLink_datasets_url: [
            'https://metawal.wallonie.be/geonetwork/srv/api/records/41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
          ],
          operatesOn: [
            '41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
            'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/41123289-49d0-4f1e-87c2-1eeb5c8b6e58',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
          ],
          recordGroup: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
          recordOwner: 'Vincent Admin',
          uuid: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
          displayOrder: '0',
          groupPublishedId: ['1', '25'],
          popularity: 95,
          userinfo: 'vbombaerts_admin|Admin|Vincent|Administrator',
          groupPublished: ['all', 'DIG'],
          isPublishedToAll: 'true',
          record: 'record',
          draft: 'n',
          changeDate: '2024-10-15T07:37:39.350697Z',
          id: '53583',
          createDate: '2023-12-18T12:25:26.464Z',
          isPublishedToIntranet: 'false',
          owner: '50836',
          statusWorkflow: 'approved',
          groupOwner: '25',
          logo: '/images/logos/metawal.wallonie.be.png',
          mdStatus: '2',
          hasxlinks: 'false',
          op0: ['1', '25'],
          featureOfRecord: 'record',
          op1: '1',
          isPublishedToGuest: 'false',
          extra: 'null',
          documentStandard: 'iso19115-3.2018',
          op3: ['1', '25'],
          op6: '1',
          op5: '1',
          valid: '-1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          mdStatusChangeDate: '2023-12-18T12:32:49.043Z',
          isHarvested: 'false',
          userSavedCount: '0',
          sourceCatalogue: 'metawal.wallonie.be',
          overview: [
            {
              data: 'data:image/png;base64, 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',
              nameObject: {
                default: 'echangeur.png',
                langfre: 'echangeur.png',
              },
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/fe1c1a3d-c75b-435c-a1d1-48426818f54d/attachments/echangeur.png',
            },
          ],
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: true,
        download: true,
        dynamic: true,
        featured: true,
        selected: false,
        related: {
          hasfeaturecats: [],
          services: [],
          brothersAndSisters: [],
          parent: [],
          children: [],
          hassources: [],
          datasets: [
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/c2ecf78c-ffd6-404a-9632-9ad8e545d2a0/attachments/echangeur.png',
                associationType: '',
                resourceTitle: 'Catalogue NAP-ITS-Wallonia',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
                initiativeType: '',
              },
              _source: {
                resourceType: ['nonGeographicDataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Catalogue NAP-ITS-Wallonia',
                  langfre: 'Catalogue NAP-ITS-Wallonia',
                },
                resourceAbstractObject: {
                  default:
                    "Ce catalogue contient la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.\n\nIl s'agit des données relatives aux règlements MMTIS, RTTI, SRTI et SSTP qui doivent remonter dans le point d'accès national transportdata.be (NAP-ITS). Les données sont ajoutées au fur et à mesure de leur diffusion.",
                  langfre:
                    "Ce catalogue contient la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.\n\nIl s'agit des données relatives aux règlements MMTIS, RTTI, SRTI et SSTP qui doivent remonter dans le point d'accès national transportdata.be (NAP-ITS). Les données sont ajoutées au fur et à mesure de leur diffusion.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Ce catalogue contient la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.',
                  langfre:
                    'Ce catalogue contient la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: 'Ces données sont versées dans le domaine public.',
                    langfre: 'Ces données sont versées dans le domaine public.',
                    link: 'https://creativecommons.org/publicdomain/zero/1.0/',
                  },
                ],
                format: ['XML (.xml)'],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://metawal.wallonie.be/geonetwork/napits/fre/catalog.search',
                      langfre:
                        'https://metawal.wallonie.be/geonetwork/napits/fre/catalog.search',
                    },
                    nameObject: {
                      default: "Page d'accueil du catlaogue NAP-ITS-Wallonia",
                      langfre: "Page d'accueil du catlaogue NAP-ITS-Wallonia",
                    },
                    descriptionObject: {
                      default:
                        'Depuis cette page, vous pouvez effectuer des recherches simples et avancées dans le contenu du catalogue et exporter les résultats.',
                      langfre:
                        'Depuis cette page, vous pouvez effectuer des recherches simples et avancées dans le contenu du catalogue et exporter les résultats.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:CSW',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://metawal.wallonie.be/geonetwork/napits/fre/csw?SERVICE=CSW&VERSION=2.0.2&request=GetCapabilities',
                      langfre:
                        'https://metawal.wallonie.be/geonetwork/napits/fre/csw?SERVICE=CSW&VERSION=2.0.2&request=GetCapabilities',
                    },
                    nameObject: {
                      default: "Point d'accès CSW pour NAP-ITS-Wallonia.",
                      langfre: "Point d'accès CSW pour NAP-ITS-Wallonia.",
                    },
                    descriptionObject: {
                      default: "Point d'accès CSW pour NAP-ITS-Wallonia.",
                      langfre: "Point d'accès CSW pour NAP-ITS-Wallonia.",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC API - Records',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items',
                      langfre:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items',
                    },
                    nameObject: {
                      default:
                        "Point d'accès OGC API Records pour NAP-ITS-Wallonia",
                      langfre:
                        "Point d'accès OGC API Records pour NAP-ITS-Wallonia",
                    },
                    descriptionObject: {
                      default:
                        "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
                      langfre:
                        "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items?f=dcat',
                      langfre:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items?f=dcat',
                    },
                    nameObject: {
                      default: 'Fichier DCAT pour NAP-ITS-Wallonia',
                      langfre: 'Fichier DCAT pour NAP-ITS-Wallonia',
                    },
                    descriptionObject: {
                      default:
                        "FIchier DCAT pour NAP-ITS-Wallonia. Ce fichier contient tout le catalogue. Il est possible de télécharger des contenus plus ciblés en DCAT à travers le point d'accès OGC API Records.",
                      langfre:
                        "FIchier DCAT pour NAP-ITS-Wallonia. Ce fichier contient tout le catalogue. Il est possible de télécharger des contenus plus ciblés en DCAT à travers le point d'accès OGC API Records.",
                    },
                    function: 'download',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items?f=xml',
                      langfre:
                        'https://metawal.wallonie.be/geonetwork/api/collections/napits/items?f=xml',
                    },
                    nameObject: {
                      default: 'Fichier XML ISO 19115-3 pour NAP-ITS-Wallonia',
                      langfre: 'Fichier XML ISO 19115-3 pour NAP-ITS-Wallonia',
                    },
                    descriptionObject: {
                      default:
                        "FIchier XML au format ISO 19115-3 pour NAP-ITS-Wallonia. Ce fichier contient tout le catalogue. Il est possible de télécharger des contenus plus ciblés en XML à travers le point d'accès OGC API Records.",
                      langfre:
                        "FIchier XML au format ISO 19115-3 pour NAP-ITS-Wallonia. Ce fichier contient tout le catalogue. Il est possible de télécharger des contenus plus ciblés en XML à travers le point d'accès OGC API Records.",
                    },
                    function: 'download',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                uuid: 'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
                id: '53582',
                groupOwner: '25',
                op0: ['1', '25', '14688'],
                op1: ['1', '14688'],
                op3: ['1', '25', '14688'],
                op6: ['1', '14688'],
                op5: ['1', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'c2ecf78c-ffd6-404a-9632-9ad8e545d2a0',
            },
          ],
          associated: [],
        },
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
        _score: 8.88053,
        _source: {
          contactForResource: [
            {
              website: '',
              role: 'custodian',
              address: 'OIEau, 15 Rue Edouad Chamberland, 87000, France',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Sandre',
                langfre: 'Sandre',
              },
              email: 'sandre@sandre.eaufrance.fr',
            },
          ],
          geom: {
            coordinates: [
              [
                [-61.798, -21.371],
                [55.855, -21.371],
                [55.855, 51.088],
                [-61.798, 51.088],
                [-61.798, -21.371],
              ],
            ],
            type: 'Polygon',
          },
          inspireTheme: ['utility and governmental services'],
          isPublishedToAll: 'true',
          record: 'record',
          draft: 'n',
          linkUrlProtocolOGCWFS:
            'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities',
          id: '15415',
          metadataIdentifier: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
          recordLink: [
            {
              origin: 'remote',
              to: 'ebef2115-bee5-40bb-b5cc-4593d82ba334',
              type: 'datasets',
              title: 'Stations de traitement des eaux usées - France entière',
              url: 'https://www.sandre.eaufrance.fr/atlas/srv/fre/csw?service=CSW&request=GetRecordById&version=2.0.2&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=ebef2115-bee5-40bb-b5cc-4593d82ba334',
            },
          ],
          hasInspireTheme: 'true',
          inspireThemeNumber: '1',
          th_INSPIREprioritydataset: [
            {
              default: 'Directive 2012/18/EU',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
              langfre: 'Directive 2012/18/EU',
            },
            {
              default:
                'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
              langfre:
                'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
            },
          ],
          hasxlinks: 'true',
          tagNumber: '15',
          featureOfRecord: 'record',
          isPublishedToGuest: 'false',
          custodianOrgForResourceObject: {
            default: 'Sandre',
            langfre: 'Sandre',
          },
          cl_couplingType: [
            {
              default: 'Reserré',
              link: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#SV_CouplingType',
              key: 'tight',
              langfre: 'Reserré',
            },
          ],
          dateStamp: '2024-05-29T11:58:54.326Z',
          creationYearForResource: '2019',
          isTemplate: 'n',
          creationMonthForResource: '2019-12',
          standardVersionObject: {
            default: '1.0',
            langfre: '1.0',
          },
          OrgForResourceObject: {
            default: 'Sandre',
            langfre: 'Sandre',
          },
          recordOwner: 'Vincent Fabry',
          document: '',
          resourceTemporalDateRange: [
            {
              gte: '2019-12-02T00:00:00.000Z',
              lte: '2019-12-02T00:00:00.000Z',
            },
          ],
          OrgObject: {
            default: 'Sandre',
            langfre: 'Sandre',
          },
          mainLanguage: 'fre',
          th_COMMISSIONREGULATIONECNo12052008of3December2008implementingDirective20072ECoftheEuropeanParliamentandoftheCouncilasregardsmetadataPartD4ClassificationofSpatialDataServices:
            [
              {
                default: 'Service d’accès aux éléments',
                link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
                langfre: 'Service d’accès aux éléments',
              },
            ],
          valid: '-1',
          groupPublishedId: '1',
          popularity: 10,
          th_RegistredethmeINSPIRE: [
            {
              default: "Services d'utilité publique et services publics",
              link: 'http://inspire.ec.europa.eu/theme/pf',
              langfre: "Services d'utilité publique et services publics",
            },
          ],
          qualityScore: 62,
          createDate: '2021-12-14T15:02:50Z',
          MD_LegalConstraintsOtherConstraintsObject: [
            {
              default: 'No limitations on public access',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
              langfre: 'No limitations on public access',
            },
            {
              default: 'No conditions apply to access and use',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply',
              langfre: 'No conditions apply to access and use',
            },
          ],
          docType: 'metadata',
          creationDateForResource: ['2019-12-02T00:00:00.000Z'],
          'th_high-value-dataset-category-skos-ap-eu': [
            {
              default: 'Observation de la terre et environnement',
              langfre: 'Observation de la terre et environnement',
            },
          ],
          inspireServiceType: 'download',
          th_ChampgeographiqueNumber: '1',
          standardNameObject: {
            default: 'ISO 19115:2003/19139',
            langfre: 'ISO 19115:2003/19139',
          },
          resourceType: ['service'],
          linkProtocol: ['OGC:WFS'],
          serviceType: 'download',
          th_Champgeographique: [
            {
              default: 'National',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
              langfre: 'National',
            },
          ],
          inspireAnnex: ['iii'],
          rating: '0',
          inspireThemeUri: ['http://inspire.ec.europa.eu/theme/us'],
          cl_characterSet: [
            {
              default: 'Utf8',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode',
              key: 'utf8',
              langfre: 'Utf8',
            },
          ],
          uuid: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
          lineageObject: {
            default:
              "Localisation par un ponctuel de l'ouvrage de dépollution a partir d'un fichier csv collecté sur le site du ministère : http://assainissement.developpement-durable.gouv.fr/. \nLa table des ponctuels comprend désormais tous les points de localisation des stations d'épuration calculés à partir des centroïdes de leur emprise. \nFréquence de mise à jour : annuel. \nQualité des données : Variable selon le type de saisie.",
            langfre:
              "Localisation par un ponctuel de l'ouvrage de dépollution a partir d'un fichier csv collecté sur le site du ministère : http://assainissement.developpement-durable.gouv.fr/. \nLa table des ponctuels comprend désormais tous les points de localisation des stations d'épuration calculés à partir des centroïdes de leur emprise. \nFréquence de mise à jour : annuel. \nQualité des données : Variable selon le type de saisie.",
          },
          cl_type: [
            {
              default: 'Thème',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
              key: 'theme',
              langfre: 'Thème',
            },
          ],
          contact: [
            {
              website: '',
              role: 'pointOfContact',
              address: 'OIEau, 15 rue Edouard Chamberland, 87000, France',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Sandre',
                langfre: 'Sandre',
              },
              email: 'sandre@sandre.eaufrance.fr',
            },
          ],
          linkUrl:
            'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities',
          changeDate: '2024-05-29T11:58:54.326Z',
          logo: '/images/logos/c3f93209-4363-4e30-bec2-3cc43bd7a8a7.png',
          tag: [
            {
              default: 'WFS',
              langfre: 'WFS',
            },
            {
              default: 'Ouvrage de dépollution',
              langfre: 'Ouvrage de dépollution',
            },
            {
              default: 'Rapportage',
              langfre: 'Rapportage',
            },
            {
              default: 'ODP',
              langfre: 'ODP',
            },
            {
              default: 'SysTraitementEauxUsees',
              langfre: 'SysTraitementEauxUsees',
            },
            {
              default: 'Données ouvertes',
              langfre: 'Données ouvertes',
            },
            {
              default: "Services d'utilité publique et services publics",
              langfre: "Services d'utilité publique et services publics",
            },
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
            {
              default: 'hvd',
              langfre: 'hvd',
            },
            {
              default: 'Service d’accès aux éléments',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
              langfre: 'Service d’accès aux éléments',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
            },
            {
              default: 'National',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
              langfre: 'National',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
            },
            {
              default: "Services d'utilité publique et services publics",
              link: 'http://inspire.ec.europa.eu/theme/pf',
              langfre: "Services d'utilité publique et services publics",
              key: 'http://inspire.ec.europa.eu/theme/pf',
            },
            {
              default: 'Observation de la terre et environnement',
              langfre: 'Observation de la terre et environnement',
            },
            {
              default: 'Directive 2012/18/EU',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
              langfre: 'Directive 2012/18/EU',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
            },
            {
              default:
                'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
              langfre:
                'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
              key: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
            },
          ],
          indexingError: 'true',
          recordGroup: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
          isPublishedToIntranet: 'false',
          inspireTheme_syn: ["Services d'utilité publique et services publics"],
          conformTo_COMMISSIONREGULATIONEUNo10892010of23November2010implementingDirective20072ECoftheEuropeanParliamentandoftheCouncilasregardsinteroperabilityofspatialdatasetsandservices:
            'true',
          th_COMMISSIONREGULATIONECNo12052008of3December2008implementingDirective20072ECoftheEuropeanParliamentandoftheCouncilasregardsmetadataPartD4ClassificationofSpatialDataServicesNumber:
            '1',
          th_RegistredethmeINSPIRENumber: '1',
          documentStandard: 'iso19139',
          resourceAbstractObject: {
            default:
              "Le service web (WFS) du référentiel des Stations de traitement des eaux permet de télécharger les ouvrages impliqués dans la dépollution des eaux usées. Les différents concepts définis dans le scénario d'échange du référentiel Stations de traitement des eaux usées du Sandre sont diffusés par ce service.",
            langfre:
              "Le service web (WFS) du référentiel des Stations de traitement des eaux permet de télécharger les ouvrages impliqués dans la dépollution des eaux usées. Les différents concepts définis dans le scénario d'échange du référentiel Stations de traitement des eaux usées du Sandre sont diffusés par ce service.",
          },
          feedbackCount: '0',
          licenseObject: [
            {
              default: 'No limitations on public access',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
              langfre: 'No limitations on public access',
            },
            {
              default: 'No conditions apply to access and use',
              link: 'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply',
              langfre: 'No conditions apply to access and use',
            },
          ],
          resourceAltTitleObject: [
            {
              default: '',
              lang: '',
            },
          ],
          isHarvested: 'true',
          xlink: [
            'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
            'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope',
            'http://inspire.ec.europa.eu/theme/pf',
            'http://inspire.ec.europa.eu/theme',
            'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
            'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
            'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
            'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset',
            'https://www.sandre.eaufrance.fr/atlas/srv/api/registries/vocabularies/external.theme.high-value-dataset-category-skos-ap-eu',
            'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
            'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply',
            'https://www.sandre.eaufrance.fr/atlas/srv/fre/csw?service=CSW&request=GetRecordById&version=2.0.2&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=ebef2115-bee5-40bb-b5cc-4593d82ba334',
          ],
          inspireThemeFirst_syn:
            "Services d'utilité publique et services publics",
          isOpenData: 'false',
          'th_otherKeywords-theme': [
            {
              default: 'WFS',
              langfre: 'WFS',
            },
            {
              default: 'Ouvrage de dépollution',
              langfre: 'Ouvrage de dépollution',
            },
            {
              default: 'Rapportage',
              langfre: 'Rapportage',
            },
            {
              default: 'ODP',
              langfre: 'ODP',
            },
            {
              default: 'SysTraitementEauxUsees',
              langfre: 'SysTraitementEauxUsees',
            },
            {
              default: 'Données ouvertes',
              langfre: 'Données ouvertes',
            },
            {
              default: "Services d'utilité publique et services publics",
              langfre: "Services d'utilité publique et services publics",
            },
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
            {
              default: 'hvd',
              langfre: 'hvd',
            },
          ],
          link: [
            {
              protocol: 'OGC:WFS',
              descriptionObject: {
                default:
                  'Ouvrages de dépollution - Système de traitement des eaux usées - France entière',
                langfre:
                  'Ouvrages de dépollution - Système de traitement des eaux usées - France entière',
              },
              function: '',
              applicationProfile: 'Service de téléchargement',
              mimeType: '',
              urlObject: {
                default:
                  'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities',
              },
              nameObject: {
                default: 'sa:SysTraitementEauxUsees',
                langfre: 'sa:SysTraitementEauxUsees',
              },
              group: 0,
            },
          ],
          displayOrder: '0',
          cl_hierarchyLevel: [
            {
              default: 'Service',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
              key: 'service',
              langfre: 'Service',
            },
          ],
          inspireThemeFirst: 'utility and governmental services',
          recordOperateOn: 'ebef2115-bee5-40bb-b5cc-4593d82ba334',
          harvesterUuid: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
          indexingDate: '2025-01-16T15:30:02.335Z',
          resourceDate: [
            {
              date: '2019-12-02T00:00:00.000Z',
              type: 'creation',
            },
          ],
          sourceCatalogue: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
          cl_accessConstraints: [
            {
              default: 'Autres restrictions',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode',
              key: 'otherRestrictions',
              langfre: 'Autres restrictions',
            },
          ],
          groupPublished: 'all',
          cl_DCP: [
            {
              default: 'WebServices',
              link: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#DCPList',
              key: 'WebServices',
              langfre: 'WebServices',
            },
          ],
          specificationConformance: [
            {
              date: '2010-12-08',
              pass: 'true',
              title:
                'COMMISSION REGULATION (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services',
              explanation: 'cf. la spécification citée',
            },
          ],
          extra: 'null',
          th_INSPIREprioritydatasetNumber: '2',
          hasOverview: 'false',
          userinfo: 'vfabry|Fabry|Vincent|Administrator',
          allKeywords: {
            th_Champgeographique: {
              keywords: [
                {
                  default: 'National',
                  link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
                  langfre: 'National',
                },
              ],
              theme: '',
              title: 'Champ géographique',
            },
            'th_otherKeywords-theme': {
              keywords: [
                {
                  default: 'WFS',
                  langfre: 'WFS',
                },
                {
                  default: 'Ouvrage de dépollution',
                  langfre: 'Ouvrage de dépollution',
                },
                {
                  default: 'Rapportage',
                  langfre: 'Rapportage',
                },
                {
                  default: 'ODP',
                  langfre: 'ODP',
                },
                {
                  default: 'SysTraitementEauxUsees',
                  langfre: 'SysTraitementEauxUsees',
                },
                {
                  default: 'Données ouvertes',
                  langfre: 'Données ouvertes',
                },
                {
                  default: "Services d'utilité publique et services publics",
                  langfre: "Services d'utilité publique et services publics",
                },
                {
                  default: 'France métropolitaine',
                  langfre: 'France métropolitaine',
                },
                {
                  default: 'hvd',
                  langfre: 'hvd',
                },
              ],
              theme: 'theme',
              title: 'otherKeywords-theme',
            },
            th_RegistredethmeINSPIRE: {
              keywords: [
                {
                  default: "Services d'utilité publique et services publics",
                  link: 'http://inspire.ec.europa.eu/theme/pf',
                  langfre: "Services d'utilité publique et services publics",
                },
              ],
              link: 'http://inspire.ec.europa.eu/theme',
              theme: 'theme',
              id: 'Registre de thème INSPIRE',
              title: 'GEMET - INSPIRE themes, version 1.0',
            },
            'th_high-value-dataset-category-skos-ap-eu': {
              keywords: [
                {
                  default: 'Observation de la terre et environnement',
                  langfre: 'Observation de la terre et environnement',
                },
              ],
              link: 'https://www.sandre.eaufrance.fr/atlas/srv/api/registries/vocabularies/external.theme.high-value-dataset-category-skos-ap-eu',
              theme: 'theme',
              id: 'geonetwork.thesaurus.external.theme.high-value-dataset-category-skos-ap-eu',
              title: 'High-value dataset categories',
            },
            th_INSPIREprioritydataset: {
              keywords: [
                {
                  default: 'Directive 2012/18/EU',
                  link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/dir-2012-18',
                  langfre: 'Directive 2012/18/EU',
                },
                {
                  default:
                    'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
                  link: 'http://inspire.ec.europa.eu/metadata-codelist/PriorityDataset/EstablishmentsInvolvingDangerousSubstances-dir-2012-18',
                  langfre:
                    'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
                },
              ],
              theme: '',
              title: 'INSPIRE priority data set',
            },
            th_COMMISSIONREGULATIONECNo12052008of3December2008implementingDirective20072ECoftheEuropeanParliamentandoftheCouncilasregardsmetadataPartD4ClassificationofSpatialDataServices:
              {
                keywords: [
                  {
                    default: 'Service d’accès aux éléments',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceCategory/infoFeatureAccessService',
                    langfre: 'Service d’accès aux éléments',
                  },
                ],
                theme: '',
                title:
                  'COMMISSION REGULATION (EC) No 1205/2008 of 3 December 2008 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards metadata, Part D 4, Classification of Spatial Data Services',
              },
          },
          owner: '2161',
          indexingErrorMsg: [
            'Warning / Keyword Observation de la terre et environnement not found in geonetwork.thesaurus.external.theme.high-value-dataset-category-skos-ap-eu.',
          ],
          groupOwner: '1855168',
          pointOfContactOrgObject: {
            default: 'Sandre',
            langfre: 'Sandre',
          },
          resourceTypeNameObject: {
            default: 'Service',
            langfre: 'Service',
          },
          resourceTitleObject: {
            default:
              'Service web géographique OGC (WFS) du référentiel des Stations de traitement des eaux usées - Ouvrages de dépollution',
            langfre:
              'Service web géographique OGC (WFS) du référentiel des Stations de traitement des eaux usées - Ouvrages de dépollution',
          },
          'th_otherKeywords-themeNumber': '9',
          'th_high-value-dataset-category-skos-ap-euNumber': '1',
          resourceIdentifier: [
            {
              code: 'https://id.eaufrance.fr/meta/ODP_WFS',
              link: '',
              codeSpace: '',
            },
          ],
          location: '14.858500000000001,-2.9715000000000025',
          'keywordType-theme': [
            {
              default: 'WFS',
              langfre: 'WFS',
            },
            {
              default: 'Ouvrage de dépollution',
              langfre: 'Ouvrage de dépollution',
            },
            {
              default: 'Rapportage',
              langfre: 'Rapportage',
            },
            {
              default: 'ODP',
              langfre: 'ODP',
            },
            {
              default: 'SysTraitementEauxUsees',
              langfre: 'SysTraitementEauxUsees',
            },
            {
              default: 'Données ouvertes',
              langfre: 'Données ouvertes',
            },
            {
              default: "Services d'utilité publique et services publics",
              langfre: "Services d'utilité publique et services publics",
            },
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
            {
              default: 'hvd',
              langfre: 'hvd',
            },
            {
              default: "Services d'utilité publique et services publics",
              link: 'http://inspire.ec.europa.eu/theme/pf',
              langfre: "Services d'utilité publique et services publics",
            },
            {
              default: 'Observation de la terre et environnement',
              langfre: 'Observation de la terre et environnement',
            },
          ],
          inspireAnnexForFirstTheme: 'iii',
          userSavedCount: '0',
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
        related: {
          children: [],
          datasets: [
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://services.sandre.eaufrance.fr/telechargement/geo/ODP/imagette_ODP_2.PNG',
                associationType: '',
                resourceTitle: '',
                url: 'https://www.sandre.eaufrance.fr/atlas/srv/fre/csw?service=CSW&request=GetRecordById&version=2.0.2&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=ebef2115-bee5-40bb-b5cc-4593d82ba334',
                initiativeType: '',
              },
              _source: {
                op1: '1',
                op5: '1',
                resourceAbstractObject: {
                  default:
                    "Le système de traitement d'eaux usées est un ouvrage de dépollution des eaux usées par des procédés divers : biologiques, physico-chimiques... localisés sur un espace géographique continu et homogène. Il est de type urbain, industriel ou mixte en fonction de la nature du maître d'ouvrage.\nPlus concrètement, quelles que soient les configurations, une station d'épuration est tout l'espace géographique \"délimité par la clôture\" contenant un ensemble de constructions de génie civil dotées d'appareillages et appartenant à un seul maître d'ouvrage.\nLe système de traitement d'eaux usées comprend la station d'épuration et le déversoir en tête de station (ouvrage du système de traitement qui permet de dériver tout ou partie des effluents qui arrivent à la station).\nLe constructeur global de la station d'épuration est la désignation sociale de la principale société de BTP qui a construit la station d'épuration. Quand plusieurs sociétés sont intervenues dans la construction de la station d'épuration, c'est celle qui a réalisé la part la plus importante des travaux qui sera retenue. Quand une station d'épuration a fait l'objet de plusieurs programmes de travaux, c'est le dernier constructeur principal qui est pris en compte.\nLes informations descriptives sur les systèmes de traitement d'eaux usées relèvent de la responsabilité des Agences de l'eau.",
                  langfre:
                    "Le système de traitement d'eaux usées est un ouvrage de dépollution des eaux usées par des procédés divers : biologiques, physico-chimiques... localisés sur un espace géographique continu et homogène. Il est de type urbain, industriel ou mixte en fonction de la nature du maître d'ouvrage.\nPlus concrètement, quelles que soient les configurations, une station d'épuration est tout l'espace géographique \"délimité par la clôture\" contenant un ensemble de constructions de génie civil dotées d'appareillages et appartenant à un seul maître d'ouvrage.\nLe système de traitement d'eaux usées comprend la station d'épuration et le déversoir en tête de station (ouvrage du système de traitement qui permet de dériver tout ou partie des effluents qui arrivent à la station).\nLe constructeur global de la station d'épuration est la désignation sociale de la principale société de BTP qui a construit la station d'épuration. Quand plusieurs sociétés sont intervenues dans la construction de la station d'épuration, c'est celle qui a réalisé la part la plus importante des travaux qui sera retenue. Quand une station d'épuration a fait l'objet de plusieurs programmes de travaux, c'est le dernier constructeur principal qui est pris en compte.\nLes informations descriptives sur les systèmes de traitement d'eaux usées relèvent de la responsabilité des Agences de l'eau.",
                },
                groupOwner: '1855168',
                resourceTitleObject: {
                  default:
                    'Stations de traitement des eaux usées - France entière',
                  langfre:
                    'Stations de traitement des eaux usées - France entière',
                },
                format: [
                  'ESRI Shapefile',
                  'GML',
                  'Image',
                  'ZIP',
                  'Geopackage',
                  'GML',
                  'CSV',
                  'JSON',
                  'GML',
                  'Image',
                  'Image',
                  'XML',
                  'KML',
                ],
                link: [
                  {
                    protocol: 'WWW:LINK-1.0-http--link',
                    function: 'information',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://assainissement.developpement-durable.gouv.fr/',
                    },
                    nameObject: {
                      default:
                        "Consulter le portail d'information sur l'assainissement communal",
                      langfre:
                        "Consulter le portail d'information sur l'assainissement communal",
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK-1.0-http--related',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default: 'http://id.eaufrance.fr/ddd/ODP/1.1',
                    },
                    nameObject: {
                      default:
                        'Consulter le dictionnaire Sandre des Ouvrages de dépollution (ODP)',
                      langfre:
                        'Consulter le dictionnaire Sandre des Ouvrages de dépollution (ODP)',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-ftp--download',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/telechargement/geo/ODP/sandre_sc_referentiels_odp_1.pdf',
                    },
                    nameObject: {
                      default:
                        "Consulter le scénario d'échange du référentiel des Ouvrages de dépollution (ODP) aux formats géographiques sur le site Sandre",
                      langfre:
                        "Consulter le scénario d'échange du référentiel des Ouvrages de dépollution (ODP) aux formats géographiques sur le site Sandre",
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK-1.0-http--related',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://mdm.sandre.eaufrance.fr/geo/rapports/public/SysTraitementEauxUsees',
                    },
                    nameObject: {
                      default:
                        'Consulter le rapport de contrôles de conformité Sandre',
                      langfre:
                        'Consulter le rapport de contrôles de conformité Sandre',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    descriptionObject: {
                      default:
                        'Système de Traitement des Eaux Usées (Layer : SysTraitementEauxUsees)',
                      langfre:
                        'Système de Traitement des Eaux Usées (Layer : SysTraitementEauxUsees)',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WMS&VERSION=1.3',
                    },
                    nameObject: {
                      default: 'SysTraitementEauxUsees',
                      langfre: 'SysTraitementEauxUsees',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WFS',
                    descriptionObject: {
                      default:
                        'Systèmes de traitement des eaux usées - France entière',
                      langfre:
                        'Systèmes de traitement des eaux usées - France entière',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WFS&VERSION=2.0.0',
                    },
                    nameObject: {
                      default: 'SysTraitementEauxUsees',
                      langfre: 'SysTraitementEauxUsees',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'FILE:GEO',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=SysTraitementEauxUsees&SRSNAME=EPSG:4326&OUTPUTFORMAT=SHAPEZIP',
                    },
                    nameObject: {
                      default: 'Télécharger au format ESRI shape',
                      langfre: 'Télécharger au format ESRI shape',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'FILE:GEO',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=SysTraitementEauxUsees&SRSNAME=EPSG:4326&OUTPUTFORMAT=GPKG',
                    },
                    nameObject: {
                      default: 'Télécharger au format Géopackage (GPKG)',
                      langfre: 'Télécharger au format Géopackage (GPKG)',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-ftp--download',
                    descriptionObject: {
                      default: 'Téléchargement des données France entière',
                      langfre: 'Téléchargement des données France entière',
                    },
                    function: 'download',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://services.sandre.eaufrance.fr/telechargement/geo/ODP/SysTraitementEauxUsees/SysTraitementEauxUsees_gpkg.zip',
                    },
                    nameObject: {
                      default:
                        'Téléchargement des données Geopackage - Format ZIP',
                      langfre:
                        'Téléchargement des données Geopackage - Format ZIP',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-ftp--download',
                    descriptionObject: {
                      default: 'Téléchargement des données France entière',
                      langfre: 'Téléchargement des données France entière',
                    },
                    function: 'download',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://services.sandre.eaufrance.fr/telechargement/geo/ODP/SysTraitementEauxUsees/SysTraitementEauxUsees_shp.zip',
                    },
                    nameObject: {
                      default:
                        'Téléchargement des données ESRI Shapefile - Format ZIP',
                      langfre:
                        'Téléchargement des données ESRI Shapefile - Format ZIP',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    descriptionObject: {
                      default:
                        "Communes associées aux agglomération d'assainissement (Layer : CommuneAgglomerationAssainissement)",
                      langfre:
                        "Communes associées aux agglomération d'assainissement (Layer : CommuneAgglomerationAssainissement)",
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WMS&VERSION=1.3',
                    },
                    nameObject: {
                      default: 'CommuneAgglomerationAssainissement',
                      langfre: 'CommuneAgglomerationAssainissement',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WFS',
                    descriptionObject: {
                      default:
                        "Communes associées aux agglomération d'assainissement (Layer : CommuneAgglomerationAssainissement)",
                      langfre:
                        "Communes associées aux agglomération d'assainissement (Layer : CommuneAgglomerationAssainissement)",
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WMS&VERSION=2.0.0',
                    },
                    nameObject: {
                      default: 'CommuneAgglomerationAssainissement',
                      langfre: 'CommuneAgglomerationAssainissement',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'FILE:GEO',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=CommuneAgglomerationAssainissement&SRSNAME=EPSG:4326&OUTPUTFORMAT=CSV',
                    },
                    nameObject: {
                      default:
                        "Télécharger les Communes associées aux agglomération d'assainissement au format CSV",
                      langfre:
                        "Télécharger les Communes associées aux agglomération d'assainissement au format CSV",
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    descriptionObject: {
                      default:
                        'Communes associées aux systemes de collecte (Layer : CommuneSystemeCollecte)',
                      langfre:
                        'Communes associées aux systemes de collecte (Layer : CommuneSystemeCollecte)',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WMS&VERSION=1.3',
                    },
                    nameObject: {
                      default: 'CommuneSystemeCollecte',
                      langfre: 'CommuneSystemeCollecte',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WFS',
                    descriptionObject: {
                      default:
                        'Communes associées aux systemes de collecte (Layer : CommuneSystemeCollecte)',
                      langfre:
                        'Communes associées aux systemes de collecte (Layer : CommuneSystemeCollecte)',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?REQUEST=getCapabilities&service=WMS&VERSION=2.0.0',
                    },
                    nameObject: {
                      default: 'CommuneSystemeCollecte',
                      langfre: 'CommuneSystemeCollecte',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'FILE:GEO',
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=CommuneSystemeCollecte&SRSNAME=EPSG:4326&OUTPUTFORMAT=CSV',
                    },
                    nameObject: {
                      default:
                        "Télécharger les Communes associées aux agglomération d'assainissement au format CSV",
                      langfre:
                        "Télécharger les Communes associées aux agglomération d'assainissement au format CSV",
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    descriptionObject: {
                      default:
                        'SysTraitementEauxUsees - xml Sandre v4 - alphanumeric',
                      langfre:
                        'SysTraitementEauxUsees - xml Sandre v4 - alphanumeric',
                    },
                    function: 'download',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://api.sandre.eaufrance.fr/referentiels/v1/systraitementeauxusees?outputSchema=SANDREv4',
                    },
                    nameObject: {
                      default: 'SysTraitementEauxUsees - xml Sandre v4',
                      langfre: 'SysTraitementEauxUsees - xml Sandre v4',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    descriptionObject: {
                      default:
                        'SysTraitementEauxUsees - json - V4 Sandre - alphanumeric',
                      langfre:
                        'SysTraitementEauxUsees - json - V4 Sandre - alphanumeric',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://api.sandre.eaufrance.fr/referentiels/v1/systraitementeauxusees.json?outputSchema=SANDREv4',
                    },
                    nameObject: {
                      default: 'SysTraitementEauxUsees - json V4 - Sandre',
                      langfre: 'SysTraitementEauxUsees - json V4 - Sandre',
                    },
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    descriptionObject: {
                      default:
                        'SysTraitementEauxUsees - CSV - Sandre v4  - Alphanumeric',
                      langfre:
                        'SysTraitementEauxUsees - CSV - Sandre v4  - Alphanumeric',
                    },
                    function: '',
                    applicationProfile: '',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://api.sandre.eaufrance.fr/referentiels/v1/systraitementeauxusees.csv?outputSchema=SANDREv4',
                    },
                    nameObject: {
                      default: 'SysTraitementEauxUsees - CSV - Sandre v4',
                      langfre: 'SysTraitementEauxUsees - CSV - Sandre v4',
                    },
                    group: 0,
                  },
                ],
                id: '15466',
                cl_status: [
                  {
                    key: 'completed',
                  },
                ],
                uuid: 'ebef2115-bee5-40bb-b5cc-4593d82ba334',
                op0: '1',
                resourceType: ['dataset', 'map', 'map/static'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: false,
                download: true,
                dynamic: true,
                featured: false,
              },
              _id: 'ebef2115-bee5-40bb-b5cc-4593d82ba334',
            },
          ],
          hasfeaturecats: [],
          brothersAndSisters: [],
          associated: [],
          parent: [],
          hassources: [],
          services: [],
        },
      },
    ],
  },
})

export const elasticReuseMetadataHitsFixture = () => ({
  hits: {
    max_score: 1,
    hits: [
      {
        _index: 'gn-records',
        _id: '83809bcd-1763-4d28-b820-2b9828083ba5',
        _score: 8.354177,
        _ignored: ['overview.data.keyword'],
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: '83809bcd-1763-4d28-b820-2b9828083ba5',
          standardNameObject: {
            default: 'ISO 19115-3',
            langfre: 'ISO 19115-3',
          },
          standardVersionObject: {
            default: '2005/Amd.1:2008',
            lang: '2005/Amd.1:2008',
          },
          indexingDate: 1737543379271,
          dateStamp: '2024-07-22T11:52:39.049Z',
          mainLanguage: 'fre',
          cl_characterSet: [
            {
              key: 'utf8',
              default: 'Utf8',
              langfre: 'Utf8',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_CharacterSetCode',
            },
          ],
          resourceType: ['application'],
          resourceTypeNameObject: {
            default: 'Application généraliste',
            langfre: 'Application généraliste',
          },
          OrgObject: {
            default:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
            langfre:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
          },
          pointOfContactOrg_tree: [
            'SPW',
            'SPW - Territoire, Logement, Patrimoine, Énergie',
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme",
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales",
          ],
          pointOfContactOrgObject: {
            default:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
            langfre:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
          },
          contact: [
            {
              organisationObject: {
                default:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                langfre:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
              },
              role: 'pointOfContact',
              email: 'jeanchristophe.sainte@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          cl_resourceScope: [
            {
              key: 'application',
              default: 'Application',
              langfre: 'Application',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode',
            },
          ],
          cl_function: [
            {
              key: 'completeMetadata',
              default: 'Métadonnées intégrales',
              langfre: 'Métadonnées intégrales',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
            {
              key: 'information',
              default: 'Information',
              langfre: 'Information',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
            {
              key: 'browsing',
              default: 'Consultation',
              langfre: 'Consultation',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_OnLineFunctionCode',
            },
          ],
          cl_referenceSystemType: [
            {
              key: 'projected',
              default: 'Projeté',
              langfre: 'Projeté',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ReferenceSystemTypeCode',
            },
          ],
          cl_type: [
            {
              key: 'theme',
              default: 'Thème',
              langfre: 'Thème',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_KeywordTypeCode',
            },
          ],
          cl_accessConstraints: [
            {
              key: 'otherRestrictions',
              default: 'Autres restrictions',
              langfre: 'Autres restrictions',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_RestrictionCode',
            },
          ],
          cl_useConstraints: [
            {
              key: 'license',
              default: 'Licence',
              langfre: 'Licence',
              link: 'http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_RestrictionCode',
            },
          ],
          resourceTitleObject: {
            default: 'Cartographie des données du SPW territoire',
            langfre: 'Cartographie des données du SPW territoire',
          },
          resourceAltTitleObject: [
            {
              default: 'Geoapps - webgisdgo4',
              langfre: 'Geoapps - webgisdgo4',
            },
          ],
          resourceLastUpdateDate: '2017-06-01',
          creationDateForResource: ['2017-05-31T22:00:00.000Z'],
          creationYearForResource: '2017',
          creationMonthForResource: '2017-05',
          publicationDateForResource: ['2018-03-31T22:00:00.000Z'],
          publicationYearForResource: '2018',
          publicationMonthForResource: '2018-03',
          resourceDate: [
            {
              type: 'creation',
              date: '2017-05-31T22:00:00.000Z',
            },
            {
              type: 'publication',
              date: '2018-03-31T22:00:00.000Z',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2017-05-31T22:00:00.000Z',
              lte: '2017-05-31T22:00:00.000Z',
            },
            {
              gte: '2018-03-31T22:00:00.000Z',
              lte: '2018-03-31T22:00:00.000Z',
            },
          ],
          resourceIdentifier: [
            {
              code: '83809bcd-1763-4d28-b820-2b9828083ba5',
              codeSpace: 'http://geodata.wallonie.be/id/',
              link: '',
            },
          ],
          'mw-gp-globalIdentifier':
            'http://geodata.wallonie.be/id/83809bcd-1763-4d28-b820-2b9828083ba5',
          resourceAbstractObject: {
            default:
              "Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).\n\nCette application propose une trentaine de couches de données thématiques regroupées dans cinq grands thèmes : 1) Aménagement du territoire et urbanisme, 2) Application particulière du CoDT, 3) Logement, 4) Patrimoine et 5) Applications spécifiques. Par thème, il est possible de consulter les couches de données individuellement à partir d'une liste prédéfinie, de consulter leurs métadonnées et leur légende.\n\n\nUne identification des données présentes sur le territoire est possible de trois manières différentes : fine, étendue ou par parcelle. Des liens sont prévus pour visualiser aisément les dossiers, et donc toute la partie documentaire. Le résultat peut être sauvé et exporté en pdf ou en xml.\n\nDes recherches (commune, rue, parcelle, coordonnées) sont également possibles, tout comme une impression.\n\nUne aide en ligne est mise à disposition.",
            langfre:
              "Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).\n\nCette application propose une trentaine de couches de données thématiques regroupées dans cinq grands thèmes : 1) Aménagement du territoire et urbanisme, 2) Application particulière du CoDT, 3) Logement, 4) Patrimoine et 5) Applications spécifiques. Par thème, il est possible de consulter les couches de données individuellement à partir d'une liste prédéfinie, de consulter leurs métadonnées et leur légende.\n\n\nUne identification des données présentes sur le territoire est possible de trois manières différentes : fine, étendue ou par parcelle. Des liens sont prévus pour visualiser aisément les dossiers, et donc toute la partie documentaire. Le résultat peut être sauvé et exporté en pdf ou en xml.\n\nDes recherches (commune, rue, parcelle, coordonnées) sont également possibles, tout comme une impression.\n\nUne aide en ligne est mise à disposition.",
          },
          infrasig_ReportingINSPIRE: 'false',
          resourceHookAbstractObject: {
            default:
              'Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).',
            langfre:
              'Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).',
          },
          OrgForResourceObject: [
            {
              default:
                "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
              langfre:
                "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
            },
            {
              default: 'Service public de Wallonie (SPW)',
              langfre: 'Service public de Wallonie (SPW)',
            },
          ],
          pointOfContactOrgForResource_tree: [
            'SPW',
            'SPW - Territoire, Logement, Patrimoine, Énergie',
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme",
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales",
          ],
          pointOfContactOrgForResourceObject: {
            default:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
            langfre:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
          },
          contactForResource: [
            {
              organisationObject: {
                default:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                langfre:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
              },
              role: 'pointOfContact',
              email: 'donnees.territoire@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
            {
              organisationObject: {
                default:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
                langfre:
                  "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
              },
              role: 'custodian',
              email: 'jeanchristophe.sainte@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
            {
              organisationObject: {
                default: 'Service public de Wallonie (SPW)',
                langfre: 'Service public de Wallonie (SPW)',
              },
              role: 'owner',
              email: '',
              website: 'https://geoportail.wallonie.be',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          custodianOrgForResource_tree: [
            'SPW',
            'SPW - Territoire, Logement, Patrimoine, Énergie',
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme",
            "SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales",
          ],
          custodianOrgForResourceObject: {
            default:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
            langfre:
              "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
          },
          ownerOrgForResource_tree: 'SPW',
          ownerOrgForResourceObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          purposeObject: {
            default:
              'Consultation thématique et interaction de base avec les données publiques du SPW territoire.',
            langfre:
              'Consultation thématique et interaction de base avec les données publiques du SPW territoire.',
          },
          hasOverview: 'true',
          inspireThemeNumber: '0',
          hasInspireTheme: 'false',
          tag: [
            {
              default: 'Aménagement du Territoire et Urbanisme',
              langfre: 'Aménagement du Territoire et Urbanisme',
            },
            {
              default: 'Cahiers de Charges Urbanistiques et Environnementaux',
              langfre: 'Cahiers de Charges Urbanistiques et Environnementaux',
            },
            {
              default: 'Campings',
              langfre: 'Campings',
            },
            {
              default:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
              langfre:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
            },
            {
              default: 'Communes en décentralisation',
              langfre: 'Communes en décentralisation',
            },
            {
              default: 'Lotissements',
              langfre: 'Lotissements',
            },
            {
              default: 'Parcs Résidentiels de Week-End',
              langfre: 'Parcs Résidentiels de Week-End',
            },
            {
              default: 'Périmètres de Reconnaissance Economique',
              langfre: 'Périmètres de Reconnaissance Economique',
            },
            {
              default: 'Plan de Secteur',
              langfre: 'Plan de Secteur',
            },
            {
              default: "Plans Communaux d'Aménagement",
              langfre: "Plans Communaux d'Aménagement",
            },
            {
              default: "Plan d'Habitat Permanent",
              langfre: "Plan d'Habitat Permanent",
            },
            {
              default: 'Rapports Urbanistiques et Environnementaux',
              langfre: 'Rapports Urbanistiques et Environnementaux',
            },
            {
              default: 'Règlement Général sur les Bâtisses en Site Rural',
              langfre: 'Règlement Général sur les Bâtisses en Site Rural',
            },
            {
              default: "Règlements Communaux d'Urbanisme",
              langfre: "Règlements Communaux d'Urbanisme",
            },
            {
              default: 'Remembrement urbain',
              langfre: 'Remembrement urbain',
            },
            {
              default: 'Rénovation urbaine',
              langfre: 'Rénovation urbaine',
            },
            {
              default: 'Revitalisation urbaine',
              langfre: 'Revitalisation urbaine',
            },
            {
              default: 'Schémas de Structure Communaux',
              langfre: 'Schémas de Structure Communaux',
            },
            {
              default: 'Sites À Réaménager',
              langfre: 'Sites À Réaménager',
            },
            {
              default:
                "Terrils à considérer en matière d'aménagement du territoire",
              langfre:
                "Terrils à considérer en matière d'aménagement du territoire",
            },
            {
              default: 'Zones agro-géographiques',
              langfre: 'Zones agro-géographiques',
            },
            {
              default: 'Zones franches urbaines',
              langfre: 'Zones franches urbaines',
            },
            {
              default: "Zones Protégées en matière d'Urbanisme",
              langfre: "Zones Protégées en matière d'Urbanisme",
            },
            {
              default: 'Logement',
              langfre: 'Logement',
            },
            {
              default: "Zones d'Initiative Privilégiée",
              langfre: "Zones d'Initiative Privilégiée",
            },
            {
              default: 'Patrimoine',
              langfre: 'Patrimoine',
            },
            {
              default: 'Biens classés et zones de protection',
              langfre: 'Biens classés et zones de protection',
            },
            {
              default: 'Biens exceptionnels',
              langfre: 'Biens exceptionnels',
            },
            {
              default: 'Biens mondiaux',
              langfre: 'Biens mondiaux',
            },
            {
              default: 'Liste de sauvegarde',
              langfre: 'Liste de sauvegarde',
            },
            {
              default: 'Inventaire du patrimoine immobilier culturel',
              langfre: 'Inventaire du patrimoine immobilier culturel',
            },
            {
              default: "Application de l'article 127 du CWATUPE",
              langfre: "Application de l'article 127 du CWATUPE",
            },
            {
              default: 'Cartes de Vander Maelen 1850',
              langfre: 'Cartes de Vander Maelen 1850',
            },
            {
              default: 'PCA',
              langfre: 'PCA',
            },
            {
              default: 'CCUE',
              langfre: 'CCUE',
            },
            {
              default: 'RGBSR',
              langfre: 'RGBSR',
            },
            {
              default: 'PDS',
              langfre: 'PDS',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RCU',
              langfre: 'RCU',
            },
            {
              default: 'SSC',
              langfre: 'SSC',
            },
            {
              default: 'SAR',
              langfre: 'SAR',
            },
            {
              default: 'ZIP',
              langfre: 'ZIP',
            },
            {
              default: 'cartographie en ligne',
              langfre: 'cartographie en ligne',
            },
            {
              default: 'application WebGIS',
              langfre: 'application WebGIS',
            },
            {
              default: 'visualisateur',
              langfre: 'visualisateur',
            },
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              key: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
            {
              default: 'Cartes anciennes',
              langfre: 'Cartes anciennes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
            },
            {
              default: 'Aménagement du territoire',
              langfre: 'Aménagement du territoire',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
            },
            {
              default: 'Logement et habitat',
              langfre: 'Logement et habitat',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
            },
            {
              default: 'Risques et contraintes',
              langfre: 'Risques et contraintes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
            },
            {
              default: 'Plans et règlements',
              langfre: 'Plans et règlements',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
              key: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
            },
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          tagNumber: '53',
          isOpenData: 'false',
          'keywordType-theme': [
            {
              default: 'Aménagement du Territoire et Urbanisme',
              langfre: 'Aménagement du Territoire et Urbanisme',
            },
            {
              default: 'Cahiers de Charges Urbanistiques et Environnementaux',
              langfre: 'Cahiers de Charges Urbanistiques et Environnementaux',
            },
            {
              default: 'Campings',
              langfre: 'Campings',
            },
            {
              default:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
              langfre:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
            },
            {
              default: 'Communes en décentralisation',
              langfre: 'Communes en décentralisation',
            },
            {
              default: 'Lotissements',
              langfre: 'Lotissements',
            },
            {
              default: 'Parcs Résidentiels de Week-End',
              langfre: 'Parcs Résidentiels de Week-End',
            },
            {
              default: 'Périmètres de Reconnaissance Economique',
              langfre: 'Périmètres de Reconnaissance Economique',
            },
            {
              default: 'Plan de Secteur',
              langfre: 'Plan de Secteur',
            },
            {
              default: "Plans Communaux d'Aménagement",
              langfre: "Plans Communaux d'Aménagement",
            },
            {
              default: "Plan d'Habitat Permanent",
              langfre: "Plan d'Habitat Permanent",
            },
            {
              default: 'Rapports Urbanistiques et Environnementaux',
              langfre: 'Rapports Urbanistiques et Environnementaux',
            },
            {
              default: 'Règlement Général sur les Bâtisses en Site Rural',
              langfre: 'Règlement Général sur les Bâtisses en Site Rural',
            },
            {
              default: "Règlements Communaux d'Urbanisme",
              langfre: "Règlements Communaux d'Urbanisme",
            },
            {
              default: 'Remembrement urbain',
              langfre: 'Remembrement urbain',
            },
            {
              default: 'Rénovation urbaine',
              langfre: 'Rénovation urbaine',
            },
            {
              default: 'Revitalisation urbaine',
              langfre: 'Revitalisation urbaine',
            },
            {
              default: 'Schémas de Structure Communaux',
              langfre: 'Schémas de Structure Communaux',
            },
            {
              default: 'Sites À Réaménager',
              langfre: 'Sites À Réaménager',
            },
            {
              default:
                "Terrils à considérer en matière d'aménagement du territoire",
              langfre:
                "Terrils à considérer en matière d'aménagement du territoire",
            },
            {
              default: 'Zones agro-géographiques',
              langfre: 'Zones agro-géographiques',
            },
            {
              default: 'Zones franches urbaines',
              langfre: 'Zones franches urbaines',
            },
            {
              default: "Zones Protégées en matière d'Urbanisme",
              langfre: "Zones Protégées en matière d'Urbanisme",
            },
            {
              default: 'Logement',
              langfre: 'Logement',
            },
            {
              default: "Zones d'Initiative Privilégiée",
              langfre: "Zones d'Initiative Privilégiée",
            },
            {
              default: 'Patrimoine',
              langfre: 'Patrimoine',
            },
            {
              default: 'Biens classés et zones de protection',
              langfre: 'Biens classés et zones de protection',
            },
            {
              default: 'Biens exceptionnels',
              langfre: 'Biens exceptionnels',
            },
            {
              default: 'Biens mondiaux',
              langfre: 'Biens mondiaux',
            },
            {
              default: 'Liste de sauvegarde',
              langfre: 'Liste de sauvegarde',
            },
            {
              default: 'Inventaire du patrimoine immobilier culturel',
              langfre: 'Inventaire du patrimoine immobilier culturel',
            },
            {
              default: "Application de l'article 127 du CWATUPE",
              langfre: "Application de l'article 127 du CWATUPE",
            },
            {
              default: 'Cartes de Vander Maelen 1850',
              langfre: 'Cartes de Vander Maelen 1850',
            },
            {
              default: 'PCA',
              langfre: 'PCA',
            },
            {
              default: 'CCUE',
              langfre: 'CCUE',
            },
            {
              default: 'RGBSR',
              langfre: 'RGBSR',
            },
            {
              default: 'PDS',
              langfre: 'PDS',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RCU',
              langfre: 'RCU',
            },
            {
              default: 'SSC',
              langfre: 'SSC',
            },
            {
              default: 'SAR',
              langfre: 'SAR',
            },
            {
              default: 'ZIP',
              langfre: 'ZIP',
            },
            {
              default: 'cartographie en ligne',
              langfre: 'cartographie en ligne',
            },
            {
              default: 'application WebGIS',
              langfre: 'application WebGIS',
            },
            {
              default: 'visualisateur',
              langfre: 'visualisateur',
            },
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
            {
              default: 'Cartes anciennes',
              langfre: 'Cartes anciennes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
            },
            {
              default: 'Aménagement du territoire',
              langfre: 'Aménagement du territoire',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
            },
            {
              default: 'Logement et habitat',
              langfre: 'Logement et habitat',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
            },
            {
              default: 'Risques et contraintes',
              langfre: 'Risques et contraintes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
            },
            {
              default: 'Plans et règlements',
              langfre: 'Plans et règlements',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
            },
          ],
          'keywordType-place': [
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          'th_otherKeywords-themeNumber': '46',
          'th_otherKeywords-theme': [
            {
              default: 'Aménagement du Territoire et Urbanisme',
              langfre: 'Aménagement du Territoire et Urbanisme',
            },
            {
              default: 'Cahiers de Charges Urbanistiques et Environnementaux',
              langfre: 'Cahiers de Charges Urbanistiques et Environnementaux',
            },
            {
              default: 'Campings',
              langfre: 'Campings',
            },
            {
              default:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
              langfre:
                "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
            },
            {
              default: 'Communes en décentralisation',
              langfre: 'Communes en décentralisation',
            },
            {
              default: 'Lotissements',
              langfre: 'Lotissements',
            },
            {
              default: 'Parcs Résidentiels de Week-End',
              langfre: 'Parcs Résidentiels de Week-End',
            },
            {
              default: 'Périmètres de Reconnaissance Economique',
              langfre: 'Périmètres de Reconnaissance Economique',
            },
            {
              default: 'Plan de Secteur',
              langfre: 'Plan de Secteur',
            },
            {
              default: "Plans Communaux d'Aménagement",
              langfre: "Plans Communaux d'Aménagement",
            },
            {
              default: "Plan d'Habitat Permanent",
              langfre: "Plan d'Habitat Permanent",
            },
            {
              default: 'Rapports Urbanistiques et Environnementaux',
              langfre: 'Rapports Urbanistiques et Environnementaux',
            },
            {
              default: 'Règlement Général sur les Bâtisses en Site Rural',
              langfre: 'Règlement Général sur les Bâtisses en Site Rural',
            },
            {
              default: "Règlements Communaux d'Urbanisme",
              langfre: "Règlements Communaux d'Urbanisme",
            },
            {
              default: 'Remembrement urbain',
              langfre: 'Remembrement urbain',
            },
            {
              default: 'Rénovation urbaine',
              langfre: 'Rénovation urbaine',
            },
            {
              default: 'Revitalisation urbaine',
              langfre: 'Revitalisation urbaine',
            },
            {
              default: 'Schémas de Structure Communaux',
              langfre: 'Schémas de Structure Communaux',
            },
            {
              default: 'Sites À Réaménager',
              langfre: 'Sites À Réaménager',
            },
            {
              default:
                "Terrils à considérer en matière d'aménagement du territoire",
              langfre:
                "Terrils à considérer en matière d'aménagement du territoire",
            },
            {
              default: 'Zones agro-géographiques',
              langfre: 'Zones agro-géographiques',
            },
            {
              default: 'Zones franches urbaines',
              langfre: 'Zones franches urbaines',
            },
            {
              default: "Zones Protégées en matière d'Urbanisme",
              langfre: "Zones Protégées en matière d'Urbanisme",
            },
            {
              default: 'Logement',
              langfre: 'Logement',
            },
            {
              default: "Zones d'Initiative Privilégiée",
              langfre: "Zones d'Initiative Privilégiée",
            },
            {
              default: 'Patrimoine',
              langfre: 'Patrimoine',
            },
            {
              default: 'Biens classés et zones de protection',
              langfre: 'Biens classés et zones de protection',
            },
            {
              default: 'Biens exceptionnels',
              langfre: 'Biens exceptionnels',
            },
            {
              default: 'Biens mondiaux',
              langfre: 'Biens mondiaux',
            },
            {
              default: 'Liste de sauvegarde',
              langfre: 'Liste de sauvegarde',
            },
            {
              default: 'Inventaire du patrimoine immobilier culturel',
              langfre: 'Inventaire du patrimoine immobilier culturel',
            },
            {
              default: "Application de l'article 127 du CWATUPE",
              langfre: "Application de l'article 127 du CWATUPE",
            },
            {
              default: 'Cartes de Vander Maelen 1850',
              langfre: 'Cartes de Vander Maelen 1850',
            },
            {
              default: 'PCA',
              langfre: 'PCA',
            },
            {
              default: 'CCUE',
              langfre: 'CCUE',
            },
            {
              default: 'RGBSR',
              langfre: 'RGBSR',
            },
            {
              default: 'PDS',
              langfre: 'PDS',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RUE',
              langfre: 'RUE',
            },
            {
              default: 'RCU',
              langfre: 'RCU',
            },
            {
              default: 'SSC',
              langfre: 'SSC',
            },
            {
              default: 'SAR',
              langfre: 'SAR',
            },
            {
              default: 'ZIP',
              langfre: 'ZIP',
            },
            {
              default: 'cartographie en ligne',
              langfre: 'cartographie en ligne',
            },
            {
              default: 'application WebGIS',
              langfre: 'application WebGIS',
            },
            {
              default: 'visualisateur',
              langfre: 'visualisateur',
            },
          ],
          th_infraSIGNumber: '1',
          th_infraSIG: [
            {
              default: 'Reporting INSPIRENO',
              langfre: 'Reporting INSPIRENO',
              link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            },
          ],
          th_Themes_geoportail_wallon_hierarchyNumber: '5',
          th_Themes_geoportail_wallon_hierarchy: [
            {
              default: 'Cartes anciennes',
              langfre: 'Cartes anciennes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
            },
            {
              default: 'Aménagement du territoire',
              langfre: 'Aménagement du territoire',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
            },
            {
              default: 'Logement et habitat',
              langfre: 'Logement et habitat',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
            },
            {
              default: 'Risques et contraintes',
              langfre: 'Risques et contraintes',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
            },
            {
              default: 'Plans et règlements',
              langfre: 'Plans et règlements',
              link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
            },
          ],
          allKeywords: {
            'th_otherKeywords-theme': {
              title: 'otherKeywords-theme',
              theme: 'theme',
              keywords: [
                {
                  default: 'Aménagement du Territoire et Urbanisme',
                  langfre: 'Aménagement du Territoire et Urbanisme',
                },
                {
                  default:
                    'Cahiers de Charges Urbanistiques et Environnementaux',
                  langfre:
                    'Cahiers de Charges Urbanistiques et Environnementaux',
                },
                {
                  default: 'Campings',
                  langfre: 'Campings',
                },
                {
                  default:
                    "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
                  langfre:
                    "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
                },
                {
                  default: 'Communes en décentralisation',
                  langfre: 'Communes en décentralisation',
                },
                {
                  default: 'Lotissements',
                  langfre: 'Lotissements',
                },
                {
                  default: 'Parcs Résidentiels de Week-End',
                  langfre: 'Parcs Résidentiels de Week-End',
                },
                {
                  default: 'Périmètres de Reconnaissance Economique',
                  langfre: 'Périmètres de Reconnaissance Economique',
                },
                {
                  default: 'Plan de Secteur',
                  langfre: 'Plan de Secteur',
                },
                {
                  default: "Plans Communaux d'Aménagement",
                  langfre: "Plans Communaux d'Aménagement",
                },
                {
                  default: "Plan d'Habitat Permanent",
                  langfre: "Plan d'Habitat Permanent",
                },
                {
                  default: 'Rapports Urbanistiques et Environnementaux',
                  langfre: 'Rapports Urbanistiques et Environnementaux',
                },
                {
                  default: 'Règlement Général sur les Bâtisses en Site Rural',
                  langfre: 'Règlement Général sur les Bâtisses en Site Rural',
                },
                {
                  default: "Règlements Communaux d'Urbanisme",
                  langfre: "Règlements Communaux d'Urbanisme",
                },
                {
                  default: 'Remembrement urbain',
                  langfre: 'Remembrement urbain',
                },
                {
                  default: 'Rénovation urbaine',
                  langfre: 'Rénovation urbaine',
                },
                {
                  default: 'Revitalisation urbaine',
                  langfre: 'Revitalisation urbaine',
                },
                {
                  default: 'Schémas de Structure Communaux',
                  langfre: 'Schémas de Structure Communaux',
                },
                {
                  default: 'Sites À Réaménager',
                  langfre: 'Sites À Réaménager',
                },
                {
                  default:
                    "Terrils à considérer en matière d'aménagement du territoire",
                  langfre:
                    "Terrils à considérer en matière d'aménagement du territoire",
                },
                {
                  default: 'Zones agro-géographiques',
                  langfre: 'Zones agro-géographiques',
                },
                {
                  default: 'Zones franches urbaines',
                  langfre: 'Zones franches urbaines',
                },
                {
                  default: "Zones Protégées en matière d'Urbanisme",
                  langfre: "Zones Protégées en matière d'Urbanisme",
                },
                {
                  default: 'Logement',
                  langfre: 'Logement',
                },
                {
                  default: "Zones d'Initiative Privilégiée",
                  langfre: "Zones d'Initiative Privilégiée",
                },
                {
                  default: 'Patrimoine',
                  langfre: 'Patrimoine',
                },
                {
                  default: 'Biens classés et zones de protection',
                  langfre: 'Biens classés et zones de protection',
                },
                {
                  default: 'Biens exceptionnels',
                  langfre: 'Biens exceptionnels',
                },
                {
                  default: 'Biens mondiaux',
                  langfre: 'Biens mondiaux',
                },
                {
                  default: 'Liste de sauvegarde',
                  langfre: 'Liste de sauvegarde',
                },
                {
                  default: 'Inventaire du patrimoine immobilier culturel',
                  langfre: 'Inventaire du patrimoine immobilier culturel',
                },
                {
                  default: "Application de l'article 127 du CWATUPE",
                  langfre: "Application de l'article 127 du CWATUPE",
                },
                {
                  default: 'Cartes de Vander Maelen 1850',
                  langfre: 'Cartes de Vander Maelen 1850',
                },
                {
                  default: 'PCA',
                  langfre: 'PCA',
                },
                {
                  default: 'CCUE',
                  langfre: 'CCUE',
                },
                {
                  default: 'RGBSR',
                  langfre: 'RGBSR',
                },
                {
                  default: 'PDS',
                  langfre: 'PDS',
                },
                {
                  default: 'RUE',
                  langfre: 'RUE',
                },
                {
                  default: 'RUE',
                  langfre: 'RUE',
                },
                {
                  default: 'RCU',
                  langfre: 'RCU',
                },
                {
                  default: 'SSC',
                  langfre: 'SSC',
                },
                {
                  default: 'SAR',
                  langfre: 'SAR',
                },
                {
                  default: 'ZIP',
                  langfre: 'ZIP',
                },
                {
                  default: 'cartographie en ligne',
                  langfre: 'cartographie en ligne',
                },
                {
                  default: 'application WebGIS',
                  langfre: 'application WebGIS',
                },
                {
                  default: 'visualisateur',
                  langfre: 'visualisateur',
                },
              ],
            },
            th_infraSIG: {
              id: 'geonetwork.thesaurus.external.theme.infraSIG',
              title: 'Mots-clés InfraSIG',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.infraSIG',
              keywords: [
                {
                  default: 'Reporting INSPIRENO',
                  langfre: 'Reporting INSPIRENO',
                  link: 'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
                },
              ],
            },
            th_Themes_geoportail_wallon_hierarchy: {
              id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
              title: 'Thèmes du géoportail wallon',
              theme: 'theme',
              link: 'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy',
              keywords: [
                {
                  default: 'Cartes anciennes',
                  langfre: 'Cartes anciennes',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
                },
                {
                  default: 'Aménagement du territoire',
                  langfre: 'Aménagement du territoire',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
                },
                {
                  default: 'Logement et habitat',
                  langfre: 'Logement et habitat',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
                },
                {
                  default: 'Risques et contraintes',
                  langfre: 'Risques et contraintes',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
                },
                {
                  default: 'Plans et règlements',
                  langfre: 'Plans et règlements',
                  link: 'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
                },
              ],
            },
          },
          th_infraSIG_tree: {
            default: ['Reporting INSPIRENO'],
            key: [
              'https://metawal.wallonie.be/thesaurus/infrasig#ReportingINSPIRENO',
            ],
          },
          th_Themes_geoportail_wallon_hierarchy_tree: {
            default: [
              'Aménagement du territoire',
              'Aménagement du territoire^Plans et règlements',
              'Aménagement du territoire^Risques et contraintes',
              'Données de base',
              'Données de base^Cartes anciennes',
              'Société et activités',
              'Société et activités^Logement et habitat',
            ],
            key: [
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2010',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/20^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/2020',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/50^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/5040',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/60',
              'https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#ThemesGeoportailWallon/60^https://metawal.wallonie.be/thesaurus/theme-geoportail-wallon#SubThemesGeoportailWallon/6030',
            ],
          },
          'mw-gp-keywords': {
            'th_otherKeywords-theme': {
              title: 'otherKeywords-theme',
              theme: 'theme',
              keywords: [
                {
                  default: 'Aménagement du Territoire et Urbanisme',
                  langfre: 'Aménagement du Territoire et Urbanisme',
                },
                {
                  default:
                    'Cahiers de Charges Urbanistiques et Environnementaux',
                  langfre:
                    'Cahiers de Charges Urbanistiques et Environnementaux',
                },
                {
                  default: 'Campings',
                  langfre: 'Campings',
                },
                {
                  default:
                    "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
                  langfre:
                    "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
                },
                {
                  default: 'Communes en décentralisation',
                  langfre: 'Communes en décentralisation',
                },
                {
                  default: 'Lotissements',
                  langfre: 'Lotissements',
                },
                {
                  default: 'Parcs Résidentiels de Week-End',
                  langfre: 'Parcs Résidentiels de Week-End',
                },
                {
                  default: 'Périmètres de Reconnaissance Economique',
                  langfre: 'Périmètres de Reconnaissance Economique',
                },
                {
                  default: 'Plan de Secteur',
                  langfre: 'Plan de Secteur',
                },
                {
                  default: "Plans Communaux d'Aménagement",
                  langfre: "Plans Communaux d'Aménagement",
                },
                {
                  default: "Plan d'Habitat Permanent",
                  langfre: "Plan d'Habitat Permanent",
                },
                {
                  default: 'Rapports Urbanistiques et Environnementaux',
                  langfre: 'Rapports Urbanistiques et Environnementaux',
                },
                {
                  default: 'Règlement Général sur les Bâtisses en Site Rural',
                  langfre: 'Règlement Général sur les Bâtisses en Site Rural',
                },
                {
                  default: "Règlements Communaux d'Urbanisme",
                  langfre: "Règlements Communaux d'Urbanisme",
                },
                {
                  default: 'Remembrement urbain',
                  langfre: 'Remembrement urbain',
                },
                {
                  default: 'Rénovation urbaine',
                  langfre: 'Rénovation urbaine',
                },
                {
                  default: 'Revitalisation urbaine',
                  langfre: 'Revitalisation urbaine',
                },
                {
                  default: 'Schémas de Structure Communaux',
                  langfre: 'Schémas de Structure Communaux',
                },
                {
                  default: 'Sites À Réaménager',
                  langfre: 'Sites À Réaménager',
                },
                {
                  default:
                    "Terrils à considérer en matière d'aménagement du territoire",
                  langfre:
                    "Terrils à considérer en matière d'aménagement du territoire",
                },
                {
                  default: 'Zones agro-géographiques',
                  langfre: 'Zones agro-géographiques',
                },
                {
                  default: 'Zones franches urbaines',
                  langfre: 'Zones franches urbaines',
                },
                {
                  default: "Zones Protégées en matière d'Urbanisme",
                  langfre: "Zones Protégées en matière d'Urbanisme",
                },
                {
                  default: 'Logement',
                  langfre: 'Logement',
                },
                {
                  default: "Zones d'Initiative Privilégiée",
                  langfre: "Zones d'Initiative Privilégiée",
                },
                {
                  default: 'Patrimoine',
                  langfre: 'Patrimoine',
                },
                {
                  default: 'Biens classés et zones de protection',
                  langfre: 'Biens classés et zones de protection',
                },
                {
                  default: 'Biens exceptionnels',
                  langfre: 'Biens exceptionnels',
                },
                {
                  default: 'Biens mondiaux',
                  langfre: 'Biens mondiaux',
                },
                {
                  default: 'Liste de sauvegarde',
                  langfre: 'Liste de sauvegarde',
                },
                {
                  default: 'Inventaire du patrimoine immobilier culturel',
                  langfre: 'Inventaire du patrimoine immobilier culturel',
                },
                {
                  default: "Application de l'article 127 du CWATUPE",
                  langfre: "Application de l'article 127 du CWATUPE",
                },
                {
                  default: 'Cartes de Vander Maelen 1850',
                  langfre: 'Cartes de Vander Maelen 1850',
                },
                {
                  default: 'PCA',
                  langfre: 'PCA',
                },
                {
                  default: 'CCUE',
                  langfre: 'CCUE',
                },
                {
                  default: 'RGBSR',
                  langfre: 'RGBSR',
                },
                {
                  default: 'PDS',
                  langfre: 'PDS',
                },
                {
                  default: 'RUE',
                  langfre: 'RUE',
                },
                {
                  default: 'RUE',
                  langfre: 'RUE',
                },
                {
                  default: 'RCU',
                  langfre: 'RCU',
                },
                {
                  default: 'SSC',
                  langfre: 'SSC',
                },
                {
                  default: 'SAR',
                  langfre: 'SAR',
                },
                {
                  default: 'ZIP',
                  langfre: 'ZIP',
                },
                {
                  default: 'cartographie en ligne',
                  langfre: 'cartographie en ligne',
                },
                {
                  default: 'application WebGIS',
                  langfre: 'application WebGIS',
                },
                {
                  default: 'visualisateur',
                  langfre: 'visualisateur',
                },
              ],
            },
          },
          MD_LegalConstraintsOtherConstraintsObject: [
            {
              default: "Aucune contrainte d'accès à l'application.",
              langfre: "Aucune contrainte d'accès à l'application.",
            },
            {
              default:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
              langfre:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
            },
          ],
          'mw-gp-constraintsObject': [
            {
              default: "Aucune contrainte d'accès à l'application.",
              langfre: "Aucune contrainte d'accès à l'application.",
            },
            {
              default:
                "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
              langfre:
                "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
            },
            {
              default:
                "Les mentions légales accessibles depuis l'application s'appliquent.",
              langfre:
                "Les mentions légales accessibles depuis l'application s'appliquent.",
            },
            {
              default:
                "Les limites d'utilisation des données et services s'appliquent.",
              langfre:
                "Les limites d'utilisation des données et services s'appliquent.",
            },
            {
              default:
                "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
              langfre:
                "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
            },
            {
              default:
                'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
              langfre:
                'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
            },
            {
              default:
                "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
              langfre:
                "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
            },
            {
              default:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
              langfre:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
            },
          ],
          MD_LegalConstraintsaccessConstraints: 'otherRestrictions',
          MD_ConstraintsUseLimitationObject: [
            {
              default:
                "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
              langfre:
                "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
            },
            {
              default:
                "Les mentions légales accessibles depuis l'application s'appliquent.",
              langfre:
                "Les mentions légales accessibles depuis l'application s'appliquent.",
            },
            {
              default:
                "Les limites d'utilisation des données et services s'appliquent.",
              langfre:
                "Les limites d'utilisation des données et services s'appliquent.",
            },
            {
              default:
                "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
              langfre:
                "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
            },
            {
              default:
                'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
              langfre:
                'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
            },
            {
              default:
                "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
              langfre:
                "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
            },
          ],
          MD_LegalConstraintsuseConstraints: 'license',
          licenseObject: [
            {
              default: "Aucune contrainte d'accès à l'application.",
              langfre: "Aucune contrainte d'accès à l'application.",
            },
            {
              default:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
              langfre:
                "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
            },
          ],
          extentDescriptionObject: [
            {
              default: 'Région wallonne',
              langfre: 'Région wallonne',
            },
          ],
          geom: [
            {
              type: 'Polygon',
              coordinates: [
                [
                  [2.75, 49.45],
                  [6.5, 49.45],
                  [6.5, 50.85],
                  [2.75, 50.85],
                  [2.75, 49.45],
                ],
              ],
            },
          ],
          location: '50.150000000000006,4.625',
          serviceType: 'Application',
          coordinateSystem: ['EPSG:31370'],
          crsDetails: [
            {
              code: 'EPSG:31370',
              codeSpace: '',
              name: 'Belge 1972 / Belgian Lambert 72 (EPSG:31370)',
              url: '31370',
            },
          ],
          featureTypes: [],
          lineageObject: {
            default:
              "L'application a été développée sur base de l'API GeoViewer",
            langfre:
              "L'application a été développée sur base de l'API GeoViewer",
          },
          OrgForDistributionObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          distributorOrgForDistribution_tree: 'SPW',
          distributorOrgForDistributionObject: {
            default: 'Service public de Wallonie (SPW)',
            langfre: 'Service public de Wallonie (SPW)',
          },
          contactForDistribution: [
            {
              organisationObject: {
                default: 'Service public de Wallonie (SPW)',
                langfre: 'Service public de Wallonie (SPW)',
              },
              role: 'distributor',
              email: 'helpdesk.carto@spw.wallonie.be',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          linkUrl: [
            'http://geoapps.wallonie.be/webgisdgo4',
            'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
          ],
          linkProtocol: ['WWW:LINK'],
          linkUrlProtocolWWWLINK: 'http://geoapps.wallonie.be/webgisdgo4',
          link: [
            {
              protocol: 'WWW:LINK',
              mimeType: '',
              urlObject: {
                default: 'http://geoapps.wallonie.be/webgisdgo4',
                langfre: 'http://geoapps.wallonie.be/webgisdgo4',
              },
              nameObject: {
                default:
                  'Application de consultation des couches de données de la DGO4',
                langfre:
                  'Application de consultation des couches de données de la DGO4',
              },
              descriptionObject: {
                default:
                  'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
                langfre:
                  'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
              },
              function: 'browsing',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: '',
              mimeType: '',
              urlObject: {
                default:
                  'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                langfre:
                  'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
              },
              nameObject: {
                default: 'Données documentaires de la DGO4',
                langfre: 'Données documentaires de la DGO4',
              },
              descriptionObject: {
                default:
                  'Informations complémentaires sur les couches de données proposées par la DGO4',
                langfre:
                  'Informations complémentaires sur les couches de données proposées par la DGO4',
              },
              function: 'information',
              applicationProfile: '',
              group: 0,
            },
          ],
          linkUrlProtocol:
            'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
          'mw-gp-thematicMap': [
            {
              protocol: 'WWW:LINK',
              urlObject: {
                default: 'http://geoapps.wallonie.be/webgisdgo4',
                langfre: 'http://geoapps.wallonie.be/webgisdgo4',
              },
              nameObject: {
                default:
                  'Application de consultation des couches de données de la DGO4',
                langfre:
                  'Application de consultation des couches de données de la DGO4',
              },
              descriptionObject: {
                default:
                  'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
                langfre:
                  'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
              },
              function: 'browsing',
              applicationProfile: '',
            },
          ],
          recordOperateOn: [
            '7fe2f305-1302-4297-b67e-792f55acd834',
            '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            '097e8d4e-9bad-4798-af85-9bdd3c76952a',
            '51c1f85d-ca4d-451c-9146-aadcc420fa30',
            '6ad564e0-685d-4664-8b03-499b70337d33',
            '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            '9008e261-2c71-4d40-8513-fb970c4eec2b',
            'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            'c0d28bbb-d396-44ec-86a9-37bd53af2573',
            'ad86502d-8371-408e-880a-777dcce65e24',
            '1c28dcd9-5306-4346-8877-a06fc560ba65',
            '8e2cf269-cedb-4fbe-943b-41a7587490e3',
            '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            '3ec1510b-7e87-4f92-ab8a-22675249d84b',
            'c61605c4-56f3-4371-9f6a-f346cc294b96',
            '4b8c4576-52dd-4505-896e-3d83d474ff95',
            'e140607a-cfeb-445f-a551-22816c06c72f',
            '4ed33135-c29a-4a92-abff-cfc69a24c350',
            '679a02c9-7c2c-4132-ab49-32147bd01ce9',
            '01491630-78ce-49f3-b479-4b30dabc4c69',
            'a25cdf65-d35b-4883-beaf-5f89713726db',
            '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
          ],
          recordLink: [
            {
              type: 'datasets',
              to: '7fe2f305-1302-4297-b67e-792f55acd834',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/7fe2f305-1302-4297-b67e-792f55acd834',
              title:
                'Plan de secteur en vigueur (version coordonnée vectorielle)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
              title: 'Permis d’urbanisation et lotissements',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '097e8d4e-9bad-4798-af85-9bdd3c76952a',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/097e8d4e-9bad-4798-af85-9bdd3c76952a',
              title: 'Schéma de Développement Communal (SDC)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '51c1f85d-ca4d-451c-9146-aadcc420fa30',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/51c1f85d-ca4d-451c-9146-aadcc420fa30',
              title: 'Parcs résidentiels de week-end (PRWE)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '6ad564e0-685d-4664-8b03-499b70337d33',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/6ad564e0-685d-4664-8b03-499b70337d33',
              title: 'Inventaire des campings',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
              title:
                "Commissions consultatives communales d'aménagement du territoire et de mobilité (CCATM)",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '9008e261-2c71-4d40-8513-fb970c4eec2b',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/9008e261-2c71-4d40-8513-fb970c4eec2b',
              title:
                'Communes dont le collège communal statue sans avis préalable du fonctionnaire délégué (en décentralisation)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
              title: 'Périmètres de reconnaissance économique (PRE)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
              title: 'Périmètres de remembrement urbain (PRU)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'c0d28bbb-d396-44ec-86a9-37bd53af2573',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c0d28bbb-d396-44ec-86a9-37bd53af2573',
              title: 'Plan Habitat Permanent',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'ad86502d-8371-408e-880a-777dcce65e24',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/ad86502d-8371-408e-880a-777dcce65e24',
              title: 'Rénovation urbaine',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '1c28dcd9-5306-4346-8877-a06fc560ba65',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/1c28dcd9-5306-4346-8877-a06fc560ba65',
              title: 'Revitalisation urbaine',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '8e2cf269-cedb-4fbe-943b-41a7587490e3',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/8e2cf269-cedb-4fbe-943b-41a7587490e3',
              title: 'Sites à réaménager de droit (SAR)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
              title: 'Terrils du point de vue aménagement et urbanisme',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '3ec1510b-7e87-4f92-ab8a-22675249d84b',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/3ec1510b-7e87-4f92-ab8a-22675249d84b',
              title: 'Zones agro-géographiques',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'c61605c4-56f3-4371-9f6a-f346cc294b96',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c61605c4-56f3-4371-9f6a-f346cc294b96',
              title: "Zones d'Initiative Privilégiée (ZIP)",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '4b8c4576-52dd-4505-896e-3d83d474ff95',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4b8c4576-52dd-4505-896e-3d83d474ff95',
              title:
                "Programmes Communaux d'Actions en Matière de Logement 2014-2016",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'e140607a-cfeb-445f-a551-22816c06c72f',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/e140607a-cfeb-445f-a551-22816c06c72f',
              title: "Guide Communal d'Urbanisme (GCU)",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '4ed33135-c29a-4a92-abff-cfc69a24c350',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4ed33135-c29a-4a92-abff-cfc69a24c350',
              title: "Guide Régional d'Urbanisme (GRU)",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '679a02c9-7c2c-4132-ab49-32147bd01ce9',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/679a02c9-7c2c-4132-ab49-32147bd01ce9',
              title: "Schéma d'Orientation Local (SOL)",
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '01491630-78ce-49f3-b479-4b30dabc4c69',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/01491630-78ce-49f3-b479-4b30dabc4c69',
              title:
                'Patrimoine - Biens classés et zones de protection - Série',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'a25cdf65-d35b-4883-beaf-5f89713726db',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/a25cdf65-d35b-4883-beaf-5f89713726db',
              title:
                'Patrimoine - Inventaire du Patrimoine Immobilier Culturel (IPIC)',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/2dac12f1-eb54-405b-a94f-f14df54e2c8a',
              title: 'Patrimoine - Biens mondiaux - Série - OBSOLETE',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
              title: 'Patrimoine - Biens exceptionnels - Série',
              origin: 'catalog',
            },
            {
              type: 'datasets',
              to: 'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
              title: 'Patrimoine - Biens en liste de sauvegarde - Série',
              origin: 'catalog',
            },
          ],
          recordLink_datasets: [
            'Plan de secteur en vigueur (version coordonn\\u00E9e vectorielle)',
            'Permis d\\u2019urbanisation et lotissements',
            'Sch\\u00E9ma de D\\u00E9veloppement Communal (SDC)',
            'Parcs r\\u00E9sidentiels de week-end (PRWE)',
            'Inventaire des campings',
            "Commissions consultatives communales d'am\\u00E9nagement du territoire et de mobilit\\u00E9 (CCATM)",
            'Communes dont le coll\\u00E8ge communal statue sans avis pr\\u00E9alable du fonctionnaire d\\u00E9l\\u00E9gu\\u00E9 (en d\\u00E9centralisation)',
            'P\\u00E9rim\\u00E8tres de reconnaissance \\u00E9conomique (PRE)',
            'P\\u00E9rim\\u00E8tres de remembrement urbain (PRU)',
            'Plan Habitat Permanent',
            'R\\u00E9novation urbaine',
            'Revitalisation urbaine',
            'Sites \\u00E0 r\\u00E9am\\u00E9nager de droit (SAR)',
            'Terrils du point de vue am\\u00E9nagement et urbanisme',
            'Zones agro-g\\u00E9ographiques',
            "Zones d'Initiative Privil\\u00E9gi\\u00E9e (ZIP)",
            "Programmes Communaux d'Actions en Mati\\u00E8re de Logement 2014-2016",
            "Guide Communal d'Urbanisme (GCU)",
            "Guide R\\u00E9gional d'Urbanisme (GRU)",
            "Sch\\u00E9ma d'Orientation Local (SOL)",
            'Patrimoine - Biens class\\u00E9s et zones de protection - S\\u00E9rie',
            'Patrimoine - Inventaire du Patrimoine Immobilier Culturel (IPIC)',
            'Patrimoine - Biens mondiaux - S\\u00E9rie - OBSOLETE',
            'Patrimoine - Biens exceptionnels - S\\u00E9rie',
            'Patrimoine - Biens en liste de sauvegarde - S\\u00E9rie',
          ],
          recordLink_datasets_uuid: [
            '7fe2f305-1302-4297-b67e-792f55acd834',
            '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            '097e8d4e-9bad-4798-af85-9bdd3c76952a',
            '51c1f85d-ca4d-451c-9146-aadcc420fa30',
            '6ad564e0-685d-4664-8b03-499b70337d33',
            '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            '9008e261-2c71-4d40-8513-fb970c4eec2b',
            'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            'c0d28bbb-d396-44ec-86a9-37bd53af2573',
            'ad86502d-8371-408e-880a-777dcce65e24',
            '1c28dcd9-5306-4346-8877-a06fc560ba65',
            '8e2cf269-cedb-4fbe-943b-41a7587490e3',
            '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            '3ec1510b-7e87-4f92-ab8a-22675249d84b',
            'c61605c4-56f3-4371-9f6a-f346cc294b96',
            '4b8c4576-52dd-4505-896e-3d83d474ff95',
            'e140607a-cfeb-445f-a551-22816c06c72f',
            '4ed33135-c29a-4a92-abff-cfc69a24c350',
            '679a02c9-7c2c-4132-ab49-32147bd01ce9',
            '01491630-78ce-49f3-b479-4b30dabc4c69',
            'a25cdf65-d35b-4883-beaf-5f89713726db',
            '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
          ],
          recordLink_datasets_url: [
            'https://metawal.wallonie.be/geonetwork/srv/api/records/7fe2f305-1302-4297-b67e-792f55acd834',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/097e8d4e-9bad-4798-af85-9bdd3c76952a',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/51c1f85d-ca4d-451c-9146-aadcc420fa30',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/6ad564e0-685d-4664-8b03-499b70337d33',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/9008e261-2c71-4d40-8513-fb970c4eec2b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c0d28bbb-d396-44ec-86a9-37bd53af2573',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/ad86502d-8371-408e-880a-777dcce65e24',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/1c28dcd9-5306-4346-8877-a06fc560ba65',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/8e2cf269-cedb-4fbe-943b-41a7587490e3',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/3ec1510b-7e87-4f92-ab8a-22675249d84b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c61605c4-56f3-4371-9f6a-f346cc294b96',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4b8c4576-52dd-4505-896e-3d83d474ff95',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/e140607a-cfeb-445f-a551-22816c06c72f',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4ed33135-c29a-4a92-abff-cfc69a24c350',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/679a02c9-7c2c-4132-ab49-32147bd01ce9',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/01491630-78ce-49f3-b479-4b30dabc4c69',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/a25cdf65-d35b-4883-beaf-5f89713726db',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
          ],
          operatesOn: [
            '7fe2f305-1302-4297-b67e-792f55acd834',
            '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            '097e8d4e-9bad-4798-af85-9bdd3c76952a',
            '51c1f85d-ca4d-451c-9146-aadcc420fa30',
            '6ad564e0-685d-4664-8b03-499b70337d33',
            '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            '9008e261-2c71-4d40-8513-fb970c4eec2b',
            'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            'c0d28bbb-d396-44ec-86a9-37bd53af2573',
            'ad86502d-8371-408e-880a-777dcce65e24',
            '1c28dcd9-5306-4346-8877-a06fc560ba65',
            '8e2cf269-cedb-4fbe-943b-41a7587490e3',
            '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            '3ec1510b-7e87-4f92-ab8a-22675249d84b',
            'c61605c4-56f3-4371-9f6a-f346cc294b96',
            '4b8c4576-52dd-4505-896e-3d83d474ff95',
            'e140607a-cfeb-445f-a551-22816c06c72f',
            '4ed33135-c29a-4a92-abff-cfc69a24c350',
            '679a02c9-7c2c-4132-ab49-32147bd01ce9',
            '01491630-78ce-49f3-b479-4b30dabc4c69',
            'a25cdf65-d35b-4883-beaf-5f89713726db',
            '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/7fe2f305-1302-4297-b67e-792f55acd834',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/097e8d4e-9bad-4798-af85-9bdd3c76952a',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/51c1f85d-ca4d-451c-9146-aadcc420fa30',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/6ad564e0-685d-4664-8b03-499b70337d33',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/9008e261-2c71-4d40-8513-fb970c4eec2b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c0d28bbb-d396-44ec-86a9-37bd53af2573',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/ad86502d-8371-408e-880a-777dcce65e24',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/1c28dcd9-5306-4346-8877-a06fc560ba65',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/8e2cf269-cedb-4fbe-943b-41a7587490e3',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/3ec1510b-7e87-4f92-ab8a-22675249d84b',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/c61605c4-56f3-4371-9f6a-f346cc294b96',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4b8c4576-52dd-4505-896e-3d83d474ff95',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/e140607a-cfeb-445f-a551-22816c06c72f',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/4ed33135-c29a-4a92-abff-cfc69a24c350',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/679a02c9-7c2c-4132-ab49-32147bd01ce9',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/01491630-78ce-49f3-b479-4b30dabc4c69',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/a25cdf65-d35b-4883-beaf-5f89713726db',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            'https://metawal.wallonie.be/geonetwork/srv/api/records/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
          ],
          recordGroup: '83809bcd-1763-4d28-b820-2b9828083ba5',
          recordOwner: 'Metawal Administrator_user de Stephane Ritz',
          valid_inspire: '-1',
          uuid: '83809bcd-1763-4d28-b820-2b9828083ba5',
          displayOrder: 'null',
          groupPublishedId: ['14684', '0', '1', '4', '25', '14689', '14690'],
          popularity: 6766,
          userinfo:
            'Admin_Metawal|Administrator_user de Stephane Ritz|Metawal|Administrator',
          groupPublished: [
            'Link_checker',
            'intranet',
            'all',
            'SPW - Territoire',
            'DIG',
            'mapstore',
            'mapstore-intranet',
          ],
          isPublishedToAll: 'true',
          record: 'record',
          draft: 'n',
          changeDate: '2024-07-22T11:52:39.049Z',
          'valid_schematron-rules-datacite': '1',
          id: '1215',
          valid_xsd: '1',
          createDate: '2013-07-29T11:33:08Z',
          isPublishedToIntranet: 'true',
          owner: '14762',
          'valid_schematron-rules-iso': '1',
          groupOwner: '4',
          logo: '/images/logos/metawal.wallonie.be.png',
          hasxlinks: 'false',
          op0: ['14684', '0', '1', '4', '25', '14689', '14690'],
          featureOfRecord: 'record',
          op2: ['25', '14690'],
          op1: ['0', '1', '25', '14689', '14690'],
          isPublishedToGuest: 'false',
          extra: 'null',
          documentStandard: 'iso19115-3.2018',
          op3: ['4', '25', '14690'],
          op6: ['1', '4', '25', '14690'],
          op5: ['0', '1', '25', '14690'],
          valid: '1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          isHarvested: 'false',
          userSavedCount: '0',
          sourceCatalogue: 'metawal.wallonie.be',
          overview: [
            {
              data: 'data:image/png;base64, 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',
              nameObject: {
                default: 'SPWTerritoire.PNG',
                langfre: 'SPWTerritoire.PNG',
              },
              url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/83809bcd-1763-4d28-b820-2b9828083ba5/attachments/SPWTerritoire.PNG',
            },
          ],
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: true,
        selected: false,
        related: {
          hasfeaturecats: [],
          services: [],
          brothersAndSisters: [],
          parent: [],
          children: [],
          hassources: [],
          datasets: [
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/2dac12f1-eb54-405b-a94f-f14df54e2c8a/attachments/PAT_BM.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/2dac12f1-eb54-405b-a94f-f14df54e2c8a',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'obsolete',
                  },
                ],
                resourceTitleObject: {
                  default: 'Patrimoine - Biens mondiaux - Série - OBSOLETE',
                  langfre: 'Patrimoine - Biens mondiaux - Série - OBSOLETE',
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données est obsolète et a été remplacée par la série \"Biens patrimoine mondial UNESCO - Série\".\n\nVeuillez vous rapporter à sa fiche descriptive. https://geoportail.wallonie.be/catalogue/abe74a37-3c88-452b-94fd-5922d97d2e60.html\n\nCette série de couches de données reprend la localisation des différents biens inscrits sur la liste du patrimoine mondial en Région wallonne.\n\nCette série a été dépubliée le 10/10/2023.\n\nLe patrimoine mondial est défini comme tout bien ou ensemble de biens dont la valeur universelle exceptionnelle est reconnue par l'UNESCO, en application de la Convention concernant la protection du patrimoine mondial culturel et naturel, adoptée à Paris le 16 novembre 1972.\n\nIl s’agit d’une mesure de protection appliquée en surimpression au classement. En effet, les biens inscrits sur la liste du patrimoine mondial sont d’abord des biens classés au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection) au titre de monument, ensemble architectural, site ou site archéologique. Les données relatives aux biens inscrits sur la liste du patrimoine mondial sont donc issues d'une sélection sur base des jeux de données relatifs aux biens classés et zones de protection. Les attributs sont conservés.\n\nLa liste des biens mondiaux est alimentée par la liste des biens exceptionnels établie par l’Arrêté du Gouvernement wallon (AGW - 6 octobre 2016) et sont inscrits sur la liste du Patrimoine mondial de l'UNESCO.\n\nEn octobre 2016, six sites wallons étaient inscrits sur la liste du patrimoine mondial de l'humanité. Il s'agit des beffrois de la liste des beffrois de Belgique et de France, de la cathédrale Notre-Dame de Tournai, des sites miniers majeurs de Wallonie (Bois-du-Luc, Bois du Cazier, Grand-Hornu et Blegny-Mine), des minières néolithiques de silex de Spiennes, des quatre ascenseurs du canal du Centre avec leur site, et de la partie située en Wallonie du bien « Forêts primaires et anciennes de hêtres des Carpates et d’autres régions d’Europe » (forêt de Soignes située sur le territoire des communes de La Hulpe et de Waterloo).\n\nEn juillet 2021, Spa a été inscrite au sein de la série « Grandes Villes d’Eaux d’Europe ». La liste des biens mondiaux a été modifiée dans l’Arrêté du Gouvernement wallon (AGW – 12 mai 2022).\n\nAu total, la Belgique compte quinze biens inscrits au Patrimoine mondial de l'UNESCO.\n\nLe SPW travaille actuellement à une mise à jour de la donnée qui aboutira courant 2023. Actuellement, les données diffusées présentent la situation cartographique de l’ensemble des biens (périmètre du bien reconnu et sa zone tampon). Les données concernant ces périmètres doivent encore être adaptées et feront l’objet d’une communication ultérieure plus détaillée.\n\nChaque bien classé mondial est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                  langfre:
                    "Cette série de couches de données est obsolète et a été remplacée par la série \"Biens patrimoine mondial UNESCO - Série\".\n\nVeuillez vous rapporter à sa fiche descriptive. https://geoportail.wallonie.be/catalogue/abe74a37-3c88-452b-94fd-5922d97d2e60.html\n\nCette série de couches de données reprend la localisation des différents biens inscrits sur la liste du patrimoine mondial en Région wallonne.\n\nCette série a été dépubliée le 10/10/2023.\n\nLe patrimoine mondial est défini comme tout bien ou ensemble de biens dont la valeur universelle exceptionnelle est reconnue par l'UNESCO, en application de la Convention concernant la protection du patrimoine mondial culturel et naturel, adoptée à Paris le 16 novembre 1972.\n\nIl s’agit d’une mesure de protection appliquée en surimpression au classement. En effet, les biens inscrits sur la liste du patrimoine mondial sont d’abord des biens classés au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection) au titre de monument, ensemble architectural, site ou site archéologique. Les données relatives aux biens inscrits sur la liste du patrimoine mondial sont donc issues d'une sélection sur base des jeux de données relatifs aux biens classés et zones de protection. Les attributs sont conservés.\n\nLa liste des biens mondiaux est alimentée par la liste des biens exceptionnels établie par l’Arrêté du Gouvernement wallon (AGW - 6 octobre 2016) et sont inscrits sur la liste du Patrimoine mondial de l'UNESCO.\n\nEn octobre 2016, six sites wallons étaient inscrits sur la liste du patrimoine mondial de l'humanité. Il s'agit des beffrois de la liste des beffrois de Belgique et de France, de la cathédrale Notre-Dame de Tournai, des sites miniers majeurs de Wallonie (Bois-du-Luc, Bois du Cazier, Grand-Hornu et Blegny-Mine), des minières néolithiques de silex de Spiennes, des quatre ascenseurs du canal du Centre avec leur site, et de la partie située en Wallonie du bien « Forêts primaires et anciennes de hêtres des Carpates et d’autres régions d’Europe » (forêt de Soignes située sur le territoire des communes de La Hulpe et de Waterloo).\n\nEn juillet 2021, Spa a été inscrite au sein de la série « Grandes Villes d’Eaux d’Europe ». La liste des biens mondiaux a été modifiée dans l’Arrêté du Gouvernement wallon (AGW – 12 mai 2022).\n\nAu total, la Belgique compte quinze biens inscrits au Patrimoine mondial de l'UNESCO.\n\nLe SPW travaille actuellement à une mise à jour de la donnée qui aboutira courant 2023. Actuellement, les données diffusées présentent la situation cartographique de l’ensemble des biens (périmètre du bien reconnu et sa zone tampon). Les données concernant ces périmètres doivent encore être adaptées et feront l’objet d’une communication ultérieure plus détaillée.\n\nChaque bien classé mondial est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette série de couches de données est obsolète et a été remplacée par la série "Biens patrimoine mondial UNESCO - Série".',
                  langfre:
                    'Cette série de couches de données est obsolète et a été remplacée par la série "Biens patrimoine mondial UNESCO - Série".',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_MND',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_MND',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données TLPE - Biens mondiaux',
                      langfre:
                        'Application de consultation des données TLPE - Biens mondiaux',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux biens mondiaux. Cette application constitue un thème de l'application de consultation des données TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux biens mondiaux. Cette application constitue un thème de l'application de consultation des données TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'http://whc.unesco.org/fr/etatsparties/be',
                      langfre: 'http://whc.unesco.org/fr/etatsparties/be',
                    },
                    nameObject: {
                      default:
                        'UNESCO - Biens inscrits sur la Liste du patrimoine mondial en Belgique',
                      langfre:
                        'UNESCO - Biens inscrits sur la Liste du patrimoine mondial en Belgique',
                    },
                    descriptionObject: {
                      default:
                        'Application de consultation des biens inscrits sur la Liste du patrimoine mondial en Belgique',
                      langfre:
                        'Application de consultation des biens inscrits sur la Liste du patrimoine mondial en Belgique',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_MND',
                      langfre:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_MND',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès aux couches de données en téléchargement direct',
                      langfre:
                        'Accès aux couches de données en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_mnd',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_mnd',
                    },
                    nameObject: {
                      default: 'Base de données des biens mondiaux',
                      langfre: 'Base de données des biens mondiaux',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des biens mondiaux',
                      langfre:
                        'Site permettant la recherche des biens mondiaux',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/documents/PAT_MND/PAT_MND.pdf',
                      langfre:
                        'https://docum1.wallonie.be/documents/PAT_MND/PAT_MND.pdf',
                    },
                    nameObject: {
                      default: 'Liste du patrimoine immobilier mondial',
                      langfre: 'Liste du patrimoine immobilier mondial',
                    },
                    descriptionObject: {
                      default:
                        'Liste du patrimoine immobilier mondial en Région wallonne',
                      langfre:
                        'Liste du patrimoine immobilier mondial en Région wallonne',
                    },
                    function: 'information',
                    applicationProfile: 'application/pdf',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                      langfre:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                    },
                    nameObject: {
                      default:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                      langfre:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                    },
                    descriptionObject: {
                      default:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                      langfre:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                uuid: '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
                id: '1271',
                groupOwner: '4',
                op0: ['1', '4', '14688', '14691', '14684'],
                op1: '1',
                op3: '1',
                op6: '1',
                op5: '1',
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '2dac12f1-eb54-405b-a94f-f14df54e2c8a',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/6ad564e0-685d-4664-8b03-499b70337d33/attachments/camping.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/6ad564e0-685d-4664-8b03-499b70337d33',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Inventaire des campings',
                  langfre: 'Inventaire des campings',
                },
                resourceAbstractObject: {
                  default:
                    "Ce jeu de données délimite les terrains de camping touristique, de camping à la ferme et de caravanage en Région wallonne.\n\nUn terrain de camping désigne d'une manière générale les terrains de camping touristiques, les terrains de caravanage et les terrains de camping à la ferme.\n\n- Les terrains de camping touristique sont définis via le Décret du 18 décembre 2003 comme des terrains utilisés d’une manière habituelle ou saisonnière pour la pratique du camping touristique par un ou plusieurs touristes. Ne cesse pas d’être un terrain de camping touristique celui dans les limites duquel le titulaire de l’autorisation installe à titre accessoire des abris fixes, non utilisés en qualité d’habitat permanent;\n\n- Les terrains de camping à la ferme sont des terrains de camping touristique utilisés par un exploitant agricole. Ces terrains dépendent de son exploitation et n’accueillent aucune caravane de type résidentiel;\n\n- Les terrains de caravanage sont des terrains utilisés d’une manière habituelle ou occasionnelle pour la pratique du camping-caravaning, à savoir utilisant comme moyen d’hébergement, par d’autres personnes que des forains ou des nomades agissant comme tels, de l’un des abris mobiles suivants: tente, caravane routière, caravane de type résidentiel sans étage, motorhome ou tout autre abri analogue, non conçus pour servir d’habitation permanente. Les terrains de caravanage doivent être utilisés par plus de 10 personnes en même temps ou occupé par plus de 3 abris.\n\nUn camping nécessite un permis de bâtir pour ses bâtiments d'infrastructure. \n\nLes types de terrains de camping varient en fonction du nombre d'emplacement :\n- Type A : Moins de 50 emplacements;\n- Type B : de 50 à 400 emplacements;\n- Type C : Plus de 400 emplacements.",
                  langfre:
                    "Ce jeu de données délimite les terrains de camping touristique, de camping à la ferme et de caravanage en Région wallonne.\n\nUn terrain de camping désigne d'une manière générale les terrains de camping touristiques, les terrains de caravanage et les terrains de camping à la ferme.\n\n- Les terrains de camping touristique sont définis via le Décret du 18 décembre 2003 comme des terrains utilisés d’une manière habituelle ou saisonnière pour la pratique du camping touristique par un ou plusieurs touristes. Ne cesse pas d’être un terrain de camping touristique celui dans les limites duquel le titulaire de l’autorisation installe à titre accessoire des abris fixes, non utilisés en qualité d’habitat permanent;\n\n- Les terrains de camping à la ferme sont des terrains de camping touristique utilisés par un exploitant agricole. Ces terrains dépendent de son exploitation et n’accueillent aucune caravane de type résidentiel;\n\n- Les terrains de caravanage sont des terrains utilisés d’une manière habituelle ou occasionnelle pour la pratique du camping-caravaning, à savoir utilisant comme moyen d’hébergement, par d’autres personnes que des forains ou des nomades agissant comme tels, de l’un des abris mobiles suivants: tente, caravane routière, caravane de type résidentiel sans étage, motorhome ou tout autre abri analogue, non conçus pour servir d’habitation permanente. Les terrains de caravanage doivent être utilisés par plus de 10 personnes en même temps ou occupé par plus de 3 abris.\n\nUn camping nécessite un permis de bâtir pour ses bâtiments d'infrastructure. \n\nLes types de terrains de camping varient en fonction du nombre d'emplacement :\n- Type A : Moins de 50 emplacements;\n- Type B : de 50 à 400 emplacements;\n- Type C : Plus de 400 emplacements.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Ce jeu de données délimite les terrains de camping touristique, de camping à la ferme et de caravanage en Région wallonne.',
                  langfre:
                    'Ce jeu de données délimite les terrains de camping touristique, de camping à la ferme et de caravanage en Région wallonne.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: 'No limitations to public access',
                    langfre: 'No limitations to public access',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                MD_LegalConstraintsUseLimitationObject: [
                  {
                    default: "Conditions d'accès et d'utilisation spécifiques",
                    langfre: "Conditions d'accès et d'utilisation spécifiques",
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default:
                        'Légende des couches de données relatives aux campings',
                      langfre:
                        'Légende des couches de données relatives aux campings',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=CAMPING',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=CAMPING',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - CAMPING',
                      langfre:
                        'Application de consultation des données de la DGO4 - CAMPING',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux campings. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux campings. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCAMPING%2FMapServer%22%2C%22label%22%3A%22Inventaire%20des%20campings%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F6ad564e0-685d-4664-8b03-499b70337d33%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCAMPING%2FMapServer%22%2C%22label%22%3A%22Inventaire%20des%20campings%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F6ad564e0-685d-4664-8b03-499b70337d33%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux terrains de camping',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux terrains de camping',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/CAMPING/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux terrains de camping',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux terrains de camping',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/CAMPING/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/CAMPING/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'download',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=camping',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=camping',
                    },
                    nameObject: {
                      default:
                        'Base de données des Communes en décentralisation',
                      langfre:
                        'Base de données des Communes en décentralisation',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des terrains de camping',
                      langfre:
                        'Site permettant la recherche des terrains de camping',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'http://cgt.tourismewallonie.be/',
                      langfre: 'http://cgt.tourismewallonie.be/',
                    },
                    nameObject: {
                      default:
                        'Site Internet du Commisariat général au Tourisme',
                      langfre:
                        'Site Internet du Commisariat général au Tourisme',
                    },
                    descriptionObject: {
                      default:
                        'Site Internet du Commisariat général au Tourisme',
                      langfre:
                        'Site Internet du Commisariat général au Tourisme',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '6ad564e0-685d-4664-8b03-499b70337d33',
                id: '1268',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['25', '1', '4', '14688', '0', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '6ad564e0-685d-4664-8b03-499b70337d33',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/3ec1510b-7e87-4f92-ab8a-22675249d84b/attachments/agro_geo_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/3ec1510b-7e87-4f92-ab8a-22675249d84b',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Zones agro-géographiques',
                  langfre: 'Zones agro-géographiques',
                },
                resourceAbstractObject: {
                  default:
                    'Le jeu de données reprend la délimitation des zones agro-géographiques - ou régions rurales - en Région wallonne.\n\nNeuf régions agro-géographiques, ou régions rurales, ont été reconnues sur le territoire wallon. Elles se situent en dehors des agglomérations et des axes industriels. Le découpage se base essentiellement sur des critères d’occupation des sols (surtout forêt ou agriculture) et d’aménagement des terroirs (grands champs ouverts, prairies entourées de haies, caractéristiques d’habitat, etc.) qui reflètent les conditions bio-physiques du milieu naturel et qui sont liés aux anciennes pratiques agricoles.\n\nDans ces régions, parfois encore nuancées en sous-régions, le patrimoine rural bâti possède ses propres traits caractéristiques. La morphologie des villages et leur typologie sont des éléments structurels qui ont connu une grande stabilité dans le temps.',
                  langfre:
                    'Le jeu de données reprend la délimitation des zones agro-géographiques - ou régions rurales - en Région wallonne.\n\nNeuf régions agro-géographiques, ou régions rurales, ont été reconnues sur le territoire wallon. Elles se situent en dehors des agglomérations et des axes industriels. Le découpage se base essentiellement sur des critères d’occupation des sols (surtout forêt ou agriculture) et d’aménagement des terroirs (grands champs ouverts, prairies entourées de haies, caractéristiques d’habitat, etc.) qui reflètent les conditions bio-physiques du milieu naturel et qui sont liés aux anciennes pratiques agricoles.\n\nDans ces régions, parfois encore nuancées en sous-régions, le patrimoine rural bâti possède ses propres traits caractéristiques. La morphologie des villages et leur typologie sont des éléments structurels qui ont connu une grande stabilité dans le temps.',
                },
                resourceHookAbstractObject: {
                  default:
                    'Le jeu de données reprend la délimitation des zones agro-géographiques - ou régions rurales - en Région wallonne.',
                  langfre:
                    'Le jeu de données reprend la délimitation des zones agro-géographiques - ou régions rurales - en Région wallonne.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=AGRO_GEO',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=AGRO_GEO',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Zones agro-géographiques',
                      langfre:
                        'Application de consultation des données de la DGO4 - Zones agro-géographiques',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux zones agro-géographiques. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux zones agro-géographiques. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FAGRO_GEO%2FMapServer%22%2C%22label%22%3A%22Zones%20agro-g%C3%A9ographiques%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F3ec1510b-7e87-4f92-ab8a-22675249d84b%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FAGRO_GEO%2FMapServer%22%2C%22label%22%3A%22Zones%20agro-g%C3%A9ographiques%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F3ec1510b-7e87-4f92-ab8a-22675249d84b%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST de la couche de données "Zones agro-géographiques"',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST de la couche de données "Zones agro-géographiques"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/AGRO_GEO/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS de la couche de données "Zones agro-géographiques"',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS de la couche de données "Zones agro-géographiques"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Nature_Paysage/Paysage/AGRO_GEO/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Nature_Paysage/Paysage/AGRO_GEO/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la donnée',
                      langfre: 'Téléchargement de la donnée',
                    },
                    descriptionObject: {
                      default:
                        'Lien de téléchargement de la donnée "Zones agro-géographiques" via FTP de la DGO4.',
                      langfre:
                        'Lien de téléchargement de la donnée "Zones agro-géographiques" via FTP de la DGO4.',
                    },
                    function: 'download',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '3ec1510b-7e87-4f92-ab8a-22675249d84b',
                id: '1003',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '3ec1510b-7e87-4f92-ab8a-22675249d84b',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/51c1f85d-ca4d-451c-9146-aadcc420fa30/attachments/prwe.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/51c1f85d-ca4d-451c-9146-aadcc420fa30',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Parcs résidentiels de week-end (PRWE)',
                  langfre: 'Parcs résidentiels de week-end (PRWE)',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de de données localise les équipements touristiques ayant le statut de parcs résidentiels de week-end au sein du territoire wallon.\n\nLe parc résidentiel de week-end est défini par le CWATUP (art.144) comme \"un ensemble de parcelles comprises dans un lotissement destiné à recevoir des résidences de week-end\", lesquelles sont des abris fixes ou mobiles de 60 mètres carrés maximum de superficie brute au sol (caravane, remorque d'habitation, chalet, bungalow, pavillon, etc.). \n\nPar opposition aux équipements purement récréatifs (parcs d'attraction, étangs de pêche, piscines, etc.), les PRWE sont des équipements touristiques comportant une fonction de séjour. Une personne peut y être résident permanent (et y être ou non domiciliée). \n\nles prescriptions relatives au permis d’urbanisme ou de lotir pour un équipement touristique s’appliquent aux parcs résidentiels. Un PRWE peut être implanté dans une zone d'habitat à caractère rural, d'aménagement communal concerté (zones de réserve) ou de loisirs ayant fait l'objet d'un PCA en vigueur ou d'un RUE approuvé par le GW (CWATUPE - Art.140). Dans une zone d'habitat, l'autorisation ne sera accordée que pour autant que la destination principale de la zone ne soit pas mise en péril et que l'équipement soit compatible avec le voisinage. Le parc ne peut en aucun cas être situé dans un site classé, ni dans un lieu insalubre ou inondable (CWATUPE - Art.145).\n\nLes parcs résidentiels de week-end cartographiés correspondent aux dossiers connus, approuvés et non périmés dépouillés à l'Administration Régionale. Ils répondent aux critères successivement définis par la circulaire ministérielle du 14/05/1971 et des arrêtés royaux du 29/10/1973 et du 27/12/1976.\n\nChaque parc résidentiel de week-end est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le parc en question.",
                  langfre:
                    "Cette couche de de données localise les équipements touristiques ayant le statut de parcs résidentiels de week-end au sein du territoire wallon.\n\nLe parc résidentiel de week-end est défini par le CWATUP (art.144) comme \"un ensemble de parcelles comprises dans un lotissement destiné à recevoir des résidences de week-end\", lesquelles sont des abris fixes ou mobiles de 60 mètres carrés maximum de superficie brute au sol (caravane, remorque d'habitation, chalet, bungalow, pavillon, etc.). \n\nPar opposition aux équipements purement récréatifs (parcs d'attraction, étangs de pêche, piscines, etc.), les PRWE sont des équipements touristiques comportant une fonction de séjour. Une personne peut y être résident permanent (et y être ou non domiciliée). \n\nles prescriptions relatives au permis d’urbanisme ou de lotir pour un équipement touristique s’appliquent aux parcs résidentiels. Un PRWE peut être implanté dans une zone d'habitat à caractère rural, d'aménagement communal concerté (zones de réserve) ou de loisirs ayant fait l'objet d'un PCA en vigueur ou d'un RUE approuvé par le GW (CWATUPE - Art.140). Dans une zone d'habitat, l'autorisation ne sera accordée que pour autant que la destination principale de la zone ne soit pas mise en péril et que l'équipement soit compatible avec le voisinage. Le parc ne peut en aucun cas être situé dans un site classé, ni dans un lieu insalubre ou inondable (CWATUPE - Art.145).\n\nLes parcs résidentiels de week-end cartographiés correspondent aux dossiers connus, approuvés et non périmés dépouillés à l'Administration Régionale. Ils répondent aux critères successivement définis par la circulaire ministérielle du 14/05/1971 et des arrêtés royaux du 29/10/1973 et du 27/12/1976.\n\nChaque parc résidentiel de week-end est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le parc en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette couche de de données localise les équipements touristiques ayant le statut de parcs résidentiels de week-end au sein du territoire wallon.',
                  langfre:
                    'Cette couche de de données localise les équipements touristiques ayant le statut de parcs résidentiels de week-end au sein du territoire wallon.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Parcs résidentiels de week-end (PRWE) (2018-06-01) http://geodata.wallonie.be/id/51c1f85d-ca4d-451c-9146-aadcc420fa30',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Parcs résidentiels de week-end (PRWE) (2018-06-01) http://geodata.wallonie.be/id/51c1f85d-ca4d-451c-9146-aadcc420fa30',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PRWE',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PRWE',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - PRWE',
                      langfre:
                        'Application de consultation des données de la DGO4 - PRWE',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux PRWE. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux PRWE. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPRWE%2FMapServer%22%2C%22label%22%3A%22Parcs%20r%C3%A9sidentiels%20de%20week-end%20%28PRWE%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F51c1f85d-ca4d-451c-9146-aadcc420fa30%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPRWE%2FMapServer%22%2C%22label%22%3A%22Parcs%20r%C3%A9sidentiels%20de%20week-end%20%28PRWE%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F51c1f85d-ca4d-451c-9146-aadcc420fa30%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux parcs résidentiels de week-end',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux parcs résidentiels de week-end',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PRWE/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux aux parcs résidentiels de week-end',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux aux parcs résidentiels de week-end',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/PRWE/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/PRWE/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=prwe',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=prwe',
                    },
                    nameObject: {
                      default:
                        'Base de données des parcs résidentiels de week-end',
                      langfre:
                        'Base de données des parcs résidentiels de week-end',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des parcs résidentiels de week-end',
                      langfre:
                        'Site permettant la recherche des parcs résidentiels de week-end',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '51c1f85d-ca4d-451c-9146-aadcc420fa30',
                id: '1270',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '51c1f85d-ca4d-451c-9146-aadcc420fa30',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/4b8c4576-52dd-4505-896e-3d83d474ff95/attachments/pcaml_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4b8c4576-52dd-4505-896e-3d83d474ff95',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'completed',
                  },
                ],
                resourceTitleObject: {
                  default:
                    "Programmes Communaux d'Actions en Matière de Logement 2014-2016",
                  langfre:
                    "Programmes Communaux d'Actions en Matière de Logement 2014-2016",
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données reprend les parcelles sur lesquels se réalise un projet de logement repris dans le programme communal d'actions en matière de logement de la commune concernée.\n\nLe Code wallon du Logement et de l’Habitat durable impose par son article 187 que les communes élaborent, dans les neufs mois suivant le renouvellement de leurs conseils respectifs, une déclaration de politique du logement qui détermine les objectifs et les principes des actions à mener en vue de mettre en œuvre le droit à un logement décent tel que le prévoit l’article 23 de la Constitution. C’est dans ce cadre, et afin de matérialiser les actions figurant dans la Déclaration précitée, que chaque commune est tenue d'établir un programme communal triennal d'actions en matière de logement (ancrage communal) .\n\nCe programme constitue le recueil des projets proposés par les différents opérateurs en matière de logement, à savoir : les Communes, les CPAS, les Sociétés de Logement de Service Public (SLSP), le Fonds du logement des familles nombreuses de Wallonie (FLW) ainsi que différentes ASBL, en vue de diversifier l'offre en logements disponibles sur leur territoire, à permettre la réalisation de logements sociaux ou assimilés, d'insertion et de transit, ainsi qu'à lutter contre l'inoccupation et l'insalubrité des logements. \n\nLa Direction des subventions aux organismes publics et privés de la DGO4 (SPW - DGO4 - DSOPP) aide les communes dans ces démarches. Elle favorise l'aspect transversal et global dans la recherche de solutions, notamment en développant des méthodes et des pratiques de collaboration entre les acteurs locaux et, si nécessaire, régionaux. \n\nLa cartographie reprend les divers projets pour lesquels des informations cadastrales ont été fournies sous la forme de polygones. Dans le cas où les informations parcellaires ne sont pas disponibles, un polygone représentant le périmètre de la Commune est produit et le(s) numéro(s) du(des) projet(s) lui est(sont) associé(s). La cartographie distingue les zones où un projet est localisé, non-localisé (3 communes) et les zones sans projet (une zone repris dans la présente cartographie).\n\nChaque parcelle ou zone concernée par le programme communal d'action en matière de logement est identifiée de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur le site en question.",
                  langfre:
                    "Cette couche de données reprend les parcelles sur lesquels se réalise un projet de logement repris dans le programme communal d'actions en matière de logement de la commune concernée.\n\nLe Code wallon du Logement et de l’Habitat durable impose par son article 187 que les communes élaborent, dans les neufs mois suivant le renouvellement de leurs conseils respectifs, une déclaration de politique du logement qui détermine les objectifs et les principes des actions à mener en vue de mettre en œuvre le droit à un logement décent tel que le prévoit l’article 23 de la Constitution. C’est dans ce cadre, et afin de matérialiser les actions figurant dans la Déclaration précitée, que chaque commune est tenue d'établir un programme communal triennal d'actions en matière de logement (ancrage communal) .\n\nCe programme constitue le recueil des projets proposés par les différents opérateurs en matière de logement, à savoir : les Communes, les CPAS, les Sociétés de Logement de Service Public (SLSP), le Fonds du logement des familles nombreuses de Wallonie (FLW) ainsi que différentes ASBL, en vue de diversifier l'offre en logements disponibles sur leur territoire, à permettre la réalisation de logements sociaux ou assimilés, d'insertion et de transit, ainsi qu'à lutter contre l'inoccupation et l'insalubrité des logements. \n\nLa Direction des subventions aux organismes publics et privés de la DGO4 (SPW - DGO4 - DSOPP) aide les communes dans ces démarches. Elle favorise l'aspect transversal et global dans la recherche de solutions, notamment en développant des méthodes et des pratiques de collaboration entre les acteurs locaux et, si nécessaire, régionaux. \n\nLa cartographie reprend les divers projets pour lesquels des informations cadastrales ont été fournies sous la forme de polygones. Dans le cas où les informations parcellaires ne sont pas disponibles, un polygone représentant le périmètre de la Commune est produit et le(s) numéro(s) du(des) projet(s) lui est(sont) associé(s). La cartographie distingue les zones où un projet est localisé, non-localisé (3 communes) et les zones sans projet (une zone repris dans la présente cartographie).\n\nChaque parcelle ou zone concernée par le programme communal d'action en matière de logement est identifiée de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur le site en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données reprend les parcelles sur lesquels se réalise un projet de logement repris dans le programme communal d'actions en matière de logement de la commune concernée.",
                  langfre:
                    "Cette couche de données reprend les parcelles sur lesquels se réalise un projet de logement repris dans le programme communal d'actions en matière de logement de la commune concernée.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des données',
                      langfre: 'Légende des données',
                    },
                    descriptionObject: {
                      default:
                        "Légende des données relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                      langfre:
                        "Légende des données relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PCAML14_16',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PCAML14_16',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - PACML 14-16',
                      langfre:
                        'Application de consultation des données de la DGO4 - PACML 14-16',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux PACML 14-16. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux PACML 14-16. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPCAML14_16%2FMapServer%22%2C%22label%22%3A%22Programmes%20Communaux%20d%27Actions%20en%20Mati%C3%A8re%20de%20Logement%202014-2016%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4b8c4576-52dd-4505-896e-3d83d474ff95%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPCAML14_16%2FMapServer%22%2C%22label%22%3A%22Programmes%20Communaux%20d%27Actions%20en%20Mati%C3%A8re%20de%20Logement%202014-2016%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4b8c4576-52dd-4505-896e-3d83d474ff95%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PCAML14_16/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Logement_Habitat/PCAML14_16/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Logement_Habitat/PCAML14_16/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pcaml14_16',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pcaml14_16',
                    },
                    nameObject: {
                      default:
                        'Base de données des sites concernés par les PACML',
                      langfre:
                        'Base de données des sites concernés par les PACML',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                      langfre:
                        "Site permettant la recherche des sites concernés par les programmes d'action communaux en matière de logement 14-16.",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_logement/index.php/site/divers?page=ancrage1416',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_logement/index.php/site/divers?page=ancrage1416',
                    },
                    nameObject: {
                      default:
                        "Page Internet relatif aux programmes communaux d'action en matière de logement 2014-2016",
                      langfre:
                        "Page Internet relatif aux programmes communaux d'action en matière de logement 2014-2016",
                    },
                    descriptionObject: {
                      default:
                        "Page Internet sur le site de la DGO4 relatif aux programmes communaux d'action en matière de logement 2014-2016. Possibilité de télécharger les documents de référence.",
                      langfre:
                        "Page Internet sur le site de la DGO4 relatif aux programmes communaux d'action en matière de logement 2014-2016. Possibilité de télécharger les documents de référence.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '4b8c4576-52dd-4505-896e-3d83d474ff95',
                id: '1302',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '14688', '0'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '4b8c4576-52dd-4505-896e-3d83d474ff95',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/6997776d-8b95-4dc7-9b66-a5d9c4050ea8/attachments/pat_exc.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Patrimoine - Biens exceptionnels - Série',
                  langfre: 'Patrimoine - Biens exceptionnels - Série',
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données reprend la localisation des différents biens figurant au patrimoine immobilier classé exceptionnel.\n\nLe patrimoine exceptionnel est défini comme l’ensemble des biens classés présentant un intérêt exceptionnel au niveau de l’ensemble de la Région wallonne, sur base des critères d’authenticité, d’intégrité, de représentativité ou de rareté, et dont la liste est déterminée par un arrêté du Gouvernement (AGW - 12 mai 2022).\n\nIl s’agit d’une mesure de protection appliquée en surimpression au classement. En effet, les biens classés exceptionnels sont d’abord des biens classés au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection) au titre de monument, d’ensemble architectural, de site ou de site archéologique. Les données relatives aux biens exceptionnels sont donc issues d'une sélection sur base des jeux de données relatifs aux biens classés et zones de protection. Les attributs sont conservés.\n\nCes biens alimentent aussi la liste du patrimoine mondial (UNESCO). Pour plus de renseignements, consultez la fiche de métadonnées relative aux Biens mondiaux (PAT_MND).\n\nChaque bien classé exceptionnel est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                  langfre:
                    "Cette série de couches de données reprend la localisation des différents biens figurant au patrimoine immobilier classé exceptionnel.\n\nLe patrimoine exceptionnel est défini comme l’ensemble des biens classés présentant un intérêt exceptionnel au niveau de l’ensemble de la Région wallonne, sur base des critères d’authenticité, d’intégrité, de représentativité ou de rareté, et dont la liste est déterminée par un arrêté du Gouvernement (AGW - 12 mai 2022).\n\nIl s’agit d’une mesure de protection appliquée en surimpression au classement. En effet, les biens classés exceptionnels sont d’abord des biens classés au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection) au titre de monument, d’ensemble architectural, de site ou de site archéologique. Les données relatives aux biens exceptionnels sont donc issues d'une sélection sur base des jeux de données relatifs aux biens classés et zones de protection. Les attributs sont conservés.\n\nCes biens alimentent aussi la liste du patrimoine mondial (UNESCO). Pour plus de renseignements, consultez la fiche de métadonnées relative aux Biens mondiaux (PAT_MND).\n\nChaque bien classé exceptionnel est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette série de couches de données reprend la localisation des différents biens figurant au patrimoine immobilier classé exceptionnel.',
                  langfre:
                    'Cette série de couches de données reprend la localisation des différents biens figurant au patrimoine immobilier classé exceptionnel.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : ervice public de Wallonie (SPW) - Patrimoine - Biens exceptionnels - Série (2023-12-11) http://geodata.wallonie.be/id/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
                    langfre:
                      'Source : ervice public de Wallonie (SPW) - Patrimoine - Biens exceptionnels - Série (2023-12-11) http://geodata.wallonie.be/id/6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_EXC',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_EXC',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données TLPE - Biens classés exceptionnels',
                      langfre:
                        'Application de consultation des données TLPE - Biens classés exceptionnels',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux biens classés exceptionnels. Cette application constitue un thème de l'application de consultation des données TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux biens classés exceptionnels. Cette application constitue un thème de l'application de consultation des données TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPAT_EXC%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20exceptionnels%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F6997776d-8b95-4dc7-9b66-a5d9c4050ea8%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPAT_EXC%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20exceptionnels%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F6997776d-8b95-4dc7-9b66-a5d9c4050ea8%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Ce service ESRI-REST permet de visualiser les couches de données des biens classés exceptionnels',
                      langfre:
                        'Ce service ESRI-REST permet de visualiser les couches de données des biens classés exceptionnels',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PAT_EXC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Ce service WMS permet de visualiser les couches de données des biens classés exceptionnels',
                      langfre:
                        'Ce service WMS permet de visualiser les couches de données des biens classés exceptionnels',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_EXC',
                      langfre:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_EXC',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_exc',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_exc',
                    },
                    nameObject: {
                      default:
                        'Base de données des biens exceptionnels et zones de protection',
                      langfre:
                        'Base de données des biens exceptionnels et zones de protection',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des biens exceptionnels',
                      langfre:
                        'Site permettant la recherche des biens exceptionnels',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/documents/PAT_EXC/PAT_EXC.pdf',
                      langfre:
                        'https://docum1.wallonie.be/documents/PAT_EXC/PAT_EXC.pdf',
                    },
                    nameObject: {
                      default: 'Liste du patrimoine immobilier exceptionnel',
                      langfre: 'Liste du patrimoine immobilier exceptionnel',
                    },
                    descriptionObject: {
                      default:
                        'Liste du patrimoine immobilier exceptionnel en Région wallonne',
                      langfre:
                        'Liste du patrimoine immobilier exceptionnel en Région wallonne',
                    },
                    function: 'information',
                    applicationProfile: 'application/pdf',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                      langfre:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                    },
                    nameObject: {
                      default:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                      langfre:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                    },
                    descriptionObject: {
                      default:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                      langfre:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
                id: '668',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['25', '1', '4', '0', '14688', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '6997776d-8b95-4dc7-9b66-a5d9c4050ea8',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/fb122cc3-3f83-4d24-be0e-bcd66ace8843/attachments/bien_lstsav.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Patrimoine - Biens en liste de sauvegarde - Série',
                  langfre: 'Patrimoine - Biens en liste de sauvegarde - Série',
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données reprend la localisation de biens qui sont inscrits sur la liste de sauvegarde et qui bénéficient à ce titre d’une protection temporaire dans l’attente d’un éventuel classement.\n\nLa procédure de protection d'un bien patrimonial étant relativement longue, une procédure spécifique est prévue lorsqu’un bien nécessite une protection en urgence : l’inscription sur la liste de sauvegarde.\n\nLa liste de sauvegarde consiste en « une liste des biens immobiliers menacés de destruction ou de modification provisoire ou définitive, protégés à titre temporaire » (CoPat art. 3, 5°).\n\nLorsque l’urgence est avérée, la procédure est réduite et l'inscription ne requiert pas d'enquête publique. L'arrêté d'inscription sur la liste de sauvegarde relève du Gouvernement, lequel sollicitera, sauf extrême urgence dûment motivée, l'avis de la commission royale des Monuments, Sites et Fouilles. \n\nL'inscription sur la liste de sauvegarde est une mesure valable 12 mois, prenant cours à la date de la notification de l'inscription du bien sur la liste. Tous les effets du classement sont applicables durant cette période : le propriétaire du bien ne peut par exemple ni le détruire, ni permettre d’y apporter un changement définitif qui en modifierait l’aspect sans y avoir été autorisé par le ministre responsable (petite nuance en ce qui concerne les aides : seule la subvention pour des actes et travaux d’urgence peut être demandée). \n\nTrès souvent, cette inscription se poursuit par une procédure en vue du classement du bien.\nSans avis rendu par l’Agence wallonne du Patrimoine (AWaP) au bout de la période de 12 mois, le bien n’est plus protégé par la liste de sauvegarde. Il est alors à retirer de la liste. Si la procédure de classement en parallèle aboutit, il est également retiré. Les couches constitutives de la séries sont donc potentiellement vides au moment de la consultation. L’inscription n'est pas renouvelable. \n\nLes biens en liste de sauvegarde sont des biens patrimoniaux au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection). On y distingue donc les monuments, les sites, les sites archéologiques et les ensembles architecturaux, ainsi que leurs zones de protection éventuelles.\n\nLa liste de sauvegarde a été créée en juillet 1987.\n\nChaque bien inscrit en liste de sauvegarde est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                  langfre:
                    "Cette série de couches de données reprend la localisation de biens qui sont inscrits sur la liste de sauvegarde et qui bénéficient à ce titre d’une protection temporaire dans l’attente d’un éventuel classement.\n\nLa procédure de protection d'un bien patrimonial étant relativement longue, une procédure spécifique est prévue lorsqu’un bien nécessite une protection en urgence : l’inscription sur la liste de sauvegarde.\n\nLa liste de sauvegarde consiste en « une liste des biens immobiliers menacés de destruction ou de modification provisoire ou définitive, protégés à titre temporaire » (CoPat art. 3, 5°).\n\nLorsque l’urgence est avérée, la procédure est réduite et l'inscription ne requiert pas d'enquête publique. L'arrêté d'inscription sur la liste de sauvegarde relève du Gouvernement, lequel sollicitera, sauf extrême urgence dûment motivée, l'avis de la commission royale des Monuments, Sites et Fouilles. \n\nL'inscription sur la liste de sauvegarde est une mesure valable 12 mois, prenant cours à la date de la notification de l'inscription du bien sur la liste. Tous les effets du classement sont applicables durant cette période : le propriétaire du bien ne peut par exemple ni le détruire, ni permettre d’y apporter un changement définitif qui en modifierait l’aspect sans y avoir été autorisé par le ministre responsable (petite nuance en ce qui concerne les aides : seule la subvention pour des actes et travaux d’urgence peut être demandée). \n\nTrès souvent, cette inscription se poursuit par une procédure en vue du classement du bien.\nSans avis rendu par l’Agence wallonne du Patrimoine (AWaP) au bout de la période de 12 mois, le bien n’est plus protégé par la liste de sauvegarde. Il est alors à retirer de la liste. Si la procédure de classement en parallèle aboutit, il est également retiré. Les couches constitutives de la séries sont donc potentiellement vides au moment de la consultation. L’inscription n'est pas renouvelable. \n\nLes biens en liste de sauvegarde sont des biens patrimoniaux au sens du CoPat (cf. fiche de métadonnées relative aux biens classés et zones de protection). On y distingue donc les monuments, les sites, les sites archéologiques et les ensembles architecturaux, ainsi que leurs zones de protection éventuelles.\n\nLa liste de sauvegarde a été créée en juillet 1987.\n\nChaque bien inscrit en liste de sauvegarde est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette série de couches de données reprend la localisation de biens qui sont inscrits sur la liste de sauvegarde et qui bénéficient à ce titre d’une protection temporaire dans l’attente d’un éventuel classement.',
                  langfre:
                    'Cette série de couches de données reprend la localisation de biens qui sont inscrits sur la liste de sauvegarde et qui bénéficient à ce titre d’une protection temporaire dans l’attente d’un éventuel classement.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Patrimoine - Biens en liste de sauvegarde - Série (2023-07-04) http://geodata.wallonie.be/id/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Patrimoine - Biens en liste de sauvegarde - Série (2023-07-04) http://geodata.wallonie.be/id/fb122cc3-3f83-4d24-be0e-bcd66ace8843',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_LSTSAV',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PAT_LSTSAV',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données TLPE - Biens en liste de sauvegarde',
                      langfre:
                        'Application de consultation des données TLPE - Biens en liste de sauvegarde',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux biens en liste de sauvegarde. Cette application constitue un thème de l'application de consultation des données TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux biens en liste de sauvegarde. Cette application constitue un thème de l'application de consultation des données TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPAT_LSTSAV%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20en%20liste%20de%20sauvegarde%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Ffb122cc3-3f83-4d24-be0e-bcd66ace8843%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPAT_LSTSAV%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20en%20liste%20de%20sauvegarde%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Ffb122cc3-3f83-4d24-be0e-bcd66ace8843%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches de données relatives aux "Biens en liste de sauvegarde"',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches de données relatives aux "Biens en liste de sauvegarde"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PAT_LSTSAV/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches de données relatives aux "Biens en liste de sauvegarde"',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches de données relatives aux "Biens en liste de sauvegarde"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_LSTSAV/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/patrimoine/PAT_LSTSAV/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_lstsav',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pat_lstsav',
                    },
                    nameObject: {
                      default:
                        'Base de données des biens en liste de sauvegarde',
                      langfre:
                        'Base de données des biens en liste de sauvegarde',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des biens en liste de sauvegarde',
                      langfre:
                        'Site permettant la recherche des biens en liste de sauvegarde',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/documents/PAT_LSTSAV/PAT_LSTSAV.pdf',
                      langfre:
                        'https://docum1.wallonie.be/documents/PAT_LSTSAV/PAT_LSTSAV.pdf',
                    },
                    nameObject: {
                      default: 'Liste de sauvegarde du patrimoine wallon',
                      langfre: 'Liste de sauvegarde du patrimoine wallon',
                    },
                    descriptionObject: {
                      default:
                        'Liste des biens placés en liste de sauvegarde en Région wallonne',
                      langfre:
                        'Liste des biens placés en liste de sauvegarde en Région wallonne',
                    },
                    function: 'information',
                    applicationProfile: 'application/pdf',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                      langfre:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                    },
                    nameObject: {
                      default:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                      langfre:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                    },
                    descriptionObject: {
                      default:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                      langfre:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
                id: '1294',
                groupOwner: '4',
                op0: ['1', '25', '4', '14684', '14688', '0', '14683'],
                op2: ['1', '25', '4'],
                op1: ['1', '25', '4', '14688', '0', '14683'],
                op3: ['1', '25', '4', '0', '14688', '14683'],
                op6: ['1', '25', '4'],
                op5: ['1', '25', '4', '0', '14688', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'fb122cc3-3f83-4d24-be0e-bcd66ace8843',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/9008e261-2c71-4d40-8513-fb970c4eec2b/attachments/comdec_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/9008e261-2c71-4d40-8513-fb970c4eec2b',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default:
                    'Communes dont le collège communal statue sans avis préalable du fonctionnaire délégué (en décentralisation)',
                  langfre:
                    'Communes dont le collège communal statue sans avis préalable du fonctionnaire délégué (en décentralisation)',
                },
                resourceAbstractObject: {
                  default:
                    'Les communes en décentralisation sont des communes qui peuvent statuer sur les demandes de permis sans avis préalable du fonctionnaire délégué.\n\nElles doivent toutefois remplir simultanément les conditions suivantes :\n\n- Le projet faisant l’objet de la demande de permis ne peut, d’une part, déroger au plan de secteur ou à la partie réglementaire du guide régional d’urbanisme (GRU) et/ou, d’autre part, s’écarter du schéma de développement communal (SDC), d’un schéma de développement pluricommunal (SDPC), d’un schéma d’orientation local (SOL), de la partie indicative du guide régional d’urbanisme (GRU) ou d’un guide communal d’urbanisme (GCU).\n- La commune doit posséder un schéma de développement communal (SDC) et/ou un schéma de développement pluricommunal (SDPC) couvrant l’entièreté de son territoire.\n- La commune doit avoir institué une commission consultative communale d’aménagement du territoire et de mobilité (CCATM).\n- A partir du 1er juin 2021, la commune doit posséder un guide communal d’urbanisme (GCU) comportant au minimum les éléments visés à l’article D.III.2, §1er, 1° et 2°.',
                  langfre:
                    'Les communes en décentralisation sont des communes qui peuvent statuer sur les demandes de permis sans avis préalable du fonctionnaire délégué.\n\nElles doivent toutefois remplir simultanément les conditions suivantes :\n\n- Le projet faisant l’objet de la demande de permis ne peut, d’une part, déroger au plan de secteur ou à la partie réglementaire du guide régional d’urbanisme (GRU) et/ou, d’autre part, s’écarter du schéma de développement communal (SDC), d’un schéma de développement pluricommunal (SDPC), d’un schéma d’orientation local (SOL), de la partie indicative du guide régional d’urbanisme (GRU) ou d’un guide communal d’urbanisme (GCU).\n- La commune doit posséder un schéma de développement communal (SDC) et/ou un schéma de développement pluricommunal (SDPC) couvrant l’entièreté de son territoire.\n- La commune doit avoir institué une commission consultative communale d’aménagement du territoire et de mobilité (CCATM).\n- A partir du 1er juin 2021, la commune doit posséder un guide communal d’urbanisme (GCU) comportant au minimum les éléments visés à l’article D.III.2, §1er, 1° et 2°.',
                },
                resourceHookAbstractObject: {
                  default:
                    'Les communes en décentralisation sont des communes qui peuvent statuer sur les demandes de permis sans avis préalable du fonctionnaire délégué.',
                  langfre:
                    'Les communes en décentralisation sont des communes qui peuvent statuer sur les demandes de permis sans avis préalable du fonctionnaire délégué.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=COMDEC',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=COMDEC',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Communes en décentralisation',
                      langfre:
                        'Application de consultation des données de la DGO4 - Communes en décentralisation',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux communes en décentralisation. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux communes en décentralisation. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCOMDEC%2FMapServer%22%2C%22label%22%3A%22Communes%20dont%20le%20coll%C3%A8ge%20communal%20statue%20sans%20avis%20pr%C3%A9alable%20du%20fonctionnaire%20d%C3%A9l%C3%A9gu%C3%A9%20%28en%20d%C3%A9centralisation%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F9008e261-2c71-4d40-8513-fb970c4eec2b%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCOMDEC%2FMapServer%22%2C%22label%22%3A%22Communes%20dont%20le%20coll%C3%A8ge%20communal%20statue%20sans%20avis%20pr%C3%A9alable%20du%20fonctionnaire%20d%C3%A9l%C3%A9gu%C3%A9%20%28en%20d%C3%A9centralisation%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F9008e261-2c71-4d40-8513-fb970c4eec2b%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Communes en décentralisation',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Communes en décentralisation',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/COMDEC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux Communes en décentralisation',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux Communes en décentralisation',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/COMDEC/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/COMDEC/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=comdec',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=comdec',
                    },
                    nameObject: {
                      default:
                        'Base de données des Communes en décentralisation',
                      langfre:
                        'Base de données des Communes en décentralisation',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des Communes en décentralisation',
                      langfre:
                        'Site permettant la recherche des Communes en décentralisation',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '9008e261-2c71-4d40-8513-fb970c4eec2b',
                id: '1160',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '9008e261-2c71-4d40-8513-fb970c4eec2b',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/097e8d4e-9bad-4798-af85-9bdd3c76952a/attachments/sdc_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/097e8d4e-9bad-4798-af85-9bdd3c76952a',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Schéma de Développement Communal (SDC)',
                  langfre: 'Schéma de Développement Communal (SDC)',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données compile les informations spatiales constitutives des Schémas de Développement Communaux (SDC) au sens du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie. Dans sa logique d'urbanisme de projet, le CoDT met en place les schémas, qui sont des balises dans lesquelles la politique d’aménagement du territoire est menée en Wallonie. Il y a 4 types de schémas qui portent sur des échelles différentes : un au niveau régional (SDT), un au niveau pluricommunal (SDPC) et deux au niveau communal (SDC et SOL), \n\nParmi ces documents, le Schéma de Développement Communal (SDC - Art. D.II.9 et ss du CoDT) est un des deux schémas communaux. Il est établi à l’initiative du conseil communal et approuvé par le Gouvernement. Le SDC définit la stratégie territoriale pour l’ensemble du territoire communal sur la base d’une analyse contextuelle. Le CoDT a voulu concevoir ce schéma comme un outil qui, d’une part, assure la pérennité de l’ancien Schéma de Structure Communal (SSC) et, d’autre part, permet d’envisager une approche plus prospective de la gestion du territoire communal. La stratégie territoriale du SDC définit les objectifs communaux de développement territorial et la manière dont ces objectifs déclinent les objectifs régionaux du Schéma de Développement du Territoire (SDT) ou le cas échéant du ou des Schémas de Développement Pluricommunaux (SDP), les principes de mise en œuvre de ces objectifs, et la structure territoriale.\n\nL’ancien Schéma de Structure Communal (SSC) défini dans le CWATUP est assimilé au SDC. Comme le SSC, le SDC a une valeur indicative. Il s'applique au SOL, au Guide Communal d'Urbanisme (GCU) ainsi qu'à toute décision prise en matière de permis, certificats, déclarations et de politique foncière.\n\nUne commune ne peut se doter que d'un seul SDC.\n\nAu niveau cartographique, la couche de données des SDC intègre les périmètres identifiés dans les anciens SSC au sens du CWATUP.",
                  langfre:
                    "Cette couche de données compile les informations spatiales constitutives des Schémas de Développement Communaux (SDC) au sens du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie. Dans sa logique d'urbanisme de projet, le CoDT met en place les schémas, qui sont des balises dans lesquelles la politique d’aménagement du territoire est menée en Wallonie. Il y a 4 types de schémas qui portent sur des échelles différentes : un au niveau régional (SDT), un au niveau pluricommunal (SDPC) et deux au niveau communal (SDC et SOL), \n\nParmi ces documents, le Schéma de Développement Communal (SDC - Art. D.II.9 et ss du CoDT) est un des deux schémas communaux. Il est établi à l’initiative du conseil communal et approuvé par le Gouvernement. Le SDC définit la stratégie territoriale pour l’ensemble du territoire communal sur la base d’une analyse contextuelle. Le CoDT a voulu concevoir ce schéma comme un outil qui, d’une part, assure la pérennité de l’ancien Schéma de Structure Communal (SSC) et, d’autre part, permet d’envisager une approche plus prospective de la gestion du territoire communal. La stratégie territoriale du SDC définit les objectifs communaux de développement territorial et la manière dont ces objectifs déclinent les objectifs régionaux du Schéma de Développement du Territoire (SDT) ou le cas échéant du ou des Schémas de Développement Pluricommunaux (SDP), les principes de mise en œuvre de ces objectifs, et la structure territoriale.\n\nL’ancien Schéma de Structure Communal (SSC) défini dans le CWATUP est assimilé au SDC. Comme le SSC, le SDC a une valeur indicative. Il s'applique au SOL, au Guide Communal d'Urbanisme (GCU) ainsi qu'à toute décision prise en matière de permis, certificats, déclarations et de politique foncière.\n\nUne commune ne peut se doter que d'un seul SDC.\n\nAu niveau cartographique, la couche de données des SDC intègre les périmètres identifiés dans les anciens SSC au sens du CWATUP.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette couche de données compile les informations spatiales constitutives des Schémas de Développement Communaux (SDC) au sens du CoDT.',
                  langfre:
                    'Cette couche de données compile les informations spatiales constitutives des Schémas de Développement Communaux (SDC) au sens du CoDT.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Schéma de Développement Communal (SDC) (2025-01-13) http://geodata.wallonie.be/id/097e8d4e-9bad-4798-af85-9bdd3c76952a',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Schéma de Développement Communal (SDC) (2025-01-13) http://geodata.wallonie.be/id/097e8d4e-9bad-4798-af85-9bdd3c76952a',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SDC',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SDC',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - SDC',
                      langfre:
                        'Application de consultation des données de la DGO4 - SDC',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux SDC. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux SDC. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSDC%2FMapServer%22%2C%22label%22%3A%22Sch%C3%A9ma%20de%20D%C3%A9veloppement%20Communal%20%28SDC%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F097e8d4e-9bad-4798-af85-9bdd3c76952a%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSDC%2FMapServer%22%2C%22label%22%3A%22Sch%C3%A9ma%20de%20D%C3%A9veloppement%20Communal%20%28SDC%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F097e8d4e-9bad-4798-af85-9bdd3c76952a%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST de la couche de données relative aux Schémas de Développement Communaux',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST de la couche de données relative aux Schémas de Développement Communaux',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SDC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS de la couche de données relative aux Schémas de Développement Communaux',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS de la couche de données relative aux Schémas de Développement Communaux',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Amenagement/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Amenagement/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct des couches de données constitutives des Schémas de Développement Communaux',
                      langfre:
                        'Accès en téléchargement direct des couches de données constitutives des Schémas de Développement Communaux',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                    },
                    nameObject: {
                      default: 'Base de données des SDC',
                      langfre: 'Base de données des SDC',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Schémas d'Orientation Locaux",
                      langfre:
                        "Site permettant la recherche des Schémas d'Orientation Locaux",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/INSPIRE/WMS/LU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/INSPIRE/WMS/LU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS - Inspire',
                      langfre: 'Service de visualisation WMS - Inspire',
                    },
                    descriptionObject: {
                      default:
                        'Ce service de visualisation WMS-INSPIRE permet de consulter la série de couches de données conforme au thème INSPIRE "Usage des sols" au sein du territoire wallon (Belgique).',
                      langfre:
                        'Ce service de visualisation WMS-INSPIRE permet de consulter la série de couches de données conforme au thème INSPIRE "Usage des sols" au sein du territoire wallon (Belgique).',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'https://codt.wallonie.be/',
                      langfre: 'https://codt.wallonie.be/',
                    },
                    nameObject: {
                      default: "CoDT - Toute l'information",
                      langfre: "CoDT - Toute l'information",
                    },
                    descriptionObject: {
                      default:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                      langfre:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '097e8d4e-9bad-4798-af85-9bdd3c76952a',
                id: '1614',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '097e8d4e-9bad-4798-af85-9bdd3c76952a',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5/attachments/terrils_dgo4.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Terrils du point de vue aménagement et urbanisme',
                  langfre: 'Terrils du point de vue aménagement et urbanisme',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données reprend l'emprise des terrils ayant une implication en terme d'aménagement du territoire et d'urbanisme.\n\nL'Aménagement du Territoire participe à l'objectif de protection de l'environnement et d'instauration du développement durable notamment par l'organisation de l'affectation du sol et de l'implantation des infrastructures. Dans ce cadre, la valorisation des terrils constitue un outil d'aménagement actif du territoire.\n\nLa valorisation des terrils est instaurée par le Décret du 9/5/1985, modifié par des décrets successifs. Les terrils sont des cas particuliers de sites d'activité économique désaffectés, car ils contiennent encore souvent des ressources minérales qui pourraient être valorisées. Par ailleurs, les terrils sont parfois devenus des sites semi-naturels intéressants.\n\nIls sont répartis en 3 catégories \n- Catégorie A : les terrils qui, pour des raisons d'aménagement du territoire et d'urbanisme, ou de protection de l'environnement, ou de classement comme site, ne peuvent pas être mis en exploitation;\n- Catégorie B, les terrils exploitables;\n- Catégorie C, les terrils qui semblent intéressants à exploiter, mais qui nécessitent des investigations complémentaires\n\nEn termes d'aménagement du territoire, certains terrils sont classés comme sites et, à ce titre, ne peuvent plus faire l'objet d'une quelconque exploitation (art. 345 et suivant du CWATUPE). Un terril peut être repris au plan de secteur dans le périmètre d'une zone d'habitat, d'une zone industrielle, d'une zone d'espace vert (dans certains cas, à rénover), ou de tout autre type de zone, selon la destination future du sol.\n\nL'inscription d'un terril en zone naturelle d'intérêt scientifique ou réserve naturelle ne permet pas l'exploitation. \n\nEn milieu urbain, la valorisation des terrils intègre les opérations de revitalisation urbaine et constitue un projet global de reconversion pour améliorer cadre de vie et activités économiques.\n\nLe présent jeu de données reprend l'emprise des terrils ayant une implication en terme d'aménagement et urbanisme. Il est issu du jeu de données \"Terrils\" de la DGO3 (SPW - DGO3 - DEE - DRIGM). Il a été retravaillé et les terrils ont été catégorisés en 2 classes :\n- Terrils majeurs : terrils de plus grande taille datant d'après la révolution industrielle;\n- Terrils mineurs : terrils de plus petite taille datant généralement d'avant la révolution industrielle.",
                  langfre:
                    "Cette couche de données reprend l'emprise des terrils ayant une implication en terme d'aménagement du territoire et d'urbanisme.\n\nL'Aménagement du Territoire participe à l'objectif de protection de l'environnement et d'instauration du développement durable notamment par l'organisation de l'affectation du sol et de l'implantation des infrastructures. Dans ce cadre, la valorisation des terrils constitue un outil d'aménagement actif du territoire.\n\nLa valorisation des terrils est instaurée par le Décret du 9/5/1985, modifié par des décrets successifs. Les terrils sont des cas particuliers de sites d'activité économique désaffectés, car ils contiennent encore souvent des ressources minérales qui pourraient être valorisées. Par ailleurs, les terrils sont parfois devenus des sites semi-naturels intéressants.\n\nIls sont répartis en 3 catégories \n- Catégorie A : les terrils qui, pour des raisons d'aménagement du territoire et d'urbanisme, ou de protection de l'environnement, ou de classement comme site, ne peuvent pas être mis en exploitation;\n- Catégorie B, les terrils exploitables;\n- Catégorie C, les terrils qui semblent intéressants à exploiter, mais qui nécessitent des investigations complémentaires\n\nEn termes d'aménagement du territoire, certains terrils sont classés comme sites et, à ce titre, ne peuvent plus faire l'objet d'une quelconque exploitation (art. 345 et suivant du CWATUPE). Un terril peut être repris au plan de secteur dans le périmètre d'une zone d'habitat, d'une zone industrielle, d'une zone d'espace vert (dans certains cas, à rénover), ou de tout autre type de zone, selon la destination future du sol.\n\nL'inscription d'un terril en zone naturelle d'intérêt scientifique ou réserve naturelle ne permet pas l'exploitation. \n\nEn milieu urbain, la valorisation des terrils intègre les opérations de revitalisation urbaine et constitue un projet global de reconversion pour améliorer cadre de vie et activités économiques.\n\nLe présent jeu de données reprend l'emprise des terrils ayant une implication en terme d'aménagement et urbanisme. Il est issu du jeu de données \"Terrils\" de la DGO3 (SPW - DGO3 - DEE - DRIGM). Il a été retravaillé et les terrils ont été catégorisés en 2 classes :\n- Terrils majeurs : terrils de plus grande taille datant d'après la révolution industrielle;\n- Terrils mineurs : terrils de plus petite taille datant généralement d'avant la révolution industrielle.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données reprend l'emprise des terrils ayant une implication en terme d'aménagement du territoire et d'urbanisme.",
                  langfre:
                    "Cette couche de données reprend l'emprise des terrils ayant une implication en terme d'aménagement du territoire et d'urbanisme.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=TERRILS',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=TERRILS',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Terrils',
                      langfre:
                        'Application de consultation des données de la DGO4 - Terrils',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux terrils. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux terrils. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FTERRILS%2FMapServer%22%2C%22label%22%3A%22Terrils%20du%20point%20de%20vue%20am%C3%A9nagement%20et%20urbanisme%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FTERRILS%2FMapServer%22%2C%22label%22%3A%22Terrils%20du%20point%20de%20vue%20am%C3%A9nagement%20et%20urbanisme%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST de la couche de données relatives aux terrils à considérer en matière d'aménagement du territoire",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST de la couche de données relatives aux terrils à considérer en matière d'aménagement du territoire",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/TERRILS/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS de la couche de données relatives aux terrils à considérer en matière d'aménagement du territoire",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS de la couche de données relatives aux terrils à considérer en matière d'aménagement du territoire",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Sol_Sous-sol/TERRILS/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Sol_Sous-sol/TERRILS/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
                id: '1316',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '0c5c2f76-ee9c-40d3-a5d5-08a1f6ee94a5',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92/attachments/PRU.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Périmètres de remembrement urbain (PRU)',
                  langfre: 'Périmètres de remembrement urbain (PRU)',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données localise les périmètres de remembrement urbain en Région wallonne.\n\nLe périmètre de remembrement urbain (PRU) est une procédure d’urbanisme introduit par le Gouvernement wallon dans la Déclaration de Politique Régionale (décret du 1er juin 2006) et visant la redynamisation des villes. Il a pour objet de déterminer un périmètre, c’est-à-dire le contour d’une zone géographique susceptible de voir se réaliser un projet d'urbanisme. \n\nDans ce cadre, et tel que défini par le CWATUPE (art. 127, par.1er, 8°), le PRU vise \"tout projet d'urbanisme de requalification et de développement de fonctions urbaines [c'est-à-dire toute fonction qui peut s'implanter en zone d'habitat] qui nécessite la création, la modification, l'élargissement, la suppression ou le surplomb de la voirie par terre et d'escapes publics\".\n\nL’intérêt de la procédure de Périmètre de remembrement urbain consiste en une simplification administrative : \n— des modifications de limites entre domaine public et parcelles privées, notamment la création de nouvelles voiries; \n— de l'aspect non-contraignant des prescriptions d’affectation, de zonage et de gabarit d’un PCA, du plan de secteur, d'un RCU, etc. dans les limites du PRU ; \n— de remembrement ou de division de parcelles permettant de requalifier un site désaffecté ou en difficulté au sein d’une structure urbaine.\n\nCe périmètre est adopté par le Gouvernement, d'initiative ou sur proposition de la commune ou du fonctionnaire délégué et après enquête publique obligatoire, avis de la CCAT et du Collège Communal. Le projet d’urbanisme dans un PRU devra, en tous les cas, faire l’objet d’un permis d’urbanisme ou de permis uniques qui nécessitent une évaluation des incidences. Dans un PRU, les permis d’urbanisme ne peuvent plus être délivrés par la commune : ils sont traités par le fonctionnaire délégué de la Région wallonne (procédure du permis dit \"public\").\n\nLe Périmètre de remembrement urbain du site de l’ancienne Caserne Léopold à Namur et la reconversion du quartier de Droixhe à Liège peuvent être cités comme exemple de PRU.\n\nChaque PRU est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                  langfre:
                    "Cette couche de données localise les périmètres de remembrement urbain en Région wallonne.\n\nLe périmètre de remembrement urbain (PRU) est une procédure d’urbanisme introduit par le Gouvernement wallon dans la Déclaration de Politique Régionale (décret du 1er juin 2006) et visant la redynamisation des villes. Il a pour objet de déterminer un périmètre, c’est-à-dire le contour d’une zone géographique susceptible de voir se réaliser un projet d'urbanisme. \n\nDans ce cadre, et tel que défini par le CWATUPE (art. 127, par.1er, 8°), le PRU vise \"tout projet d'urbanisme de requalification et de développement de fonctions urbaines [c'est-à-dire toute fonction qui peut s'implanter en zone d'habitat] qui nécessite la création, la modification, l'élargissement, la suppression ou le surplomb de la voirie par terre et d'escapes publics\".\n\nL’intérêt de la procédure de Périmètre de remembrement urbain consiste en une simplification administrative : \n— des modifications de limites entre domaine public et parcelles privées, notamment la création de nouvelles voiries; \n— de l'aspect non-contraignant des prescriptions d’affectation, de zonage et de gabarit d’un PCA, du plan de secteur, d'un RCU, etc. dans les limites du PRU ; \n— de remembrement ou de division de parcelles permettant de requalifier un site désaffecté ou en difficulté au sein d’une structure urbaine.\n\nCe périmètre est adopté par le Gouvernement, d'initiative ou sur proposition de la commune ou du fonctionnaire délégué et après enquête publique obligatoire, avis de la CCAT et du Collège Communal. Le projet d’urbanisme dans un PRU devra, en tous les cas, faire l’objet d’un permis d’urbanisme ou de permis uniques qui nécessitent une évaluation des incidences. Dans un PRU, les permis d’urbanisme ne peuvent plus être délivrés par la commune : ils sont traités par le fonctionnaire délégué de la Région wallonne (procédure du permis dit \"public\").\n\nLe Périmètre de remembrement urbain du site de l’ancienne Caserne Léopold à Namur et la reconversion du quartier de Droixhe à Liège peuvent être cités comme exemple de PRU.\n\nChaque PRU est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette couche de données localise les périmètres de remembrement urbain en Région wallonne.',
                  langfre:
                    'Cette couche de données localise les périmètres de remembrement urbain en Région wallonne.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Périmètres de remembrement urbain (PRU) (2024-08-15) http://geodata.wallonie.be/id/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Périmètres de remembrement urbain (PRU) (2024-08-15) http://geodata.wallonie.be/id/d9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=RMBMT_URB',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=RMBMT_URB',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Périmètres de remembrement urbain',
                      langfre:
                        'Application de consultation des données de la DGO4 - Périmètres de remembrement urbain',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux périmètres de remembrement urbain . Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux périmètres de remembrement urbain . Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FRMBMT_URB%2FMapServer%22%2C%22label%22%3A%22P%C3%A9rim%C3%A8tres%20de%20remembrement%20urbain%20%28PRU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FRMBMT_URB%2FMapServer%22%2C%22label%22%3A%22P%C3%A9rim%C3%A8tres%20de%20remembrement%20urbain%20%28PRU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux périmètres de remembrement urbain.',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux périmètres de remembrement urbain.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/RMBMT_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux périmètres de remembrement urbain.',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux périmètres de remembrement urbain.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/op_renovation/RMBMT_URB/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/op_renovation/RMBMT_URB/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=RMBMT_URB',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=RMBMT_URB',
                    },
                    nameObject: {
                      default:
                        'Base de données des périmètres de remembrement urbain',
                      langfre:
                        'Base de données des périmètres de remembrement urbain',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des périmètres de remembrement urbain.',
                      langfre:
                        'Site permettant la recherche des périmètres de remembrement urbain.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
                id: '1296',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '14688', '0'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'd9d7e76d-3d38-4763-9fa3-5de1b6a0ca92',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/ddbdf8a3-bf0d-4739-98bd-6379c345ea14/attachments/pre_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Périmètres de reconnaissance économique (PRE)',
                  langfre: 'Périmètres de reconnaissance économique (PRE)',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données localise les périmètres de reconnaissance économique facilitant l'aménagement de la zone d'activités économiques.\n\nAfin de promouvoir les investissements privés et donc le développement économique et social, le Gouvernement wallon s'est doté, au cours de ces dernières décennies, de mesures liées à l'aménagement de zones spécifiques permettant la création d'infrastructures d’accueil pour les activités économiques. Les moyens de cette politique sont consacrés dans le décret du 11 mars 2004 plus communément appelé \"décret infrastructures\".\n\nL'objectif de ce décret est de permettre à certains opérateurs - principalement les pouvoirs publics (région, communes et intercommunales) - d'exproprier des espaces destinés à accueillir des activités économiques. Le décret prévoit également des aides et des financements permettant la réalisation de ces infrastructures. \n\nLes périmètres de reconnaissance économique (PRE) représentent la clé de voûte du décret \"Infrastructures\" étant donné qu'ils constituent le préalable nécessaire à la mise en œuvre des expropriations et des subsides. Ce n’est en effet qu’à l’intérieur de ces périmètres que ces outils trouveront à s’appliquer. En d'autres termes, Les PRE définissent les limites dans lesquels le décret est d'application. \n\nTels que défini à l'Article 1er bis du décret, \"Le PRE comprend la voirie, les terrains destinés à être incorporés à la voirie ainsi que les biens immobiliers destinés à accueillir des activités économiques, à favoriser leur implantation et leur accessibilité ou à permettre l'extension de l'implantation et de l'accessibilité des activités existantes afin de permettre d'y accueillir des activités économiques ou de favoriser leur implantation, notamment par la mise en commun ou à disposition de services ou activités.\". Anciennement, les PRE étaient connus comme les \"zones d'activités reconnues\" ou ZAR (la loi d'expansion économique de 1970).\n\nL’adoption d'un PRE facilite donc l'aménagement de la zone concernée. Outre les expropriations et l'octroi de certaines aides, l'adoption induit aussi des conséquences notables pour les communes en matière d'octroi des autorisations urbanistiques. L'adoption reste dévolue au Gouvernement wallon.\n\nChaque PRE est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                  langfre:
                    "Cette couche de données localise les périmètres de reconnaissance économique facilitant l'aménagement de la zone d'activités économiques.\n\nAfin de promouvoir les investissements privés et donc le développement économique et social, le Gouvernement wallon s'est doté, au cours de ces dernières décennies, de mesures liées à l'aménagement de zones spécifiques permettant la création d'infrastructures d’accueil pour les activités économiques. Les moyens de cette politique sont consacrés dans le décret du 11 mars 2004 plus communément appelé \"décret infrastructures\".\n\nL'objectif de ce décret est de permettre à certains opérateurs - principalement les pouvoirs publics (région, communes et intercommunales) - d'exproprier des espaces destinés à accueillir des activités économiques. Le décret prévoit également des aides et des financements permettant la réalisation de ces infrastructures. \n\nLes périmètres de reconnaissance économique (PRE) représentent la clé de voûte du décret \"Infrastructures\" étant donné qu'ils constituent le préalable nécessaire à la mise en œuvre des expropriations et des subsides. Ce n’est en effet qu’à l’intérieur de ces périmètres que ces outils trouveront à s’appliquer. En d'autres termes, Les PRE définissent les limites dans lesquels le décret est d'application. \n\nTels que défini à l'Article 1er bis du décret, \"Le PRE comprend la voirie, les terrains destinés à être incorporés à la voirie ainsi que les biens immobiliers destinés à accueillir des activités économiques, à favoriser leur implantation et leur accessibilité ou à permettre l'extension de l'implantation et de l'accessibilité des activités existantes afin de permettre d'y accueillir des activités économiques ou de favoriser leur implantation, notamment par la mise en commun ou à disposition de services ou activités.\". Anciennement, les PRE étaient connus comme les \"zones d'activités reconnues\" ou ZAR (la loi d'expansion économique de 1970).\n\nL’adoption d'un PRE facilite donc l'aménagement de la zone concernée. Outre les expropriations et l'octroi de certaines aides, l'adoption induit aussi des conséquences notables pour les communes en matière d'octroi des autorisations urbanistiques. L'adoption reste dévolue au Gouvernement wallon.\n\nChaque PRE est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque entité renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données localise les périmètres de reconnaissance économique facilitant l'aménagement de la zone d'activités économiques.",
                  langfre:
                    "Cette couche de données localise les périmètres de reconnaissance économique facilitant l'aménagement de la zone d'activités économiques.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: 'No limitations to public access',
                    langfre: 'No limitations to public access',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                MD_LegalConstraintsUseLimitationObject: [
                  {
                    default: "Conditions d'accès et d'utilisation spécifiques",
                    langfre: "Conditions d'accès et d'utilisation spécifiques",
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de donnée',
                      langfre: 'Légende de la couche de donnée',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de donnée',
                      langfre: 'Légende de la couche de donnée',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PRE',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PRE',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - PRE',
                      langfre:
                        'Application de consultation des données de la DGO4 - PRE',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux PRE. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux PRE. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPRE%2FMapServer%22%2C%22label%22%3A%22P%C3%A9rim%C3%A8tres%20de%20reconnaissance%20%C3%A9conomique%20%28PRE%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fddbdf8a3-bf0d-4739-98bd-6379c345ea14%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPRE%2FMapServer%22%2C%22label%22%3A%22P%C3%A9rim%C3%A8tres%20de%20reconnaissance%20%C3%A9conomique%20%28PRE%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fddbdf8a3-bf0d-4739-98bd-6379c345ea14%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Périmètres de reconnaissance économique.',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Périmètres de reconnaissance économique.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PRE/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux Périmètres de reconnaissance économique.',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux Périmètres de reconnaissance économique.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Zones_activites_eco/PRE/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Zones_activites_eco/PRE/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pre',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=pre',
                    },
                    nameObject: {
                      default:
                        'Base de données des périmètres de reconnaissance économique',
                      langfre:
                        'Base de données des périmètres de reconnaissance économique',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des Périmètres de reconnaissance économique.',
                      langfre:
                        'Site permettant la recherche des Périmètres de reconnaissance économique.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'https://wallex.wallonie.be/index.php?doc=3775',
                      langfre: 'https://wallex.wallonie.be/index.php?doc=3775',
                    },
                    nameObject: {
                      default: 'Décret Infrastructures',
                      langfre: 'Décret Infrastructures',
                    },
                    descriptionObject: {
                      default:
                        'Décret relatif aux infrastructures d’accueil des activités économiques du 11 mars 2004',
                      langfre:
                        'Décret relatif aux infrastructures d’accueil des activités économiques du 11 mars 2004',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
                id: '1295',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['1', '4', '14688', '0', '14683'],
                op6: ['25', '1', '4'],
                op5: ['1', '4', '14688', '0', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'ddbdf8a3-bf0d-4739-98bd-6379c345ea14',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/a25cdf65-d35b-4883-beaf-5f89713726db/attachments/IPIC.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/a25cdf65-d35b-4883-beaf-5f89713726db',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default:
                    'Patrimoine - Inventaire du Patrimoine Immobilier Culturel (IPIC)',
                  langfre:
                    'Patrimoine - Inventaire du Patrimoine Immobilier Culturel (IPIC)',
                },
                resourceAbstractObject: {
                  default:
                    "Le jeu de données reprend la localisation ainsi que la fiche d’identification des biens repris à l’Inventaire du Patrimoine Immobilier Culturel (IPIC), tel que défini par l’Art. 11 du Code wallon du Patrimoine (CoPat).\n\nL’IPIC est réalisé par une équipe d’historiens de l’art de l’Agence wallonne du Patrimoine (AWaP) et a pour objectifs la connaissance, la protection et la gestion des biens inscrits, ainsi que la sensibilisation du public. L'IPIC reprend des monuments (biens uniques ou multiples) ou des ensembles monumentaux (réunion de biens immobiliers). L'inscription d'un bien à l’IPIC lui reconnaît, lors de cette inscription, une qualité patrimoniale. L’attribution d’une pastille (•) à un bien inscrit lui reconnaît une qualité patrimoniale dont la pérennisation est souhaitée. Un bien inscrit à l’IPIC et pastillé est soumis à l’avis simple de l’AWaP et de la commission royale des Monuments, Sites et Fouilles lorsqu’il y a permis d’urbanisme.\n\nL'IPIC constitue un support de recherches privilégié pour les acteurs de l'urbanisme (à l'échelle communale et régionale), les architectes et les particuliers.\n\nChaque bien est identifié de manière unique (code unique), permettant ainsi la liaison entre les éléments cartographiés et la base de données documentaire reprenant les informations relatives au bien, ainsi qu’une illustration (au minimum) contemporaine de son inscription à l’IPIC.\n\nCette base de données « Patrimoine – Inventaire du Patrimoine Immobilier Culturel » constitue le dernier état des biens inscrits, et remplace les anciennes publications papier. Il est à noter que la version papier reste la version de référence pour les communes non mises à jour. Si le bien consulté bénéficie d’un niveau de protection supérieur en plus d’être inscrit à l’IPIC, un lien permet une redirection vers les bases de données « Patrimoine – Biens classés et Zones de protection », « Patrimoine – Biens exceptionnels » ou « Patrimoine – Biens mondiaux ».\n\nMise en garde à l’intention de l’utilisateur :\nPar le biais de la consultation de la cartographie, seuls les biens des communes mises à jour – c’est-à-dire actualisées après 1998 (cf. généalogie de la donnée) –, ainsi que les biens pastillés (•), actualisés ou non, sont identifiables, car disposant d’une représentation graphique sur les parcelles cadastrales, au contraire des biens des communes non encore actualisées, dont la consultation n’est possible que via la base de données documentaire. Cette dernière fait systématiquement apparaître le dernier état du bien inscrit. L’éventuel historique de son inscription à l’IPIC reste toutefois visualisable par le biais de liens.",
                  langfre:
                    "Le jeu de données reprend la localisation ainsi que la fiche d’identification des biens repris à l’Inventaire du Patrimoine Immobilier Culturel (IPIC), tel que défini par l’Art. 11 du Code wallon du Patrimoine (CoPat).\n\nL’IPIC est réalisé par une équipe d’historiens de l’art de l’Agence wallonne du Patrimoine (AWaP) et a pour objectifs la connaissance, la protection et la gestion des biens inscrits, ainsi que la sensibilisation du public. L'IPIC reprend des monuments (biens uniques ou multiples) ou des ensembles monumentaux (réunion de biens immobiliers). L'inscription d'un bien à l’IPIC lui reconnaît, lors de cette inscription, une qualité patrimoniale. L’attribution d’une pastille (•) à un bien inscrit lui reconnaît une qualité patrimoniale dont la pérennisation est souhaitée. Un bien inscrit à l’IPIC et pastillé est soumis à l’avis simple de l’AWaP et de la commission royale des Monuments, Sites et Fouilles lorsqu’il y a permis d’urbanisme.\n\nL'IPIC constitue un support de recherches privilégié pour les acteurs de l'urbanisme (à l'échelle communale et régionale), les architectes et les particuliers.\n\nChaque bien est identifié de manière unique (code unique), permettant ainsi la liaison entre les éléments cartographiés et la base de données documentaire reprenant les informations relatives au bien, ainsi qu’une illustration (au minimum) contemporaine de son inscription à l’IPIC.\n\nCette base de données « Patrimoine – Inventaire du Patrimoine Immobilier Culturel » constitue le dernier état des biens inscrits, et remplace les anciennes publications papier. Il est à noter que la version papier reste la version de référence pour les communes non mises à jour. Si le bien consulté bénéficie d’un niveau de protection supérieur en plus d’être inscrit à l’IPIC, un lien permet une redirection vers les bases de données « Patrimoine – Biens classés et Zones de protection », « Patrimoine – Biens exceptionnels » ou « Patrimoine – Biens mondiaux ».\n\nMise en garde à l’intention de l’utilisateur :\nPar le biais de la consultation de la cartographie, seuls les biens des communes mises à jour – c’est-à-dire actualisées après 1998 (cf. généalogie de la donnée) –, ainsi que les biens pastillés (•), actualisés ou non, sont identifiables, car disposant d’une représentation graphique sur les parcelles cadastrales, au contraire des biens des communes non encore actualisées, dont la consultation n’est possible que via la base de données documentaire. Cette dernière fait systématiquement apparaître le dernier état du bien inscrit. L’éventuel historique de son inscription à l’IPIC reste toutefois visualisable par le biais de liens.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Le jeu de données reprend la localisation ainsi que la fiche d’identification des biens repris à l’Inventaire du Patrimoine Immobilier Culturel (IPIC), tel que défini par l’Art.',
                  langfre:
                    'Le jeu de données reprend la localisation ainsi que la fiche d’identification des biens repris à l’Inventaire du Patrimoine Immobilier Culturel (IPIC), tel que défini par l’Art.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=IPIC',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=IPIC',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données TLPE - IPIC',
                      langfre:
                        'Application de consultation des données TLPE - IPIC',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives à l'Inventaire du Patrimoine Immobilier Culturel. Cette application constitue un thème de l'application de consultation des données TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives à l'Inventaire du Patrimoine Immobilier Culturel. Cette application constitue un thème de l'application de consultation des données TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FIPIC%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Inventaire%20du%20Patrimoine%20Immobilier%20Culturel%20%28IPIC%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fa25cdf65-d35b-4883-beaf-5f89713726db%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FIPIC%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Inventaire%20du%20Patrimoine%20Immobilier%20Culturel%20%28IPIC%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fa25cdf65-d35b-4883-beaf-5f89713726db%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Communes en décentralisation',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Communes en décentralisation',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/IPIC/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS de la DGO4 des couches relatives à l'inventaire du patrimoine culturel immobilier.",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS de la DGO4 des couches relatives à l'inventaire du patrimoine culturel immobilier.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Patrimoine/IPIC/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Patrimoine/IPIC/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_ipic/index.php/presentation/index',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_ipic/index.php/presentation/index',
                    },
                    nameObject: {
                      default: 'IPIC - Site Internet',
                      langfre: 'IPIC - Site Internet',
                    },
                    descriptionObject: {
                      default:
                        "Site Internet TLPE dédié à l'inventaire du patrimoine culturel immobilier. Une cartographie des communes actualisées est disponible.",
                      langfre:
                        "Site Internet TLPE dédié à l'inventaire du patrimoine culturel immobilier. Une cartographie des communes actualisées est disponible.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'a25cdf65-d35b-4883-beaf-5f89713726db',
                id: '1269',
                groupOwner: '4',
                op0: ['1', '25', '4', '14684', '14688', '0', '14683'],
                op2: ['1', '25', '4'],
                op1: ['1', '25', '4', '14688', '0', '14683'],
                op3: ['1', '25', '4', '0', '14688', '14683'],
                op6: ['1', '25', '4'],
                op5: ['1', '25', '4', '0', '14688', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'a25cdf65-d35b-4883-beaf-5f89713726db',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/1c28dcd9-5306-4346-8877-a06fc560ba65/attachments/revit_urbaine.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/1c28dcd9-5306-4346-8877-a06fc560ba65',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Revitalisation urbaine',
                  langfre: 'Revitalisation urbaine',
                },
                resourceAbstractObject: {
                  default:
                    "Ce jeu de données reprend les périmètre où sont menées des opérations de revitalisation urbaine incitant l'investissement privé dans les centres urbains.\n\nLe concept de revitalisation urbaine a été concrétisé au début des années 90. Comme la rénovation urbaine, la revitalisation vise aussi la requalification des centres urbains par des interventions en matière de logement et d’espaces publics. Néanmoins, il s'agit d'opérations plus ciblées et plus ponctuelles. \n\nLa revitalisation urbaine est née du constat que les promoteurs privés préfèrent investir dans le logement en dehors des centres urbains ou qu’ils hésitent à y investir car les rendements financiers des opérations seraient plus faibles ou plus incertains. Les opérations de revitalisation au sein de ces périmètres sont définis par le CWATUPE comme \"visant à l’amélioration et au développement intégré de l’habitat, en ce compris les fonctions de commerce et de service, par la mise en œuvre de conventions associant la commune et le secteur privé\" (CWATUPE - art.172). Il s’agit en fait d’inciter l’investissement privé à opter pour une localisation urbaine plutôt que suburbaine. \n\nL’objectif fondamental de la revitalisation des centres urbains est donc de permettre à des communes de passer des accords avec des investisseurs privés aux termes desquels, si l’investisseur accepte de localiser son investissement en milieu urbain, la commune prend l’engagement de réaliser un certain nombre de travaux visant à l’amélioration générale du cadre environnant l’investissement. La région prend à sa charge les dépenses exposées par la commune.\n\nLes périmètres où se réalisent des opérations de revitalisation urbaine font l'objet de ce jeu de données. Chaque périmètre est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque périmètre renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                  langfre:
                    "Ce jeu de données reprend les périmètre où sont menées des opérations de revitalisation urbaine incitant l'investissement privé dans les centres urbains.\n\nLe concept de revitalisation urbaine a été concrétisé au début des années 90. Comme la rénovation urbaine, la revitalisation vise aussi la requalification des centres urbains par des interventions en matière de logement et d’espaces publics. Néanmoins, il s'agit d'opérations plus ciblées et plus ponctuelles. \n\nLa revitalisation urbaine est née du constat que les promoteurs privés préfèrent investir dans le logement en dehors des centres urbains ou qu’ils hésitent à y investir car les rendements financiers des opérations seraient plus faibles ou plus incertains. Les opérations de revitalisation au sein de ces périmètres sont définis par le CWATUPE comme \"visant à l’amélioration et au développement intégré de l’habitat, en ce compris les fonctions de commerce et de service, par la mise en œuvre de conventions associant la commune et le secteur privé\" (CWATUPE - art.172). Il s’agit en fait d’inciter l’investissement privé à opter pour une localisation urbaine plutôt que suburbaine. \n\nL’objectif fondamental de la revitalisation des centres urbains est donc de permettre à des communes de passer des accords avec des investisseurs privés aux termes desquels, si l’investisseur accepte de localiser son investissement en milieu urbain, la commune prend l’engagement de réaliser un certain nombre de travaux visant à l’amélioration générale du cadre environnant l’investissement. La région prend à sa charge les dépenses exposées par la commune.\n\nLes périmètres où se réalisent des opérations de revitalisation urbaine font l'objet de ce jeu de données. Chaque périmètre est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque périmètre renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Ce jeu de données reprend les périmètre où sont menées des opérations de revitalisation urbaine incitant l'investissement privé dans les centres urbains.",
                  langfre:
                    "Ce jeu de données reprend les périmètre où sont menées des opérations de revitalisation urbaine incitant l'investissement privé dans les centres urbains.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Revitalisation urbaine (2024-08-15) http://geodata.wallonie.be/id/1c28dcd9-5306-4346-8877-a06fc560ba65',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Revitalisation urbaine (2024-08-15) http://geodata.wallonie.be/id/1c28dcd9-5306-4346-8877-a06fc560ba65',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=REVIT_URB',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=REVIT_URB',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Revitalisation urbaine',
                      langfre:
                        'Application de consultation des données de la DGO4 - Revitalisation urbaine',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux revitalisations urbaines. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux revitalisations urbaines. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FREVIT_URB%2FMapServer%22%2C%22label%22%3A%22Revitalisation%20urbaine%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F1c28dcd9-5306-4346-8877-a06fc560ba65%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FREVIT_URB%2FMapServer%22%2C%22label%22%3A%22Revitalisation%20urbaine%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F1c28dcd9-5306-4346-8877-a06fc560ba65%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux périmètres concernés par la revitalisation urbaine.',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux périmètres concernés par la revitalisation urbaine.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/REVIT_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux périmètres concernés par la revitalisation urbaine.',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux périmètres concernés par la revitalisation urbaine.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/op_renovation/REVIT_URB/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/op_renovation/REVIT_URB/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=revit_urb',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=revit_urb',
                    },
                    nameObject: {
                      default:
                        'Base de données des sites concernés par la revitalisation urbaine',
                      langfre:
                        'Base de données des sites concernés par la revitalisation urbaine',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des périmètres concernés par la revitalisation urbaine.',
                      langfre:
                        'Site permettant la recherche des périmètres concernés par la revitalisation urbaine.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/tinymvc/myfiles/views/documents/publications/horscollections/renover_revitaliser.pdf',
                      langfre:
                        'http://spw.wallonie.be/dgo4/tinymvc/myfiles/views/documents/publications/horscollections/renover_revitaliser.pdf',
                    },
                    nameObject: {
                      default:
                        'Vade-mecum de la rénovation et de la revitalisation urbaines',
                      langfre:
                        'Vade-mecum de la rénovation et de la revitalisation urbaines',
                    },
                    descriptionObject: {
                      default:
                        'Rénover et revitaliser les centres urbains en Wallonie - CREAT (Centre d’Etudes en Aménagement du Territoire) - UCL. Financement SPW-DGO4 - 2010.',
                      langfre:
                        'Rénover et revitaliser les centres urbains en Wallonie - CREAT (Centre d’Etudes en Aménagement du Territoire) - UCL. Financement SPW-DGO4 - 2010.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '1c28dcd9-5306-4346-8877-a06fc560ba65',
                id: '1311',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688', '14683'],
                op3: ['25', '1', '4', '0', '14688', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '1c28dcd9-5306-4346-8877-a06fc560ba65',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/8e2cf269-cedb-4fbe-943b-41a7587490e3/attachments/sar.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/8e2cf269-cedb-4fbe-943b-41a7587490e3',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Sites à réaménager de droit (SAR)',
                  langfre: 'Sites à réaménager de droit (SAR)',
                },
                resourceAbstractObject: {
                  default:
                    "Ce jeu de données reprend les périmètres des sites identifiés comme à réaménager, c'est-à-dire devant être assaini, réhabilité, rénové ou reconstruit.\n et bénéficiant d'un arrêté de réaménagement (SAR de droit).\n\nLe régime des \"sites à réaménager\" vise le réaménagement de biens ou ensemble de biens immobiliers qui ont été ou sont destinés à accueillir des activités (autres que le logement) et dont l’état actuel est contraire au bon aménagement des lieux ou qui constituent une déstructuration du tissu urbanisé. De ce fait, il pourra s’agir de sites d’activité économique (SAED) mais également de sites affectés à des activités sociales telles que des écoles, des hôpitaux, des installations sportives ou culturelles telles que des théâtres et des cinémas ou encore des installations à caractère public ou à destination publique telles que des centrales électriques, des infrastructures de transport, des services de pompiers ainsi que des sites ayant accueilli plusieurs fonctions simultanément ou successivement. En l'état, ces sites sont souvent abandonnés le long des voies de chemins de fer ou des cours d’eau comportent un grand intérêt pour les investisseurs économiques, ils sont extrêmement bien situés.\n\nLe régime SAR a pour objet la réalisation d’actes et de travaux de réaménagement comprenant l’assainissement (au sens du décret relatif à la gestion des sols), la réhabilitation, la rénovation, la construction ou la reconstruction, notions définies par l’arrêté du Gouvernement wallon du 14 mars 2008 relatif aux sites à réaménager, remplaçant les articles 453 à 470 du CWATUPE. Dans ce cadre, le périmètre d’un site à réaménager vise à assainir plus facilement des terrains en vue d’améliorer le cadre de vie dans les zones propices. La demande de reconnaissance d’un périmètre SAR peut être initiée par la Commune, par un autre organisme d’utilité publique ou par le/les propriétaire(s).\n\nLa notion de site à réaménager a remplacé l’ancienne notion de site d’activité économique désaffecté (SAED).\n\nChaque périmètre à réaménager est identifié de manière unique et est cartographié selon le type d'arrêté ministériel. Cela peut être un arrêté constatant et précisant la désaffectation, la rénovation, la réhabilitation. Il peut s'agir d'un arrêté provisoire ou définitif (arrêtant définitivement le périmètre du SAR). En outre, une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque périmètre renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                  langfre:
                    "Ce jeu de données reprend les périmètres des sites identifiés comme à réaménager, c'est-à-dire devant être assaini, réhabilité, rénové ou reconstruit.\n et bénéficiant d'un arrêté de réaménagement (SAR de droit).\n\nLe régime des \"sites à réaménager\" vise le réaménagement de biens ou ensemble de biens immobiliers qui ont été ou sont destinés à accueillir des activités (autres que le logement) et dont l’état actuel est contraire au bon aménagement des lieux ou qui constituent une déstructuration du tissu urbanisé. De ce fait, il pourra s’agir de sites d’activité économique (SAED) mais également de sites affectés à des activités sociales telles que des écoles, des hôpitaux, des installations sportives ou culturelles telles que des théâtres et des cinémas ou encore des installations à caractère public ou à destination publique telles que des centrales électriques, des infrastructures de transport, des services de pompiers ainsi que des sites ayant accueilli plusieurs fonctions simultanément ou successivement. En l'état, ces sites sont souvent abandonnés le long des voies de chemins de fer ou des cours d’eau comportent un grand intérêt pour les investisseurs économiques, ils sont extrêmement bien situés.\n\nLe régime SAR a pour objet la réalisation d’actes et de travaux de réaménagement comprenant l’assainissement (au sens du décret relatif à la gestion des sols), la réhabilitation, la rénovation, la construction ou la reconstruction, notions définies par l’arrêté du Gouvernement wallon du 14 mars 2008 relatif aux sites à réaménager, remplaçant les articles 453 à 470 du CWATUPE. Dans ce cadre, le périmètre d’un site à réaménager vise à assainir plus facilement des terrains en vue d’améliorer le cadre de vie dans les zones propices. La demande de reconnaissance d’un périmètre SAR peut être initiée par la Commune, par un autre organisme d’utilité publique ou par le/les propriétaire(s).\n\nLa notion de site à réaménager a remplacé l’ancienne notion de site d’activité économique désaffecté (SAED).\n\nChaque périmètre à réaménager est identifié de manière unique et est cartographié selon le type d'arrêté ministériel. Cela peut être un arrêté constatant et précisant la désaffectation, la rénovation, la réhabilitation. Il peut s'agir d'un arrêté provisoire ou définitif (arrêtant définitivement le périmètre du SAR). En outre, une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque périmètre renvoie vers une application permettant de disposer d'informations complémentaires sur le périmètre en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Ce jeu de données reprend les périmètres des sites identifiés comme à réaménager, c'est-à-dire devant être assaini, réhabilité, rénové ou reconstruit.",
                  langfre:
                    "Ce jeu de données reprend les périmètres des sites identifiés comme à réaménager, c'est-à-dire devant être assaini, réhabilité, rénové ou reconstruit.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Sites à réaménager de droit (SAR) (2024-11-25) http://geodata.wallonie.be/id/8e2cf269-cedb-4fbe-943b-41a7587490e3',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Sites à réaménager de droit (SAR) (2024-11-25) http://geodata.wallonie.be/id/8e2cf269-cedb-4fbe-943b-41a7587490e3',
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SAR',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SAR',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - SAR',
                      langfre:
                        'Application de consultation des données de la DGO4 - SAR',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux SAR. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux SAR. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSAR%2FMapServer%22%2C%22label%22%3A%22Sites%20%C3%A0%20r%C3%A9am%C3%A9nager%20de%20droit%20%28SAR%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F8e2cf269-cedb-4fbe-943b-41a7587490e3%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSAR%2FMapServer%22%2C%22label%22%3A%22Sites%20%C3%A0%20r%C3%A9am%C3%A9nager%20de%20droit%20%28SAR%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F8e2cf269-cedb-4fbe-943b-41a7587490e3%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites à réaménager.',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites à réaménager.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SAR/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux sites à réaménager.',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux sites à réaménager.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Op_renovation/SAR/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Op_renovation/SAR/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=SAR',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=SAR',
                    },
                    nameObject: {
                      default: 'Base de données des sites à réaménager',
                      langfre: 'Base de données des sites à réaménager',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des sites à réaménager.',
                      langfre:
                        'Site permettant la recherche des sites à réaménager.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '8e2cf269-cedb-4fbe-943b-41a7587490e3',
                id: '1308',
                groupOwner: '4',
                op0: ['1', '25', '4', '14684', '14688', '0', '14683'],
                op2: ['1', '25', '4'],
                op1: ['1', '25', '4', '14688', '0', '14683'],
                op3: ['1', '25', '4', '14688', '0', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '8e2cf269-cedb-4fbe-943b-41a7587490e3',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/4ed33135-c29a-4a92-abff-cfc69a24c350/attachments/GRU_update2.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4ed33135-c29a-4a92-abff-cfc69a24c350',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: "Guide Régional d'Urbanisme (GRU)",
                  langfre: "Guide Régional d'Urbanisme (GRU)",
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales des Règlements du CWATUP transposés dans le Guide Régional d'Urbanisme (GRU) du CoDT.\n\nLe Code du développement territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie.\n\nDans ce cadre, le Guide Régional d'Urbanisme (GRU) devient le seul outil d'orientation en matière d'urbanisme à l'échelle régionale. Il est adopté par le Gouvernement wallon et décline, pour la Wallonie ou pour une partie de son territoire dont il fixe les limites, les objectifs de développement du territoire du schéma de développement du territoire en objectifs d’urbanisme, par des indications et des normes, en tenant compte, le cas échéant, des spécificités du ou des territoires sur lesquels il porte [...] (CoDT - Art. D.III.1).\n\nLe GRU regroupe donc des normes (valeur réglementaire) et des indications (valeur indicative) urbanistiques dans un document unique. Il permet de faciliter la requalification des centres de villes et de villages, de développer des projets architecturaux contemporains et de permettre aux villes et villages wallons de conserver leurs qualités et leurs identités propres.\n\nLe GRU compile les informations qui figuraient dans les documents suivants au sens du CWATUP :\n- Le Règlement général sur les bâtisses en site rural (RGBSR) qui a désormais valeur indicative;\n- Le Règlement général d'urbanisme relatif aux enseignes et aux dispositifs de publicité (RGUEDP) qui a désormais valeur indicative;\n- Le Règlement général sur les bâtisses applicables aux zones protégées de certaines communes en matière d'urbanisme (RGBZPU). Une partie du règlement présente désormais une valeur indicative (correspondant aux articles 395, 396, 397, 399, 400 et 402 du CWATUP). Par contre, l’autre garde une valeur réglementaire (correspondant aux articles 393, 394, 398, 401 et 403 du CWATUP);\n- Le Règlement général sur les bâtisses relatif à l’accessibilité et à l’usage des espaces et bâtiments ou parties de bâtiments ouverts au public ou à usage collectif par les personnes à mobilité réduite (RGBPMR – article 414 et s. du CWATUP), qui conserve une valeur réglementaire;\n- Le Règlement d’urbanisme sur la qualité acoustique de constructions dans les zones B, C et D des plans de développement à long terme des aéroports de Liège-Bierset et de Charleroi-Bruxelles Sud (RUQAC - qualité acoustique-aéroports), dont la valeur réglementaire est maintenue.\n\nPour le dernier, la SOWAER doit être consultée.\n\nAu niveau cartographique, la série de couches de données du GRU regroupe, en plus des anciens règlements déjà cités, une couche reprenant les nouveaux dossiers relatifs au GRU. Elle se compose donc des couche suivantes :\n- GRU - Guide Régional d'Urbanisme\n- GRU - Accès aux personnes à mobilité réduite\n- GRU - Enseignes et dispositifs de publicité\n- GRU - Qualité acoustique des constructions\n- GRU - Règlement Général sur les Bâtisses en Site Rural\n- GRU - Zones Protégées en matière d'Urbanisme",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales des Règlements du CWATUP transposés dans le Guide Régional d'Urbanisme (GRU) du CoDT.\n\nLe Code du développement territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie.\n\nDans ce cadre, le Guide Régional d'Urbanisme (GRU) devient le seul outil d'orientation en matière d'urbanisme à l'échelle régionale. Il est adopté par le Gouvernement wallon et décline, pour la Wallonie ou pour une partie de son territoire dont il fixe les limites, les objectifs de développement du territoire du schéma de développement du territoire en objectifs d’urbanisme, par des indications et des normes, en tenant compte, le cas échéant, des spécificités du ou des territoires sur lesquels il porte [...] (CoDT - Art. D.III.1).\n\nLe GRU regroupe donc des normes (valeur réglementaire) et des indications (valeur indicative) urbanistiques dans un document unique. Il permet de faciliter la requalification des centres de villes et de villages, de développer des projets architecturaux contemporains et de permettre aux villes et villages wallons de conserver leurs qualités et leurs identités propres.\n\nLe GRU compile les informations qui figuraient dans les documents suivants au sens du CWATUP :\n- Le Règlement général sur les bâtisses en site rural (RGBSR) qui a désormais valeur indicative;\n- Le Règlement général d'urbanisme relatif aux enseignes et aux dispositifs de publicité (RGUEDP) qui a désormais valeur indicative;\n- Le Règlement général sur les bâtisses applicables aux zones protégées de certaines communes en matière d'urbanisme (RGBZPU). Une partie du règlement présente désormais une valeur indicative (correspondant aux articles 395, 396, 397, 399, 400 et 402 du CWATUP). Par contre, l’autre garde une valeur réglementaire (correspondant aux articles 393, 394, 398, 401 et 403 du CWATUP);\n- Le Règlement général sur les bâtisses relatif à l’accessibilité et à l’usage des espaces et bâtiments ou parties de bâtiments ouverts au public ou à usage collectif par les personnes à mobilité réduite (RGBPMR – article 414 et s. du CWATUP), qui conserve une valeur réglementaire;\n- Le Règlement d’urbanisme sur la qualité acoustique de constructions dans les zones B, C et D des plans de développement à long terme des aéroports de Liège-Bierset et de Charleroi-Bruxelles Sud (RUQAC - qualité acoustique-aéroports), dont la valeur réglementaire est maintenue.\n\nPour le dernier, la SOWAER doit être consultée.\n\nAu niveau cartographique, la série de couches de données du GRU regroupe, en plus des anciens règlements déjà cités, une couche reprenant les nouveaux dossiers relatifs au GRU. Elle se compose donc des couche suivantes :\n- GRU - Guide Régional d'Urbanisme\n- GRU - Accès aux personnes à mobilité réduite\n- GRU - Enseignes et dispositifs de publicité\n- GRU - Qualité acoustique des constructions\n- GRU - Règlement Général sur les Bâtisses en Site Rural\n- GRU - Zones Protégées en matière d'Urbanisme",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales des Règlements du CWATUP transposés dans le Guide Régional d'Urbanisme (GRU) du CoDT.",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales des Règlements du CWATUP transposés dans le Guide Régional d'Urbanisme (GRU) du CoDT.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                MD_LegalConstraintsUseLimitationObject: [
                  {
                    default: "Conditions d'accès et d'utilisation spécifiques",
                    langfre: "Conditions d'accès et d'utilisation spécifiques",
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default:
                        "Légende des données relatives aux Guides régionaux d'Urbanisme",
                      langfre:
                        "Légende des données relatives aux Guides régionaux d'Urbanisme",
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=GRU',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=GRU',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - GRU',
                      langfre:
                        'Application de consultation des données de la DGO4 - GRU',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux GRU. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux GRU. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FGRU%2FMapServer%22%2C%22label%22%3A%22Guide%20R%C3%A9gional%20d%27Urbanisme%20%28GRU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4ed33135-c29a-4a92-abff-cfc69a24c350%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FGRU%2FMapServer%22%2C%22label%22%3A%22Guide%20R%C3%A9gional%20d%27Urbanisme%20%28GRU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4ed33135-c29a-4a92-abff-cfc69a24c350%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Guides généraux d'Urbanisme",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Guides généraux d'Urbanisme",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/GRU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Guides généraux d'Urbanisme",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Guides généraux d'Urbanisme",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Amenagement/Reglements/RRU/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Amenagement/Reglements/RRU/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default:
                        "Accès en téléchargement direct des couches de données constitutives des Guides généraux d'Urbanisme",
                      langfre:
                        "Accès en téléchargement direct des couches de données constitutives des Guides généraux d'Urbanisme",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                    },
                    nameObject: {
                      default: 'Base de données des GRU',
                      langfre: 'Base de données des GRU',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Guides généraux d'Urbanisme",
                      langfre:
                        "Site permettant la recherche des Guides généraux d'Urbanisme",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'https://codt.wallonie.be/',
                      langfre: 'https://codt.wallonie.be/',
                    },
                    nameObject: {
                      default: "CoDT - Toute l'information",
                      langfre: "CoDT - Toute l'information",
                    },
                    descriptionObject: {
                      default:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                      langfre:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '4ed33135-c29a-4a92-abff-cfc69a24c350',
                id: '1611',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['25', '1', '4', '0', '14688', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '4ed33135-c29a-4a92-abff-cfc69a24c350',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/ad86502d-8371-408e-880a-777dcce65e24/attachments/Renov_Urb.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/ad86502d-8371-408e-880a-777dcce65e24',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Rénovation urbaine',
                  langfre: 'Rénovation urbaine',
                },
                resourceAbstractObject: {
                  default:
                    "Ce jeu de données reprend les zones urbaines où sont menées des opérations de rénovation urbaine visant à y insuffler une nouvelle dynamique de développement.\n\nLa rénovation urbaine existe en Région wallonne depuis le début des années 70. Il s'agit d'une opération ayant pour ambition de tenter de fournir une réponse aux situations urbaines dégradées, tant d’un point de vue urbanistique que socio-économique. Elle peut intervenir dans des contextes diversifiés et selon le degré de dégradation. Généralement, l’opération vise à redynamiser le quartier en déclin grâce à un projet global d’urbanisme regroupant dans une vision d’ensemble plusieurs interventions concernant tant le bâti que les espaces publics. Le plus souvent, l’opération se déroule sur plusieurs années. Pour les quartiers les plus problématiques, la Région wallonne a défini les zones d’initiatives privilégiées (ZIP), où l’opération comporte parallèlement une approche sociale et où le taux de subvention est majoré. \n\nLa rénovation urbaine est régie par l’article 173 du CWATUPE. Il est complété par des dispositions de l'arrêté du Gouvernement wallon du 28 février 2013 relatif à l'octroi par la Région wallonne de subventions pour l'exécution d'opérations de rénovation urbaine (M.B. 02.04.2013).\n\nLa rénovation urbaine est une opération d'initiative communale qui consiste à :\n- Restructurer, assainir ou réhabiliter un périmètre;\n- Améliorer ou maintenir l'habitat existant (en favorisant le maintien ou le développement de la population locale);\n- Renforcer les dynamiques socio-économiques et culturelles;\n- Respecter des caractéristiques culturelles et architecturales propres au quartier;\n- S'inscrire dans une perspective globale d'aménagement du territoire\n\nChaque quartier concerné par la rénovation urbaine est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur la zone en question.",
                  langfre:
                    "Ce jeu de données reprend les zones urbaines où sont menées des opérations de rénovation urbaine visant à y insuffler une nouvelle dynamique de développement.\n\nLa rénovation urbaine existe en Région wallonne depuis le début des années 70. Il s'agit d'une opération ayant pour ambition de tenter de fournir une réponse aux situations urbaines dégradées, tant d’un point de vue urbanistique que socio-économique. Elle peut intervenir dans des contextes diversifiés et selon le degré de dégradation. Généralement, l’opération vise à redynamiser le quartier en déclin grâce à un projet global d’urbanisme regroupant dans une vision d’ensemble plusieurs interventions concernant tant le bâti que les espaces publics. Le plus souvent, l’opération se déroule sur plusieurs années. Pour les quartiers les plus problématiques, la Région wallonne a défini les zones d’initiatives privilégiées (ZIP), où l’opération comporte parallèlement une approche sociale et où le taux de subvention est majoré. \n\nLa rénovation urbaine est régie par l’article 173 du CWATUPE. Il est complété par des dispositions de l'arrêté du Gouvernement wallon du 28 février 2013 relatif à l'octroi par la Région wallonne de subventions pour l'exécution d'opérations de rénovation urbaine (M.B. 02.04.2013).\n\nLa rénovation urbaine est une opération d'initiative communale qui consiste à :\n- Restructurer, assainir ou réhabiliter un périmètre;\n- Améliorer ou maintenir l'habitat existant (en favorisant le maintien ou le développement de la population locale);\n- Renforcer les dynamiques socio-économiques et culturelles;\n- Respecter des caractéristiques culturelles et architecturales propres au quartier;\n- S'inscrire dans une perspective globale d'aménagement du territoire\n\nChaque quartier concerné par la rénovation urbaine est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur la zone en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Ce jeu de données reprend les zones urbaines où sont menées des opérations de rénovation urbaine visant à y insuffler une nouvelle dynamique de développement.',
                  langfre:
                    'Ce jeu de données reprend les zones urbaines où sont menées des opérations de rénovation urbaine visant à y insuffler une nouvelle dynamique de développement.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Rénovation urbaine (2024-11-12) http://geodata.wallonie.be/id/ad86502d-8371-408e-880a-777dcce65e24',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Rénovation urbaine (2024-11-12) http://geodata.wallonie.be/id/ad86502d-8371-408e-880a-777dcce65e24',
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=RENOV_URB',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=RENOV_URB',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Rénovations urbaines',
                      langfre:
                        'Application de consultation des données de la DGO4 - Rénovations urbaines',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux rénovations urbaines. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux rénovations urbaines. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7b%22serviceId%22%3a%22%22%2c%22toLoad%22%3atrue%2c%22visible%22%3atrue%2c%22url%22%3a%22https%3a%2f%2fgeoservices.wallonie.be%2farcgis%2frest%2fservices%2fAMENAGEMENT_TERRITOIRE%2fRENOV_URB%2fMapServer%2f%22%2c%22label%22%3a%22Ples%20d%2019Urgence%20Sociale%22%2c%22type%22%3a%22AGS_DYNAMIC%22%2c%22metadataUrl%22%3a%22https%3a%2f%2fgeoportail.wallonie.be%2fcatalogue%2f0466f660-9859-4e5d-934f-437074e0d607.html%22%7d%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7b%22serviceId%22%3a%22%22%2c%22toLoad%22%3atrue%2c%22visible%22%3atrue%2c%22url%22%3a%22https%3a%2f%2fgeoservices.wallonie.be%2farcgis%2frest%2fservices%2fAMENAGEMENT_TERRITOIRE%2fRENOV_URB%2fMapServer%2f%22%2c%22label%22%3a%22Ples%20d%2019Urgence%20Sociale%22%2c%22type%22%3a%22AGS_DYNAMIC%22%2c%22metadataUrl%22%3a%22https%3a%2f%2fgeoportail.wallonie.be%2fcatalogue%2f0466f660-9859-4e5d-934f-437074e0d607.html%22%7d%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux zones concernées par des rénovations urbaines.',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux zones concernées par des rénovations urbaines.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/RENOV_URB/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux zones concernées par des rénovations urbaines.',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux zones concernées par des rénovations urbaines.',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/op_renovation/RENOV_URB/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/op_renovation/RENOV_URB/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=renov_urb',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=renov_urb',
                    },
                    nameObject: {
                      default:
                        'Base de données des sites concernés par les rénovations urbaines',
                      langfre:
                        'Base de données des sites concernés par les rénovations urbaines',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des zones concernées par des rénovations urbaines.',
                      langfre:
                        'Site permettant la recherche des zones concernées par des rénovations urbaines.',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/tinymvc/myfiles/views/documents/publications/horscollections/renover_revitaliser.pdf',
                      langfre:
                        'http://spw.wallonie.be/dgo4/tinymvc/myfiles/views/documents/publications/horscollections/renover_revitaliser.pdf',
                    },
                    nameObject: {
                      default:
                        'Vade-mecum de la rénovation et de la revitalisation urbaines',
                      langfre:
                        'Vade-mecum de la rénovation et de la revitalisation urbaines',
                    },
                    descriptionObject: {
                      default:
                        'Rénover et revitaliser les centres urbains en Wallonie - CREAT (Centre d’Etudes en Aménagement du Territoire) - UCL. Financement SPW-DGO4 - 2010.',
                      langfre:
                        'Rénover et revitaliser les centres urbains en Wallonie - CREAT (Centre d’Etudes en Aménagement du Territoire) - UCL. Financement SPW-DGO4 - 2010.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'ad86502d-8371-408e-880a-777dcce65e24',
                id: '1307',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'ad86502d-8371-408e-880a-777dcce65e24',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/c0d28bbb-d396-44ec-86a9-37bd53af2573/attachments/planhp.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c0d28bbb-d396-44ec-86a9-37bd53af2573',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: 'Plan Habitat Permanent',
                  langfre: 'Plan Habitat Permanent',
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données représente la cartographie cadastrale des sites concernés par le plan d'habitat permanent.\n\nL’habitat permanent dans les équipements à vocation touristique est une forme de précarité qui touche environ 10.000 personnes en Wallonie. \nAfin d’apporter une réponse nuancée à la problématique de l’habitat permanent, le Gouvernement wallon a adopté, en novembre 2002, un Plan d’action pluriannuel relatif à l’habitat permanent dans les équipements touristiques (Plan HP).\n\nLes objectifs du plan HP sont de favoriser l’accès aux droits fondamentaux, notamment le droit au logement, pour les personnes résidant en permanence dans un équipement à vocation touristique comme les \"campings\", favoriser la réinsertion dans un logement décent des personnes concernées (relogement sur base volontaire), empêcher toute nouvelle installation de résident permanent (maîtrise des entrées), d’accompagner les résidents dans leurs démarches et de veiller à l’accès à l’eau et à l’électricité dans les sites d’habitat permanent.\n\nCe plan et l’ensemble de mesures reprises dans le tableau de bord ont fait l'objet d'une actualisation adoptée le 28 avril 2011 par le Gouvernement wallon. Parmi les points repris au tableau de bord figurait la réalisation d'une cartographie cadastrale des sites d'habitat permanent. \n\nLa cartographie a été adopté par arrêté du GW le 16 mai 2013. Elle se veut uniquement une localisation exacte et une délimitation des zones concernées par le phénomène d'habitat permanent. Elle constitue la référence pour les communes, les gestionnaires des zones d’habitat permanent et les notaires. Elle répertorie une centaine de sites HP, répartis sur 30 communes. Elle comprend outre un cadastre des parcelles, des informations sur la situation juridique de chaque site.\n\nChaque site concerné par le plan d'habitat permanent est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque site renvoie vers une application permettant de disposer d'informations complémentaires sur le site en question.",
                  langfre:
                    "Cette couche de données représente la cartographie cadastrale des sites concernés par le plan d'habitat permanent.\n\nL’habitat permanent dans les équipements à vocation touristique est une forme de précarité qui touche environ 10.000 personnes en Wallonie. \nAfin d’apporter une réponse nuancée à la problématique de l’habitat permanent, le Gouvernement wallon a adopté, en novembre 2002, un Plan d’action pluriannuel relatif à l’habitat permanent dans les équipements touristiques (Plan HP).\n\nLes objectifs du plan HP sont de favoriser l’accès aux droits fondamentaux, notamment le droit au logement, pour les personnes résidant en permanence dans un équipement à vocation touristique comme les \"campings\", favoriser la réinsertion dans un logement décent des personnes concernées (relogement sur base volontaire), empêcher toute nouvelle installation de résident permanent (maîtrise des entrées), d’accompagner les résidents dans leurs démarches et de veiller à l’accès à l’eau et à l’électricité dans les sites d’habitat permanent.\n\nCe plan et l’ensemble de mesures reprises dans le tableau de bord ont fait l'objet d'une actualisation adoptée le 28 avril 2011 par le Gouvernement wallon. Parmi les points repris au tableau de bord figurait la réalisation d'une cartographie cadastrale des sites d'habitat permanent. \n\nLa cartographie a été adopté par arrêté du GW le 16 mai 2013. Elle se veut uniquement une localisation exacte et une délimitation des zones concernées par le phénomène d'habitat permanent. Elle constitue la référence pour les communes, les gestionnaires des zones d’habitat permanent et les notaires. Elle répertorie une centaine de sites HP, répartis sur 30 communes. Elle comprend outre un cadastre des parcelles, des informations sur la situation juridique de chaque site.\n\nChaque site concerné par le plan d'habitat permanent est identifié de manière unique. Une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque site renvoie vers une application permettant de disposer d'informations complémentaires sur le site en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données représente la cartographie cadastrale des sites concernés par le plan d'habitat permanent.",
                  langfre:
                    "Cette couche de données représente la cartographie cadastrale des sites concernés par le plan d'habitat permanent.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PLANHP',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PLANHP',
                    },
                    nameObject: {
                      default:
                        "Application de consultation des données de la DGO4 - Plans d'habitat permanent",
                      langfre:
                        "Application de consultation des données de la DGO4 - Plans d'habitat permanent",
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux Plans HP. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux Plans HP. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPLANHP%2FMapServer%22%2C%22label%22%3A%22Plan%20Habitat%20Permanent%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fc0d28bbb-d396-44ec-86a9-37bd53af2573%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPLANHP%2FMapServer%22%2C%22label%22%3A%22Plan%20Habitat%20Permanent%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fc0d28bbb-d396-44ec-86a9-37bd53af2573%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites concernés par le plan d'habitat permanent.",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux sites concernés par le plan d'habitat permanent.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PLANHP/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux sites concernés par le plan d'habitat permanent.",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux sites concernés par le plan d'habitat permanent.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/PLANHP/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/PLANHP/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=planhp',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=planhp',
                    },
                    nameObject: {
                      default:
                        "Base de données des sites concernés par le plan d'habitat permanent",
                      langfre:
                        "Base de données des sites concernés par le plan d'habitat permanent",
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des sites concernés par le plan habitat permanent',
                      langfre:
                        'Site permettant la recherche des sites concernés par le plan habitat permanent',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://wallex.wallonie.be/index.php?doc=25280&rev=26517-17584',
                      langfre:
                        'https://wallex.wallonie.be/index.php?doc=25280&rev=26517-17584',
                    },
                    nameObject: {
                      default: 'AGW - 16 mai 2013',
                      langfre: 'AGW - 16 mai 2013',
                    },
                    descriptionObject: {
                      default:
                        'Arrêté du Gouvernement wallon adoptant la cartographie des sites concernés par le plan habitat permanent.',
                      langfre:
                        'Arrêté du Gouvernement wallon adoptant la cartographie des sites concernés par le plan habitat permanent.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'c0d28bbb-d396-44ec-86a9-37bd53af2573',
                id: '1301',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '14688', '0'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'c0d28bbb-d396-44ec-86a9-37bd53af2573',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/c61605c4-56f3-4371-9f6a-f346cc294b96/attachments/ZIP.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/c61605c4-56f3-4371-9f6a-f346cc294b96',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                resourceTitleObject: {
                  default: "Zones d'Initiative Privilégiée (ZIP)",
                  langfre: "Zones d'Initiative Privilégiée (ZIP)",
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données reprend les périmètres des Zones d'Initiative Privilégiée où est menée une politique de logement et d'aménagement du territoire dédicacée.\n\nLes Zones d'Initiatives privilégiées ont été créées dans le but de mener une politique spécifique afin de répondre à des situations problématiques ciblées en matière d’aménagement du territoire et de logement. En effet, le territoire wallon n'est pas un homogène d'un point de vue logement et aménagement du territoire et y mener une politique indifférenciée dans ces matières provoqueraient des effets pervers. L'objectif dans une ZIP est, entre autres, d'y intensifier la revitalisation et la rénovation urbaine et de lutter contre l'exclusion.\n\nLes zones d'initiatives privilégiées ont fait l'objet de plusieurs textes légaux. Elles ont été définies en 1994 par arrêté du gouvernement wallon (AGW du 7 juillet 1994) et sont définies à l'Art. 174 du CWATUPE.\n\nLes ZIP sont catégorisées en 4 types :\n- ZIP I : zones de forte pression foncière ou immobilière qui correspondent à des communes où cette pression est telle que les couches modestes et moyennes de la population ne peuvent s'y loger;\n- ZIP II : zones de requalification des noyaux d'habitat qui sont des quartiers essentiellement localisés dans des communes pauvres, qui voient se dégrader progressivement tant leurs espaces publics que les logements qui les bordent ;\n- ZIP III ou ZIP/QI (quartier d’initiatives) : zones qui concernent des quartiers cumulant les mêmes désagréments que les ZIP 2 avec une conjonction de graves problèmes sociaux: pauvreté, chômage, délinquance, drogue, concentration de population étrangère, etc.\n- ZIP IV : zones de requalification des cités sociales qui correspondent à des quartiers d'habitation essentiellement, voire exclusivement sociales et qui présentent les mêmes caractéristiques défavorables que les ZIP 3.\n\nLes périmètres des ZIP sont repris dans ce jeu de données. Dans le cas des ZIP de type I, l'emprise de la zone porte sur l'entièreté du territoire communal. Pour les autres types, il s'agit de quartiers urbains bien délimités. Chaque ZIP est identifié de manière unique. En outre, une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur la zone en question.",
                  langfre:
                    "Cette couche de données reprend les périmètres des Zones d'Initiative Privilégiée où est menée une politique de logement et d'aménagement du territoire dédicacée.\n\nLes Zones d'Initiatives privilégiées ont été créées dans le but de mener une politique spécifique afin de répondre à des situations problématiques ciblées en matière d’aménagement du territoire et de logement. En effet, le territoire wallon n'est pas un homogène d'un point de vue logement et aménagement du territoire et y mener une politique indifférenciée dans ces matières provoqueraient des effets pervers. L'objectif dans une ZIP est, entre autres, d'y intensifier la revitalisation et la rénovation urbaine et de lutter contre l'exclusion.\n\nLes zones d'initiatives privilégiées ont fait l'objet de plusieurs textes légaux. Elles ont été définies en 1994 par arrêté du gouvernement wallon (AGW du 7 juillet 1994) et sont définies à l'Art. 174 du CWATUPE.\n\nLes ZIP sont catégorisées en 4 types :\n- ZIP I : zones de forte pression foncière ou immobilière qui correspondent à des communes où cette pression est telle que les couches modestes et moyennes de la population ne peuvent s'y loger;\n- ZIP II : zones de requalification des noyaux d'habitat qui sont des quartiers essentiellement localisés dans des communes pauvres, qui voient se dégrader progressivement tant leurs espaces publics que les logements qui les bordent ;\n- ZIP III ou ZIP/QI (quartier d’initiatives) : zones qui concernent des quartiers cumulant les mêmes désagréments que les ZIP 2 avec une conjonction de graves problèmes sociaux: pauvreté, chômage, délinquance, drogue, concentration de population étrangère, etc.\n- ZIP IV : zones de requalification des cités sociales qui correspondent à des quartiers d'habitation essentiellement, voire exclusivement sociales et qui présentent les mêmes caractéristiques défavorables que les ZIP 3.\n\nLes périmètres des ZIP sont repris dans ce jeu de données. Dans le cas des ZIP de type I, l'emprise de la zone porte sur l'entièreté du territoire communal. Pour les autres types, il s'agit de quartiers urbains bien délimités. Chaque ZIP est identifié de manière unique. En outre, une base de données Access reprend des informations administratives relevées dans les dossiers. Un lien hypertexte repris en attribut de chaque zone renvoie vers une application permettant de disposer d'informations complémentaires sur la zone en question.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données reprend les périmètres des Zones d'Initiative Privilégiée où est menée une politique de logement et d'aménagement du territoire dédicacée.",
                  langfre:
                    "Cette couche de données reprend les périmètres des Zones d'Initiative Privilégiée où est menée une politique de logement et d'aménagement du territoire dédicacée.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=ZIP',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=ZIP',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - ZIP',
                      langfre:
                        'Application de consultation des données de la DGO4 - ZIP',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux ZIP. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux ZIP. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FZIP%2FMapServer%22%2C%22label%22%3A%22Zones%20d%27Initiative%20Privil%C3%A9gi%C3%A9e%20%28ZIP%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fc61605c4-56f3-4371-9f6a-f346cc294b96%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FZIP%2FMapServer%22%2C%22label%22%3A%22Zones%20d%27Initiative%20Privil%C3%A9gi%C3%A9e%20%28ZIP%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fc61605c4-56f3-4371-9f6a-f346cc294b96%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST de la couche de données relatives aux zones d'Initiative privilégiée.",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST de la couche de données relatives aux zones d'Initiative privilégiée.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/ZIP/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS de la couche de données relatives aux zones d'Initiative privilégiée.",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS de la couche de données relatives aux zones d'Initiative privilégiée.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Logement_Habitat/ZIP/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Logement_Habitat/ZIP/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct à la couche de données',
                      langfre:
                        'Accès en téléchargement direct à la couche de données',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=ZIP',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=ZIP',
                    },
                    nameObject: {
                      default: 'Base de données des ZIP',
                      langfre: 'Base de données des ZIP',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Zones d'Initiative privilégiée.",
                      langfre:
                        "Site permettant la recherche des Zones d'Initiative privilégiée.",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/documents/ZIP/ZIP.pdf',
                      langfre:
                        'https://docum1.wallonie.be/documents/ZIP/ZIP.pdf',
                    },
                    nameObject: {
                      default: 'Liste des ZIP',
                      langfre: 'Liste des ZIP',
                    },
                    descriptionObject: {
                      default: 'Liste des ZIP en Région wallonne.',
                      langfre: 'Liste des ZIP en Région wallonne.',
                    },
                    function: 'information',
                    applicationProfile: 'application/pdf',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_amenagement/index.php/site/directions/dao/zip',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_amenagement/index.php/site/directions/dao/zip',
                    },
                    nameObject: {
                      default: 'ZIP - Informations complémentaires',
                      langfre: 'ZIP - Informations complémentaires',
                    },
                    descriptionObject: {
                      default:
                        "Page Internet sur le site de la DGO4 fournissant les informations relatives aux Zones d'Initiative privilégiée.",
                      langfre:
                        "Page Internet sur le site de la DGO4 fournissant les informations relatives aux Zones d'Initiative privilégiée.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'c61605c4-56f3-4371-9f6a-f346cc294b96',
                id: '1312',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'c61605c4-56f3-4371-9f6a-f346cc294b96',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/e140607a-cfeb-445f-a551-22816c06c72f/attachments/gcu_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/e140607a-cfeb-445f-a551-22816c06c72f',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: "Guide Communal d'Urbanisme (GCU)",
                  langfre: "Guide Communal d'Urbanisme (GCU)",
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales des règlements du CWATUP transposés dans le Guide Communal d'Urbanisme (GCU) du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie.\n\nDans ce cadre, le Guide Communal d'Urbanisme (GCU) devient un des outils d'orientation en matière d'urbanisme à l'échelle communale. Il concerne tout ou partie du territoire communal et traite d’une ou plusieurs thématiques\n\nIl décline les objectifs de développement territorial du Schéma de Développement du Territoire (SDT), du Schéma de Développement Pluricommunal (SDP) et des schémas communaux en objectifs d’urbanisme, par des indications, en tenant compte des spécificités du ou des territoires sur lesquels il porte (CoDT - Art. D.III.4). Dans le respect de certaines conditions, la Commune devra être en possession d’un GCU pour pouvoir profiter d’un régime dit \"de décentralisation\" qui autorise la commune à exercer, de manière autonome, son pouvoir de décision, notamment en matière d'octroi de permis d'urbanisme et d’urbanisation.\n\nLes Règlements Communaux d'Urbanisme (RCU) et les Règlements Communaux de Bâtisses (RCB) au sens du CWATUP sont assimilés à des GCU. Ceux-ci possédaient auparavant valeur réglementaire. Dans le CoDT, le GCU ne comporte que des indications (valeur indicative) compilées dans un document unique. Le contenu du GCU est défini dans le CoDT (Art. D.III.5) de manière similaire à celui du Guide Régional d'Urbanisme (GRU - Art. D.III.2 §1).\n\nUn permis d'urbanisme peut donc être octroyé en s'écartant du contenu du GCU moyennant motivation démontrant que le projet ne compromet pas les objectifs de développement territorial, d'aménagement du territoire ou d'urbanisme contenus dans le guide et contribue à la protection, à la gestion ou à l'aménagement des paysages bâtis ou non bâtis.\n\nUn GCU peut s’écarter du contenu à valeur indicative du GRU moyennant une motivation et ce sous conditions. \n\nSur un territoire donné, quand le GRU et un GCU prévoient des indications sur un même thème, il est fait application des indications du GCU. En cas de contradiction entre une indication d’un GCU préexistant et une indication ou une norme du GRU entrant en vigueur ultérieurement, il est fait application de l’indication ou de la norme du GRU.\n\nAu niveau cartographique, la série de couches de données des GCU regroupe les périmètres identifiés dans les anciens Règlements Communaux d'Urbanisme (RCU) et les anciens Règlements Communaux de Bâtisses (RCB).",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales des règlements du CWATUP transposés dans le Guide Communal d'Urbanisme (GCU) du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie.\n\nDans ce cadre, le Guide Communal d'Urbanisme (GCU) devient un des outils d'orientation en matière d'urbanisme à l'échelle communale. Il concerne tout ou partie du territoire communal et traite d’une ou plusieurs thématiques\n\nIl décline les objectifs de développement territorial du Schéma de Développement du Territoire (SDT), du Schéma de Développement Pluricommunal (SDP) et des schémas communaux en objectifs d’urbanisme, par des indications, en tenant compte des spécificités du ou des territoires sur lesquels il porte (CoDT - Art. D.III.4). Dans le respect de certaines conditions, la Commune devra être en possession d’un GCU pour pouvoir profiter d’un régime dit \"de décentralisation\" qui autorise la commune à exercer, de manière autonome, son pouvoir de décision, notamment en matière d'octroi de permis d'urbanisme et d’urbanisation.\n\nLes Règlements Communaux d'Urbanisme (RCU) et les Règlements Communaux de Bâtisses (RCB) au sens du CWATUP sont assimilés à des GCU. Ceux-ci possédaient auparavant valeur réglementaire. Dans le CoDT, le GCU ne comporte que des indications (valeur indicative) compilées dans un document unique. Le contenu du GCU est défini dans le CoDT (Art. D.III.5) de manière similaire à celui du Guide Régional d'Urbanisme (GRU - Art. D.III.2 §1).\n\nUn permis d'urbanisme peut donc être octroyé en s'écartant du contenu du GCU moyennant motivation démontrant que le projet ne compromet pas les objectifs de développement territorial, d'aménagement du territoire ou d'urbanisme contenus dans le guide et contribue à la protection, à la gestion ou à l'aménagement des paysages bâtis ou non bâtis.\n\nUn GCU peut s’écarter du contenu à valeur indicative du GRU moyennant une motivation et ce sous conditions. \n\nSur un territoire donné, quand le GRU et un GCU prévoient des indications sur un même thème, il est fait application des indications du GCU. En cas de contradiction entre une indication d’un GCU préexistant et une indication ou une norme du GRU entrant en vigueur ultérieurement, il est fait application de l’indication ou de la norme du GRU.\n\nAu niveau cartographique, la série de couches de données des GCU regroupe les périmètres identifiés dans les anciens Règlements Communaux d'Urbanisme (RCU) et les anciens Règlements Communaux de Bâtisses (RCB).",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales des règlements du CWATUP transposés dans le Guide Communal d'Urbanisme (GCU) du CoDT.",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales des règlements du CWATUP transposés dans le Guide Communal d'Urbanisme (GCU) du CoDT.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: 'No limitations to public access',
                    langfre: 'No limitations to public access',
                    link: 'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                MD_LegalConstraintsUseLimitationObject: [
                  {
                    default: "Conditions d'accès et d'utilisation spécifiques",
                    langfre: "Conditions d'accès et d'utilisation spécifiques",
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default:
                        "Légende des données relatives aux Guides communaux d'Urbanisme",
                      langfre:
                        "Légende des données relatives aux Guides communaux d'Urbanisme",
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=GCU',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=GCU',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - GCU',
                      langfre:
                        'Application de consultation des données de la DGO4 - GCU',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux GCU. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux GCU. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FGCU%2FMapServer%22%2C%22label%22%3A%22Guide%20Communal%20d%27Urbanisme%20%28GCU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fe140607a-cfeb-445f-a551-22816c06c72f%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FGCU%2FMapServer%22%2C%22label%22%3A%22Guide%20Communal%20d%27Urbanisme%20%28GCU%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2Fe140607a-cfeb-445f-a551-22816c06c72f%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Guides communaux d'Urbanisme",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Guides communaux d'Urbanisme",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/GCU/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Guides communaux d'Urbanisme",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Guides communaux d'Urbanisme",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Amenagement/RCU/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Amenagement/RCU/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default:
                        'Accès en téléchargement direct des RCU (CWATUP) constitutifs des GCU (CoDT)',
                      langfre:
                        'Accès en téléchargement direct des RCU (CWATUP) constitutifs des GCU (CoDT)',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                    },
                    nameObject: {
                      default: 'Base de données des GCU',
                      langfre: 'Base de données des GCU',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Guides communaux d'Urbanisme",
                      langfre:
                        "Site permettant la recherche des Guides communaux d'Urbanisme",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'https://codt.wallonie.be/',
                      langfre: 'https://codt.wallonie.be/',
                    },
                    nameObject: {
                      default: "CoDT - Toute l'information",
                      langfre: "CoDT - Toute l'information",
                    },
                    descriptionObject: {
                      default:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                      langfre:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: 'e140607a-cfeb-445f-a551-22816c06c72f',
                id: '1612',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: 'e140607a-cfeb-445f-a551-22816c06c72f',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/78e0c182-dbf4-4033-9bb0-e0acfd93be7b/attachments/ccatm.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default:
                    "Commissions consultatives communales d'aménagement du territoire et de mobilité (CCATM)",
                  langfre:
                    "Commissions consultatives communales d'aménagement du territoire et de mobilité (CCATM)",
                },
                resourceAbstractObject: {
                  default:
                    "Cette couche de données localise les communes disposant d'une Commission consultative communale d'aménagement du territoire et de mobilité (CCATM).\n\nDans le souci d'une plus large participation de la population à la gestion de leur cadre de vie, le CoDT prévoit la possibilité pour les autorités communales de créer des Commissions consultatives communales d'aménagement du territoire et de mobilité (CCATM). \n\nLa CCATM est un organe consultatif permettant une plus large participation de la population à la gestion de leur cadre de vie. Elle peut ou doit être consultée par les autorités locales pour certaines matières. Ainsi, l'avis de la CCATM est requis pour les documents communaux d'aménagement (SCD, SDPC, SOL, GCU), pour l'évaluation des incidences sur l'environnement, la rénovation urbaine, les périmètres de remembrement urbain, les périmètres de sites à réaménager, etc. En d'autres matières, la consultation de la CCATM est facultative (demandes de permis d'urbanisme, révision de plan de secteur, etc.)\n\nLa commission peut aussi, d'initiative, rendre des avis aux autorités communales sur l'évolution des idées et des principes dans ces matières et sur les enjeux et les objectifs du développement territorial local. \n\nSur le plan du fonctionnement, le nombre de membres de la commission est, en plus du président, de huit membres (communes de moins de dix mille habitants) de douze membres (communes de dix à vingt mille habitants) ou seize membres (communes de plus de vingt mille habitants). La commission doit se réunir au moins quatre, six ou huit fois par an (en fonction du nombre de ses membres développé ci-dessus). Elle couvre l’ensemble du territoire de la commune concernée.\n\nChaque CCATM est identifiée de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                  langfre:
                    "Cette couche de données localise les communes disposant d'une Commission consultative communale d'aménagement du territoire et de mobilité (CCATM).\n\nDans le souci d'une plus large participation de la population à la gestion de leur cadre de vie, le CoDT prévoit la possibilité pour les autorités communales de créer des Commissions consultatives communales d'aménagement du territoire et de mobilité (CCATM). \n\nLa CCATM est un organe consultatif permettant une plus large participation de la population à la gestion de leur cadre de vie. Elle peut ou doit être consultée par les autorités locales pour certaines matières. Ainsi, l'avis de la CCATM est requis pour les documents communaux d'aménagement (SCD, SDPC, SOL, GCU), pour l'évaluation des incidences sur l'environnement, la rénovation urbaine, les périmètres de remembrement urbain, les périmètres de sites à réaménager, etc. En d'autres matières, la consultation de la CCATM est facultative (demandes de permis d'urbanisme, révision de plan de secteur, etc.)\n\nLa commission peut aussi, d'initiative, rendre des avis aux autorités communales sur l'évolution des idées et des principes dans ces matières et sur les enjeux et les objectifs du développement territorial local. \n\nSur le plan du fonctionnement, le nombre de membres de la commission est, en plus du président, de huit membres (communes de moins de dix mille habitants) de douze membres (communes de dix à vingt mille habitants) ou seize membres (communes de plus de vingt mille habitants). La commission doit se réunir au moins quatre, six ou huit fois par an (en fonction du nombre de ses membres développé ci-dessus). Elle couvre l’ensemble du territoire de la commune concernée.\n\nChaque CCATM est identifiée de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette couche de données localise les communes disposant d'une Commission consultative communale d'aménagement du territoire et de mobilité (CCATM).",
                  langfre:
                    "Cette couche de données localise les communes disposant d'une Commission consultative communale d'aménagement du territoire et de mobilité (CCATM).",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des données',
                      langfre: 'Légende des données',
                    },
                    descriptionObject: {
                      default:
                        "Légende des données relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                      langfre:
                        "Légende des données relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=CCATM',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=CCATM',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la TLPE - CCATM',
                      langfre:
                        'Application de consultation des données de la TLPE - CCATM',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux CCATM. Cette application constitue un thème de l'application de consultation des données de la TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux CCATM. Cette application constitue un thème de l'application de consultation des données de la TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCCATM%2FMapServer%22%2C%22label%22%3A%22Commissions%20consultatives%20communales%20d%27am%C3%A9nagement%20du%20territoire%20et%20de%20mobilit%C3%A9%20%28CCATM%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F78e0c182-dbf4-4033-9bb0-e0acfd93be7b%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FCCATM%2FMapServer%22%2C%22label%22%3A%22Commissions%20consultatives%20communales%20d%27am%C3%A9nagement%20du%20territoire%20et%20de%20mobilit%C3%A9%20%28CCATM%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F78e0c182-dbf4-4033-9bb0-e0acfd93be7b%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/CCATM/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches relatives aux Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/CCATM/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/CCATM/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=ccatm',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=ccatm',
                    },
                    nameObject: {
                      default: 'Base de données des CCATM',
                      langfre: 'Base de données des CCATM',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                      langfre:
                        "Site permettant la recherche des Commissions communales Consultatives d'Aménagement du Territoire et de Mobilité",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://territoire.wallonie.be/fr/page/commissions-consultatives-communales-damenagement-du-territoire-et-mobilite',
                      langfre:
                        'https://territoire.wallonie.be/fr/page/commissions-consultatives-communales-damenagement-du-territoire-et-mobilite',
                    },
                    nameObject: {
                      default: 'Les CCATM - Informations complémentaires',
                      langfre: 'Les CCATM - Informations complémentaires',
                    },
                    descriptionObject: {
                      default:
                        'Site Internet de la TLPE fournissant des informations complémentaires sur les CCATM',
                      langfre:
                        'Site Internet de la TLPE fournissant des informations complémentaires sur les CCATM',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
                id: '1188',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '78e0c182-dbf4-4033-9bb0-e0acfd93be7b',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/01491630-78ce-49f3-b479-4b30dabc4c69/attachments/bc_pat.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/01491630-78ce-49f3-b479-4b30dabc4c69',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default:
                    'Patrimoine - Biens classés et zones de protection - Série',
                  langfre:
                    'Patrimoine - Biens classés et zones de protection - Série',
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données reprend la localisation des différents biens classés en Région wallonne.\n\nLe classement constitue une mesure de protection légale d’un bien immobilier dont la valeur patrimoniale supérieure est ainsi reconnue et dont la conservation est jugée d’intérêt régional. Cette exigence de conservation inclut l’entretien du bien et, si nécessaire, sa restauration au moyen de procédés et techniques spécifiques déterminés en fonction de ses qualités propres. Le classement est consacré par un arrêté du gouvernement wallon.\n\nLe classement porte uniquement sur des biens immobiliers situés sur le territoire de la Région wallonne (sauf dans les communes germanophones où ces matières sont gérées par la communauté germanophone) et qui présentent un intérêt architectural, historique, archéologique, scientifique, artistique, social, technique, mémoriel, esthétique, urbanistique ou paysager, dont le degré supérieur est analysé sur base des critères d’authenticité, d’intégrité, de représentativité typologique ou de rareté.\n\nUne distinction est apportée au niveau du classement en fonction de la nature du bien concerné : on le classera comme monument, site, ensemble architectural ou site archéologique (CoPat - art.3, 7°). Ces biens constituent autant de couches géographiques identifiés dans la présente collection. Les monuments constituent des entités ponctuelles et les autres biens des entités zonales.\n\nLe CoPat considère :\n- à titre de monument : toute réalisation architecturale, sculpturale ou végétale isolée et remarquable, en ce compris les éléments immobilisés par incorporation ou destination et les biens culturels qui en font partie intégrante, notamment l’équipement complémentaire et les éléments décoratifs. Pour les monuments, des subsides peuvent être octroyés pour les travaux ou études visant à protéger, restaurer ou mettre en valeur le bien;\n- à titre d’ensemble architectural : tout groupement de constructions, en ce compris les éléments qui les relient, remarquable par sa cohérence ou par son intégration dans le paysage;\n- à titre de site : toute œuvre de la nature ou toute œuvre combinée de l’homme et de la nature constituant un espace remarquable au regard d’un ou plusieurs critères visés à l’article 1er du CoPat, suffisamment caractéristique et cohérent pour faire l’objet d’une délimitation topographique;\n- à titre de site archéologique : tout terrain, formation géologique ou pédologique, bâtiment, ensemble de bâtiment ou site ayant recelé, recelant ou étant présumé receler des biens archéologiques.\n\nAfin de garantir la qualité de l’environnement du bien classé, une zone de protection est établie dans certains cas.\n\nLa procédure de classement d'un bien patrimonial étant relativement longue, une procédure spécifique est prévue lorsqu’un bien nécessite une protection en urgence : l’inscription sur la liste de sauvegarde. Pour plus de renseignements, consultez la fiche de métadonnées relative à la Liste de sauvegarde (PAT_LSTSAV).\n\nParmi les nombreux biens protégés de Wallonie, un certain nombre présente un intérêt majeur. Ils sont repris dans la liste du patrimoine exceptionnel de la Région wallonne. Ces biens alimentent également la liste du patrimoine mondial (UNESCO). Pour plus de renseignements, consultez les fiches de métadonnées relatives aux Biens exceptionnels (PAT_EXC) et aux Biens mondiaux (PAT_MND).\n\nChaque bien classé est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                  langfre:
                    "Cette série de couches de données reprend la localisation des différents biens classés en Région wallonne.\n\nLe classement constitue une mesure de protection légale d’un bien immobilier dont la valeur patrimoniale supérieure est ainsi reconnue et dont la conservation est jugée d’intérêt régional. Cette exigence de conservation inclut l’entretien du bien et, si nécessaire, sa restauration au moyen de procédés et techniques spécifiques déterminés en fonction de ses qualités propres. Le classement est consacré par un arrêté du gouvernement wallon.\n\nLe classement porte uniquement sur des biens immobiliers situés sur le territoire de la Région wallonne (sauf dans les communes germanophones où ces matières sont gérées par la communauté germanophone) et qui présentent un intérêt architectural, historique, archéologique, scientifique, artistique, social, technique, mémoriel, esthétique, urbanistique ou paysager, dont le degré supérieur est analysé sur base des critères d’authenticité, d’intégrité, de représentativité typologique ou de rareté.\n\nUne distinction est apportée au niveau du classement en fonction de la nature du bien concerné : on le classera comme monument, site, ensemble architectural ou site archéologique (CoPat - art.3, 7°). Ces biens constituent autant de couches géographiques identifiés dans la présente collection. Les monuments constituent des entités ponctuelles et les autres biens des entités zonales.\n\nLe CoPat considère :\n- à titre de monument : toute réalisation architecturale, sculpturale ou végétale isolée et remarquable, en ce compris les éléments immobilisés par incorporation ou destination et les biens culturels qui en font partie intégrante, notamment l’équipement complémentaire et les éléments décoratifs. Pour les monuments, des subsides peuvent être octroyés pour les travaux ou études visant à protéger, restaurer ou mettre en valeur le bien;\n- à titre d’ensemble architectural : tout groupement de constructions, en ce compris les éléments qui les relient, remarquable par sa cohérence ou par son intégration dans le paysage;\n- à titre de site : toute œuvre de la nature ou toute œuvre combinée de l’homme et de la nature constituant un espace remarquable au regard d’un ou plusieurs critères visés à l’article 1er du CoPat, suffisamment caractéristique et cohérent pour faire l’objet d’une délimitation topographique;\n- à titre de site archéologique : tout terrain, formation géologique ou pédologique, bâtiment, ensemble de bâtiment ou site ayant recelé, recelant ou étant présumé receler des biens archéologiques.\n\nAfin de garantir la qualité de l’environnement du bien classé, une zone de protection est établie dans certains cas.\n\nLa procédure de classement d'un bien patrimonial étant relativement longue, une procédure spécifique est prévue lorsqu’un bien nécessite une protection en urgence : l’inscription sur la liste de sauvegarde. Pour plus de renseignements, consultez la fiche de métadonnées relative à la Liste de sauvegarde (PAT_LSTSAV).\n\nParmi les nombreux biens protégés de Wallonie, un certain nombre présente un intérêt majeur. Ils sont repris dans la liste du patrimoine exceptionnel de la Région wallonne. Ces biens alimentent également la liste du patrimoine mondial (UNESCO). Pour plus de renseignements, consultez les fiches de métadonnées relatives aux Biens exceptionnels (PAT_EXC) et aux Biens mondiaux (PAT_MND).\n\nChaque bien classé est identifié de manière unique, ce qui permet la liaison entre les éléments cartographiés et la base de données documentaire reprenant des informations administratives ainsi que les documents scannés relevés dans les dossiers liés.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette série de couches de données reprend la localisation des différents biens classés en Région wallonne.',
                  langfre:
                    'Cette série de couches de données reprend la localisation des différents biens classés en Région wallonne.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      "Les conditions générales d'accès s’appliquentLicence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.",
                    langfre:
                      "Les conditions générales d'accès s’appliquentLicence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.",
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Patrimoine - Biens classés et zones de protection - Série (2024-12-18) http://geodata.wallonie.be/id/01491630-78ce-49f3-b479-4b30dabc4c69',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Patrimoine - Biens classés et zones de protection - Série (2024-12-18) http://geodata.wallonie.be/id/01491630-78ce-49f3-b479-4b30dabc4c69',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default:
                        'Légende des données relatives aux biens classés et zones de protection',
                      langfre:
                        'Légende des données relatives aux biens classés et zones de protection',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=BC_PAT',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=BC_PAT',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données TLPE - Biens classés et zones de protection',
                      langfre:
                        'Application de consultation des données TLPE - Biens classés et zones de protection',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux biens classés et zones de protection . Cette application constitue un thème de l'application de consultation des données TLPE.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux biens classés et zones de protection . Cette application constitue un thème de l'application de consultation des données TLPE.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FBC_PAT%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20class%C3%A9s%20et%20zones%20de%20protection%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F01491630-78ce-49f3-b479-4b30dabc4c69%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FBC_PAT%2FMapServer%22%2C%22label%22%3A%22Patrimoine%20-%20Biens%20class%C3%A9s%20et%20zones%20de%20protection%20-%20S%C3%A9rie%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F01491630-78ce-49f3-b479-4b30dabc4c69%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux "Biens classés et zones de protection (BC_PAT)"',
                      langfre:
                        'Adresse de connexion au service de visualisation ESRI-REST des couches relatives aux "Biens classés et zones de protection (BC_PAT)"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/BC_PAT/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux "Biens classés et zones de protection (BC_PAT)"',
                      langfre:
                        'Adresse de connexion au service de visualisation WMS des couches relatives aux "Biens classés et zones de protection (BC_PAT)"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/patrimoine/BC_PAT/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/patrimoine/BC_PAT/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=bc_pat',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=bc_pat',
                    },
                    nameObject: {
                      default:
                        'Base de données des biens classés et zones de protection',
                      langfre:
                        'Base de données des biens classés et zones de protection',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche des biens classés et zones de protection',
                      langfre:
                        'Site permettant la recherche des biens classés et zones de protection',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/documents/BC_PAT/BC_PAT.pdf',
                      langfre:
                        'https://docum1.wallonie.be/documents/BC_PAT/BC_PAT.pdf',
                    },
                    nameObject: {
                      default: 'Liste des biens classés',
                      langfre: 'Liste des biens classés',
                    },
                    descriptionObject: {
                      default: 'Liste des biens classés en Région wallonne',
                      langfre: 'Liste des biens classés en Région wallonne',
                    },
                    function: 'information',
                    applicationProfile: 'application/pdf',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                      langfre:
                        'https://agencewallonnedupatrimoine.be/se-renseigner/',
                    },
                    nameObject: {
                      default:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                      langfre:
                        'Site Internet de l’Agence wallonne du Patrimoine',
                    },
                    descriptionObject: {
                      default:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                      langfre:
                        "Sur ce site, découvrez ce que le Service public de Wallonie accomplit dans le domaine de l'archéologie, de protection du patrimoine mais également en matière d'entretien et de restauration de biens classés.",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '01491630-78ce-49f3-b479-4b30dabc4c69',
                id: '666',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['25', '1', '4', '14688', '0', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '01491630-78ce-49f3-b479-4b30dabc4c69',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/679a02c9-7c2c-4132-ab49-32147bd01ce9/attachments/sol_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/679a02c9-7c2c-4132-ab49-32147bd01ce9',
                initiativeType: '',
              },
              _source: {
                resourceType: ['series'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: "Schéma d'Orientation Local (SOL)",
                  langfre: "Schéma d'Orientation Local (SOL)",
                },
                resourceAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales constitutives des Schémas d'Orientation locaux (SOL) au sens du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie. Dans sa logique d'urbanisme de projet, le CoDT met en place les schémas.\n\nParmi ceux-ci, le schéma d’orientation local (SOL - Art. D.II.11 et ss du CoDT) est un des deux schémas communaux. Il est établi à l’initiative du conseil communal sur une partie du territoire de la commune et y détermine les objectifs d’aménagement du territoire et d’urbanisme. Outre ces objectifs, le SOL contient la carte d’orientation, et les indications relatives à l’implantation et à la hauteur des constructions et des ouvrages, aux voiries et aux espaces publics, ainsi qu’à l’intégration des équipements techniques, en cas de dispense de permis d’urbanisation lors de la division d’un bien en lots. \n\nLe CoDT assimile au SOL, d’une part le Plan Directeur (PLD) et le Plan Communal d’Aménagement (PCA) définis dans le CWATUP qui perdent leur valeur réglementaire et, d’autre part, le Schémas Directeur (SCD) et les Rapports Urbanistiques et Environnementaux (RUE) qui conservent leur valeur indicative.\n\nLe SOL a une valeur indicative et s'applique au Guide Communal d'Urbanisme (GCU) ainsi qu'à toute décision prise en matière de permis, certificats, déclarations et de politique foncière.\n\nUne commune peut se doter d'un ou plusieurs SOL (CoDT - Art. D.II.9).\n\nAu niveau cartographique, la série de couches de données des SOL regroupe les périmètres identifiés dans les anciens PLD, PCA, SCD et RUE au sens du CWATUP ainsi que les nouveaux SOL initiés sous le CoDT.",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales constitutives des Schémas d'Orientation locaux (SOL) au sens du CoDT.\n\nLe Code du Développement Territorial (CoDT) est entré en vigueur le 1er juin 2017 et a modifié la terminologie et la valeur des outils d'aménagement du territoire en Wallonie. Dans sa logique d'urbanisme de projet, le CoDT met en place les schémas.\n\nParmi ceux-ci, le schéma d’orientation local (SOL - Art. D.II.11 et ss du CoDT) est un des deux schémas communaux. Il est établi à l’initiative du conseil communal sur une partie du territoire de la commune et y détermine les objectifs d’aménagement du territoire et d’urbanisme. Outre ces objectifs, le SOL contient la carte d’orientation, et les indications relatives à l’implantation et à la hauteur des constructions et des ouvrages, aux voiries et aux espaces publics, ainsi qu’à l’intégration des équipements techniques, en cas de dispense de permis d’urbanisation lors de la division d’un bien en lots. \n\nLe CoDT assimile au SOL, d’une part le Plan Directeur (PLD) et le Plan Communal d’Aménagement (PCA) définis dans le CWATUP qui perdent leur valeur réglementaire et, d’autre part, le Schémas Directeur (SCD) et les Rapports Urbanistiques et Environnementaux (RUE) qui conservent leur valeur indicative.\n\nLe SOL a une valeur indicative et s'applique au Guide Communal d'Urbanisme (GCU) ainsi qu'à toute décision prise en matière de permis, certificats, déclarations et de politique foncière.\n\nUne commune peut se doter d'un ou plusieurs SOL (CoDT - Art. D.II.9).\n\nAu niveau cartographique, la série de couches de données des SOL regroupe les périmètres identifiés dans les anciens PLD, PCA, SCD et RUE au sens du CWATUP ainsi que les nouveaux SOL initiés sous le CoDT.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Cette série de couches de données compile les informations spatiales constitutives des Schémas d'Orientation locaux (SOL) au sens du CoDT.",
                  langfre:
                    "Cette série de couches de données compile les informations spatiales constitutives des Schémas d'Orientation locaux (SOL) au sens du CoDT.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      "Source : Service public de Wallonie (SPW) - Schéma d'Orientation Local (SOL) (2024-12-02) http://geodata.wallonie.be/id/679a02c9-7c2c-4132-ab49-32147bd01ce9",
                    langfre:
                      "Source : Service public de Wallonie (SPW) - Schéma d'Orientation Local (SOL) (2024-12-02) http://geodata.wallonie.be/id/679a02c9-7c2c-4132-ab49-32147bd01ce9",
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende des couches de données',
                      langfre: 'Légende des couches de données',
                    },
                    descriptionObject: {
                      default:
                        "Légende des couches de données relatives aux Schémas d'Orientation Locaux",
                      langfre:
                        "Légende des couches de données relatives aux Schémas d'Orientation Locaux",
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SOL',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=SOL',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - SOL',
                      langfre:
                        'Application de consultation des données de la DGO4 - SOL',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux SOL. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux SOL. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSOL%2FMapServer%22%2C%22label%22%3A%22Sch%C3%A9ma%20d%27Orientation%20Local%20%28SOL%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F679a02c9-7c2c-4132-ab49-32147bd01ce9%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FSOL%2FMapServer%22%2C%22label%22%3A%22Sch%C3%A9ma%20d%27Orientation%20Local%20%28SOL%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F679a02c9-7c2c-4132-ab49-32147bd01ce9%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches de données relatives aux Schémas d'Orientation Locaux",
                      langfre:
                        "Adresse de connexion au service de visualisation ESRI-REST des couches de données relatives aux Schémas d'Orientation Locaux",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/SOL/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        "Adresse de connexion au service de visualisation WMS des couches de données relatives aux Schémas d'Orientation Locaux",
                      langfre:
                        "Adresse de connexion au service de visualisation WMS des couches de données relatives aux Schémas d'Orientation Locaux",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/Amenagement/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/Amenagement/',
                    },
                    nameObject: {
                      default: 'Téléchargement des couches de données',
                      langfre: 'Téléchargement des couches de données',
                    },
                    descriptionObject: {
                      default:
                        "Accès en téléchargement direct des couches de données constitutives des Schémas d'Orientation Locaux",
                      langfre:
                        "Accès en téléchargement direct des couches de données constitutives des Schémas d'Orientation Locaux",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php',
                    },
                    nameObject: {
                      default: 'Base de données des SOL',
                      langfre: 'Base de données des SOL',
                    },
                    descriptionObject: {
                      default:
                        "Site permettant la recherche des Schémas d'Orientation Locaux",
                      langfre:
                        "Site permettant la recherche des Schémas d'Orientation Locaux",
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default: 'https://codt.wallonie.be/',
                      langfre: 'https://codt.wallonie.be/',
                    },
                    nameObject: {
                      default: "CoDT - Toute l'information",
                      langfre: "CoDT - Toute l'information",
                    },
                    descriptionObject: {
                      default:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                      langfre:
                        "Toute l'information sur le CoDT sur le site de la DGO4",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                  'OGC GeoPackage (.gpkg)',
                ],
                uuid: '679a02c9-7c2c-4132-ab49-32147bd01ce9',
                id: '1613',
                groupOwner: '4',
                op0: ['25', '4', '14684', '1', '14688', '0'],
                op2: ['25', '1', '4'],
                op1: ['25', '4', '1', '14688', '0'],
                op3: ['25', '4', '1', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '4', '1', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '679a02c9-7c2c-4132-ab49-32147bd01ce9',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/4572f901-7d5e-4fe6-931e-ac19c8fc04fe/attachments/lotiss_pic.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default: 'Permis d’urbanisation et lotissements',
                  langfre: 'Permis d’urbanisation et lotissements',
                },
                resourceAbstractObject: {
                  default:
                    "Cette donnée reprend les emprises des lotissements et éléments associés permettant la gestion des permis de lotir en Région wallonne. \n\nUn projet de lotissement consiste à mettre en œuvre une conception urbanistique portant sur un projet d'ensemble relatif à un bien à diviser en au moins trois lots non bâtis destinés à l'habitation.\n\nDans ce cadre, un permis de lotir régit les conditions dans lesquelles le lotissement doit être aménagé et les parcelles peuvent être bâties. L'analyse et la réalisation d'un lotissement est subordonnée à la constitution d'un dossier de demande de permis de lotir. La demande est à adresser à la commune sur laquelle le bien est situé.\n\nLes informations contenues dans les dossiers liés à la gestion des permis de lotir (dont les autorisations antérieures à 1962) sont encodées dans une base de données documentaire. Concernant les permis de lotir, les documents suivants ont été scannés : l’arrêté, le plan du lotissement, les prescriptions urbanistiques et les prescriptions du demandeur.\n\nChaque entité polygonale de la donnée reprend une série d'informations telles que la commune sur laquelle porte le lotissement, le statut du lotissement, le décideur, etc. Un lien hypertexte permet d'accéder à l'ensemble des détails concernant le lotissement interrogé, ce y compris les documents numériques liés, le demandeur, les parcelles concernées, etc.",
                  langfre:
                    "Cette donnée reprend les emprises des lotissements et éléments associés permettant la gestion des permis de lotir en Région wallonne. \n\nUn projet de lotissement consiste à mettre en œuvre une conception urbanistique portant sur un projet d'ensemble relatif à un bien à diviser en au moins trois lots non bâtis destinés à l'habitation.\n\nDans ce cadre, un permis de lotir régit les conditions dans lesquelles le lotissement doit être aménagé et les parcelles peuvent être bâties. L'analyse et la réalisation d'un lotissement est subordonnée à la constitution d'un dossier de demande de permis de lotir. La demande est à adresser à la commune sur laquelle le bien est situé.\n\nLes informations contenues dans les dossiers liés à la gestion des permis de lotir (dont les autorisations antérieures à 1962) sont encodées dans une base de données documentaire. Concernant les permis de lotir, les documents suivants ont été scannés : l’arrêté, le plan du lotissement, les prescriptions urbanistiques et les prescriptions du demandeur.\n\nChaque entité polygonale de la donnée reprend une série d'informations telles que la commune sur laquelle porte le lotissement, le statut du lotissement, le décideur, etc. Un lien hypertexte permet d'accéder à l'ensemble des détails concernant le lotissement interrogé, ce y compris les documents numériques liés, le demandeur, les parcelles concernées, etc.",
                },
                resourceHookAbstractObject: {
                  default:
                    'Cette donnée reprend les emprises des lotissements et éléments associés permettant la gestion des permis de lotir en Région wallonne.',
                  langfre:
                    'Cette donnée reprend les emprises des lotissements et éléments associés permettant la gestion des permis de lotir en Région wallonne.',
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default: "Les conditions générales d'accès s’appliquent.",
                    langfre: "Les conditions générales d'accès s’appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGU.pdf',
                  },
                  {
                    default:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    langfre:
                      "Les conditions générales d'utilisation s'appliquent et sont étendues par les conditions particulières de type A.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CPU-TypeA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Légende de la couche de données',
                      langfre: 'Légende de la couche de données',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=LOT',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=LOT',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Lotissements',
                      langfre:
                        'Application de consultation des données de la DGO4 - Lotissements',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives aux lotissements. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives aux lotissements. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FLOT%2FMapServer%22%2C%22label%22%3A%22Permis%20d%E2%80%99urbanisation%20et%20lotissements%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4572f901-7d5e-4fe6-931e-ac19c8fc04fe%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FLOT%2FMapServer%22%2C%22label%22%3A%22Permis%20d%E2%80%99urbanisation%20et%20lotissements%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F4572f901-7d5e-4fe6-931e-ac19c8fc04fe%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Voir cette donnée sur WalOnMap - Toute la Wallonie à la carte.',
                      langfre:
                        'Voir cette donnée sur WalOnMap - Toute la Wallonie à la carte.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Ce service ESRI-REST permet de visualiser la couche de données "Lotissement"',
                      langfre:
                        'Ce service ESRI-REST permet de visualiser la couche de données "Lotissement"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/LOT/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Ce service WMS permet de visualiser la couche de données "Lotissement"',
                      langfre:
                        'Ce service WMS permet de visualiser la couche de données "Lotissement"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://docum1.wallonie.be/donnees/amenagement/LOTIS/',
                      langfre:
                        'https://docum1.wallonie.be/donnees/amenagement/LOTIS/',
                    },
                    nameObject: {
                      default: 'Téléchargement de la couche de données',
                      langfre: 'Téléchargement de la couche de données',
                    },
                    descriptionObject: {
                      default: 'Accès en téléchargement direct',
                      langfre: 'Accès en téléchargement direct',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI File Geodatabase (.fgdb)',
                  'ESRI Shapefile (.shp)',
                ],
                uuid: '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
                id: '667',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '14688', '0', '14683'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '14688', '0', '14683'],
                op3: ['25', '1', '4', '14688', '0', '14683'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '14688', '0', '14683'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '4572f901-7d5e-4fe6-931e-ac19c8fc04fe',
            },
            {
              origin: 'catalog',
              properties: {
                overview:
                  'https://metawal.wallonie.be/geonetwork/srv/api/records/7fe2f305-1302-4297-b67e-792f55acd834/attachments/pds_codt.png',
                associationType: '',
                resourceTitle: '',
                url: 'https://metawal.wallonie.be/geonetwork/srv/api/records/7fe2f305-1302-4297-b67e-792f55acd834',
                initiativeType: '',
              },
              _source: {
                resourceType: ['dataset'],
                cl_status: [
                  {
                    key: 'onGoing',
                  },
                ],
                resourceTitleObject: {
                  default:
                    'Plan de secteur en vigueur (version coordonnée vectorielle)',
                  langfre:
                    'Plan de secteur en vigueur (version coordonnée vectorielle)',
                },
                resourceAbstractObject: {
                  default:
                    "Le plan de secteur est un outil réglementaire d'aménagement du territoire et d'urbanisme régional wallon constitué de plusieurs couches de données spatiales.\n\nLe plan de secteur organise l'espace territorial wallon et en définit les différentes affectations afin d'assurer le développement des activités humaines de manière harmonieuse et d'éviter la consommation abusive d'espace. Il dispose d'une pleine valeur réglementaire et constitue ainsi la colonne vertébrale d’un développement territorial efficace, cohérent et concerté. Cet aspect est renforcé par la réforme engendrée par l'entrée en vigueur du Code du Développement Territorial (CoDT).\n\nLa Région wallonne est couverte par 23 plans de secteur, adoptés entre 1977 et 1987.\n\nLe plan de secteur est divisé en zones destinées à l'urbanisation (zone d'habitat, de loisirs, d'activité économique, etc.) et en zones non destinées à l'urbanisation (zones agricoles, forestières, espaces verts, etc.). Plusieurs couches de données spatiales constituent le plan de secteur. Elles sont définies dans le CoDT. Outre la détermination des différentes zones d'affectation du territoire wallon, il contient :\n- les limites communales du PdS;\n- les révisions (infrastructures en révision, périmètres de révisions partielles du PdS, mesures d'aménagement, prescriptions supplémentaires);\n- les infrastructures (réseau routier, ferroviaire, voies navigables, lignes électriques haute tension, canalisations);\n- les périmètres de protection (périmètres de liaison écologique, d'intérêt paysager, d'intérêt culture, historique ou esthétique, les points de vue remarquable et leur périmètre, les réservations d'infrastructure principale, les extension de zone d'extraction);\n- la référence au Plan de Secteur d'origine;\n- les étiquettes des secteurs d'aménagement de 1978.\n\nCes différentes couches de données sont présentées sous format vectoriel (point, ligne ou polygone).\n\nSi le plan de secteur a valeur réglementaire, il n’est pas figé pour autant. Les modalités de révision sont formalisées dans des procédures qui ont été simplifiées et rationalisées dans le CoDT. Cette version constitue la version la plus récente des couches de données et intègre les mises à jour faisant suite à la mise en œuvre du CoDT.\n\nA ce jour, la gestion du plan de secteur relève de la Direction de l’Aménagement régional (DAR) qui est en charge de l'outil \"plan de secteur\" : évolution au regard des objectifs régionaux, notamment du développement économique dans une perspective durable, information, sensibilisation, lien avec la planification stratégique régionale et avec les outils communaux. Les révisions sont instruites par la DAR, à l'exception de celles qui ont été attribuées à la cellule de développement territorial (CDT), également dénommée \"ESPACE\", dont la création a été décidée par le Gouvernement wallon le 19 septembre 2005.",
                  langfre:
                    "Le plan de secteur est un outil réglementaire d'aménagement du territoire et d'urbanisme régional wallon constitué de plusieurs couches de données spatiales.\n\nLe plan de secteur organise l'espace territorial wallon et en définit les différentes affectations afin d'assurer le développement des activités humaines de manière harmonieuse et d'éviter la consommation abusive d'espace. Il dispose d'une pleine valeur réglementaire et constitue ainsi la colonne vertébrale d’un développement territorial efficace, cohérent et concerté. Cet aspect est renforcé par la réforme engendrée par l'entrée en vigueur du Code du Développement Territorial (CoDT).\n\nLa Région wallonne est couverte par 23 plans de secteur, adoptés entre 1977 et 1987.\n\nLe plan de secteur est divisé en zones destinées à l'urbanisation (zone d'habitat, de loisirs, d'activité économique, etc.) et en zones non destinées à l'urbanisation (zones agricoles, forestières, espaces verts, etc.). Plusieurs couches de données spatiales constituent le plan de secteur. Elles sont définies dans le CoDT. Outre la détermination des différentes zones d'affectation du territoire wallon, il contient :\n- les limites communales du PdS;\n- les révisions (infrastructures en révision, périmètres de révisions partielles du PdS, mesures d'aménagement, prescriptions supplémentaires);\n- les infrastructures (réseau routier, ferroviaire, voies navigables, lignes électriques haute tension, canalisations);\n- les périmètres de protection (périmètres de liaison écologique, d'intérêt paysager, d'intérêt culture, historique ou esthétique, les points de vue remarquable et leur périmètre, les réservations d'infrastructure principale, les extension de zone d'extraction);\n- la référence au Plan de Secteur d'origine;\n- les étiquettes des secteurs d'aménagement de 1978.\n\nCes différentes couches de données sont présentées sous format vectoriel (point, ligne ou polygone).\n\nSi le plan de secteur a valeur réglementaire, il n’est pas figé pour autant. Les modalités de révision sont formalisées dans des procédures qui ont été simplifiées et rationalisées dans le CoDT. Cette version constitue la version la plus récente des couches de données et intègre les mises à jour faisant suite à la mise en œuvre du CoDT.\n\nA ce jour, la gestion du plan de secteur relève de la Direction de l’Aménagement régional (DAR) qui est en charge de l'outil \"plan de secteur\" : évolution au regard des objectifs régionaux, notamment du développement économique dans une perspective durable, information, sensibilisation, lien avec la planification stratégique régionale et avec les outils communaux. Les révisions sont instruites par la DAR, à l'exception de celles qui ont été attribuées à la cellule de développement territorial (CDT), également dénommée \"ESPACE\", dont la création a été décidée par le Gouvernement wallon le 19 septembre 2005.",
                },
                resourceHookAbstractObject: {
                  default:
                    "Le plan de secteur est un outil réglementaire d'aménagement du territoire et d'urbanisme régional wallon constitué de plusieurs couches de données spatiales.",
                  langfre:
                    "Le plan de secteur est un outil réglementaire d'aménagement du territoire et d'urbanisme régional wallon constitué de plusieurs couches de données spatiales.",
                },
                MD_LegalConstraintsOtherConstraintsObject: [
                  {
                    default:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    langfre:
                      'Licence CC-BY 4.0 : L’utilisateur peut utiliser et modifier les données pour en dériver une œuvre. Il peut publier les données et l’œuvre dérivée à condition de citer les sources.',
                    link: 'https://creativecommons.org/licenses/by/4.0/',
                  },
                  {
                    default:
                      'Source : Service public de Wallonie (SPW) - Plan de secteur en vigueur (version coordonnée vectorielle) (2024-12-09) http://geodata.wallonie.be/id/7fe2f305-1302-4297-b67e-792f55acd834',
                    langfre:
                      'Source : Service public de Wallonie (SPW) - Plan de secteur en vigueur (version coordonnée vectorielle) (2024-12-09) http://geodata.wallonie.be/id/7fe2f305-1302-4297-b67e-792f55acd834',
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                  {
                    default: "Pas de limitation d'accès public à cette donnée.",
                    langfre: "Pas de limitation d'accès public à cette donnée.",
                    link: 'https://geoportail.wallonie.be/files/documents/ConditionsSPW/DataSPW-CGA.pdf',
                  },
                ],
                link: [
                  {
                    protocol: 'WWW:LINK',
                    function: 'legend',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/legend',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/legend',
                    },
                    nameObject: {
                      default: 'Légende du Plan de secteur',
                      langfre: 'Légende du Plan de secteur',
                    },
                    descriptionObject: {
                      default:
                        'Légende associée au plan de secteur (sur base du service de visualisation)',
                      langfre:
                        'Légende associée au plan de secteur (sur base du service de visualisation)',
                    },
                    applicationProfile: '',
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PDS',
                      langfre:
                        'https://geoapps.wallonie.be/webgisdgo4/#VIEWER=PDS',
                    },
                    nameObject: {
                      default:
                        'Application de consultation des données de la DGO4 - Plan de secteur',
                      langfre:
                        'Application de consultation des données de la DGO4 - Plan de secteur',
                    },
                    descriptionObject: {
                      default:
                        "Application dédiée à la consultation des couches de données relatives au Plan de secteur. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                      langfre:
                        "Application dédiée à la consultation des couches de données relatives au Plan de secteur. Cette application constitue un thème de l'application de consultation des données de la DGO4.",
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPDS%2FMapServer%22%2C%22label%22%3A%22Plan%20de%20secteur%20en%20vigueur%20%28version%20coordonn%C3%A9e%20vectorielle%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F7fe2f305-1302-4297-b67e-792f55acd834%22%7D%5D',
                      langfre:
                        'https://geoportail.wallonie.be/walonmap#PANIER=%5B%7B%22serviceId%22%3A%221%22%2C%22visible%22%3Atrue%2C%22url%22%3A%22https%3A%2F%2Fgeoservices.wallonie.be%2Farcgis%2Frest%2Fservices%2FAMENAGEMENT_TERRITOIRE%2FPDS%2FMapServer%22%2C%22label%22%3A%22Plan%20de%20secteur%20en%20vigueur%20%28version%20coordonn%C3%A9e%20vectorielle%29%22%2C%22type%22%3A%22AGS_DYNAMIC%22%2C%22metadataUrl%22%3A%22https%3A%2F%2Fgeodata.wallonie.be%2Fdoc%2F7fe2f305-1302-4297-b67e-792f55acd834%22%7D%5D',
                    },
                    nameObject: {
                      default:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                      langfre:
                        'Application WalOnMap - Toute la Wallonie à la carte',
                    },
                    descriptionObject: {
                      default:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                      langfre:
                        'Application cartographique du Geoportail (WalOnMap) qui permet de découvrir les données géographiques de la Wallonie.',
                    },
                    function: 'browsing',
                    applicationProfile: 'WalOnMap',
                    group: 0,
                  },
                  {
                    protocol: 'ESRI:REST',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer',
                    },
                    nameObject: {
                      default: 'Service de visualisation ESRI-REST',
                      langfre: 'Service de visualisation ESRI-REST',
                    },
                    descriptionObject: {
                      default:
                        'Ce service ESRI-REST permet de visualiser la série de couches de données "Plan de secteur"',
                      langfre:
                        'Ce service ESRI-REST permet de visualiser la série de couches de données "Plan de secteur"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'OGC:WMS',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                      langfre:
                        'https://geoservices.wallonie.be/arcgis/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/WMSServer?request=GetCapabilities&service=WMS',
                    },
                    nameObject: {
                      default: 'Service de visualisation WMS',
                      langfre: 'Service de visualisation WMS',
                    },
                    descriptionObject: {
                      default:
                        'Ce service WMS permet de visualiser la série de couches de données "Plan de secteur"',
                      langfre:
                        'Ce service WMS permet de visualiser la série de couches de données "Plan de secteur"',
                    },
                    function: 'browsing',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=modif_ps',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_thema/index.php?thema=modif_ps',
                    },
                    nameObject: {
                      default: 'Base de données du Plan de secteur',
                      langfre: 'Base de données du Plan de secteur',
                    },
                    descriptionObject: {
                      default:
                        'Site permettant la recherche de Plans de secteur et des modifications dans la base de données',
                      langfre:
                        'Site permettant la recherche de Plans de secteur et des modifications dans la base de données',
                    },
                    function: 'search',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                      langfre:
                        'https://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese',
                    },
                    nameObject: {
                      default:
                        'Inventaire des données géographiques de la DGO4',
                      langfre:
                        'Inventaire des données géographiques de la DGO4',
                    },
                    descriptionObject: {
                      default:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                      langfre:
                        'Inventaire des données géographiques produites ou exploitées à la DGO4.',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:LINK',
                    mimeType: '',
                    urlObject: {
                      default:
                        'http://spw.wallonie.be/dgo4/site_amenagement/site/directions/dar',
                      langfre:
                        'http://spw.wallonie.be/dgo4/site_amenagement/site/directions/dar',
                    },
                    nameObject: {
                      default: "La Direction de l'Aménagement Régional",
                      langfre: "La Direction de l'Aménagement Régional",
                    },
                    descriptionObject: {
                      default:
                        "Site de la Direction de l'Aménagement Régional (DAR)",
                      langfre:
                        "Site de la Direction de l'Aménagement Régional (DAR)",
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                  {
                    protocol: 'WWW:DOWNLOAD-1.0-http--download',
                    mimeType: '',
                    urlObject: {
                      default:
                        'https://geoservices.wallonie.be/geotraitement/spwdatadownload/get/7fe2f305-1302-4297-b67e-792f55acd834/PDS_SHAPE_31370.zip',
                      langfre:
                        'https://geoservices.wallonie.be/geotraitement/spwdatadownload/get/7fe2f305-1302-4297-b67e-792f55acd834/PDS_SHAPE_31370.zip',
                    },
                    nameObject: {
                      default: 'Plan de Secteur au format SHP',
                      langfre: 'Plan de Secteur au format SHP',
                    },
                    descriptionObject: {
                      default:
                        'Dossier compressé contenant le jeu de données du Plan de Secteur au format shapefile en coordonnées Lambert 72',
                      langfre:
                        'Dossier compressé contenant le jeu de données du Plan de Secteur au format shapefile en coordonnées Lambert 72',
                    },
                    function: 'information',
                    applicationProfile: '',
                    group: 0,
                  },
                ],
                format: [
                  'ESRI Shapefile (.shp)',
                  'ESRI File Geodatabase (.fgdb)',
                ],
                uuid: '7fe2f305-1302-4297-b67e-792f55acd834',
                id: '1504',
                groupOwner: '4',
                op0: ['25', '1', '4', '14684', '0', '14688'],
                op2: ['25', '1', '4'],
                op1: ['25', '1', '4', '0', '14688'],
                op3: ['25', '1', '4', '0', '14688'],
                op6: ['25', '1', '4'],
                op5: ['25', '1', '4', '0', '14688'],
                edit: true,
                canReview: false,
                owner: false,
                isPublishedToAll: true,
                view: true,
                notify: true,
                download: true,
                dynamic: true,
                featured: true,
              },
              _id: '7fe2f305-1302-4297-b67e-792f55acd834',
            },
          ],
          associated: [],
        },
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
        _score: 1.0,
        _ignored: [
          'resourceAbstractObject.default.keyword',
          'resourceAbstractObject.langfre.keyword',
          'resourceAbstractObject.default.sort',
        ],
        _source: {
          contactForResource: [
            {
              website: '',
              role: 'author',
              address: '',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Réseau Ongulés sauvages OFB-FNC-FDC',
                langfre: 'Réseau Ongulés sauvages OFB-FNC-FDC',
              },
              email: 'reseau.ongules-sauvages@ofb.gouv.fr',
            },
            {
              website: '',
              role: 'owner',
              address: '',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Office France de la Biodiversité',
                langfre: 'Office France de la Biodiversité',
              },
              email: 'reseau.ongules-sauvages@ofb.gouv.fr',
            },
            {
              website: '',
              role: 'owner',
              address: '',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Fédération Nationale de la Chasse',
                langfre: 'Fédération Nationale de la Chasse',
              },
              email: '',
            },
            {
              website: '',
              role: 'resourceProvider',
              address: '',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Fédération Départementale de la Chasse',
                langfre: 'Fédération Départementale de la Chasse',
              },
              email: '',
            },
          ],
          geom: {
            coordinates: [
              [
                [-7.3131, 40.4671],
                [11.9303, 40.4671],
                [11.9303, 51.7141],
                [-7.3131, 51.7141],
                [-7.3131, 40.4671],
              ],
            ],
            type: 'Polygon',
          },
          resourceProviderOrgForResourceObject: {
            default: 'Fédération Départementale de la Chasse',
            langfre: 'Fédération Départementale de la Chasse',
          },
          inspireTheme: ['species distribution', 'administrative units'],
          isPublishedToAll: 'true',
          'th_excel2skos-case-usage-thematique-2023-06-08Number': '2',
          record: 'record',
          draft: 'n',
          id: '19436',
          metadataIdentifier: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
          recordLink: [
            {
              origin: 'remote',
              to: '67c60362-0461-4574-8975-f4e7cfa64d20',
              type: 'sources',
              title:
                'Répartition des ongulés sauvages en France (données depuis 1980)',
              url: 'https://data.ofb.fr/catalogue/Donnees-geographiques-OFB/fre/csw?service=CSW&request=GetRecordById&version=2.0.2&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=67c60362-0461-4574-8975-f4e7cfa64d20',
            },
          ],
          linkUrlProtocolWWWLINK10httplink: [
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOM',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOC',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_ISA',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_CHA',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOQ',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOI',
          ],
          hasInspireTheme: 'true',
          hassource: '67c60362-0461-4574-8975-f4e7cfa64d20',
          inspireThemeNumber: '2',
          hasxlinks: 'true',
          tagNumber: '10',
          featureOfRecord: 'record',
          isPublishedToGuest: 'false',
          dateStamp: '2024-09-26T13:34:25.803Z',
          creationYearForResource: '2024',
          th_gemet: [
            {
              default: 'espèce animale',
              link: 'http://www.eionet.europa.eu/gemet/concept/10073',
              langfre: 'espèce animale',
            },
            {
              default: 'chasse',
              link: 'http://www.eionet.europa.eu/gemet/concept/4072',
              langfre: 'chasse',
            },
          ],
          ownerOrgForResourceObject: [
            {
              default: 'Office France de la Biodiversité',
              langfre: 'Office France de la Biodiversité',
            },
            {
              default: 'Fédération Nationale de la Chasse',
              langfre: 'Fédération Nationale de la Chasse',
            },
          ],
          isTemplate: 'n',
          creationMonthForResource: '2024-05',
          'th_httpinspireeceuropaeutheme-themeNumber': '2',
          OrgForResourceObject: [
            {
              default: 'Réseau Ongulés sauvages OFB-FNC-FDC',
              langfre: 'Réseau Ongulés sauvages OFB-FNC-FDC',
            },
            {
              default: 'Office France de la Biodiversité',
              langfre: 'Office France de la Biodiversité',
            },
            {
              default: 'Fédération Nationale de la Chasse',
              langfre: 'Fédération Nationale de la Chasse',
            },
            {
              default: 'Fédération Départementale de la Chasse',
              langfre: 'Fédération Départementale de la Chasse',
            },
          ],
          recordOwner: 'Vincent Fabry',
          document: '',
          resourceTemporalDateRange: [
            {
              gte: '2024-05-27T00:00:00.000Z',
              lte: '2024-05-27T00:00:00.000Z',
            },
          ],
          OrgObject: {
            default: 'Office français de la biodiversité',
            langfre: 'Office français de la biodiversité',
          },
          mainLanguage: 'fre',
          'th_excel2skos-case-usage-geographie-2023-11-24': [
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
          ],
          valid: '-1',
          groupPublishedId: '1',
          popularity: 9,
          qualityScore: 62,
          'th_httpinspireeceuropaeutheme-theme': [
            {
              default: 'Répartition des espèces',
              link: 'http://inspire.ec.europa.eu/theme/sd',
              langfre: 'Répartition des espèces',
            },
            {
              default: 'Unités administratives',
              link: 'http://inspire.ec.europa.eu/theme/au',
              langfre: 'Unités administratives',
            },
          ],
          createDate: '2024-09-13T10:12:38.614Z',
          docType: 'metadata',
          creationDateForResource: ['2024-05-27T00:00:00.000Z'],
          th_gemetNumber: '2',
          resourceType: ['interactiveMap'],
          linkProtocol: [
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--link',
          ],
          inspireAnnex: ['iii', 'i'],
          rating: '0',
          inspireThemeUri: [
            'http://inspire.ec.europa.eu/theme/sd',
            'http://inspire.ec.europa.eu/theme/au',
          ],
          uuid: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
          resourceLanguage: ['fre'],
          cl_type: [
            {
              default: 'Thème',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
              key: 'theme',
              langfre: 'Thème',
            },
          ],
          contact: [
            {
              website: '',
              role: 'pointOfContact',
              address: '',
              individual: '',
              phone: '',
              logo: '',
              position: '',
              organisationObject: {
                default: 'Office français de la biodiversité',
                langfre: 'Office français de la biodiversité',
              },
              email: 'cartotheque@ofb.gouv.fr',
            },
          ],
          linkUrl: [
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOM',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOC',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_ISA',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_CHA',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOQ',
            'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOI',
          ],
          changeDate: '2024-09-26T13:34:25.803Z',
          logo: '/images/logos/c3f93209-4363-4e30-bec2-3cc43bd7a8a7.png',
          tag: [
            {
              default: 'Tableaux de chasse',
              langfre: 'Tableaux de chasse',
            },
            {
              default: 'Ongulés',
              langfre: 'Ongulés',
            },
            {
              default: 'Départements',
              langfre: 'Départements',
            },
            {
              default: 'Répartition des espèces',
              langfre: 'Répartition des espèces',
              key: 'http://inspire.ec.europa.eu/theme/sd',
            },
            {
              default: 'Unités administratives',
              langfre: 'Unités administratives',
              key: 'http://inspire.ec.europa.eu/theme/au',
            },
            {
              default: 'espèce animale',
              langfre: 'espèce animale',
              key: 'http://www.eionet.europa.eu/gemet/concept/10073',
            },
            {
              default: 'chasse',
              langfre: 'chasse',
              key: 'http://www.eionet.europa.eu/gemet/concept/4072',
            },
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
            {
              default: 'réseaux',
              langfre: 'réseaux',
            },
            {
              default: 'espèces',
              langfre: 'espèces',
            },
          ],
          indexingError: 'true',
          recordGroup: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
          isPublishedToIntranet: 'false',
          inspireTheme_syn: [
            'Répartition des espèces',
            'Unités administratives',
          ],
          th_gemet_tree: {
            default: [
              'aspects sociaux, population',
              'aspects sociaux, population^loisirs',
              'aspects sociaux, population^loisirs^chasse',
              'aspects sociaux, population^récréation',
              'aspects sociaux, population^récréation^loisirs',
              'aspects sociaux, population^récréation^loisirs^chasse',
              'biologie',
              'biologie^biosphère',
              'biologie^biosphère^écologie',
              'biologie^biosphère^écologie^paramètre écologique',
              'biologie^biosphère^écologie^paramètre écologique^espèce',
              'biologie^biosphère^écologie^paramètre écologique^espèce^espèce animale',
              'biologie^espèce',
              'biologie^espèce animale',
              'biologie^espèce^espèce animale',
              'biologie^paramètre écologique',
              'biologie^paramètre écologique^espèce',
              'biologie^paramètre écologique^espèce^espèce animale',
              'biologie^sciences de la vie',
              'biologie^sciences de la vie^écologie',
              'biologie^sciences de la vie^écologie^paramètre écologique',
              'biologie^sciences de la vie^écologie^paramètre écologique^espèce',
              'biologie^sciences de la vie^écologie^paramètre écologique^espèce^espèce animale',
              'biologie^écologie',
              'biologie^écologie^paramètre écologique',
              'biologie^écologie^paramètre écologique^espèce',
              'biologie^écologie^paramètre écologique^espèce^espèce animale',
              'recherche',
              'recherche^paramètre écologique',
              'recherche^paramètre écologique^espèce',
              'recherche^paramètre écologique^espèce^espèce animale',
              'recherche^science',
              'recherche^science^sciences naturelles',
              'recherche^science^sciences naturelles^sciences de la vie',
              'recherche^science^sciences naturelles^sciences de la vie^écologie',
              'recherche^science^sciences naturelles^sciences de la vie^écologie^paramètre écologique',
              'recherche^science^sciences naturelles^sciences de la vie^écologie^paramètre écologique^espèce',
              'recherche^science^sciences naturelles^sciences de la vie^écologie^paramètre écologique^espèce^espèce animale',
              'recherche^sciences de la vie',
              'recherche^sciences de la vie^écologie',
              'recherche^sciences de la vie^écologie^paramètre écologique',
              'recherche^sciences de la vie^écologie^paramètre écologique^espèce',
              'recherche^sciences de la vie^écologie^paramètre écologique^espèce^espèce animale',
              'recherche^sciences naturelles',
              'recherche^sciences naturelles^sciences de la vie',
              'recherche^sciences naturelles^sciences de la vie^écologie',
              'recherche^sciences naturelles^sciences de la vie^écologie^paramètre écologique',
              'recherche^sciences naturelles^sciences de la vie^écologie^paramètre écologique^espèce',
              'recherche^sciences naturelles^sciences de la vie^écologie^paramètre écologique^espèce^espèce animale',
              'recherche^écologie',
              'recherche^écologie^paramètre écologique',
              'recherche^écologie^paramètre écologique^espèce',
              'recherche^écologie^paramètre écologique^espèce^espèce animale',
              'santé humaine',
              'santé humaine^récréation',
              'santé humaine^récréation^loisirs',
              'santé humaine^récréation^loisirs^chasse',
              'sylviculture',
              'sylviculture^chasse',
              'tourisme',
              'tourisme^chasse',
              'tourisme^loisirs',
              'tourisme^loisirs^chasse',
              'tourisme^récréation',
              'tourisme^récréation^loisirs',
              'tourisme^récréation^loisirs^chasse',
              'zones naturelles, paysages, écosystèmes',
              'zones naturelles, paysages, écosystèmes^paramètre écologique',
              'zones naturelles, paysages, écosystèmes^paramètre écologique^espèce',
              'zones naturelles, paysages, écosystèmes^paramètre écologique^espèce^espèce animale',
            ],
            key: [
              'http://www.eionet.europa.eu/gemet/theme/14',
              'http://www.eionet.europa.eu/gemet/theme/14^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/17',
              'http://www.eionet.europa.eu/gemet/theme/17^http://www.eionet.europa.eu/gemet/concept/7001',
              'http://www.eionet.europa.eu/gemet/theme/17^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767',
              'http://www.eionet.europa.eu/gemet/theme/17^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/23',
              'http://www.eionet.europa.eu/gemet/theme/23^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/23^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/23^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/29',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/4767',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/4767^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/7001',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767',
              'http://www.eionet.europa.eu/gemet/theme/29^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/30',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/4805',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/30^http://www.eionet.europa.eu/gemet/concept/7472^http://www.eionet.europa.eu/gemet/concept/5524^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/34',
              'http://www.eionet.europa.eu/gemet/theme/34^http://www.eionet.europa.eu/gemet/concept/4767',
              'http://www.eionet.europa.eu/gemet/theme/34^http://www.eionet.europa.eu/gemet/concept/4767^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/34^http://www.eionet.europa.eu/gemet/concept/7001',
              'http://www.eionet.europa.eu/gemet/theme/34^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767',
              'http://www.eionet.europa.eu/gemet/theme/34^http://www.eionet.europa.eu/gemet/concept/7001^http://www.eionet.europa.eu/gemet/concept/4767^http://www.eionet.europa.eu/gemet/concept/4072',
              'http://www.eionet.europa.eu/gemet/theme/4',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/4805',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/4805^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/892',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/892^http://www.eionet.europa.eu/gemet/concept/2470',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/892^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/892^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982',
              'http://www.eionet.europa.eu/gemet/theme/4^http://www.eionet.europa.eu/gemet/concept/892^http://www.eionet.europa.eu/gemet/concept/2470^http://www.eionet.europa.eu/gemet/concept/2457^http://www.eionet.europa.eu/gemet/concept/7982^http://www.eionet.europa.eu/gemet/concept/10073',
            ],
          },
          'th_excel2skos-case-usage-geographie-2023-11-24Number': '1',
          documentStandard: 'iso19139',
          resourceAbstractObject: {
            default:
              "----------------------------\nContexte & objectifs\n----------------------------\n\nDans le cadre de ses missions, l’OFB (anciennement l’ONC puis l’ONCFS) réalise le suivi des populations de grands ongulés sauvages en France métropolitaine. \nPour réaliser cette tâche complexe un réseau de correspondants départementaux, l’actuel réseau « Ongulés sauvages OFB-FNC-FDC » a été créée en 1985, et fonctionne grâce à la collaboration entre l’OFB et les fédérations nationale (FNC) et départementales des chasseurs (FDC). \n\nLes données ont été compilées à partir des données fournies par les Interlocuteurs techniques des FDC du Réseau Ongulés sauvages OFB-FNC-FDC pour toutes les espèces d'ongulés sauvages présentes en France métropolitaine.\n\n----------------------------\nLes espèces concernées\n----------------------------\n\nLes espèces concernées sont les suivantes : \nBouquetin des Alpes (Capra ibex)\nBouquetin ibérique (Capra pyrenaica)\nCerf élaphe (Cervus elaphus)\nCerf sika (Cervus nippon)\nChamois (Rupicapra rupicapra)\nDaim (Dama dama)\nIsard (Rupicapra pyrenaica)\nMouflon de Corse (Ovis gmelinii musimon)\nMouflon méditerranéen (Ovis gmelini musimon x Ovis sp.)\nMuntjac de Chine (Muntiacus reevesi)\net le Mouflon à manchettes (Ammotragus lervia).\n\n----------------------------\nProtocole et limites d'utilisations \n----------------------------\nLa méthode se basant sur des connaissances locales de la présence de populations établies par des professionnels connaissant bien leur territoire, la notion d’échantillonnage qualifiée d’\"exhaustif\" est crédible.\nLe travail est réalisé par unité de population, c’est-à-dire par secteur occupé par au minimum un groupe d’individus adultes susceptibles de se rencontrer et d’établir entre eux des rapports sociaux et génétiques (reproduction). Il peut donc exister des individus isolés présents en dehors des zones délimitées par ce programme.\nPour des raisons administratives l’inventaire est fait par département. Ainsi pour une population à cheval sur plusieurs départements chaque portion départementale constitue une zone. Un département peut abriter plusieurs zones. \nLes données sont vérifiées, harmonisées et validées par l’administrateur(rice) national(e) du réseau tous les 5 ans (avec un rythme différents selon les espèces).\n\n----------------------------\nFréquence de mise à jour\n----------------------------\n\npériodique \n\n----------------------------\nOutils\n----------------------------\n\nLes données de chacune de ces espèces sont consultables sur la carte interactive de l'espèce. créées à partir de l'outil Lizmap.",
            langfre:
              "----------------------------\nContexte & objectifs\n----------------------------\n\nDans le cadre de ses missions, l’OFB (anciennement l’ONC puis l’ONCFS) réalise le suivi des populations de grands ongulés sauvages en France métropolitaine. \nPour réaliser cette tâche complexe un réseau de correspondants départementaux, l’actuel réseau « Ongulés sauvages OFB-FNC-FDC » a été créée en 1985, et fonctionne grâce à la collaboration entre l’OFB et les fédérations nationale (FNC) et départementales des chasseurs (FDC). \n\nLes données ont été compilées à partir des données fournies par les Interlocuteurs techniques des FDC du Réseau Ongulés sauvages OFB-FNC-FDC pour toutes les espèces d'ongulés sauvages présentes en France métropolitaine.\n\n----------------------------\nLes espèces concernées\n----------------------------\n\nLes espèces concernées sont les suivantes : \nBouquetin des Alpes (Capra ibex)\nBouquetin ibérique (Capra pyrenaica)\nCerf élaphe (Cervus elaphus)\nCerf sika (Cervus nippon)\nChamois (Rupicapra rupicapra)\nDaim (Dama dama)\nIsard (Rupicapra pyrenaica)\nMouflon de Corse (Ovis gmelinii musimon)\nMouflon méditerranéen (Ovis gmelini musimon x Ovis sp.)\nMuntjac de Chine (Muntiacus reevesi)\net le Mouflon à manchettes (Ammotragus lervia).\n\n----------------------------\nProtocole et limites d'utilisations \n----------------------------\nLa méthode se basant sur des connaissances locales de la présence de populations établies par des professionnels connaissant bien leur territoire, la notion d’échantillonnage qualifiée d’\"exhaustif\" est crédible.\nLe travail est réalisé par unité de population, c’est-à-dire par secteur occupé par au minimum un groupe d’individus adultes susceptibles de se rencontrer et d’établir entre eux des rapports sociaux et génétiques (reproduction). Il peut donc exister des individus isolés présents en dehors des zones délimitées par ce programme.\nPour des raisons administratives l’inventaire est fait par département. Ainsi pour une population à cheval sur plusieurs départements chaque portion départementale constitue une zone. Un département peut abriter plusieurs zones. \nLes données sont vérifiées, harmonisées et validées par l’administrateur(rice) national(e) du réseau tous les 5 ans (avec un rythme différents selon les espèces).\n\n----------------------------\nFréquence de mise à jour\n----------------------------\n\npériodique \n\n----------------------------\nOutils\n----------------------------\n\nLes données de chacune de ces espèces sont consultables sur la carte interactive de l'espèce. créées à partir de l'outil Lizmap.",
          },
          feedbackCount: '0',
          isHarvested: 'true',
          xlink: [
            'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08',
            'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-geographie-2023-11-24',
            'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet',
            'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme',
            'https://data.ofb.fr/catalogue/Donnees-geographiques-OFB/fre/csw?service=CSW&request=GetRecordById&version=2.0.2&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=67c60362-0461-4574-8975-f4e7cfa64d20',
          ],
          inspireThemeFirst_syn: 'Répartition des espèces',
          isOpenData: 'false',
          'th_otherKeywords-theme': [
            {
              default: 'Tableaux de chasse',
              langfre: 'Tableaux de chasse',
            },
            {
              default: 'Ongulés',
              langfre: 'Ongulés',
            },
            {
              default: 'Départements',
              langfre: 'Départements',
            },
          ],
          link: [
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap',
              },
              nameObject: {
                default: 'Carte dynamique de répartition du Cerf élaphe',
                langfre: 'Carte dynamique de répartition du Cerf élaphe',
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOM',
              },
              nameObject: {
                default:
                  'Carte dynamique de répartition du Mouflon méditerranéen',
                langfre:
                  'Carte dynamique de répartition du Mouflon méditerranéen',
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOC',
              },
              nameObject: {
                default: 'Carte dynamique de répartition du Mouflon de Corse',
                langfre: 'Carte dynamique de répartition du Mouflon de Corse',
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_ISA',
              },
              nameObject: {
                default: "Carte dynamique de répartition de l'ISARD",
                langfre: "Carte dynamique de répartition de l'ISARD",
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_CHA',
              },
              nameObject: {
                default: 'Carte dynamique de répartition du Chamois',
                langfre: 'Carte dynamique de répartition du Chamois',
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOQ',
              },
              nameObject: {
                default:
                  'Carte dynamique de répartition du Bouquetin des Alpes',
                langfre:
                  'Carte dynamique de répartition du Bouquetin des Alpes',
              },
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              function: '',
              applicationProfile: '',
              mimeType: '',
              urlObject: {
                default:
                  'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOI',
              },
              nameObject: {
                default: 'Carte dynamique de répartition du Bouquetin ibérique',
                langfre: 'Carte dynamique de répartition du Bouquetin ibérique',
              },
              group: 0,
            },
          ],
          displayOrder: '0',
          cl_hierarchyLevel: [
            {
              default: 'Carte interactive',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
              key: 'interactiveMap',
              langfre: 'Carte interactive',
            },
          ],
          inspireThemeFirst: 'species distribution',
          harvesterUuid: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
          indexingDate: '2025-01-22T15:31:09.881Z',
          resourceDate: [
            {
              date: '2024-05-27T00:00:00.000Z',
              type: 'creation',
            },
          ],
          sourceCatalogue: 'c3f93209-4363-4e30-bec2-3cc43bd7a8a7',
          groupPublished: 'all',
          extra: 'null',
          hasOverview: 'true',
          userinfo: 'vfabry|Fabry|Vincent|Administrator',
          'th_excel2skos-case-usage-thematique-2023-06-08': [
            {
              default: 'réseaux',
              langfre: 'réseaux',
            },
            {
              default: 'espèces',
              langfre: 'espèces',
            },
          ],
          allKeywords: {
            th_gemet: {
              keywords: [
                {
                  default: 'espèce animale',
                  link: 'http://www.eionet.europa.eu/gemet/concept/10073',
                  langfre: 'espèce animale',
                },
                {
                  default: 'chasse',
                  link: 'http://www.eionet.europa.eu/gemet/concept/4072',
                  langfre: 'chasse',
                },
              ],
              link: 'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet',
              theme: 'theme',
              id: 'geonetwork.thesaurus.external.theme.gemet',
              title: 'GEMET',
            },
            'th_otherKeywords-theme': {
              keywords: [
                {
                  default: 'Tableaux de chasse',
                  langfre: 'Tableaux de chasse',
                },
                {
                  default: 'Ongulés',
                  langfre: 'Ongulés',
                },
                {
                  default: 'Départements',
                  langfre: 'Départements',
                },
              ],
              theme: 'theme',
              title: 'otherKeywords-theme',
            },
            'th_httpinspireeceuropaeutheme-theme': {
              keywords: [
                {
                  default: 'Répartition des espèces',
                  link: 'http://inspire.ec.europa.eu/theme/sd',
                  langfre: 'Répartition des espèces',
                },
                {
                  default: 'Unités administratives',
                  link: 'http://inspire.ec.europa.eu/theme/au',
                  langfre: 'Unités administratives',
                },
              ],
              link: 'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme',
              theme: 'theme',
              id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
              title: 'GEMET - INSPIRE themes, version 1.0',
            },
            'th_excel2skos-case-usage-geographie-2023-11-24': {
              keywords: [
                {
                  default: 'France métropolitaine',
                  langfre: 'France métropolitaine',
                },
              ],
              link: 'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-geographie-2023-11-24',
              theme: 'theme',
              id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-geographie-2023-11-24',
              title: 'Thesaurus géographique',
            },
            'th_excel2skos-case-usage-thematique-2023-06-08': {
              keywords: [
                {
                  default: 'réseaux',
                  langfre: 'réseaux',
                },
                {
                  default: 'espèces',
                  langfre: 'espèces',
                },
              ],
              link: 'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08',
              theme: 'theme',
              id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08',
              title: 'Thématique OFB',
            },
          },
          owner: '2161',
          overview: [
            {
              url: 'https://data.ofb.fr/catalogue/Donnees-geographiques-OFB/api/records/7eb795c2-d612-4b5e-b15e-d985b0f4e697/attachments/OFB.png',
            },
          ],
          indexingErrorMsg: [
            'Warning / Keyword France métropolitaine not found in geonetwork.thesaurus.external.theme.excel2skos-case-usage-geographie-2023-11-24.',
            'Warning / Keyword réseaux not found in geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08.',
            'Warning / Keyword espèces not found in geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08.',
          ],
          groupOwner: '1855168',
          pointOfContactOrgObject: {
            default: 'Office français de la biodiversité',
            langfre: 'Office français de la biodiversité',
          },
          resourceTitleObject: {
            default:
              'Carte dynamique sur la répartition des ongulés sauvages en France',
            langfre:
              'Carte dynamique sur la répartition des ongulés sauvages en France',
          },
          'th_otherKeywords-themeNumber': '3',
          authorOrgForResourceObject: {
            default: 'Réseau Ongulés sauvages OFB-FNC-FDC',
            langfre: 'Réseau Ongulés sauvages OFB-FNC-FDC',
          },
          'th_httpinspireeceuropaeutheme-theme_tree': {
            default: ['Répartition des espèces', 'Unités administratives'],
            key: [
              'http://inspire.ec.europa.eu/theme/au',
              'http://inspire.ec.europa.eu/theme/sd',
            ],
          },
          cl_presentationForm: [
            {
              default: 'Carte numérique',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_PresentationFormCode',
              key: 'mapDigital',
              langfre: 'Carte numérique',
            },
          ],
          location: '46.0906,2.3086',
          'keywordType-theme': [
            {
              default: 'Tableaux de chasse',
              langfre: 'Tableaux de chasse',
            },
            {
              default: 'Ongulés',
              langfre: 'Ongulés',
            },
            {
              default: 'Départements',
              langfre: 'Départements',
            },
            {
              default: 'Répartition des espèces',
              link: 'http://inspire.ec.europa.eu/theme/sd',
              langfre: 'Répartition des espèces',
            },
            {
              default: 'Unités administratives',
              link: 'http://inspire.ec.europa.eu/theme/au',
              langfre: 'Unités administratives',
            },
            {
              default: 'espèce animale',
              link: 'http://www.eionet.europa.eu/gemet/concept/10073',
              langfre: 'espèce animale',
            },
            {
              default: 'chasse',
              link: 'http://www.eionet.europa.eu/gemet/concept/4072',
              langfre: 'chasse',
            },
            {
              default: 'France métropolitaine',
              langfre: 'France métropolitaine',
            },
            {
              default: 'réseaux',
              langfre: 'réseaux',
            },
            {
              default: 'espèces',
              langfre: 'espèces',
            },
          ],
          inspireAnnexForFirstTheme: 'iii',
          userSavedCount: '0',
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'be209d24-586f-48f5-b944-e284079b7823',
        _score: 6.543295,
        _ignored: [
          'resourceAbstractObject.default.keyword',
          'resourceAbstractObject.langfre.keyword',
          'resourceAbstractObject.langger.keyword',
          'resourceAbstractObject.langeng.keyword',
        ],
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: 'be209d24-586f-48f5-b944-e284079b7823',
          standardNameObject: {
            default: 'ISO 19115:2003/19139',
            langfre: 'ISO 19115:2003/19139',
          },
          standardVersionObject: {
            default: '1.0',
            langfre: '1.0',
          },
          resourceTypeNameObject: {
            default: 'Parent',
            langfre: 'Parent',
          },
          indexingDate: '2025-01-23T10:16:01.721Z',
          dateStamp: '2024-01-25T07:44:42.137504Z',
          mainLanguage: 'fre',
          otherLanguage: ['ger', 'eng', 'fre'],
          otherLanguageId: ['DE', 'EN', 'FR'],
          cl_characterSet: [
            {
              key: 'utf8',
              default: 'Utf8',
              langfre: 'Utf8',
              langger: 'Utf8',
              langeng: 'UTF8',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode',
            },
          ],
          resourceType: ['interactiveMap'],
          Org: 'TRION-climate / GeoRhena',
          distributorOrg: 'TRION-climate / GeoRhena',
          contact: [
            {
              organisation: 'TRION-climate / GeoRhena',
              role: 'distributor',
              email: '',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          cl_hierarchyLevel: [
            {
              key: 'interactiveMap',
              default: 'Carte interactive',
              langfre: 'Carte interactive',
              langger: 'Interactive map',
              langeng: 'Interactive map',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
            },
          ],
          cl_presentationForm: [
            {
              key: 'mapDigital',
              default: 'Carte numérique',
              langfre: 'Carte numérique',
              langger: 'Digitale Karte',
              langeng: 'Digital map',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_PresentationFormCode',
            },
          ],
          cl_status: [
            {
              key: 'completed',
              default: 'Finalisé',
              langfre: 'Finalisé',
              langger: 'Abgeschlossen',
              langeng: 'Completed',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode',
            },
          ],
          cl_type: [
            {
              key: 'theme',
              default: 'Thème',
              langfre: 'Thème',
              langger: 'Thema',
              langeng: 'Theme',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
            },
          ],
          resourceTitleObject: {
            default:
              'Production, usages, recherche et distribution de l’hydrogène dans le Rhin Supérieur',
            langfre:
              'Production, usages, recherche et distribution de l’hydrogène dans le Rhin Supérieur',
            langger:
              'Herstellung, Verwendung, Forschung und Verteilung von Wasserstoff am Oberrhein',
            langeng:
              'Hydrogen production, use, research and distribution in the Upper Rhine region',
          },
          publicationDateForResource: ['2023-12-20T14:23:54.000Z'],
          publicationYearForResource: '2023',
          publicationMonthForResource: '2023-12',
          resourceDate: [
            {
              type: 'publication',
              date: '2023-12-20T14:23:54.000Z',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2023-12-20T14:23:54.000Z',
              lte: '2023-12-20T14:23:54.000Z',
            },
          ],
          resourceAbstractObject: {
            default:
              'Dans le cadre du projet Interreg CO2-InnO, TRION-climat a recensé et décrit environ 50 projets sur l’hydrogène dans le Rhin supérieur. On retrouve ainsi les différents sites de production d’hydrogène, les principaux projets de recherche, les réseaux de transport et de distribution ainsi que les grands consommateurs d’hydrogène vert de la région. GeoRhena, le système d’information géographique du Rhin supérieur, a présenté ces installations sur une carte interactive des installations et projets de l’hydrogène.',
            langfre:
              'Dans le cadre du projet Interreg CO2-InnO, TRION-climat a recensé et décrit environ 50 projets sur l’hydrogène dans le Rhin supérieur. On retrouve ainsi les différents sites de production d’hydrogène, les principaux projets de recherche, les réseaux de transport et de distribution ainsi que les grands consommateurs d’hydrogène vert de la région. GeoRhena, le système d’information géographique du Rhin supérieur, a présenté ces installations sur une carte interactive des installations et projets de l’hydrogène.',
            langger:
              'Im Rahmen des Interreg-Projekts CO2-InnO hat TRION-climate rund 50 Wasserstoffprojekte am Oberrhein erfasst und beschrieben. Auf diese Weise findet man die verschiedenen Standorte der Wasserstoffproduktion, die wichtigsten Forschungsprojekte, die Transport- und Verteilungsnetze sowie die großen Abnehmer von grünem Wasserstoff in der Region. GeoRhena, das Geoinformationssystem des Oberrheins, präsentierte diese Anlagen auf einer interaktiven Karte der Wasserstoffanlagen und -projekte.',
            langeng:
              "As part of the Interreg CO2-InnO project, TRION-climat has identified and described around 50 hydrogen projects in the Upper Rhine region. These include hydrogen production sites, major research projects, transport and distribution networks, and major consumers of green hydrogen in the region. GeoRhena, the Upper Rhine's geographic information system, presented these facilities on an interactive map of hydrogen facilities and projects.",
          },
          OrgForResource: ['GeoRhena'],
          pointOfContactOrgForResource: 'GeoRhena',
          contactForResource: [
            {
              organisation: 'GeoRhena',
              role: 'pointOfContact',
              email: 'contact@georhena.eu',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          hasOverview: 'true',
          overview: [
            {
              url: 'https://geoportal.georhena.eu/geonetwork/srv/api/records/be209d24-586f-48f5-b944-e284079b7823/attachments/hydrogene_mviewer.jpg',
            },
          ],
          resourceLanguage: ['fre', 'ger'],
          inspireThemeNumber: '0',
          hasInspireTheme: 'false',
          tag: [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          tagNumber: '3',
          isOpenData: 'false',
          'keywordType-theme': [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          'th_otherKeywords-themeNumber': '3',
          'th_otherKeywords-theme': [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          allKeywords: {
            'th_otherKeywords-theme': {
              title: 'otherKeywords-theme',
              theme: 'theme',
              keywords: [
                {
                  default: 'Hydrogène',
                  langfre: 'Hydrogène',
                  langger: 'Wasserstoff',
                  langeng: 'Hydrogen',
                },
                {
                  default: 'Innovation',
                  langfre: 'Innovation',
                  langger: 'Innovation',
                  langeng: 'Innovation',
                },
                {
                  default: 'Mviewer',
                  langfre: 'Mviewer',
                },
              ],
            },
          },
          cl_topic: [
            {
              key: 'environment',
              default: 'Environnement',
              langfre: 'Environnement',
              langger: 'Umwelt',
              langeng: 'Environment',
            },
          ],
          coordinateSystem: ['EPSG:3857'],
          crsDetails: [
            {
              code: 'EPSG:3857',
              codeSpace: '',
              name: 'EPSG:3857',
              url: '',
            },
          ],
          format: ['WMC'],
          linkUrl: [
            'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
            'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
          ],
          linkProtocol: [
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--related',
          ],
          linkUrlProtocolWWWLINK10httplink:
            'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
          link: [
            {
              protocol: 'WWW:LINK-1.0-http--link',
              mimeType: '',
              url: 'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
              name: 'Carte interactive "Hydrogène" en français',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--related',
              mimeType: '',
              url: 'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
              name: 'Carte interactive "Hydrogène" en allemand',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
          ],
          linkUrlProtocolWWWLINK10httprelated:
            'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
          recordGroup: 'be209d24-586f-48f5-b944-e284079b7823',
          recordOwner: 'Stéphane Ritzenthaler',
          uuid: 'be209d24-586f-48f5-b944-e284079b7823',
          displayOrder: '0',
          groupPublishedId: ['986299', '1', '0'],
          popularity: 42,
          userinfo: 'sritzenthaler|Ritzenthaler|Stéphane|Administrator',
          groupPublished: ['GeoRhena', 'all', 'intranet'],
          isPublishedToAll: 'true',
          record: 'record',
          cat: ['maps'],
          draft: 'n',
          changeDate: '2024-01-25T07:45:05.215893Z',
          id: '8705',
          createDate: '2024-01-25T07:19:13.493164Z',
          owner: '107',
          groupOwner: '986299',
          logo: '/images/logos/ce008f24-8e0d-45a8-97f8-9f10399f0190.png',
          hasxlinks: 'false',
          featureOfRecord: 'record',
          extra: 'null',
          documentStandard: 'iso19139',
          valid: '-1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          isHarvested: 'false',
          userSavedCount: '0',
          sourceCatalogue: 'ce008f24-8e0d-45a8-97f8-9f10399f0190',
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
        related: {
          brothersAndSisters: [],
          parent: [],
          associated: [],
          services: [],
          hassources: [],
          children: [],
          hasfeaturecats: [],
        },
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'foo-foo',
        _score: 7,
        _ignored: [],
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: 'foo-foo',
          standardNameObject: {
            default: 'ISO 19115:2003/19139',
            langfre: 'ISO 19115:2003/19139',
          },
          standardVersionObject: {
            default: '1.0',
            langfre: '1.0',
          },
          resourceTypeNameObject: {
            default: 'Parent',
            langfre: 'Parent',
          },
          indexingDate: '2025-01-23T10:16:01.721Z',
          dateStamp: '2024-01-25T07:44:42.137504Z',
          mainLanguage: 'fre',
          otherLanguage: ['ger', 'eng', 'fre'],
          otherLanguageId: ['DE', 'EN', 'FR'],
          cl_characterSet: [],
          resourceType: ['foo'],
          Org: 'TRION-climate / GeoRhena',
          distributorOrg: 'TRION-climate / GeoRhena',
          contact: [
            {
              organisation: 'TRION-climate / GeoRhena',
              role: 'distributor',
              email: '',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          cl_hierarchyLevel: [
            {
              key: 'interactiveMap',
              default: 'Carte interactive',
              langfre: 'Carte interactive',
              langger: 'Interactive map',
              langeng: 'Interactive map',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
            },
          ],
          cl_presentationForm: [
            {
              key: 'mapDigital',
              default: 'Carte numérique',
              langfre: 'Carte numérique',
              langger: 'Digitale Karte',
              langeng: 'Digital map',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_PresentationFormCode',
            },
          ],
          cl_status: [
            {
              key: 'completed',
              default: 'Finalisé',
              langfre: 'Finalisé',
              langger: 'Abgeschlossen',
              langeng: 'Completed',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode',
            },
          ],
          cl_type: [
            {
              key: 'theme',
              default: 'Thème',
              langfre: 'Thème',
              langger: 'Thema',
              langeng: 'Theme',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
            },
          ],
          resourceTitleObject: {
            default:
              'Production, usages, recherche et distribution de l’hydrogène dans le Rhin Supérieur',
            langfre:
              'Production, usages, recherche et distribution de l’hydrogène dans le Rhin Supérieur',
            langger:
              'Herstellung, Verwendung, Forschung und Verteilung von Wasserstoff am Oberrhein',
            langeng:
              'Hydrogen production, use, research and distribution in the Upper Rhine region',
          },
          publicationDateForResource: ['2023-12-20T14:23:54.000Z'],
          publicationYearForResource: '2023',
          publicationMonthForResource: '2023-12',
          resourceDate: [
            {
              type: 'publication',
              date: '2023-12-20T14:23:54.000Z',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2023-12-20T14:23:54.000Z',
              lte: '2023-12-20T14:23:54.000Z',
            },
          ],
          resourceAbstractObject: {
            default:
              'Dans le cadre du projet Interreg CO2-InnO, TRION-climat a recensé et décrit environ 50 projets sur l’hydrogène dans le Rhin supérieur. On retrouve ainsi les différents sites de production d’hydrogène, les principaux projets de recherche, les réseaux de transport et de distribution ainsi que les grands consommateurs d’hydrogène vert de la région. GeoRhena, le système d’information géographique du Rhin supérieur, a présenté ces installations sur une carte interactive des installations et projets de l’hydrogène.',
            langfre:
              'Dans le cadre du projet Interreg CO2-InnO, TRION-climat a recensé et décrit environ 50 projets sur l’hydrogène dans le Rhin supérieur. On retrouve ainsi les différents sites de production d’hydrogène, les principaux projets de recherche, les réseaux de transport et de distribution ainsi que les grands consommateurs d’hydrogène vert de la région. GeoRhena, le système d’information géographique du Rhin supérieur, a présenté ces installations sur une carte interactive des installations et projets de l’hydrogène.',
            langger:
              'Im Rahmen des Interreg-Projekts CO2-InnO hat TRION-climate rund 50 Wasserstoffprojekte am Oberrhein erfasst und beschrieben. Auf diese Weise findet man die verschiedenen Standorte der Wasserstoffproduktion, die wichtigsten Forschungsprojekte, die Transport- und Verteilungsnetze sowie die großen Abnehmer von grünem Wasserstoff in der Region. GeoRhena, das Geoinformationssystem des Oberrheins, präsentierte diese Anlagen auf einer interaktiven Karte der Wasserstoffanlagen und -projekte.',
            langeng:
              "As part of the Interreg CO2-InnO project, TRION-climat has identified and described around 50 hydrogen projects in the Upper Rhine region. These include hydrogen production sites, major research projects, transport and distribution networks, and major consumers of green hydrogen in the region. GeoRhena, the Upper Rhine's geographic information system, presented these facilities on an interactive map of hydrogen facilities and projects.",
          },
          OrgForResource: ['GeoRhena'],
          pointOfContactOrgForResource: 'GeoRhena',
          contactForResource: [
            {
              organisation: 'GeoRhena',
              role: 'pointOfContact',
              email: 'contact@georhena.eu',
              website: '',
              logo: '',
              individual: '',
              position: '',
              phone: '',
              address: '',
            },
          ],
          hasOverview: 'true',
          overview: [
            {
              url: 'https://geoportal.georhena.eu/geonetwork/srv/api/records/be209d24-586f-48f5-b944-e284079b7823/attachments/hydrogene_mviewer.jpg',
            },
          ],
          resourceLanguage: ['fre', 'ger'],
          inspireThemeNumber: '0',
          hasInspireTheme: 'false',
          tag: [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          tagNumber: '3',
          isOpenData: 'false',
          'keywordType-theme': [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          'th_otherKeywords-themeNumber': '3',
          'th_otherKeywords-theme': [
            {
              default: 'Hydrogène',
              langfre: 'Hydrogène',
              langger: 'Wasserstoff',
              langeng: 'Hydrogen',
            },
            {
              default: 'Innovation',
              langfre: 'Innovation',
              langger: 'Innovation',
              langeng: 'Innovation',
            },
            {
              default: 'Mviewer',
              langfre: 'Mviewer',
            },
          ],
          allKeywords: {
            'th_otherKeywords-theme': {
              title: 'otherKeywords-theme',
              theme: 'theme',
              keywords: [
                {
                  default: 'Hydrogène',
                  langfre: 'Hydrogène',
                  langger: 'Wasserstoff',
                  langeng: 'Hydrogen',
                },
                {
                  default: 'Innovation',
                  langfre: 'Innovation',
                  langger: 'Innovation',
                  langeng: 'Innovation',
                },
                {
                  default: 'Mviewer',
                  langfre: 'Mviewer',
                },
              ],
            },
          },
          cl_topic: [
            {
              key: 'environment',
              default: 'Environnement',
              langfre: 'Environnement',
              langger: 'Umwelt',
              langeng: 'Environment',
            },
          ],
          coordinateSystem: ['EPSG:3857'],
          crsDetails: [
            {
              code: 'EPSG:3857',
              codeSpace: '',
              name: 'EPSG:3857',
              url: '',
            },
          ],
          format: ['WMC'],
          linkUrl: [
            'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
            'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
          ],
          linkProtocol: [
            'WWW:LINK-1.0-http--link',
            'WWW:LINK-1.0-http--related',
          ],
          linkUrlProtocolWWWLINK10httplink:
            'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
          link: [
            {
              protocol: 'WWW:LINK-1.0-http--link',
              mimeType: '',
              url: 'https://geoportal.georhena.eu/mviewer/?config=apps/hydrogene.xml',
              name: 'Carte interactive "Hydrogène" en français',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--related',
              mimeType: '',
              url: 'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
              name: 'Carte interactive "Hydrogène" en allemand',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
          ],
          linkUrlProtocolWWWLINK10httprelated:
            'https://geoportal.georhena.eu/mviewer/?config=apps/wasserstoff.xml',
          recordGroup: 'be209d24-586f-48f5-b944-e284079b7823',
          recordOwner: 'Stéphane Ritzenthaler',
          uuid: 'be209d24-586f-48f5-b944-e284079b7823',
          displayOrder: '0',
          groupPublishedId: ['986299', '1', '0'],
          popularity: 42,
          userinfo: 'sritzenthaler|Ritzenthaler|Stéphane|Administrator',
          groupPublished: ['GeoRhena', 'all', 'intranet'],
          isPublishedToAll: 'true',
          record: 'record',
          cat: ['maps'],
          draft: 'n',
          changeDate: '2024-01-25T07:45:05.215893Z',
          id: '8705',
          createDate: '2024-01-25T07:19:13.493164Z',
          owner: '107',
          groupOwner: '986299',
          logo: '/images/logos/ce008f24-8e0d-45a8-97f8-9f10399f0190.png',
          hasxlinks: 'false',
          featureOfRecord: 'record',
          extra: 'null',
          documentStandard: 'iso19139',
          valid: '-1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          isHarvested: 'false',
          userSavedCount: '0',
          sourceCatalogue: 'ce008f24-8e0d-45a8-97f8-9f10399f0190',
        },
        edit: true,
        canReview: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
        related: {
          brothersAndSisters: [],
          parent: [],
          associated: [],
          services: [],
          hassources: [],
          children: [],
          hasfeaturecats: [],
        },
      },
    ],
  },
})
