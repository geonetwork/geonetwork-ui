import { GeojsonReader, parseGeojson } from './geojson'
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

describe('geojson parsing', () => {
  describe('parseGeojson', () => {
    describe('Valid Geojson (array of features)', () => {
      it('returns the features', () => {
        expect(
          parseGeojson(`
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.37305747018,
          43.7929180957
        ]
      },
      "properties": {
        "code_epci": 200017341,
        "code_region": "76",
        "objectid": 25,
        "nom_region": "OCCITANIE",
        "geo_point_2d": [
          43.7929180957,
          3.37305747018
        ],
        "nom_dep": "HERAULT",
        "st_area_shape": 554841824.0549872,
        "st_perimeter_shape": 125726.64842881361,
        "code_dep": "34",
        "nom_epci": "CC Lod\u00e9vois et Larzac"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.57226840664,
          44.1745337933
        ]
      },
      "properties": {
        "code_epci": 200034692,
        "code_region": "76",
        "objectid": 29,
        "nom_region": "OCCITANIE",
        "geo_point_2d": [
          44.1745337933,
          4.57226840664
        ],
        "nom_dep": "GARD",
        "st_area_shape": 632262734.2850112,
        "st_perimeter_shape": 138820.51662269383,
        "code_dep": "30",
        "nom_epci": "CA Gard Rhodanien"
      }
    }
  ]
}`)
        ).toEqual({
          items: [
            {
              geometry: {
                coordinates: [3.37305747018, 43.7929180957],
                type: 'Point',
              },
              properties: {
                code_dep: '34',
                code_epci: 200017341,
                code_region: '76',
                geo_point_2d: [43.7929180957, 3.37305747018],
                nom_dep: 'HERAULT',
                nom_epci: 'CC Lodévois et Larzac',
                nom_region: 'OCCITANIE',
                objectid: 25,
                st_area_shape: 554841824.0549872,
                st_perimeter_shape: 125726.64842881361,
              },
              type: 'Feature',
            },
            {
              geometry: {
                coordinates: [4.57226840664, 44.1745337933],
                type: 'Point',
              },
              properties: {
                code_dep: '30',
                code_epci: 200034692,
                code_region: '76',
                geo_point_2d: [44.1745337933, 4.57226840664],
                nom_dep: 'GARD',
                nom_epci: 'CA Gard Rhodanien',
                nom_region: 'OCCITANIE',
                objectid: 29,
                st_area_shape: 632262734.2850112,
                st_perimeter_shape: 138820.51662269383,
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
              label: 'objectid',
              name: 'objectid',
              type: 'number',
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
    describe('Valid Geojson (features collection)', () => {
      it('returns the features', () => {
        expect(
          parseGeojson(`
[
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        3.37305747018,
        43.7929180957
      ]
    },
    "properties": {
      "code_epci": 200017341,
      "code_region": "76",
      "objectid": 25,
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        43.7929180957,
        3.37305747018
      ],
      "nom_dep": "HERAULT",
      "st_area_shape": 554841824.0549872,
      "st_perimeter_shape": 125726.64842881361,
      "code_dep": "34",
      "nom_epci": "CC Lod\u00e9vois et Larzac"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        4.57226840664,
        44.1745337933
      ]
    },
    "properties": {
      "code_epci": 200034692,
      "code_region": "76",
      "objectid": 29,
      "nom_region": "OCCITANIE",
      "geo_point_2d": [
        44.1745337933,
        4.57226840664
      ],
      "nom_dep": "GARD",
      "st_area_shape": 632262734.2850112,
      "st_perimeter_shape": 138820.51662269383,
      "code_dep": "30",
      "nom_epci": "CA Gard Rhodanien"
    }
  }
]`)
        ).toEqual({
          items: [
            {
              geometry: {
                coordinates: [3.37305747018, 43.7929180957],
                type: 'Point',
              },
              properties: {
                code_dep: '34',
                code_epci: 200017341,
                code_region: '76',
                geo_point_2d: [43.7929180957, 3.37305747018],
                nom_dep: 'HERAULT',
                nom_epci: 'CC Lodévois et Larzac',
                nom_region: 'OCCITANIE',
                objectid: 25,
                st_area_shape: 554841824.0549872,
                st_perimeter_shape: 125726.64842881361,
              },
              type: 'Feature',
            },
            {
              geometry: {
                coordinates: [4.57226840664, 44.1745337933],
                type: 'Point',
              },
              properties: {
                code_dep: '30',
                code_epci: 200034692,
                code_region: '76',
                geo_point_2d: [44.1745337933, 4.57226840664],
                nom_dep: 'GARD',
                nom_epci: 'CA Gard Rhodanien',
                nom_region: 'OCCITANIE',
                objectid: 29,
                st_area_shape: 632262734.2850112,
                st_perimeter_shape: 138820.51662269383,
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
              label: 'objectid',
              name: 'objectid',
              type: 'number',
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
    describe('neither array or Features collection', () => {
      it('throws a relevant error', () => {
        expect(() =>
          parseGeojson(`
{
  "records": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.37305747018,
          43.7929180957
        ]
      },
      "properties": {
        "code_epci": 200017341,
        "code_region": "76",
        "objectid": 25,
        "nom_region": "OCCITANIE",
        "geo_point_2d": [
          43.7929180957,
          3.37305747018
        ],
        "nom_dep": "HERAULT",
        "st_area_shape": 554841824.0549872,
        "st_perimeter_shape": 125726.64842881361,
        "code_dep": "34",
        "nom_epci": "CC Lod\u00e9vois et Larzac"
      }
    }
  ]
}`)
        ).toThrow('Could not parse GeoJSON')
      })
    })
    describe('invalid json', () => {
      it('throws a relevant error', () => {
        expect(() =>
          parseGeojson(`
[
  {
    "type": "Feature",
    geometry: {
      "type": "Point",
      "coordinates": [
        3.37305747018,
        43.7929180957
      ]
    },
    "properties": {
    }
  }
]`)
        ).toThrow('Expected double-quoted property')
      })
    })
  })

  describe('GeojsonReader', () => {
    let reader: GeojsonReader
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
              'Content-Type': 'application/geo+json',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
      reader = new GeojsonReader(
        'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson',
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
            label: 'objectid',
            name: 'objectid',
            type: 'number',
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
          geometry: {
            coordinates: [3.37305747018, 43.7929180957],
            type: 'Point',
          },
          properties: {
            code_dep: '34',
            code_epci: 200017341,
            code_region: '76',
            geo_point_2d: [43.7929180957, 3.37305747018],
            nom_dep: 'HERAULT',
            nom_epci: 'CC Lodévois et Larzac',
            nom_region: 'OCCITANIE',
            objectid: 25,
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
