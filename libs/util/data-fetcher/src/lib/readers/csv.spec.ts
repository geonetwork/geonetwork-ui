import { CsvReader } from './csv'
import fetchMock from '@fetch-mock/jest'
import { Engine, getEngine } from '../engine/duckdb'

afterEach(() => {
  jest.clearAllMocks()
})

describe('CSV parsing', () => {
  describe('CsvReader', () => {
    let reader: CsvReader
    beforeEach(() => {
      reader = new CsvReader('http://localfile/fixtures/rephytox.csv')
      reader.load()
    })
    afterEach(() => {
      fetchMock.mockReset()
    })
    it('received a stable dataset id', () => {
      expect(reader['datasetId']).toMatch(/^datafetcher_[0-9a-z]+$/)
    })
    describe('#info', () => {
      it('returns dataset info', async () => {
        await expect(reader.info).resolves.toEqual({
          itemsCount: 279,
          hasGeometry: false,
        })
      })
    })
    describe('#properties', () => {
      it('returns properties info', async () => {
        await expect(reader.properties).resolves.toEqual([
          {
            name: 'Passage : Commentaire',
            label: 'Passage : Commentaire',
            type: 'string',
          },
          {
            name: 'Lieu de surveillance : Identifiant',
            label: 'Lieu de surveillance : Identifiant',
            type: 'number',
          },
          {
            name: 'Lieu de surveillance : Mnémonique',
            label: 'Lieu de surveillance : Mnémonique',
            type: 'string',
          },
          {
            name: 'Lieu de surveillance : Libellé',
            label: 'Lieu de surveillance : Libellé',
            type: 'string',
          },
          { name: 'Passage : Date', label: 'Passage : Date', type: 'date' },
          {
            name: 'Coordonnées passage : Coordonnées minx',
            label: 'Coordonnées passage : Coordonnées minx',
            type: 'number',
          },
          {
            name: 'Coordonnées passage : Coordonnées maxx',
            label: 'Coordonnées passage : Coordonnées maxx',
            type: 'number',
          },
          {
            name: 'Coordonnées passage : Coordonnées miny',
            label: 'Coordonnées passage : Coordonnées miny',
            type: 'number',
          },
          {
            name: 'Coordonnées passage : Coordonnées maxy',
            label: 'Coordonnées passage : Coordonnées maxy',
            type: 'number',
          },
          {
            name: 'Coordonnées passage : Coordonnées redéfinies',
            label: 'Coordonnées passage : Coordonnées redéfinies',
            type: 'number',
          },
          {
            name: 'Prélèvement : Commentaire',
            label: 'Prélèvement : Commentaire',
            type: 'string',
          },
          {
            name: "Libellé de l'engin de prélévement",
            label: "Libellé de l'engin de prélévement",
            type: 'string',
          },
          {
            name: 'Prélèvement : Niveau',
            label: 'Prélèvement : Niveau',
            type: 'string',
          },
          {
            name: 'Prélèvement : Immersion',
            label: 'Prélèvement : Immersion',
            type: 'number',
          },
          {
            name: 'Prélèvement : Immersion Min',
            label: 'Prélèvement : Immersion Min',
            type: 'string',
          },
          {
            name: 'Prélèvement : Immersion Max',
            label: 'Prélèvement : Immersion Max',
            type: 'string',
          },
          {
            name: "Prélèvement : Symbole de l'unité d'immersion",
            label: "Prélèvement : Symbole de l'unité d'immersion",
            type: 'string',
          },
          {
            name: "Prélèvement : Unité d'immersion",
            label: "Prélèvement : Unité d'immersion",
            type: 'string',
          },
          {
            name: 'Echantillon : Commentaire',
            label: 'Echantillon : Commentaire',
            type: 'string',
          },
          {
            name: 'Echantillon : Identifiant interne',
            label: 'Echantillon : Identifiant interne',
            type: 'number',
          },
          {
            name: 'Echantillon : Libellé du support',
            label: 'Echantillon : Libellé du support',
            type: 'string',
          },
          {
            name: 'Echantillon : Libellé du taxon support',
            label: 'Echantillon : Libellé du taxon support',
            type: 'string',
          },
          {
            name: 'Résultat : Code paramètre',
            label: 'Résultat : Code paramètre',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé paramètre',
            label: 'Résultat : Libellé paramètre',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé support',
            label: 'Résultat : Libellé support',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé fraction',
            label: 'Résultat : Libellé fraction',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé méthode',
            label: 'Résultat : Libellé méthode',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé précision',
            label: 'Résultat : Libellé précision',
            type: 'string',
          },
          {
            name: 'Résultat : Valeur de la mesure',
            label: 'Résultat : Valeur de la mesure',
            type: 'number',
          },
          {
            name: 'Résultat : Valeur qualitative',
            label: 'Résultat : Valeur qualitative',
            type: 'string',
          },
          {
            name: 'Résultat : Symbole unité de mesure associé au quadruplet',
            label: 'Résultat : Symbole unité de mesure associé au quadruplet',
            type: 'string',
          },
          {
            name: 'Résultat : Libellé unité de mesure associé au quadruplet',
            label: 'Résultat : Libellé unité de mesure associé au quadruplet',
            type: 'string',
          },
          {
            name: 'Résultat : Commentaires',
            label: 'Résultat : Commentaires',
            type: 'string',
          },
          {
            name: 'Résultat : Service analyste : Libellé',
            label: 'Résultat : Service analyste : Libellé',
            type: 'string',
          },
          {
            name: 'Passage : Date de validation',
            label: 'Passage : Date de validation',
            type: 'date',
          },
          {
            name: 'Passage : Date de qualification',
            label: 'Passage : Date de qualification',
            type: 'string',
          },
          {
            name: 'Passage : Niveau de qualité',
            label: 'Passage : Niveau de qualité',
            type: 'string',
          },
          {
            name: 'Passage : Commentaire de qualification',
            label: 'Passage : Commentaire de qualification',
            type: 'string',
          },
          {
            name: 'Prélèvement : Date de validation',
            label: 'Prélèvement : Date de validation',
            type: 'date',
          },
          {
            name: 'Prélèvement : Date de qualification',
            label: 'Prélèvement : Date de qualification',
            type: 'string',
          },
          {
            name: 'Prélèvement : Niveau de qualité',
            label: 'Prélèvement : Niveau de qualité',
            type: 'string',
          },
          {
            name: 'Prélèvement : Commentaire de qualification',
            label: 'Prélèvement : Commentaire de qualification',
            type: 'string',
          },
          {
            name: 'Echantillon : Date de validation',
            label: 'Echantillon : Date de validation',
            type: 'date',
          },
          {
            name: 'Echantillon : Date de qualification',
            label: 'Echantillon : Date de qualification',
            type: 'string',
          },
          {
            name: 'Echantillon : Niveau de qualité',
            label: 'Echantillon : Niveau de qualité',
            type: 'string',
          },
          {
            name: 'Echantillon : Commentaire de qualification',
            label: 'Echantillon : Commentaire de qualification',
            type: 'string',
          },
          {
            name: 'Résultat : Date de validation',
            label: 'Résultat : Date de validation',
            type: 'date',
          },
          {
            name: 'Résultat : Date de qualification',
            label: 'Résultat : Date de qualification',
            type: 'string',
          },
          {
            name: 'Résultat : Niveau de qualité',
            label: 'Résultat : Niveau de qualité',
            type: 'string',
          },
          {
            name: 'Résultat : Commentaire de qualification',
            label: 'Résultat : Commentaire de qualification',
            type: 'string',
          },
          {
            name: 'Prélèvement : Service préleveur : Code',
            label: 'Prélèvement : Service préleveur : Code',
            type: 'string',
          },
          {
            name: 'Prélèvement : Service préleveur : Libellé',
            label: 'Prélèvement : Service préleveur : Libellé',
            type: 'string',
          },
        ])
      })
    })
    describe('#read', () => {
      let start
      beforeEach(() => {
        start = performance.now()
      })
      afterEach(() => {
        console.log(
          `"${expect.getState().currentTestName}" took ${(
            performance.now() - start
          ).toFixed(1)}ms`
        )
      })
      describe('#selectAll', () => {
        it('reads all data items', async () => {
          const items = await reader.selectAll().read()
          expect(items.length).toEqual(279)
          expect(items[0]).toEqual({
            geometry: null,
            properties: {
              'Coordonnées passage : Coordonnées maxx': 1.99866073,
              'Coordonnées passage : Coordonnées maxy': 51.00247775,
              'Coordonnées passage : Coordonnées minx': 1.99866073,
              'Coordonnées passage : Coordonnées miny': 51.00247775,
              'Coordonnées passage : Coordonnées redéfinies': 0,
              'Echantillon : Commentaire': '',
              'Echantillon : Commentaire de qualification': '',
              'Echantillon : Date de qualification': '',
              'Echantillon : Date de validation': null,
              'Echantillon : Identifiant interne': 5380212,
              'Echantillon : Libellé du support': 'Bivalve',
              'Echantillon : Libellé du taxon support': 'Mytilus edulis',
              'Echantillon : Niveau de qualité': 'Non qualifié',
              "Libellé de l'engin de prélévement": 'Main ',
              'Lieu de surveillance : Identifiant': 1001104,
              'Lieu de surveillance : Libellé': 'Oye plage',
              'Lieu de surveillance : Mnémonique': '001-P-022',
              'Passage : Commentaire': '',
              'Passage : Commentaire de qualification': '',
              'Passage : Date': new Date('2008-04-15T00:00Z'), // expressed in UTC because it was a date in the data
              'Passage : Date de qualification': '',
              'Passage : Date de validation': null,
              'Passage : Niveau de qualité': 'Non qualifié',
              'Prélèvement : Commentaire': '',
              'Prélèvement : Commentaire de qualification': '',
              'Prélèvement : Date de qualification': '',
              'Prélèvement : Date de validation': null,
              'Prélèvement : Immersion': 0,
              'Prélèvement : Immersion Max': '',
              'Prélèvement : Immersion Min': '',
              'Prélèvement : Niveau': 'Emergé',
              'Prélèvement : Niveau de qualité': 'Non qualifié',
              'Prélèvement : Service préleveur : Code':
                'PDG-ODE-LITTORAL-LERBL',
              'Prélèvement : Service préleveur : Libellé':
                'Laboratoire Environnement Ressources de Boulogne-sur-Mer',
              "Prélèvement : Symbole de l'unité d'immersion": 'm',
              "Prélèvement : Unité d'immersion": 'Mètre',
              'Résultat : Code paramètre': 'ASP',
              'Résultat : Commentaire de qualification': '',
              'Résultat : Commentaires': '',
              'Résultat : Date de qualification': '',
              'Résultat : Date de validation': null,
              'Résultat : Libellé fraction': 'Chair totale égouttée',
              'Résultat : Libellé méthode': 'CL/UV toxines amnésiantes - mg/kg',
              'Résultat : Libellé paramètre': 'Toxines ASP',
              'Résultat : Libellé précision': '',
              'Résultat : Libellé support': 'Bivalve',
              'Résultat : Libellé unité de mesure associé au quadruplet':
                'Milligramme par kilogramme',
              'Résultat : Niveau de qualité': 'Non qualifié',
              'Résultat : Service analyste : Libellé':
                'Laboratoire Environnement Ressources de Bretagne Occidentale',
              'Résultat : Symbole unité de mesure associé au quadruplet':
                'mg.kg-1',
              'Résultat : Valeur de la mesure': 1.1,
              'Résultat : Valeur qualitative': '',
            },
            type: 'Feature',
          })
        })
      })
      describe('#select', () => {
        it('reads only certain fields', async () => {
          const items = await reader
            .select(
              'Echantillon : Commentaire',
              'Résultat : Valeur de la mesure'
            )
            .read()
          expect(items.length).toEqual(279)
          expect(items[0]).toEqual({
            geometry: null,
            properties: {
              'Echantillon : Commentaire': '',
              'Résultat : Valeur de la mesure': 1.1,
            },
            type: 'Feature',
          })
        })
      })
      describe('#limit', () => {
        it('reads only a certain range of items', async () => {
          const items = await reader.limit(12, 5).read()
          expect(items.length).toEqual(5)
          expect(items[0]).toEqual({
            geometry: null,
            properties: expect.objectContaining({
              'Echantillon : Identifiant interne': 60577361,
            }),
            type: 'Feature',
          })
        })
      })
      describe('#orderBy', () => {
        it('reads only a certain range of items', async () => {
          const items = await reader
            .orderBy(
              ['desc', 'Lieu de surveillance : Mnémonique'],
              ['asc', 'Prélèvement : Date de validation'],
              ['desc', 'Echantillon : Identifiant interne']
            )
            .read()
          expect(items.length).toEqual(279)
          expect(items.slice(0, 3)).toEqual([
            {
              geometry: null,
              properties: expect.objectContaining({
                'Lieu de surveillance : Mnémonique': '003-S-032',
                'Prélèvement : Date de validation': new Date(
                  '2013-01-31T00:00Z'
                ),
                'Echantillon : Identifiant interne': 60362233,
              }),
              type: 'Feature',
            },
            {
              geometry: null,
              properties: expect.objectContaining({
                'Lieu de surveillance : Mnémonique': '003-S-032',
                'Prélèvement : Date de validation': new Date(
                  '2016-01-05T00:00Z'
                ),
                'Echantillon : Identifiant interne': 60539259,
              }),
              type: 'Feature',
            },
            {
              geometry: null,
              properties: expect.objectContaining({
                'Lieu de surveillance : Mnémonique': '003-S-032',
                'Prélèvement : Date de validation': new Date(
                  '2016-01-05T00:00Z'
                ),
                'Echantillon : Identifiant interne': 60528877,
              }),
              type: 'Feature',
            },
          ])
        })
      })
      describe('#aggregate', () => {
        it('aggregates all records', async () => {
          const items = await reader
            .groupBy(['all'])
            .aggregate(
              ['count'],
              ['max', 'Résultat : Valeur de la mesure'],
              ['min', 'Résultat : Valeur de la mesure'],
              ['sum', 'Résultat : Valeur de la mesure'],
              ['average', 'Résultat : Valeur de la mesure']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(Résultat : Valeur de la mesure)': 2.0777777777777775,
                'count()': 279,
                'max(Résultat : Valeur de la mesure)': 17.9,
                'min(Résultat : Valeur de la mesure)': 0.15,
                'sum(Résultat : Valeur de la mesure)': 579.6999999999999,
              },
              type: 'Feature',
            },
          ])
        })
        it('aggregates by distinct values', async () => {
          const items = await reader
            .groupBy(['distinct', 'Echantillon : Libellé du taxon support'])
            .aggregate(
              ['count'],
              ['max', 'Résultat : Valeur de la mesure'],
              ['min', 'Résultat : Valeur de la mesure'],
              ['sum', 'Résultat : Valeur de la mesure'],
              ['average', 'Résultat : Valeur de la mesure']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(Résultat : Valeur de la mesure)': 1.972368421052632,
                'count()': 38,
                'distinct(Echantillon : Libellé du taxon support)':
                  'Mytilus edulis',
                'max(Résultat : Valeur de la mesure)': 15,
                'min(Résultat : Valeur de la mesure)': 0.15,
                'sum(Résultat : Valeur de la mesure)': 74.95000000000002,
              },
              type: 'Feature',
            },
            {
              geometry: null,
              properties: {
                'average(Résultat : Valeur de la mesure)': 2.094398340248963,
                'count()': 241,
                'distinct(Echantillon : Libellé du taxon support)':
                  'Pecten maximus',
                'max(Résultat : Valeur de la mesure)': 17.9,
                'min(Résultat : Valeur de la mesure)': 0.15,
                'sum(Résultat : Valeur de la mesure)': 504.7500000000001,
              },
              type: 'Feature',
            },
          ])
        })
        // FIXME: unskip when buckets are implemented
        it.skip('aggregates by ranges', async () => {
          const items = await reader
            .groupBy(['rangeBuckets', 'Passage : Date', 4])
            .aggregate(
              ['count'],
              ['max', 'Prélèvement : Immersion'],
              ['min', 'Prélèvement : Immersion'],
              ['sum', 'Prélèvement : Immersion'],
              ['average', 'Prélèvement : Immersion']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'rangeMin(Passage : Date)': '',
                'rangeMax(Passage : Date)': '',
                'max(Prélèvement : Immersion)': 1.1,
                'min(Prélèvement : Immersion)': 1.1,
                'sum(Prélèvement : Immersion)': 1.1,
                'average(Prélèvement : Immersion)': 1.1,
              },
              type: 'Feature',
            },
          ])
        })
      })
      describe('#where', () => {
        it('filters records', async () => {
          const items = await reader
            .where([
              'or',
              ['>', 'Résultat : Valeur de la mesure', 2],
              ['=', 'Résultat : Libellé précision', 'Inf. LQ'],
            ])
            .read()
          expect(items.length).toEqual(90)
          expect(items[0]).toEqual({
            geometry: null,
            properties: expect.objectContaining({
              'Echantillon : Identifiant interne': 60034460,
            }),
            type: 'Feature',
          })
        })
      })
    })
  })

  describe('Caching', () => {
    let engine: Engine
    beforeEach(async () => {
      engine = await getEngine()
      jest.spyOn(engine['db'].logger, 'log')
    })
    it('drops any existing table if caching is disabled', async () => {
      const reader = new CsvReader('http://localfile/fixtures/rephytox.csv')
      reader.enableCache(false)
      await reader.load()
      await reader.read()
      expect(engine['db'].logger.log).toHaveBeenCalledWith(
        expect.objectContaining({
          value: expect.stringContaining(`DROP TABLE IF EXISTS datafetcher_`),
        })
      )
    })
    it('keeps any existing table if caching is enabled', async () => {
      const reader = new CsvReader('http://localfile/fixtures/rephytox.csv')
      reader.enableCache(true)
      await reader.load()
      await reader.read()
      expect(engine['db'].logger.log).toHaveBeenCalledWith(
        expect.objectContaining({
          value: expect.stringContaining(
            `CREATE TABLE IF NOT EXISTS datafetcher_`
          ),
        })
      )
    })
  })

  describe('multiple readers targeting the same URL', () => {
    it('does not recreate a new table each time', async () => {
      const reader1 = new CsvReader('http://localfile/fixtures/rephytox.csv')
      await reader1.load()
      await reader1.read()
      const reader2 = new CsvReader('http://localfile/fixtures/rephytox.csv')
      await reader2.load()
      await reader2.read()

      // check that dataset ids are the same and that they have the right records info
      expect(reader1['datasetId']).toBe(reader2['datasetId'])
      expect((await reader1.info).itemsCount).toBe(279)
      expect((await reader2.info).itemsCount).toBe(279)

      const engine = await getEngine()
      const conn = await engine['db'].connect()
      const results = await conn.query(
        'SELECT "table_name" from information_schema.tables'
      )
      expect(results.toArray().map((r) => r.toJSON())).toEqual([
        {
          table_name: 'datafetcher_758f8d32',
        },
      ])
      conn.close()
    })
  })
})
