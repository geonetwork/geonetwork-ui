import fetchMock from 'fetch-mock-jest'
import fs from 'fs/promises'
import path from 'path'
import { readDataset } from './data-fetcher'
import * as csv from '../parsers/csv'

describe('data-fetcher', () => {
  beforeEach(() => {
    // this is used to make the HTTP requests pointing at http://localfile
    // to read the fixture files by name and set the correct content type
    fetchMock.get(
      (url) => new URL(url).hostname === 'localfile',
      async (url) => {
        const filePath = path.join(__dirname, '..', new URL(url).pathname)
        const body = await fs.readFile(filePath, 'utf8')
        const fileExt = path.extname(filePath)
        let contentType
        switch (fileExt) {
          case '.csv':
            contentType = 'text/csv'
            break
          case '.json':
            contentType = 'application/json'
            break
          case '.geojson':
            contentType = 'application/geo+json'
            break
          case '.xsl':
            contentType = 'application/vnd.ms-excel'
            break
          case '.xslx':
            contentType =
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            break
        }
        return {
          body,
          status: 200,
          headers: {
            'Content-Type': contentType,
          },
        }
      }
    )
    jest.spyOn(csv, 'parseCsv')
  })
  afterEach(() => {
    fetchMock.reset()
    jest.clearAllMocks()
  })
  describe('readDataset', () => {
    describe('network error occurs', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => {
            throw new Error('random network problem')
          }
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('random network problem'),
          isCrossOriginOrNetworkRelated: true,
        })
      })
    })
    describe('HTTP error code received', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({ body: 'something went wrong', status: 403 })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('HTTP error'),
          httpStatus: 403,
        })
      })
    })
    describe('Mime type is not recognized', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            body: 'some data in an unsupported format',
            status: 200,
            headers: {
              'Content-Type': 'application/unsupported',
            },
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining('content type is unsupported'),
          contentTypeError: true,
        })
      })
    })
    describe('Mime type is absent', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            status: 200,
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          message: expect.stringContaining(
            'content type could not be inferred'
          ),
          contentTypeError: true,
        })
      })
    })
    describe('CSV file (non geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await readDataset('http://localfile/fixtures/rephytox.csv')
        expect(csv[0]).toEqual({
          geometry: null,
          properties: {
            'Coordonnées passage : Coordonnées maxx': '1.99866073',
            'Coordonnées passage : Coordonnées maxy': '51.00247775',
            'Coordonnées passage : Coordonnées minx': '1.99866073',
            'Coordonnées passage : Coordonnées miny': '51.00247775',
            'Coordonnées passage : Coordonnées redéfinies': '0',
            'Echantillon : Commentaire': '',
            'Echantillon : Commentaire de qualification': '',
            'Echantillon : Date de qualification': '',
            'Echantillon : Date de validation': '',
            'Echantillon : Identifiant interne': '5380212',
            'Echantillon : Libellé du support': 'Bivalve',
            'Echantillon : Libellé du taxon support': 'Mytilus edulis',
            'Echantillon : Niveau de qualité': 'Non qualifié',
            "Libellé de l'engin de prélévement": 'Main ',
            'Lieu de surveillance : Identifiant': '1001104',
            'Lieu de surveillance : Libellé': 'Oye plage',
            'Lieu de surveillance : Mnémonique': '001-P-022',
            'Passage : Commentaire': '',
            'Passage : Commentaire de qualification': '',
            'Passage : Date': '15/04/2008',
            'Passage : Date de qualification': '',
            'Passage : Date de validation': '',
            'Passage : Niveau de qualité': 'Non qualifié',
            'Prélèvement : Commentaire': '',
            'Prélèvement : Commentaire de qualification': '',
            'Prélèvement : Date de qualification': '',
            'Prélèvement : Date de validation': '',
            'Prélèvement : Immersion': '0',
            'Prélèvement : Immersion Max': '',
            'Prélèvement : Immersion Min': '',
            'Prélèvement : Niveau': 'Emergé',
            'Prélèvement : Niveau de qualité': 'Non qualifié',
            'Prélèvement : Service préleveur : Code': 'PDG-ODE-LITTORAL-LERBL',
            'Prélèvement : Service préleveur : Libellé':
              'Laboratoire Environnement Ressources de Boulogne-sur-Mer',
            "Prélèvement : Symbole de l'unité d'immersion": 'm',
            "Prélèvement : Unité d'immersion": 'Mètre',
            'Résultat : Code paramètre': 'ASP',
            'Résultat : Commentaire de qualification': '',
            'Résultat : Commentaires': '',
            'Résultat : Date de qualification': '',
            'Résultat : Date de validation': '',
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
            'Résultat : Valeur de la mesure': '1.1',
            'Résultat : Valeur qualitative': '',
          },
          type: 'Feature',
        })
      })
    })
    describe('CSV file  (geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await readDataset(
          'http://localfile/fixtures/eaux-baignades.csv'
        )
        expect(csv[0]).toEqual({
          geometry: null,
          id: '1',
          properties: {
            COMMUNE: 'ANGLEFORT',
            DEP_NOM: 'AIN',
            DEP_NUM: '01',
            FACADE: 'Métropole',
            FRANCE: 'Métropole',
            LAT: '',
            LONG: '',
            POINT: "PLAN D'EAU D'ANGLEFORT",
            QEB_2013: '',
            QEB_2014: '',
            QEB_2015: '',
            QEB_2016: '',
            QEB_2017: '',
            QEB_2018: '',
            QEB_2019: '5N',
            QEB_2020: '5N',
            TRANSITION: '',
            TYPE: 'douce',
          },
          type: 'Feature',
        })
      })
    })
    describe('JSON file (geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const json = await readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.json'
        )
        expect(json[0]).toEqual({
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
    describe('GeoJSON file', () => {
      it('returns the objects in the file', async () => {
        const json = await readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson'
        )
        expect(json[0]).toEqual({
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
    describe('specifying a type hint', () => {
      it('ignores the advertised content type and follow the type hint instead', async () => {
        try {
          await readDataset(
            'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson',
            'csv'
          )
        } catch {} // eslint-disable-line
        expect(csv.parseCsv).toHaveBeenCalled()
      })
    })
  })
})
