import { jsonToGeojsonFeature, parseJson } from './json'

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
      ).toEqual([
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
      ])
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
      ).toEqual([
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
      ])
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
      "nom_dep": "ARIEGE",`)
      ).toThrowError('Unexpected end')
    })
  })
  describe('empty string column name', () => {
    it('is renamed to unknown', () => {
      expect(
        jsonToGeojsonFeature({
          '': '',
          code_region: '76',
          nom_region: 'OCCITANIE',
          geo_point_2d: [42.9178728416, 1.17961253606],
          nom_dep: 'ARIEGE',
        })
      ).toEqual({
        geometry: null,
        properties: {
          unknown: undefined,
          code_region: '76',
          nom_region: 'OCCITANIE',
          geo_point_2d: [42.9178728416, 1.17961253606],
          nom_dep: 'ARIEGE',
        },
        type: 'Feature',
      })
    })
  })
})
