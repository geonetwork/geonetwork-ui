import { JsonReader, parseJson } from './json'
import fetchMock from 'fetch-mock-jest'
import path from 'path'
import fs from 'fs/promises'
import { useCache } from '@camptocamp/ogc-client'

//todo: fix this test, to run without mocking useCache
jest.mock('@camptocamp/ogc-client', () => ({
  useCache: jest.fn(async (factory) =>
    JSON.parse(JSON.stringify(await factory()))
  ),
  sharedFetch: jest.fn((url) => global.fetch(url)),
}))

describe('json parsing', () => {
  describe('parseJson', () => {
    describe('valid JSON with id', () => {
      it('returns a parsed object', () => {
        expect(
          parseJson(`[{
      "code_epci": 200067940,
      "code_region": "76",
      "objectid": 42,
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        42.9178728416,
        1.17961253606
      ],
      "nom_dep": "ARIEGE",
      "st_area_shape": 1646792947.6950028,
      "st_perimeter_shape": 219256.7113489019,
      "code_dep": "09",
      "nom_epci": "CC Couserans-Pyrénées"
    }]`)
        ).toEqual({
          items: [
            {
              geometry: null,
              id: 42,
              properties: {
                code_dep: '09',
                code_epci: 200067940,
                code_region: '76',
                geo_point_2d: [42.9178728416, 1.17961253606],
                nom_dep: 'ARIEGE',
                nom_epci: 'CC Couserans-Pyrénées',
                nom_region: 'OCCITANIE',
                st_area_shape: 1646792947.6950028,
                st_perimeter_shape: 219256.7113489019,
              },
              type: 'Feature',
            },
          ],
          properties: [
            {
              label: 'code_epci',
              name: 'code_epci',
              type: 'number',
            },
            {
              label: 'code_region',
              name: 'code_region',
              type: 'string',
            },
            {
              label: 'nom_region',
              name: 'nom_region',
              type: 'string',
            },
            {
              label: 'geo_point_2d',
              name: 'geo_point_2d',
              type: 'string',
            },
            {
              label: 'nom_dep',
              name: 'nom_dep',
              type: 'string',
            },
            {
              label: 'st_area_shape',
              name: 'st_area_shape',
              type: 'number',
            },
            {
              label: 'st_perimeter_shape',
              name: 'st_perimeter_shape',
              type: 'number',
            },
            {
              label: 'code_dep',
              name: 'code_dep',
              type: 'string',
            },
            {
              label: 'nom_epci',
              name: 'nom_epci',
              type: 'string',
            },
          ],
        })
      })
    })
    describe('valid JSON without id', () => {
      it('returns a parsed object', () => {
        expect(
          parseJson(`[{
      "code_epci": 200067940,
      "code_region": "76",
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        42.9178728416,
        1.17961253606
      ],
      "nom_dep": "ARIEGE",
      "st_area_shape": 1646792947.6950028,
      "st_perimeter_shape": 219256.7113489019,
      "code_dep": "09",
      "nom_epci": "CC Couserans-Pyrénées"
    }]`)
        ).toEqual({
          items: [
            {
              geometry: null,
              properties: {
                code_dep: '09',
                code_epci: 200067940,
                code_region: '76',
                geo_point_2d: [42.9178728416, 1.17961253606],
                nom_dep: 'ARIEGE',
                nom_epci: 'CC Couserans-Pyrénées',
                nom_region: 'OCCITANIE',
                st_area_shape: 1646792947.6950028,
                st_perimeter_shape: 219256.7113489019,
              },
              type: 'Feature',
            },
          ],
          properties: [
            {
              label: 'code_epci',
              name: 'code_epci',
              type: 'number',
            },
            {
              label: 'code_region',
              name: 'code_region',
              type: 'string',
            },
            {
              label: 'nom_region',
              name: 'nom_region',
              type: 'string',
            },
            {
              label: 'geo_point_2d',
              name: 'geo_point_2d',
              type: 'string',
            },
            {
              label: 'nom_dep',
              name: 'nom_dep',
              type: 'string',
            },
            {
              label: 'st_area_shape',
              name: 'st_area_shape',
              type: 'number',
            },
            {
              label: 'st_perimeter_shape',
              name: 'st_perimeter_shape',
              type: 'number',
            },
            {
              label: 'code_dep',
              name: 'code_dep',
              type: 'string',
            },
            {
              label: 'nom_epci',
              name: 'nom_epci',
              type: 'string',
            },
          ],
        })
      })
    })
    describe('JSON without an array at root level', () => {
      it('throws a relevant error', () => {
        expect(() =>
          parseJson(`{"item": {
      "code_epci": 200067940,
      "code_region": "76",
      "objectid": 42,
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        42.9178728416,
        1.17961253606
      ],
      "nom_dep": "ARIEGE",
      "st_area_shape": 1646792947.6950028,
      "st_perimeter_shape": 219256.7113489019,
      "code_dep": "09",
      "nom_epci": "CC Couserans-Pyrénées"
    }}`)
        ).toThrowError('expected an array')
      })
    })
    describe('invalid JSON', () => {
      it('throws a relevant error', () => {
        expect(() =>
          parseJson(`[{
      "code_epci": 200067940,
      "code_region": "76",
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        42.9178728416,
        1.17961253606
      ],
      'nom_dep': "ARIEGE",
    }]`)
        ).toThrowError('Expected double-quoted property')
      })
    })
  })
  describe('JsonReader', () => {
    let reader: JsonReader
    let cacheActive = true
    beforeEach(() => {
      jest.clearAllMocks()
      fetchMock.get(
        (url) => new URL(url).hostname === 'localfile',
        async (url) => {
          const filePath = path.join(__dirname, '../..', new URL(url).pathname)
          return {
            body: await fs.readFile(filePath, 'utf8'),
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
      reader = new JsonReader(
        'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.json',
        cacheActive
      )
      reader.load()
    })
    afterEach(() => {
      fetchMock.reset()
    })
    describe('#info', () => {
      it('returns dataset info', async () => {
        await expect(reader.info).resolves.toEqual({
          itemsCount: 37,
        })
      })
    })
    describe('#properties', () => {
      it('returns properties info', async () => {
        await expect(reader.properties).resolves.toEqual([
          {
            label: 'code_epci',
            name: 'code_epci',
            type: 'number',
          },
          {
            label: 'code_region',
            name: 'code_region',
            type: 'string',
          },
          {
            label: 'nom_region',
            name: 'nom_region',
            type: 'string',
          },
          {
            label: 'geo_point_2d',
            name: 'geo_point_2d',
            type: 'string',
          },
          {
            label: 'nom_dep',
            name: 'nom_dep',
            type: 'string',
          },
          {
            label: 'st_area_shape',
            name: 'st_area_shape',
            type: 'number',
          },
          {
            label: 'st_perimeter_shape',
            name: 'st_perimeter_shape',
            type: 'number',
          },
          {
            label: 'code_dep',
            name: 'code_dep',
            type: 'string',
          },
          {
            label: 'nom_epci',
            name: 'nom_epci',
            type: 'string',
          },
        ])
      })
    })
    describe('#read', () => {
      it('reads data', async () => {
        const start = performance.now()
        const items = await reader.read()
        console.log(`took ${(performance.now() - start).toFixed(1)}ms`)
        expect(items[0]).toEqual({
          geometry: null,
          id: 25,
          properties: {
            code_dep: '34',
            code_epci: 200017341,
            code_region: '76',
            geo_point_2d: [43.7929180957, 3.37305747018],
            nom_dep: 'HERAULT',
            nom_epci: 'CC Lodévois et Larzac',
            nom_region: 'OCCITANIE',
            st_area_shape: 554841824.0549872,
            st_perimeter_shape: 125726.64842881361,
          },
          type: 'Feature',
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
