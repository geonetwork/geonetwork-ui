import fs from 'fs'
import path from 'path'
import { ExcelReader } from './excel'
import fetchMock from '@fetch-mock/jest'
import { useCache } from '@camptocamp/ogc-client'

describe('Excel parsing', () => {
  describe('ExcelReader', () => {
    let reader: ExcelReader
    let cacheActive = true
    beforeEach(() => {
      jest.clearAllMocks()
      fetchMock.route(
        ({ url }) => new URL(url).hostname === 'localfile',
        async ({ url }) => {
          const filePath = path.join(__dirname, '../..', new URL(url).pathname)
          return {
            body: fs.readFileSync(filePath, null),
            status: 200,
            headers: {
              'Content-Type': 'application/vnd.ms-excel',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
    })

    describe('XLS format', () => {
      beforeEach(() => {
        reader = new ExcelReader(
          'http://localfile/fixtures/ENS_CG02.xls',
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
            itemsCount: 259,
            hasGeometry: false,
          })
        })
      })
      describe('#properties', () => {
        it('returns properties info', async () => {
          await expect(reader.properties).resolves.toEqual([
            {
              label: 'FID',
              name: 'FID',
              type: 'string',
            },
            {
              label: 'the_geom',
              name: 'the_geom',
              type: 'string',
            },
            {
              label: 'ID',
              name: 'ID',
              type: 'number',
            },
            {
              label: 'ENS_POTENT',
              name: 'ENS_POTENT',
              type: 'string',
            },
            {
              label: 'PERIMETRE',
              name: 'PERIMETRE',
              type: 'number',
            },
            {
              label: 'SUPERFICIE',
              name: 'SUPERFICIE',
              type: 'number',
            },
            {
              label: 'ID_ENS',
              name: 'ID_ENS',
              type: 'string',
            },
            {
              label: 'Gestion',
              name: 'Gestion',
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
            id: 0,
            properties: {
              ENS_POTENT: 'Th 023',
              FID: 'ENS_CG02.1',
              Gestion: 'o',
              ID: 0,
              ID_ENS: 'TH 023',
              PERIMETRE: 1448.09054340757,
              SUPERFICIE: 86511.35571961474,
              the_geom:
                'MULTIPOLYGON (((756783.4911681091 6943693.466001436, 756973.9557157363 6943699.033945308, 757071.0605141836 6943710.784083098, 757306.3095355278 6943701.600258818, 757320.4355607403 6943672.737612311, 757354.0916407352 6943616.762834985, 757355.5828327122 6943580.821844398, 757346.3269744576 6943548.564972184, 757324.4667942899 6943512.822329184, 757293.7168386498 6943487.933692504, 757280.9447310865 6943464.688769508, 757277.1234141111 6943437.774987674, 757284.1406655983 6943417.954808124, 757296.5619476133 6943399.885143167, 757298.1904209342 6943380.110736016, 757314.2194736927 6943363.806842901, 757332.2583315391 6943372.63570071, 757373.2519701455 6943334.562767278, 757380.101431174 6943294.983439544, 757157.3195574313 6943291.486489333, 756914.6110583611 6943268.398177572, 756853.2672335848 6943448.560780707, 756832.2154494472 6943508.021309288, 756803.9938767474 6943569.33915255, 756779.3953241408 6943634.219057551, 756783.4911681091 6943693.466001436)))',
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
    describe('XLSX format', () => {
      beforeEach(() => {
        reader = new ExcelReader(
          'http://localfile/fixtures/eaux-baignades.xlsx',
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
            itemsCount: 14,
            hasGeometry: false,
          })
        })
      })
      describe('#properties', () => {
        it('returns properties info', async () => {
          await expect(reader.properties).resolves.toEqual([
            {
              label: 'ID',
              name: 'ID',
              type: 'number',
            },
            {
              label: 'DEP_NOM',
              name: 'DEP_NOM',
              type: 'string',
            },
            {
              label: 'DEP_NUM',
              name: 'DEP_NUM',
              type: 'number',
            },
            {
              label: 'FRANCE',
              name: 'FRANCE',
              type: 'string',
            },
            {
              label: 'FACADE',
              name: 'FACADE',
              type: 'string',
            },
            {
              label: 'TYPE',
              name: 'TYPE',
              type: 'string',
            },
            {
              label: 'TRANSITION',
              name: 'TRANSITION',
              type: 'number',
            },
            {
              label: 'COMMUNE',
              name: 'COMMUNE',
              type: 'string',
            },
            {
              label: 'POINT',
              name: 'POINT',
              type: 'string',
            },
            {
              label: 'LONG',
              name: 'LONG',
              type: 'string',
            },
            {
              label: 'LAT',
              name: 'LAT',
              type: 'string',
            },
            {
              label: 'QEB_2013',
              name: 'QEB_2013',
              type: 'string',
            },
            {
              label: 'QEB_2014',
              name: 'QEB_2014',
              type: 'string',
            },
            {
              label: 'QEB_2015',
              name: 'QEB_2015',
              type: 'string',
            },
            {
              label: 'QEB_2016',
              name: 'QEB_2016',
              type: 'string',
            },
            {
              label: 'QEB_2017',
              name: 'QEB_2017',
              type: 'string',
            },
            {
              label: 'QEB_2018',
              name: 'QEB_2018',
              type: 'string',
            },
            {
              label: 'QEB_2019',
              name: 'QEB_2019',
              type: 'string',
            },
            {
              label: 'QEB_2020',
              name: 'QEB_2020',
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
            id: 24,
            properties: {
              COMMUNE: 'VAL-REVERMONT',
              DEP_NOM: 'AIN',
              DEP_NUM: 1,
              FACADE: 'Métropole',
              FRANCE: 'Métropole',
              ID: 24,
              LAT: '46.304200000000002',
              LONG: '5.356210000000000',
              POINT: "VAL-REVERMONT - PLAN D'EAU DE LA GRANGE DU PIN",
              QEB_2013: '5E',
              QEB_2014: '5E',
              QEB_2015: '5E',
              QEB_2016: '6E',
              QEB_2017: '5E',
              QEB_2018: '5E',
              QEB_2019: '5B',
              QEB_2020: '5E',
              TRANSITION: null,
              TYPE: 'douce',
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
})
