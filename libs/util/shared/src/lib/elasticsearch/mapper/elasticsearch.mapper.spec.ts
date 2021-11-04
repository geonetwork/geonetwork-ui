import { TestBed } from '@angular/core/testing'
import { ElasticsearchMapper } from './elasticsearch.mapper'
import { hitsOnly, ES_FIXTURE_FULL_RESPONSE } from '../fixtures'
import { MetadataUrlService } from '../../services'
import { MetadataRecord } from '../../models'

const metadataUrlServiceMock = {
  translate: undefined,
  getUrl: () => 'url',
}
describe('ElasticsearchMapper', () => {
  let service: ElasticsearchMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MetadataUrlService,
          useValue: metadataUrlServiceMock,
        },
      ],
    })
    service = TestBed.inject(ElasticsearchMapper)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#toRecords', () => {
    it('Output records', () => {
      const summary = service.toRecords(hitsOnly)
      expect(summary).toEqual([
        {
          abstract: 'The grid is based on proposal ',
          downloadable: false,
          id: '12456',
          metadataUrl: 'url',
          thumbnailUrl: 'data:image/png;base64,',
          title: 'EEA reference grid for Germany (10km), May 2013',
          uuid: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
          viewable: false,
        },
        {
          abstract: 'Reference layer of the rivers sensitive areas, ',
          downloadable: false,
          id: '12442',
          metadataUrl: 'url',
          thumbnailUrl: 'data:image/png;base64,',
          title:
            'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
          uuid: '5b35f06e-8c6b-4907-b8f4-39541d170360',
          viewable: false,
        },
      ])
    })
  })

  describe('#toRecord', () => {
    let hit
    beforeEach(() => {
      hit = hitsOnly.hits.hits[0]
    })

    describe('overview', () => {
      it('when data', () => {
        const summary = service.toRecord(hit)
        expect(summary.thumbnailUrl).toBe('data:image/png;base64,')
      })
      it('when no data and url', () => {
        hit._source.overview = {
          url: 'imgUrl',
        }
        const summary = service.toRecord(hit)
        expect(summary.thumbnailUrl).toBe('http://localhost/imgUrl')
      })
      it('when no data no url', () => {
        hit._source.overview = {}
        const summary = service.toRecord(hit)
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
        it('parses as a valid link', () => {
          const summary = service.toRecord(hit)
          expect(summary.links).toEqual([
            {
              protocol: 'MY-PROTOCOL',
              name: 'my data layer',
              url: 'https://my.website/services/data/',
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
        it('parses as a valid link', () => {
          const summary = service.toRecord(hit)
          expect(summary.links).toEqual([
            {
              description: 'Download this file!',
              url: 'https://my.website/services/static/data.csv',
              name: 'data.csv',
            },
          ])
        })
      })
      describe('invalid link (no url)', () => {
        beforeEach(() => {
          hit._source.link = [
            {
              description: 'Download this file!',
              protocol: 'FILE',
            },
          ]
        })
        it('parses as an invalid link', () => {
          const summary = service.toRecord(hit)
          expect(summary.links).toEqual([
            {
              invalid: true,
              reason: expect.stringContaining('URL'),
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
        it('parses as an invalid link', () => {
          const summary = service.toRecord(hit)
          expect(summary.links).toEqual([
            {
              invalid: true,
              reason: expect.stringContaining('URL'),
            },
          ])
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
        it('parses as an invalid link', () => {
          const summary = service.toRecord(hit)
          expect(summary.links).toEqual([
            {
              invalid: true,
              reason: expect.stringContaining('protocol'),
            },
          ])
        })
      })
    })

    describe('full record', () => {
      it('builds a complete record object', () => {
        const record = service.toRecord(ES_FIXTURE_FULL_RESPONSE.hits.hits[0])
        expect(record).toMatchObject({
          abstract:
            "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
          updatedOn: new Date('2021-10-05T12:48:57.678Z'),
          createdOn: new Date('2021-10-05T12:48:57.678Z'),
          dataCreatedOn: new Date('2012-01-01T00:00:00.000Z'),
          id: '11700',
          links: [
            {
              description: '',
              name: 'La base de données Quadrige',
              protocol: 'WWW:LINK',
              url: 'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees',
            },
            {
              description: '',
              name: 'La surveillance du milieu marin et côtier',
              protocol: 'WWW:LINK-1.0-http--link',
              url: 'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral',
            },
            {
              description:
                'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
              name: 'Manuel pour l’utilisation des données REPHY',
              protocol: 'WWW:LINK',
              url: 'http://archimer.ifremer.fr/doc/00409/52016/',
            },
            {
              description: 'Lieu de surveillance (point)',
              name: 'surval_parametre_point',
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
            },
            {
              description: 'Lieu de surveillance (point)',
              name: 'surval_parametre_point',
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction30140',
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
            },
            {
              description: 'DOI du jeu de données',
              name: 'DOI du jeu de données',
              protocol: 'WWW:LINK-1.0-http--metadata-URL',
              url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            },
          ],
          metadataUrl: 'url',
          thumbnailUrl:
            'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif',
          title: 'Surval - Données par paramètre',
          uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          viewable: true,
          downloadable: true,
          contact: {
            name: 'Ifremer',
            email: 'q2suppor@ifremer.fr',
            website: 'https://www.ifremer.fr',
            logoUrl:
              'http://localhost/geonetwork/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
          },
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
          usageConstraints: 'Restriction lié à l’exercice du droit moral',
        } as MetadataRecord)
      })
    })
  })
})
