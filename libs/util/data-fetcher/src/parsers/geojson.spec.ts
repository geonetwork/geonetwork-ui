import { parseGeojson } from './geojson'

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
      ).toEqual([
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
      ])
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
      ).toEqual([
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
      ])
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
      ).toThrow('Unexpected token')
    })
  })
})
