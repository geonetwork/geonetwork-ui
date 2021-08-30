import { TestBed } from '@angular/core/testing'
import { MetadataUrlService } from '@geonetwork-ui/util/shared'
import { ElasticsearchMapper } from './elasticsearch.mapper'
import { hitsOnly, ES_FIXTURE_FULL_RESPONSE } from '../fixtures'

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
          logoUrl:
            'http://localhost/geonetwork/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
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
          logoUrl:
            'http://localhost/geonetwork/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
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
            "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige.\n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclues de la diffusion Surval.\nUne donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se réalise par lieu.\nUn lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes.\n\nAujourd’hui, ce produit met à disposition des données issues d'une sélection de thématiques.\n\nThématiques suivies :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).",
          updatedOn: new Date('2021-04-01T17:38:51.895Z'),
          createdOn: new Date('2021-03-31T12:17:38.105Z'),
          dataCreatedOn: new Date('2012-01-01T00:00:00.000Z'),
          id: '10420',
          links: [
            {
              description: '',
              name: 'La base de données Quadrige',
              protocol: 'WWW:LINK',
              url: 'http://envlit.ifremer.fr/resultats/quadrige',
            },
            {
              description: '',
              name: 'La surveillance du milieu marin et côtier',
              protocol: 'WWW:LINK-1.0-http--link',
              url: 'http://envlit.ifremer.fr/surveillance/presentation',
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
              url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
            },
            {
              description: 'Lieu de surveillance (point)',
              name: 'surval_parametre_point',
              protocol: 'OGC:WFS',
              url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction',
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps/surval',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              protocol: 'OGC:WMS',
              url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
            },
            {
              description: 'Lieu de surveillance (polygone)',
              name: 'surval_parametre_polygone',
              protocol: 'OGC:WFS',
              url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            },
            {
              description: "Extraction des données d'observation",
              name: 'r:survalextraction',
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps/surval',
            },
            {
              description: 'DOI du jeu de données',
              name: 'DOI du jeu de données',
              protocol: 'WWW:LINK-1.0-http--metadata-URL',
              url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
            },
          ],
          logoUrl:
            'http://localhost/geonetwork/images/logos/cea9bf9f-329a-4583-9092-2dfc7efdcce2.png',
          mainLanguage: 'fre',
          metadataUrl: 'url',
          thumbnailUrl:
            'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif',
          title: 'Surval - Données par paramètre',
          uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          viewable: true,
          downloadable: true,
        })
      })
    })
  })
})
