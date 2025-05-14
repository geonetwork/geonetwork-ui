import {
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
  OnlineLinkResource,
  ServiceEndpoint,
} from '@geonetwork-ui/common/domain/model/record'

export const someDataLinksFixture = () => [
  aSetOfLinksFixture().dataXls(),
  {
    description: 'CSV file',
    name: 'some_file_name.csv',
    url: new URL('https://test.org/some_file_name.csv'),
    type: 'download',
  } as DatasetDownloadDistribution,
]

export const someGeoDatalinksFixture = () => [
  {
    description: 'Geojson file',
    name: 'some_file_name.geojson',
    url: new URL('https://test.org/some_file_name.geojson'),
    type: 'download',
  } as DatasetDownloadDistribution,
  {
    description: 'Service WFS',
    name: 'abc:featureType',
    url: new URL('https://test.org/wfs'),
    type: 'service',
    accessServiceProtocol: 'wfs',
  } as DatasetServiceDistribution,
]

export const aSetOfLinksFixture = () => ({
  readmeLink: () =>
    ({
      description: 'Readme page',
      type: 'link',
      url: new URL('http://envlit.ifremer.fr/resultats/quadrige'),
    }) as OnlineLinkResource,
  doiLink: () =>
    ({
      description: 'DOI for the resource',
      type: 'link',
      url: new URL('http://doi.org/123-456-678'),
    }) as OnlineLinkResource,
  dataCsv: () =>
    ({
      name: 'abc.csv',
      description: 'Data in CSV format',
      type: 'download',
      sizeBytes: 1234567890,
      url: new URL('http://my.server/files/abc.csv'),
    }) as DatasetDownloadDistribution,
  dataPdf: () =>
    ({
      name: 'abc.pdf',
      description: 'Data in PDF format',
      type: 'download',
      url: new URL('https://my.server/files/abc.pdf'),
    }) as DatasetDownloadDistribution,
  dataJpg: () =>
    ({
      name: 'abc.jpg',
      description: 'Data in JPG format',
      type: 'download',
      url: new URL('https://my.server/files/abc.jpg'),
    }) as DatasetDownloadDistribution,
  dataZip: () =>
    ({
      name: 'abc.zip',
      description: 'Data in ZIP format',
      type: 'download',
      url: new URL('https://my.server/files/abc.zip'),
    }) as DatasetDownloadDistribution,
  dataXls: () =>
    ({
      name: 'abc.xls',
      description: 'Data in XLS format',
      type: 'download',
      url: new URL('https://my.server/files/abc.xls'),
    }) as DatasetDownloadDistribution,
  dataXlsx: () =>
    ({
      name: 'abc.XLSX',
      description: 'Data in XLSX format',
      type: 'download',
      url: new URL('https://my.server/files/abc.XLSX'),
    }) as DatasetDownloadDistribution,
  dataJson: () =>
    ({
      name: 'abc.json',
      description: 'Data in JSON format',
      type: 'download',
      url: new URL('https://my.server/files/abc.json'),
    }) as DatasetDownloadDistribution,
  geodataJson: () =>
    ({
      name: 'dataset.geojson',
      description: 'Geographic data in GeoJSON format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset.geojson'),
    }) as DatasetDownloadDistribution,
  geodataJsonWithMimeType: () =>
    ({
      name: 'dataset.geojson',
      description: 'Geographic data in GeoJSON format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset'),
      mimeType: 'application/vnd.geo+json',
    }) as DatasetDownloadDistribution,
  geodataKml: () =>
    ({
      name: 'dataset.kml',
      description: 'Geographic data in KML format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset.kml'),
    }) as DatasetDownloadDistribution,
  geodataGpkg: () =>
    ({
      name: 'dataset.gpkg',
      description: 'Geographic data in geopackage format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset.gpkg'),
    }) as DatasetDownloadDistribution,
  geodataShp: () =>
    ({
      name: 'dataset.shp',
      description: 'Geographic data in shapefile format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset.zip'),
    }) as DatasetDownloadDistribution,
  geodataShpWithMimeType: () =>
    ({
      name: 'dataset',
      description: 'Geographic data in shapefile format',
      type: 'download',
      url: new URL('http://my.server/files/geographic/dataset.zip'),
      mimeType: 'x-gis/x-shapefile',
    }) as DatasetDownloadDistribution,
  geodataWms: () =>
    ({
      name: 'mylayer',
      identifierInService: 'mylayer',
      type: 'service',
      url: new URL('https://my.ogc.server/wms'),
      accessServiceProtocol: 'wms',
    }) as DatasetServiceDistribution,
  geodataWmts: () =>
    ({
      name: 'mylayer',
      type: 'service',
      url: new URL('https://my.ogc.server/wmts'),
      accessServiceProtocol: 'wmts',
    }) as DatasetServiceDistribution,
  geodataWfs: () =>
    ({
      name: 'mylayer',
      type: 'service',
      url: new URL('https://my.ogc.server/wfs'),
      accessServiceProtocol: 'wfs',
    }) as DatasetServiceDistribution,
  geodataWfsDownload: () =>
    ({
      name: 'mylayer',
      type: 'download',
      url: new URL(
        'https://my.ogc.server/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=csv'
      ),
      accessServiceProtocol: 'wfs',
    }) as DatasetDownloadDistribution,
  geodataOgcApiDownload: () =>
    ({
      name: 'mylayer',
      type: 'download',
      url: new URL(
        'https://my.ogc.server/data/ogcapi/collections/comptages_velo/items?'
      ),
      accessServiceProtocol: 'ogcFeatures',
    }) as DatasetDownloadDistribution,
  geodataWms2: () =>
    ({
      name: 'myotherlayer',
      type: 'service',
      url: new URL('https://my.ogc.server/wms'),
      accessServiceProtocol: 'wms',
    }) as DatasetServiceDistribution,
  geodataTms: () =>
    ({
      name: 'mytmslayer',
      type: 'service',
      url: new URL('https://my.ogc.server/tms'),
      accessServiceProtocol: 'tms',
    }) as DatasetServiceDistribution,
  geodataAsMaplibreStyle: () =>
    ({
      name: 'mytmslayerAsMaplibreJson',
      type: 'service',
      url: new URL('https://my.ogc.server/tms/layer/style.json'),
      accessServiceProtocol: 'maplibre-style',
    }) as DatasetServiceDistribution,
  geodataWfs2: () =>
    ({
      name: 'myotherlayer',
      type: 'service',
      url: new URL('https://my.ogc.server/wfs'),
      accessServiceProtocol: 'wfs',
    }) as DatasetServiceDistribution,
  geodataRest: () =>
    ({
      name: 'myrestlayer',
      type: 'service',
      url: new URL('https://my.esri.server/FeatureServer'),
      accessServiceProtocol: 'esriRest',
    }) as DatasetServiceDistribution,
  geodataRestWfs: () =>
    ({
      name: 'mywfsrestlayer',
      type: 'service',
      url: new URL('https://my.esri.server/WFSServer'),
      accessServiceProtocol: 'wfs',
    }) as DatasetServiceDistribution,
  maplayerRest: () =>
    ({
      name: 'myotherrestlayer',
      type: 'link',
      url: new URL('https://my.esri.server/MapServer'),
    }) as OnlineLinkResource,
  landingPage: () =>
    ({
      name: 'landingpage link',
      type: 'link',
      url: new URL('https://landing.page'),
    }) as OnlineLinkResource,
  unknownFormat: () =>
    ({
      name: 'Vue HTML des métadonnées sur internet',
      type: 'download',
      url: new URL(
        'http://catalogue.geo-ide.developpement-durable.gouv.fr/catalogue/srv/fre/catalog.search#/metadata/fr-120066022-jdd-199fd14c-2abb-4c14-b0f8-6c8d92e7b480'
      ),
    }) as DatasetDownloadDistribution,
  ogcApiFormat: () =>
    ({
      name: 'ogc api features layer',
      type: 'service',
      url: new URL(
        'https://mel.integration.apps.gs-fr-prod.camptocamp.com/data/ogcapi/collections/comptages_velo/items?'
      ),
      accessServiceProtocol: 'ogcFeatures',
    }) as DatasetServiceDistribution,
  wmsEndpoint: () =>
    ({
      description:
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
      url: new URL(
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS'
      ),
      accessServiceProtocol: 'wms',
      type: 'endpoint',
    }) as ServiceEndpoint,
})
