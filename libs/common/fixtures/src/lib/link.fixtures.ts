import { deepFreeze } from './utils/freeze'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

export const LINK_FIXTURES: Record<string, DatasetDistribution> = deepFreeze({
  readmeLink: {
    description: 'Readme page',
    type: 'link',
    url: new URL('http://envlit.ifremer.fr/resultats/quadrige'),
  },
  doiLink: {
    description: 'DOI for the resource',
    type: 'link',
    url: new URL('http://doi.org/123-456-678'),
  },
  dataCsv: {
    name: 'abc.csv',
    description: 'Data in CSV format',
    type: 'download',
    url: new URL('http://my.server/files/abc.csv'),
  },
  dataPdf: {
    name: 'abc.pdf',
    description: 'Data in PDF format',
    type: 'download',
    url: new URL('https://my.server/files/abc.pdf'),
  },
  dataJpg: {
    name: 'abc.jpg',
    description: 'Data in JPG format',
    type: 'download',
    url: new URL('https://my.server/files/abc.jpg'),
  },
  dataZip: {
    name: 'abc.zip',
    description: 'Data in ZIP format',
    type: 'download',
    url: new URL('https://my.server/files/abc.zip'),
  },
  dataXls: {
    name: 'abc.xls',
    description: 'Data in XLS format',
    type: 'download',
    url: new URL('https://my.server/files/abc.xls'),
  },
  dataXlsx: {
    name: 'abc.XLSX',
    description: 'Data in XLSX format',
    type: 'download',
    url: new URL('https://my.server/files/abc.XLSX'),
  },
  dataJson: {
    name: 'abc.json',
    description: 'Data in JSON format',
    type: 'download',
    url: new URL('https://my.server/files/abc.json'),
  },
  geodataJson: {
    name: 'dataset.geojson',
    description: 'Geographic data in GeoJSON format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset.geojson'),
  },
  geodataJsonWithMimeType: {
    name: 'dataset.geojson',
    description: 'Geographic data in GeoJSON format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset'),
    mimeType: 'application/vnd.geo+json',
  },
  geodataKml: {
    name: 'dataset.kml',
    description: 'Geographic data in KML format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset.kml'),
  },
  geodataGpkg: {
    name: 'dataset.gpkg',
    description: 'Geographic data in geopackage format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset.gpkg'),
  },
  geodataShp: {
    name: 'dataset.shp',
    description: 'Geographic data in shapefile format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset.zip'),
  },
  geodataShpWithMimeType: {
    name: 'dataset',
    description: 'Geographic data in shapefile format',
    type: 'download',
    url: new URL('http://my.server/files/geographic/dataset.zip'),
    mimeType: 'x-gis/x-shapefile',
  },
  geodataWms: {
    name: 'mylayer',
    type: 'service',
    url: new URL('https://my.ogc.server/wms'),
    accessServiceProtocol: 'wms',
  },
  geodataWmts: {
    name: 'mylayer',
    type: 'service',
    url: new URL('https://my.ogc.server/wmts'),
    accessServiceProtocol: 'wmts',
  },
  geodataWfs: {
    name: 'mylayer',
    type: 'service',
    url: new URL('https://my.ogc.server/wfs'),
    accessServiceProtocol: 'wfs',
  },
  geodataWms2: {
    name: 'myotherlayer',
    type: 'service',
    url: new URL('https://my.ogc.server/wms'),
    accessServiceProtocol: 'wms',
  },
  geodataWfs2: {
    name: 'myotherlayer',
    type: 'service',
    url: new URL('https://my.ogc.server/wfs'),
    accessServiceProtocol: 'wfs',
  },
  geodataRest: {
    name: 'myrestlayer',
    type: 'service',
    url: new URL('https://my.esri.server/FeatureServer'),
    accessServiceProtocol: 'esriRest',
  },
  geodataRestWfs: {
    name: 'mywfsrestlayer',
    type: 'service',
    url: new URL('https://my.esri.server/WFSServer'),
    accessServiceProtocol: 'wfs',
  },
  maplayerRest: {
    name: 'myotherrestlayer',
    type: 'link',
    url: new URL('https://my.esri.server/MapServer'),
  },
  landingPage: {
    name: 'landingpage link',
    type: 'link',
    url: new URL('https://landing.page'),
  },
  unknownFormat: {
    name: 'Vue HTML des métadonnées sur internet',
    type: 'download',
    url: new URL(
      'http://catalogue.geo-ide.developpement-durable.gouv.fr/catalogue/srv/fre/catalog.search#/metadata/fr-120066022-jdd-199fd14c-2abb-4c14-b0f8-6c8d92e7b480'
    ),
  },
})
