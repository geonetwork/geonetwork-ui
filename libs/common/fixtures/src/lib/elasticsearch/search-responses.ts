import { deepFreeze } from '../utils/freeze'

export const aggsOnly = deepFreeze({
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

export const hitsOnly = deepFreeze({
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

export const simpleWithAgg = deepFreeze({
  hits: { hits: [] },
  aggregations: { abc: {} },
})

export const summaryHits = deepFreeze({
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
