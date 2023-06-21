import { TestBed } from '@angular/core/testing'
import { ElasticsearchMapper } from './elasticsearch.mapper'
import { MetadataLinkType, MetadataRecord } from '@geonetwork-ui/util/shared'
import {
  ES_FIXTURE_FULL_RESPONSE,
  hitsOnly,
} from '@geonetwork-ui/util/shared/fixtures'
import { firstValueFrom, of } from 'rxjs'
import { OrganisationsServiceInterface } from '@geonetwork-ui/feature/catalog'
import { MetadataUrlService } from '../service/metadata-url.service'

class MetadataUrlServiceMock {
  translate = undefined
  getUrl = () => 'url'
}

class OrganisationsServiceMock {
  organisationsCount$ = of(456)
  addOrganisationToRecordFromSource = jest.fn((source, record) =>
    of(
      'contact' in source
        ? {
            ...record,
            contact: {
              name: 'Main Contact',
              email: 'q2suppor@ifremer.fr',
              organisation: source.contact[0].organisation,
            },
            resourceContacts: [
              {
                name: 'Resource Contact 1',
                email: 'q2suppor@ifremer.fr',
              },
              {
                name: 'Resource Contact 2',
                email: 'q2suppor@ifremer.fr',
              },
            ],
          }
        : record
    )
  )
}

describe('ElasticsearchMapper', () => {
  let service: ElasticsearchMapper

  beforeAll(() => {
    window.console.warn = jest.fn()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MetadataUrlService, useClass: MetadataUrlServiceMock },
        {
          provide: OrganisationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(ElasticsearchMapper)
    expect(service).toBeTruthy()
  })

  describe('methods', () => {
    beforeEach(() => {
      service = TestBed.inject(ElasticsearchMapper)
    })
    describe('#toRecords', () => {
      it('Output records', async () => {
        const summary = await firstValueFrom(service.toRecords(hitsOnly))
        expect(summary).toEqual([
          {
            abstract: 'The grid is based on proposal ',
            id: '12456',
            metadataUrl: 'url',
            thumbnailUrl: 'data:image/png;base64,',
            title: 'EEA reference grid for Germany (10km), May 2013',
            uuid: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
            catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
            hasDownloads: false,
            hasMaps: false,
            links: [],
          },
          {
            abstract: 'Reference layer of the rivers sensitive areas, ',
            id: '12442',
            metadataUrl: 'url',
            thumbnailUrl: 'data:image/png;base64,',
            title:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
            uuid: '5b35f06e-8c6b-4907-b8f4-39541d170360',
            catalogUuid: '6731be1e-6533-44e0-9b8a-580b45e36e80',
            favoriteCount: 4,
            hasDownloads: false,
            hasMaps: false,
            links: [],
          },
        ])
      })
      it('works with an empty result set', async () => {
        const summary = await firstValueFrom(
          service.toRecords({
            hits: {
              hits: [],
            },
          })
        )
        expect(summary).toEqual([])
      })
    })

    describe('#toRecord', () => {
      let hit
      beforeEach(() => {
        hit = {
          ...(hitsOnly as any).hits.hits[0],
          _source: {
            ...(hitsOnly as any).hits.hits[0]._source,
          },
        }
      })

      describe('overview', () => {
        it('when data', async () => {
          const summary = await firstValueFrom(service.toRecord(hit))
          expect(summary.thumbnailUrl).toBe('data:image/png;base64,')
        })
        it('when no data and url', async () => {
          hit._source.overview = {
            url: 'imgUrl',
          }
          const summary = await firstValueFrom(service.toRecord(hit))
          expect(summary.thumbnailUrl).toBe('http://localhost/imgUrl')
        })
        it('when no data no url', async () => {
          hit._source.overview = {}
          const summary = await firstValueFrom(service.toRecord(hit))
          expect(summary.thumbnailUrl).toBe(null)
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
          it('parses as a valid link, uses name as label', async () => {
            const summary = await firstValueFrom(service.toRecord(hit))
            expect(summary.links).toEqual([
              {
                protocol: 'MY-PROTOCOL',
                name: 'my data layer',
                label: 'my data layer',
                url: 'https://my.website/services/data/',
                type: MetadataLinkType.OTHER,
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
          it('parses as a valid link, uses description as label', async () => {
            const summary = await firstValueFrom(service.toRecord(hit))
            expect(summary.links).toEqual([
              {
                description: 'Download this file!',
                label: 'Download this file!',
                url: 'https://my.website/services/static/data.csv',
                type: MetadataLinkType.OTHER,
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
          it('parses as a valid link, uses description as label', async () => {
            const summary = await firstValueFrom(service.toRecord(hit))
            expect(summary.links).toEqual([
              {
                description: 'Download this file!',
                label: 'Download this file!',
                mimeType: 'application/csv',
                url: 'https://my.website/services/static/data.csv',
                type: MetadataLinkType.DOWNLOAD,
                protocol: 'WWW:DOWNLOAD:application/csv',
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
          it('does not parse the link', async () => {
            const summary = await firstValueFrom(service.toRecord(hit))
            expect(summary.links).toEqual([])
            expect(window.console.warn).toHaveBeenCalledWith(
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
          it('does not parse the link', async () => {
            const summary = await firstValueFrom(service.toRecord(hit))
            expect(summary.links).toEqual([])
            expect(window.console.warn).toHaveBeenCalledWith(
              expect.stringContaining('protocol'),
              expect.any(Object)
            )
          })
        })
      })

      describe('link protocols', () => {
        let summary
        describe('no protocols', () => {
          beforeEach(async () => {
            summary = await firstValueFrom(service.toRecord(hit))
          })
          it('hasDownloads is false', () => {
            expect(summary.hasDownloads).toBe(false)
          })
          it('hasMaps is false', () => {
            expect(summary.hasMaps).toBe(false)
          })
        })
        describe('unknwown protocols', () => {
          beforeEach(async () => {
            hit._source.link = [
              {
                protocol: 'MYPROTOCOL',
                url: 'https://abcd/',
                type: MetadataLinkType.OTHER,
              },
            ]
            summary = await firstValueFrom(service.toRecord(hit))
          })
          it('hasDownloads is false', () => {
            expect(summary.hasDownloads).toBe(false)
          })
          it('hasMaps is false', () => {
            expect(summary.hasMaps).toBe(false)
          })
        })
        describe('map and downloads protocol', () => {
          beforeEach(async () => {
            hit._source.link = [
              {
                protocol: 'OGC:WMS',
                url: 'https://my.ogc.server/wms',
                type: MetadataLinkType.WMS,
              },
              {
                protocol: 'WWW:DOWNLOAD',
                url: 'http://my.server/files/geographic/dataset.gpkg',
                type: MetadataLinkType.DOWNLOAD,
              },
            ]
            summary = await firstValueFrom(service.toRecord(hit))
          })
          it('hasDownloads is true', () => {
            expect(summary.hasDownloads).toBe(true)
          })
          it('hasMaps is true', () => {
            expect(summary.hasMaps).toBe(true)
          })
        })
      })

      describe('full record', () => {
        it('builds a complete record object', async () => {
          const record = await firstValueFrom(
            service.toRecord(ES_FIXTURE_FULL_RESPONSE.hits.hits[0])
          )
          expect(record).toEqual({
            abstract:
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
            updatedOn: new Date('2021-10-05T12:48:57.678Z'),
            createdOn: new Date('2021-10-05T12:48:57.678Z'),
            dataCreatedOn: new Date('2012-01-01T00:00:00.000Z'),
            id: '11700',
            links: [
              {
                label: 'La base de données Quadrige',
                name: 'La base de données Quadrige',
                protocol: 'WWW:LINK',
                url: 'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees',
                type: MetadataLinkType.OTHER,
              },
              {
                label: 'La surveillance du milieu marin et côtier',
                name: 'La surveillance du milieu marin et côtier',
                protocol: 'WWW:LINK-1.0-http--link',
                url: 'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral',
                type: MetadataLinkType.OTHER,
              },
              {
                description:
                  'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
                label:
                  'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
                name: 'Manuel pour l’utilisation des données REPHY',
                protocol: 'WWW:LINK',
                url: 'http://archimer.ifremer.fr/doc/00409/52016/',
                type: MetadataLinkType.OTHER,
              },
              {
                description: 'Lieu de surveillance (point)',
                label: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                protocol: 'OGC:WMS',
                url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
                type: MetadataLinkType.WMS,
              },
              {
                description: 'Lieu de surveillance (point)',
                label: 'Lieu de surveillance (point)',
                name: 'surval_parametre_point',
                protocol: 'OGC:WFS',
                url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
                type: MetadataLinkType.WFS,
              },
              {
                description: "Extraction des données d'observation",
                label: "Extraction des données d'observation",
                name: 'r:survalextraction30140',
                protocol: 'OGC:WPS',
                url: 'https://www.ifremer.fr/services/wps3/surval',
                type: MetadataLinkType.OTHER,
              },
              {
                description: 'Lieu de surveillance (ligne)',
                label: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                protocol: 'OGC:WMS',
                url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
                type: MetadataLinkType.WMS,
              },
              {
                description: 'Lieu de surveillance (ligne)',
                label: 'Lieu de surveillance (ligne)',
                name: 'surval_parametre_ligne',
                protocol: 'OGC:WFS',
                url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
                type: MetadataLinkType.WFS,
              },
              {
                description: "Extraction des données d'observation",
                label: "Extraction des données d'observation",
                name: 'r:survalextraction30140',
                protocol: 'OGC:WPS',
                url: 'https://www.ifremer.fr/services/wps3/surval',
                type: MetadataLinkType.OTHER,
              },
              {
                description: 'Lieu de surveillance (polygone)',
                label: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                protocol: 'OGC:WMS',
                url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
                type: MetadataLinkType.WMS,
              },
              {
                description: 'Lieu de surveillance (polygone)',
                label: 'Lieu de surveillance (polygone)',
                name: 'surval_parametre_polygone',
                protocol: 'OGC:WFS',
                url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
                type: MetadataLinkType.WFS,
              },
              {
                description: "Extraction des données d'observation",
                label: "Extraction des données d'observation",
                name: 'r:survalextraction30140',
                protocol: 'OGC:WPS',
                url: 'https://www.ifremer.fr/services/wps3/surval',
                type: MetadataLinkType.OTHER,
              },
              {
                description: 'DOI du jeu de données',
                label: 'DOI du jeu de données',
                name: 'DOI du jeu de données',
                protocol: 'WWW:LINK-1.0-http--metadata-URL',
                url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
                type: MetadataLinkType.OTHER,
              },
            ],
            metadataUrl: 'url',
            ownerInfo: 'testadmin|ADMIN|Test|Administrator',
            thumbnailUrl:
              'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif',
            title: 'Surval - Données par paramètre',
            uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            contact: {
              name: 'Main Contact',
              email: 'q2suppor@ifremer.fr',
              organisation: 'Ifremer',
            },
            resourceContacts: [
              {
                name: 'Resource Contact 1',
                email: 'q2suppor@ifremer.fr',
              },
              {
                name: 'Resource Contact 2',
                email: 'q2suppor@ifremer.fr',
              },
            ],
            updateStatus: 'Mise à jour continue',
            updateFrequency: 'Journalière',
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
            lineage:
              'Les données sont bancarisées dans la base de données Quadrige.',
            constraints: [
              'Restriction lié à l’exercice du droit moral',
              "Restriction légale d'utilisation à préciser",
              'Pas de restriction d’accès public',
              'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
            ],
            catalogUuid: '81e8a591-7815-4d2f-a7da-5673192e74c9',
            isOpenData: true,
            isPublishedToAll: true,
            favoriteCount: 12,
            hasDownloads: true,
            hasMaps: true,
          } as MetadataRecord)
        })
      })
    })
  })
})
