import {
  DatasetRecord,
  RecordStatus,
  Role,
} from '@geonetwork-ui/util/types/metadata'
import {
  ES_FIXTURE_FULL_RESPONSE,
  hitsOnly,
} from '@geonetwork-ui/util/types/metadata/gn4/metadata.fixtures'
import { Gn4MetadataMapper } from './gn4.metadata.mapper'

describe('MetadataElasticsearchMapper', () => {
  let service: Gn4MetadataMapper

  beforeAll(() => {
    globalThis.console.warn = jest.fn()
  })

  beforeEach(() => {
    service = new Gn4MetadataMapper()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#readDatasets', () => {
    it('Output records', () => {
      const summary = service.readDatasets(hitsOnly())
      expect(summary).toStrictEqual([
        {
          abstract: 'The grid is based on proposal ',
          catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          distributions: [],
          extras: {
            id: '12456',
          },
          kind: 'dataset',
          overviews: [
            {
              url: new URL('data:image/png;base64,'),
            },
          ],
          title: 'EEA reference grid for Germany (10km), May 2013',
          uniqueIdentifier: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
        },
        {
          abstract: 'Reference layer of the rivers sensitive areas, ',
          catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          distributions: [],
          extras: {
            favoriteCount: 4,
            id: '12442',
          },
          kind: 'dataset',
          overviews: [
            {
              url: new URL('data:image/png;base64,'),
            },
          ],
          title:
            'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
          uniqueIdentifier: '5b35f06e-8c6b-4907-b8f4-39541d170360',
        },
      ])
    })
  })

  describe('#readDataset', () => {
    let hit
    beforeEach(() => {
      const gn4Response = hitsOnly()
      hit = {
        ...gn4Response.hits.hits[0],
        _source: {
          ...gn4Response.hits.hits[0]._source,
        },
      }
    })

    describe('overview', () => {
      it('when data', () => {
        const summary = service.readDataset(hit)
        expect(summary.overviews).toEqual([
          {
            url: new URL('data:image/png;base64,'),
          },
        ])
      })
      it('when no data and url', () => {
        hit._source.overview = {
          url: 'imgUrl',
        }
        const summary = service.readDataset(hit)
        expect(summary.overviews).toEqual([
          {
            url: new URL('http://localhost/imgUrl'),
          },
        ])
      })
      it('when no data no url', () => {
        hit._source.overview = {}
        const summary = service.readDataset(hit)
        expect(summary.overviews).toEqual([{ url: null }])
      })
    })

    describe('links', () => {
      describe('valid link with a protocol and name', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              protocol: 'MY-PROTOCOL',
              name: 'my data layer',
              url: 'https://my.website/services/data/',
            },
          ]
        })
        it('parses as a valid link, uses name as label', () => {
          const summary = service.readDataset(hit)
          expect(summary.distributions).toEqual([
            {
              name: 'my data layer',
              linkUrl: new URL('https://my.website/services/data/'),
              type: 'other',
            },
          ])
        })
      })
      describe('valid link pointing to a file', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              description: 'Download this file!',
              url: 'https://my.website/services/static/data.csv',
            },
          ]
        })
        it('parses as a valid link, uses description as label', () => {
          const summary = service.readDataset(hit)
          expect(summary.distributions).toEqual([
            {
              description: 'Download this file!',
              linkUrl: new URL('https://my.website/services/static/data.csv'),
              type: 'other',
            },
          ])
        })
      })
      describe('valid link with a mime type', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              description: 'Download this file!',
              protocol: 'WWW:DOWNLOAD:application/csv',
              url: 'https://my.website/services/static/data.csv',
            },
          ]
        })
        it('parses as a valid link, uses description as label', () => {
          const summary = service.readDataset(hit)
          expect(summary.distributions).toEqual([
            {
              description: 'Download this file!',
              mimeType: 'application/csv',
              downloadUrl: new URL(
                'https://my.website/services/static/data.csv'
              ),
              type: 'download',
            },
          ])
        })
      })
      describe('invalid link (invalid url)', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              protocol: 'MY-PROTOCOL',
              url: 'https://abcd:1234:5678/@',
            },
          ]
        })
        it('does not parse the link', () => {
          const summary = service.readDataset(hit)
          expect(summary.distributions).toEqual([])
          expect(globalThis.console.warn).toHaveBeenCalledWith(
            expect.stringContaining('URL'),
            expect.any(Object)
          )
        })
      })
      describe('invalid link (url with unsupported protocol)', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              description: 'Download this file!',
              protocol: 'FILE',
              url: 'data:image/png;base64,aaaaabbbbbccccc',
            },
          ]
        })
        it('does not parse the link', () => {
          const summary = service.readDataset(hit)
          expect(summary.distributions).toEqual([])
          expect(globalThis.console.warn).toHaveBeenCalledWith(
            expect.stringContaining('protocol'),
            expect.any(Object)
          )
        })
      })
    })

    describe('full record', () => {
      it('builds a complete record object', () => {
        const record = service.readDataset(
          ES_FIXTURE_FULL_RESPONSE().hits.hits[0]
        )
        expect(record).toStrictEqual({
          abstract:
            "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
          accessConstraints: [
            {
              text: 'Pas de restriction d’accès public',
              type: 'other',
            },

            {
              text: 'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
              type: 'other',
            },
          ],
          catalogUuid: '81e8a591-7815-4d2f-a7da-5673192e74c9',
          contacts: [
            {
              email: 'q2_support@ifremer.fr',
              firstName: "Cellule d'Administration Quadrige",
              organization: {
                name: 'Ifremer',
                description: "Cellule d'Administration Quadrige",
              },
              role: Role.POINT_OF_CONTACT,
            },
            {
              email: 'q2_support@ifremer.fr',
              role: Role.AUTHOR,
              firstName: 'Quadrige',
              organization: {
                name: 'Ifremer',
                description: 'Quadrige',
              },
            },
            {
              email: 'q2_support@ifremer.fr',
              role: Role.PUBLISHER,
              firstName: 'Quadrige',
              organization: {
                name: 'Ifremer',
                description: 'Quadrige',
              },
            },
          ],
          datasetCreated: new Date('2012-01-01T00:00:00.000Z'),
          distributions: [
            {
              name: 'La base de données Quadrige',
              linkUrl: new URL(
                'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees'
              ),
              type: 'other',
            },
            {
              name: 'La surveillance du milieu marin et côtier',
              linkUrl: new URL(
                'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral'
              ),
              type: 'other',
            },
            {
              description:
                'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
              name: 'Manuel pour l’utilisation des données REPHY',
              linkUrl: new URL('http://archimer.ifremer.fr/doc/00409/52016/'),
              type: 'other',
            },
            {
              description: 'Lieu de surveillance (point)',
              name: 'surval_parametre_point',
              accessServiceProtocol: 'wms',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wms/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: 'Lieu de surveillance (point)',
              name: 'surval_parametre_point',
              accessServiceProtocol: 'wfs',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wfs/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              accessServiceProtocol: 'wps',
              accessServiceUrl: new URL(
                'https://www.ifremer.fr/services/wps3/surval'
              ),
              type: 'service',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              name: 'surval_parametre_ligne',
              accessServiceProtocol: 'wms',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wms/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              name: 'surval_parametre_ligne',
              accessServiceProtocol: 'wfs',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wfs/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              accessServiceProtocol: 'wps',
              accessServiceUrl: new URL(
                'https://www.ifremer.fr/services/wps3/surval'
              ),
              type: 'service',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              accessServiceProtocol: 'wms',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wms/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              accessServiceProtocol: 'wfs',
              accessServiceUrl: new URL(
                'http://www.ifremer.fr/services/wfs/surveillance_littorale'
              ),
              type: 'service',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              accessServiceProtocol: 'wps',
              accessServiceUrl: new URL(
                'https://www.ifremer.fr/services/wps3/surval'
              ),
              type: 'service',
            },
            {
              description: 'DOI du jeu de données',
              name: 'DOI du jeu de données',
              linkUrl: new URL(
                'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea'
              ),
              type: 'other',
            },
          ],
          extras: {
            favoriteCount: 12,
            id: '11700',
            isOpenData: true,
            isPublishedToAll: true,
          },
          keywords: [
            'Lieux de surveillance',
            'Observation',
            'Surveillance',
            'Environnement',
            'Littoral',
            'Quadrige',
            'DCE',
            'DCSMM',
            'OSPAR',
            'MEDPOL',
            'Données ouvertes',
            'Open Data',
            'Surval',
            'Installations de suivi environnemental',
            'D8: Contaminants',
            'D1: Biodiversité',
            'D7: Changements hydrographiques',
            'D4: Réseaux trophiques',
            'D5: Eutrophisation',
            'D9: Questions sanitaires',
            'D10: Déchets marins',
            'D1: Biodiversité - Habitats benthiques',
            'D1: Biodiversité - Habitats pélagiques',
            'D1: Biodiversité - Poissons',
            'D1: Biodiversité - Mammifères',
            'D1: Biodiversité - Tortues',
            'D1: Biodiversité - Céphalopodes',
            'National',
            'Observation par point',
            'Observation directe',
            "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
            '/Observations in-situ/Réseaux',
            'Base de données de recherche',
            'Dispositifs de surveillance',
            '/Biologie marine/Bivalves',
            '/Biogéochimie marine/Eléments chimiques et contaminants',
            "/Physique de l'Océan/Turbidité",
            '/Biogéochimie marine/Pigments',
            '/Biologie marine/Toxines',
            '/Biologie marine/Phytoplancton',
            '/Biologie marine/Zooplancton',
            "/Physique de l'Océan/Température",
            "/Physique de l'Océan/Salinité",
            '/Biogéochimie marine/Oxygène dissous',
            '/Biologie marine/Organismes pathogènes',
            '/Biologie marine/Organismes marins tropicaux',
            '/Biologie marine/Matière en suspension',
            '/Biogéochimie marine/Nutriments (sels nutritifs)',
            '/Biologie marine/Habitats benthiques',
            '/Etat du Milieu/Biogéochimie',
            '/Etat du Milieu/Pollutions',
            '/Etat du Milieu/Littoral',
            '/Etat du Milieu/Habitats',
            '/Etat du Milieu/Espèces',
            'Brest',
            'Fort-de-France',
            'Boulogne-sur-Mer',
            'Nouméa',
            'Toulon',
            'Sète',
            'La Rochelle',
          ],
          kind: 'dataset',
          licenses: [
            {
              link: new URL(
                'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations'
              ),
              text: 'Pas de restriction d’accès public',
            },
            {
              text: 'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
            },
          ],
          lineage:
            'Les données sont bancarisées dans la base de données Quadrige.',
          overviews: [
            {
              description: 'parametres.gif',
              url: new URL(
                'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif'
              ),
            },
          ],
          ownerOrganization: {
            description: "Cellule d'administration Quadrige",
            name: 'Ifremer',
            website: new URL('https://www.ifremer.fr'),
          },
          recordCreated: new Date('2021-10-05T12:48:57.678Z'),
          recordUpdated: new Date('2021-10-05T12:48:57.678Z'),
          status: RecordStatus.UNDER_DEVELOPMENT,
          themes: ['Installations de suivi environnemental'],
          title: 'Surval - Données par paramètre',
          uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          updateFrequency: {
            per: 'day',
            updatedTimes: 1,
          },
          useLimitations: [
            'Restriction lié à l’exercice du droit moral',
            "Restriction légale d'utilisation à préciser",
          ],
        } as DatasetRecord)
      })
    })
  })
})
