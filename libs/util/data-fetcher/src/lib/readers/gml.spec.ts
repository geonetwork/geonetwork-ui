import { GmlReader } from './gml'
import fetchMock from '@fetch-mock/jest'
import { useCache } from '@camptocamp/ogc-client'

describe('Gml parsing', () => {
  describe('GmlReader', () => {
    let reader: GmlReader
    let cacheActive = true
    beforeEach(() => {
      jest.clearAllMocks()
      reader = new GmlReader(
        'http://localfile/fixtures/wfs-gml.xml',
        cacheActive
      )
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
          itemsCount: 10,
          hasGeometry: true,
        })
      })
    })
    describe('#properties', () => {
      it('returns properties info', async () => {
        await expect(reader.properties).resolves.toEqual([
          {
            label: 'gml_id',
            name: 'gml_id',
            type: 'string',
          },
          { label: 'lowerCorner', name: 'lowerCorner', type: 'string' },
          { label: 'upperCorner', name: 'upperCorner', type: 'string' },
          { label: 'id_map', name: 'id_map', type: 'number' },
          { label: 'id_mat', name: 'id_mat', type: 'number' },
          { label: 'nom_parc', name: 'nom_parc', type: 'string' },
          { label: 'id_eolienn', name: 'id_eolienn', type: 'string' },
          { label: 'x_rgf93', name: 'x_rgf93', type: 'number' },
          { label: 'y_rgf93', name: 'y_rgf93', type: 'number' },
          { label: 'puissanc_2', name: 'puissanc_2', type: 'number' },
          { label: 'code_com', name: 'code_com', type: 'number' },
          { label: 'nom_commun', name: 'nom_commun', type: 'string' },
          { label: 'code_arron', name: 'code_arron', type: 'number' },
          { label: 'departemen', name: 'departemen', type: 'string' },
          { label: 'secteur', name: 'secteur', type: 'string' },
          { label: 'id_sre', name: 'id_sre', type: 'string' },
          { label: 'ht_max', name: 'ht_max', type: 'number' },
          { label: 'ht_mat', name: 'ht_mat', type: 'number' },
          { label: 'type_proce', name: 'type_proce', type: 'string' },
          { label: 'etat_proce', name: 'etat_proce', type: 'string' },
          { label: 'contentieu', name: 'contentieu', type: 'number' },
          { label: 'etat_mat', name: 'etat_mat', type: 'string' },
          { label: 'en_service', name: 'en_service', type: 'string' },
          { label: 'etat_eolie', name: 'etat_eolie', type: 'string' },
          { label: 'operateur', name: 'operateur', type: 'string' },
          { label: 'x_pc', name: 'x_pc', type: 'number' },
          { label: 'y_pc', name: 'y_pc', type: 'number' },
          { label: 'sys_coord', name: 'sys_coord', type: 'string' },
          { label: 'alt_base', name: 'alt_base', type: 'number' },
          { label: 'ht_nacelle', name: 'ht_nacelle', type: 'number' },
          { label: 'diam_rotor', name: 'diam_rotor', type: 'number' },
          { label: 'gardesol', name: 'gardesol', type: 'number' },
          { label: 'date_decis', name: 'date_decis', type: 'string' },
          { label: 'date_maj', name: 'date_maj', type: 'string' },
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
          expect(items.length).toEqual(10)
          expect(items[0]).toEqual({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [1.548145, 50.054755],
            },
            properties: {
              lowerCorner: '50.054755 1.548145',
              upperCorner: '50.054755 1.548145',
              id_map: 1862,
              id_mat: 1862,
              nom_parc: 'PARC EOLIEN DE CHASSE MAREE II',
              id_eolienn: 'L1.1',
              x_rgf93: 595929,
              y_rgf93: 6996108,
              puissanc_2: 2,
              code_com: 80360,
              nom_commun: 'FRESSENNEVILLE',
              code_arron: 801,
              departemen: 'SO',
              secteur: 'E - SECTEUR OUEST SOMME',
              id_sre: 'E-P',
              ht_max: 127,
              ht_mat: 0,
              type_proce: 'PC',
              etat_proce: 'AB',
              contentieu: 0,
              etat_mat: 'NCO',
              en_service: 'NON',
              etat_eolie: 'AB',
              alt_base: null,
              code_icpe: undefined,
              date_crea: undefined,
              date_decis: null,
              date_depot: undefined,
              date_maj: null,
              date_prod: undefined,
              date_real: undefined,
              diam_rotor: null,
              exploitant: undefined,
              gardesol: null,
              ht_nacelle: null,
              id_parc: undefined,
              id_pc: undefined,
              n_parcel: undefined,
              operateur: null,
              precis_pos: undefined,
              srce_geom: undefined,
              sys_coord: null,
              x_pc: null,
              y_pc: null,
              gml_id: '',
            },
          })
        })
      })
      describe('#select', () => {
        it('reads only certain fields', async () => {
          const items = await reader.select('nom_parc', 'x_rgf93').read()
          expect(items.length).toEqual(10)
          expect(items[0]).toEqual({
            geometry: null,
            properties: {
              nom_parc: 'PARC EOLIEN DE CHASSE MAREE II',
              x_rgf93: 595929.0,
            },
            type: 'Feature',
          })
        })
      })
      describe('#limit', () => {
        it('reads only a certain range of items', async () => {
          const items = await reader.limit(2, 3).read()
          expect(items.length).toEqual(3)
          expect(items[0]).toEqual({
            geometry: {
              coordinates: [1.560648, 50.054713],
              type: 'Point',
            },
            properties: expect.objectContaining({
              id_eolienn: 'L1.3',
            }),
            type: 'Feature',
          })
        })
      })
      describe('#orderBy', () => {
        it('returns items in a certain order', async () => {
          const items = await reader
            .orderBy(['asc', 'etat_eolie'], ['desc', 'x_rgf93'])
            .read()
          expect(items.length).toEqual(10)
          expect(items.slice(0, 3)).toEqual([
            {
              geometry: expect.any(Object),
              properties: expect.objectContaining({
                etat_eolie: 'AB',
                x_rgf93: 596825,
              }),
              type: 'Feature',
            },
            {
              geometry: expect.any(Object),
              properties: expect.objectContaining({
                etat_eolie: 'AB',
                x_rgf93: 596404.0,
              }),
              type: 'Feature',
            },
            {
              geometry: expect.any(Object),
              properties: expect.objectContaining({
                etat_eolie: 'AB',
                x_rgf93: 595929,
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
              ['max', 'ht_max'],
              ['min', 'ht_max'],
              ['sum', 'ht_max'],
              ['average', 'ht_max']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(ht_max)': 127.5,
                'count()': 10,
                'max(ht_max)': 130,
                'min(ht_max)': 126,
                'sum(ht_max)': 1275,
              },
              type: 'Feature',
            },
          ])
        })
        it('aggregates by distinct values', async () => {
          const items = await reader
            .groupBy(['distinct', 'puissanc_2'])
            .aggregate(
              ['count'],
              ['max', 'ht_max'],
              ['min', 'ht_max'],
              ['sum', 'ht_max'],
              ['average', 'ht_max']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(ht_max)': 128.5,
                'count()': 6,
                'distinct(puissanc_2)': 2,
                'max(ht_max)': 130,
                'min(ht_max)': 127,
                'sum(ht_max)': 771,
              },
              type: 'Feature',
            },
            {
              geometry: null,
              properties: {
                'average(ht_max)': 126,
                'count()': 4,
                'distinct(puissanc_2)': 2.75,
                'max(ht_max)': 126,
                'min(ht_max)': 126,
                'sum(ht_max)': 504,
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
              ['>', 'puissanc_2', 2],
              ['=', 'nom_commun', 'FRESSENNEVILLE'],
            ])
            .read()
          expect(items.length).toEqual(7)
          expect(items[0]).toEqual({
            geometry: {
              coordinates: [1.548145, 50.054755],
              type: 'Point',
            },
            properties: expect.objectContaining({
              nom_commun: 'FRESSENNEVILLE',
            }),
            type: 'Feature',
          })
        })
      })
    })
    describe('When cache should be used', () => {
      it('uses the cache', async () => {
        const useCacheSpy = jest.spyOn({ useCache }, 'useCache')
        await reader.read()
        expect(useCacheSpy).toHaveBeenCalledTimes(1)
      })
    })
    describe('When cache should not be used', () => {
      beforeAll(() => {
        cacheActive = false
      })
      it('does not use the cache', async () => {
        const useCacheSpy = jest.spyOn({ useCache }, 'useCache')
        await reader.read()
        expect(useCacheSpy).not.toHaveBeenCalled()
      })
    })
  })
})
