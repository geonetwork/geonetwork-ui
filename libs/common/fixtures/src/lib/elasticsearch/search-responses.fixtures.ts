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
        edit: false,
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
        edit: false,
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
        edit: false,
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
        edit: false,
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
                edit: false,
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
        edit: false,
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
                edit: false,
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
