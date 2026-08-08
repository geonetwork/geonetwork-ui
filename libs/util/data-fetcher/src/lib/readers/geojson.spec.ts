import { GeojsonReader } from './geojson'
import fetchMock from '@fetch-mock/jest'
import { useCache } from '@camptocamp/ogc-client'

describe('geojson parsing', () => {
  describe('GeojsonReader', () => {
    let reader: GeojsonReader
    let cacheActive = true
    beforeEach(() => {
      jest.clearAllMocks()
      reader = new GeojsonReader(
        'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson',
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
          itemsCount: 37,
          hasGeometry: true,
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
            type: 'other',
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
          id: 25,
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
