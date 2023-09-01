import 'jest-preset-angular/setup-jest'
import {
  ES_FIXTURE_FULL_RESPONSE,
  hitsOnly,
} from '@geonetwork-ui/common/fixtures'
import { Gn4MetadataMapper } from './gn4.metadata.mapper'
import { of } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { MetadataUrlService } from './metadata-url.service'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import {
  CatalogRecord,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/record'
import { TranslateService } from '@ngx-translate/core'

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = (uuid) => `http://my.catalog.org/metadata/${uuid}`
}

class OrganisationsServiceMock {
  organisationsCount$ = of(456)
  addOrganizationToRecordFromSource = jest.fn((source, record) =>
    of({
      ...record,
      ownerOrganization: {
        name: 'My Organization',
        website: new URL('http://my.org'),
      },
    } as CatalogRecord)
  )
}

const translateServiceMock = {
  currentLang: 'de',
}

describe('Gn4MetadataMapper', () => {
  let service: Gn4MetadataMapper

  beforeAll(() => {
    window.console.warn = jest.fn()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(Gn4MetadataMapper)
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(Gn4MetadataMapper)
    })
    describe('#readRecords', () => {
      it('Output records', async () => {
        const records = await service.readRecords(hitsOnly.hits.hits)
        expect(records).toEqual([
          {
            kind: 'dataset',
            abstract: 'The grid is based on proposal ',
            extras: {
              id: '12456',
              catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
            },
            landingPage: new URL(
              'http://my.catalog.org/metadata/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f'
            ),
            overviews: [
              {
                url: new URL(
                  'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png'
                ),
              },
            ],
            title: 'EEA reference grid for Germany (10km), May 2013',
            uniqueIdentifier: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            status: null,
            updateFrequency: null,
            lineage: null,
            recordUpdated: null,
            distributions: [],
            accessConstraints: [],
            contacts: [],
            contactsForResource: [],
            keywords: [],
            licenses: [],
            spatialExtents: [],
            temporalExtents: [],
            themes: [],
            useLimitations: [],
          },
          {
            kind: 'dataset',
            abstract: 'Reference layer of the rivers sensitive areas, ',
            extras: {
              id: '12442',
              catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
              favoriteCount: 4,
            },
            landingPage: new URL(
              'http://my.catalog.org/metadata/5b35f06e-8c6b-4907-b8f4-39541d170360'
            ),
            overviews: [
              {
                url: new URL(
                  'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/5b35f06e-8c6b-4907-b8f4-39541d170360.png'
                ),
              },
            ],
            title:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
            uniqueIdentifier: '5b35f06e-8c6b-4907-b8f4-39541d170360',
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            status: null,
            updateFrequency: null,
            lineage: null,
            recordUpdated: null,
            distributions: [],
            accessConstraints: [],
            contacts: [],
            contactsForResource: [],
            keywords: [],
            licenses: [],
            spatialExtents: [],
            temporalExtents: [],
            themes: [],
            useLimitations: [],
          },
        ] as CatalogRecord[])
      })
      it('works with an empty result set', async () => {
        const records = await service.readRecords([])
        expect(records).toEqual([])
      })
    })

    describe('#readRecord', () => {
      let hit
      beforeEach(() => {
        hit = hitsOnly.hits.hits[0]
      })

      describe('overview', () => {
        it('when data', async () => {
          const record = await service.readRecord(hit)
          expect(record.overviews[0].url).toEqual(
            new URL(
              'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png'
            )
          )
        })
        it('when no data and url', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              overview: {
                url: 'imgUrl',
              },
            },
          })
          expect(record.overviews[0].url).toEqual(
            new URL('http://localhost/imgUrl')
          )
        })
        it('when no data no url', async () => {
          const record = await service.readRecord({
            ...hit,
            _source: {
              ...hit._source,
              overview: {},
            },
          })
          expect(record.overviews[0].url).toEqual(null)
        })
      })

      describe('links', () => {
        describe('valid link with a protocol and name', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    name: 'my data layer',
                    url: 'https://my.website/services/data/',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses name as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.distributions).toEqual([
              {
                name: 'my data layer',
                type: 'link',
                url: new URL('https://my.website/services/data/'),
              },
            ])
          })
        })
        describe('valid link pointing to a file', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    description: 'Download this file!',
                    url: 'https://my.website/services/static/data.csv',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses description as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.distributions).toEqual([
              {
                description: 'Download this file!',
                type: 'link',
                url: new URL('https://my.website/services/static/data.csv'),
              },
            ])
          })
        })
        describe('valid link with a mime type', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    description: 'Download this file!',
                    protocol: 'WWW:DOWNLOAD:application/csv',
                    url: 'https://my.website/services/static/data.csv',
                  },
                ],
              },
            }
          })
          it('parses as a valid link, uses description as label', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.distributions).toEqual([
              {
                description: 'Download this file!',
                mimeType: 'application/csv',
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'download',
              },
            ])
          })
        })
        describe('invalid link (invalid url)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    url: 'https://abcd:1234:5678/@',
                  },
                ],
              },
            }
          })
          it('does not parse the link', async () => {
            const record = (await service.readRecord(hit)) as DatasetRecord
            expect(record.distributions).toEqual([])
            expect(window.console.warn).toHaveBeenCalledWith(
              expect.stringContaining('URL'),
              expect.any(Object)
            )
          })
        })
        describe('link is multilingual (+ name / description)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    descriptionObject: {
                      default: 'Download this file!',
                      langfre: 'Téléchargez ce fichier!',
                    },
                    nameObject: {
                      default: 'My file',
                      langfre: 'Mon fichier',
                    },
                    protocol: 'MY-PROTOCOL',
                    urlObject: {
                      default: 'https://my.website/services/static/data.csv',
                      langfre: 'https://my.website/services/static/data.csv',
                    },
                  },
                ],
              },
            }
          })
          it('parse the link correctly', async () => {
            const summary = (await service.readRecord(hit)) as DatasetRecord
            expect(summary.distributions).toEqual([
              {
                name: 'My file',
                description: 'Download this file!',
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'link',
              },
            ])
          })
        })
        describe('link is multilingual (no name and description)', () => {
          beforeEach(() => {
            hit = {
              ...hit,
              _source: {
                ...hit._source,
                link: [
                  {
                    protocol: 'MY-PROTOCOL',
                    urlObject: {
                      default: 'https://my.website/services/static/data.csv',
                      langfre: 'https://my.website/services/static/data.csv',
                    },
                  },
                ],
              },
            }
          })
          it('parse the link correctly', async () => {
            const summary = (await service.readRecord(hit)) as DatasetRecord
            expect(summary.distributions).toEqual([
              {
                url: new URL('https://my.website/services/static/data.csv'),
                type: 'link',
              },
            ])
          })
        })
      })

      describe('full record', () => {
        it('builds a complete record object', async () => {
          const record = await service.readRecord(
            ES_FIXTURE_FULL_RESPONSE.hits.hits[0]
          )
          expect(record).toEqual({
            kind: 'dataset',
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
            contacts: [
              {
                email: 'q2suppor@ifremer.fr',
                lastName: "Cellule d'administration Quadrige",
                organization: {
                  name: 'Ifremer',
                  website: new URL('https://www.ifremer.fr/'),
                },
                role: 'point_of_contact',
              },
            ],
            ownerOrganization: {
              name: 'My Organization',
              website: new URL('http://my.org'),
            },
            contactsForResource: [
              {
                email: 'q2_support@ifremer.fr',
                lastName: "Cellule d'Administration Quadrige",
                organization: {
                  name: 'Ifremer',
                },
                role: 'point_of_contact',
              },
              {
                email: 'q2_support@ifremer.fr',
                lastName: 'Quadrige',
                organization: {
                  name: 'Ifremer',
                },
                role: 'author',
              },
              {
                email: 'q2_support@ifremer.fr',
                lastName: 'Quadrige',
                organization: {
                  name: 'Ifremer',
                },
                role: 'publisher',
              },
            ],
            datasetCreated: new Date('2012-01-01T00:00:00.000Z'),
            distributions: [
              {
                url: new URL(
                  'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees'
                ),
                name: 'La base de données Quadrige',
                type: 'link',
              },
              {
                url: new URL(
                  'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral'
                ),
                name: 'La surveillance du milieu marin et côtier',
                type: 'link',
              },
              {
                description:
                  'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
                url: new URL('http://archimer.ifremer.fr/doc/00409/52016/'),
                name: 'Manuel pour l’utilisation des données REPHY',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                accessServiceProtocol: 'wms',
                url: new URL(
                  'http://www.ifremer.fr/services/wms/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                type: 'service',
              },
              {
                accessServiceProtocol: 'wfs',
                url: new URL(
                  'http://www.ifremer.fr/services/wfs/surveillance_littorale'
                ),
                description: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                type: 'service',
              },
              {
                description: "Extraction des données d'observation",
                url: new URL('https://www.ifremer.fr/services/wps3/surval'),
                name: 'r:survalextraction30140',
                type: 'link',
              },
              {
                description: 'DOI du jeu de données',
                url: new URL(
                  'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea'
                ),
                name: 'DOI du jeu de données',
                type: 'link',
              },
            ],
            extras: {
              catalogUuid: '81e8a591-7815-4d2f-a7da-5673192e74c9',
              favoriteCount: 12,
              id: '11700',
              isOpenData: true,
              isPublishedToAll: true,
              ownerInfo: 'testadmin|ADMIN|Test|Administrator',
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
            landingPage: new URL(
              'http://my.catalog.org/metadata/cf5048f6-5bbf-4e44-ba74-e6f429af51ea'
            ),
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
            recordCreated: new Date('2021-10-05T12:48:57.678Z'),
            recordUpdated: new Date('2021-10-05T12:48:57.678Z'),
            status: 'under_development',
            themes: ['Installations de suivi environnemental'],
            title: 'Surval - Données par paramètre',
            uniqueIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            updateFrequency: {
              per: 'day',
              updatedTimes: 1,
            },
            useLimitations: [
              'Einschränkung im Zusammenhang mit der Ausübung moralischer Rechte',
              "Restriction légale d'utilisation à préciser",
            ],
            spatialExtents: [],
            temporalExtents: [],
          } as CatalogRecord)
        })
      })
    })
  })
})
