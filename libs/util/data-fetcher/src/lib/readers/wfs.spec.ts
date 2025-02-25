/**
 * @jest-environment jsdom
 */
import fetchMock from 'fetch-mock-jest'
import path from 'path'
import fs from 'fs/promises'
import { WfsReader } from './wfs'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { GeojsonReader } from './geojson'
import { GmlReader } from './gml'

const urlGeojson =
  'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson'
const urlGml = 'http://localfile/fixtures/wfs-gml.xml'
const urlGeojsonLegacy = 'https://mygeojsonreader.edu'
const urlGmlLegacy = 'https://mygmlreader.edu'

jest.mock('@camptocamp/ogc-client', () => ({
  useCache: jest.fn(async (factory) =>
    JSON.parse(JSON.stringify(await factory()))
  ),
  sharedFetch: jest.fn((url) => global.fetch(url)),
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve(this)
    }
    getVersion() {
      if (this.url === urlGeojson || this.url === urlGml) {
        return '2.0.0'
      } else {
        return '1.0.0'
      }
    }
    getFeatureTypes() {
      return [
        {
          name: 'any',
          outputFormats: ['gml'],
          defaultCrs: 'EPSG:4326',
        },
      ]
    }
    getFeatureTypeSummary() {
      return {
        name: 'any',
        outputFormats: ['gml'],
        defaultCrs: 'EPSG:4326',
      }
    }
    getFeatureUrl(featureTypeName: string, options) {
      return `${this.url}?1=1&STARTINDEX=${options.startIndex}&MAXFEATURES=${options.maxFeatures}`
    }
    getFeatureTypeFull() {
      let properties
      if (this.url === urlGml) {
        properties = {
          boundedBy: 'string',
          id_map: 'float',
          id_mat: 'float',
          code_icpe: 'string',
          id_parc: 'string',
          nom_parc: 'string',
          id_pc: 'string',
          operateur: 'string',
          exploitant: 'string',
          date_crea: 'string',
          id_eolienn: 'string',
          x_rgf93: 'float',
          y_rgf93: 'float',
          x_pc: 'float',
          y_pc: 'float',
          sys_coord: 'string',
          alt_base: 'integer',
          n_parcel: 'string',
          puissanc_2: 'integer',
          code_com: 'integer',
          nom_commun: 'string',
          code_arron: 'integer',
          departemen: 'string',
          secteur: 'string',
          id_sre: 'string',
          ht_max: 'integer',
          ht_mat: 'integer',
          ht_nacelle: 'integer',
          diam_rotor: 'integer',
          gardesol: 'number',
          type_proce: 'string',
          etat_proce: 'string',
          date_depot: 'string',
          date_decis: 'date',
          contentieu: 'number',
          etat_mat: 'string',
          date_real: 'string',
          date_prod: 'string',
          en_service: 'string',
          etat_eolie: 'string',
          date_maj: 'date',
          srce_geom: 'string',
          precis_pos: 'string',
        }
      } else {
        properties = {
          code_epci: 'integer',
          code_region: 'string',
          objectid: 'integer',
          nom_region: 'string',
          geo_point_2d: 'string',
          nom_dep: 'string',
          st_area_shape: 'float',
          st_perimeter_shape: 'float',
          code_dep: 'string',
          nom_epci: 'string',
        }
      }
      return Promise.resolve({
        objectCount: 442,
        properties,
      })
    }
    supportsJson() {
      if (this.url === urlGeojson || this.url === urlGeojsonLegacy) {
        return true
      } else {
        return false
      }
    }
    supportsStartIndex() {
      if (this.url === urlGeojson) {
        return true
      } else {
        return false
      }
    }
  },
}))

describe('WfsReader', () => {
  describe('WfsReader - Wfs is version 2.0.0 geojson', () => {
    let reader: WfsReader
    const wfsEndpoint = new WfsEndpoint(urlGeojson)

    beforeEach(() => {
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
      reader = new WfsReader(urlGeojson, wfsEndpoint, 'epci')
      reader.load()
    })
    afterEach(() => {
      fetchMock.reset()
      jest.clearAllMocks()
    })
    describe('#info', () => {
      it('returns dataset info', async () => {
        await expect(reader.info).resolves.toEqual({
          itemsCount: 442,
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

      it('reads data with pagination (limits)', async () => {
        const getFeatureUrlSpy = jest.spyOn(wfsEndpoint, 'getFeatureUrl')
        reader.limit(2, 42)
        await reader.read()
        expect(getFeatureUrlSpy).toHaveBeenCalledWith('epci', {
          asJson: true,
          outputCrs: 'EPSG:4326',
          startIndex: 2,
          maxFeatures: 42,
        })
      })

      it('reads data with only certain fields', async () => {
        const getFeatureUrlSpy = jest.spyOn(wfsEndpoint, 'getFeatureUrl')
        reader.select('code_dep', 'nom_epci')
        await reader.read()
        expect(getFeatureUrlSpy).toHaveBeenCalledWith('epci', {
          asJson: true,
          outputCrs: 'EPSG:4326',
          attributes: ['code_dep', 'nom_epci'],
        })
      })
    })
    describe('When adding limits and sorting to the reader', () => {
      it('calls the Wfs api with the right startIndex, maxFeatures and sortby', async () => {
        const fetchDataAsTextSpy = jest.spyOn(
          require('../utils'),
          'fetchDataAsText'
        )
        reader.limit(42, 10)
        reader.orderBy(['asc', 'ville'], ['desc', 'epci'])
        await reader.read()
        expect(fetchDataAsTextSpy).toHaveBeenCalledWith(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson?1=1&STARTINDEX=42&MAXFEATURES=10&SORTBY=ville+A,epci+D'
        )
      })
    })
  })

  describe('WfsReader - Wfs is version 2.0.0 gml', () => {
    let reader: WfsReader
    beforeEach(() => {
      fetchMock.get(
        (url) => new URL(url).hostname === 'localfile',
        async (url) => {
          const filePath = path.join(__dirname, '../..', new URL(url).pathname)
          return {
            body: await fs.readFile(filePath, 'utf8'),
            status: 200,
            headers: {
              'Content-Type': 'text/csv',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
      const wfsEndpoint = new WfsEndpoint(urlGml)
      reader = new WfsReader(urlGml, wfsEndpoint, 'ms:n_mat_eolien_p_r32')
      reader.load()
    })
    afterEach(() => {
      fetchMock.reset()
    })
    describe('#info', () => {
      it('returns dataset info', async () => {
        await expect(reader.info).resolves.toEqual({
          itemsCount: 442,
        })
      })

      describe('#properties', () => {
        it('returns properties info', async () => {
          await expect(reader.properties).resolves.toEqual([
            { label: 'boundedBy', name: 'boundedBy', type: 'string' },
            { label: 'id_map', name: 'id_map', type: 'number' },
            { label: 'id_mat', name: 'id_mat', type: 'number' },
            { label: 'code_icpe', name: 'code_icpe', type: 'string' },
            { label: 'id_parc', name: 'id_parc', type: 'string' },
            { label: 'nom_parc', name: 'nom_parc', type: 'string' },
            { label: 'id_pc', name: 'id_pc', type: 'string' },
            { label: 'operateur', name: 'operateur', type: 'string' },
            { label: 'exploitant', name: 'exploitant', type: 'string' },
            { label: 'date_crea', name: 'date_crea', type: 'string' },
            { label: 'id_eolienn', name: 'id_eolienn', type: 'string' },
            { label: 'x_rgf93', name: 'x_rgf93', type: 'number' },
            { label: 'y_rgf93', name: 'y_rgf93', type: 'number' },
            { label: 'x_pc', name: 'x_pc', type: 'number' },
            { label: 'y_pc', name: 'y_pc', type: 'number' },
            { label: 'sys_coord', name: 'sys_coord', type: 'string' },
            { label: 'alt_base', name: 'alt_base', type: 'number' },
            { label: 'n_parcel', name: 'n_parcel', type: 'string' },
            { label: 'puissanc_2', name: 'puissanc_2', type: 'number' },
            { label: 'code_com', name: 'code_com', type: 'number' },
            { label: 'nom_commun', name: 'nom_commun', type: 'string' },
            { label: 'code_arron', name: 'code_arron', type: 'number' },
            { label: 'departemen', name: 'departemen', type: 'string' },
            { label: 'secteur', name: 'secteur', type: 'string' },
            { label: 'id_sre', name: 'id_sre', type: 'string' },
            { label: 'ht_max', name: 'ht_max', type: 'number' },
            { label: 'ht_mat', name: 'ht_mat', type: 'number' },
            { label: 'ht_nacelle', name: 'ht_nacelle', type: 'number' },
            { label: 'diam_rotor', name: 'diam_rotor', type: 'number' },
            { label: 'gardesol', name: 'gardesol', type: 'number' },
            { label: 'type_proce', name: 'type_proce', type: 'string' },
            { label: 'etat_proce', name: 'etat_proce', type: 'string' },
            { label: 'date_depot', name: 'date_depot', type: 'string' },
            { label: 'date_decis', name: 'date_decis', type: 'date' },
            { label: 'contentieu', name: 'contentieu', type: 'number' },
            { label: 'etat_mat', name: 'etat_mat', type: 'string' },
            { label: 'date_real', name: 'date_real', type: 'string' },
            { label: 'date_prod', name: 'date_prod', type: 'string' },
            { label: 'en_service', name: 'en_service', type: 'string' },
            { label: 'etat_eolie', name: 'etat_eolie', type: 'string' },
            { label: 'date_maj', name: 'date_maj', type: 'date' },
            { label: 'srce_geom', name: 'srce_geom', type: 'string' },
            { label: 'precis_pos', name: 'precis_pos', type: 'string' },
          ])
        })
      })
    })
  })

  describe('#createReader', () => {
    let reader: WfsReader
    beforeEach(() => {
      fetchMock.get(
        (url) => new URL(url).hostname === 'localfile',
        async (url) => {
          const filePath = path.join(__dirname, '../..', new URL(url).pathname)
          return {
            body: await fs.readFile(filePath, 'utf8'),
            status: 200,
            headers: {
              'Content-Type': 'text/csv',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
      const wfsEndpoint = new WfsEndpoint(urlGml)
      reader = new WfsReader(urlGml, wfsEndpoint, 'ms:n_mat_eolien_p_r32')
      reader.load()
    })
    afterEach(() => {
      fetchMock.reset()
    })
    it('returns an instance of WfsReader', async () => {
      await expect(
        WfsReader.createReader(urlGeojson, urlGeojson)
      ).resolves.toBeInstanceOf(WfsReader)
    })
    it('returns an instance of GeojsonReader', async () => {
      await expect(
        WfsReader.createReader(urlGeojsonLegacy, urlGeojsonLegacy)
      ).resolves.toBeInstanceOf(GeojsonReader)
    })
    it('returns an instance of GmlReader', async () => {
      await expect(
        WfsReader.createReader(urlGmlLegacy, urlGmlLegacy)
      ).resolves.toBeInstanceOf(GmlReader)
    })
  })
})
