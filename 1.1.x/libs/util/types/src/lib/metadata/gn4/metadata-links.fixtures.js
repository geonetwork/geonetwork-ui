"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINK_FIXTURES = void 0;
const LINK_FIXTURES = () => ({
    readmeLink: {
        protocol: 'WWW:LINK',
        description: 'Readme page',
        url: 'http://envlit.ifremer.fr/resultats/quadrige',
    },
    doiLink: {
        protocol: 'WWW:DOI',
        description: 'DOI for the resource',
        url: 'http://doi.org/123-456-678',
    },
    dataCsv: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in CSV format',
        name: 'abc.csv',
        url: 'http://my.server/files/abc.csv',
    },
    dataPdf: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in PDF format',
        name: 'abc.pdf',
        url: 'https://my.server/files/abc.pdf',
    },
    dataJpg: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in JPG format',
        name: 'abc.jpg',
        url: 'https://my.server/files/abc.jpg',
    },
    dataZip: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in ZIP format',
        name: 'abc.zip',
        url: 'https://my.server/files/abc.zip',
    },
    dataXls: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in XLS format',
        name: 'abc.xls',
        url: 'https://my.server/files/abc.xls',
    },
    dataXlsx: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in XLSX format',
        name: 'abc.XLSX',
        url: 'https://my.server/files/abc.XLSX',
    },
    dataJson: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Data in JSON format',
        name: 'abc.json',
        url: 'https://my.server/files/abc.json',
    },
    geodataJson: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Geographic data in GeoJSON format',
        name: 'dataset.geojson',
        url: 'http://my.server/files/geographic/dataset.geojson',
    },
    geodataJsonWithMimeType: {
        protocol: 'WWW:DOWNLOAD:application/vnd.geo+json',
        description: 'Geographic data in GeoJSON format',
        name: 'dataset.geojson',
        url: 'http://my.server/files/geographic/dataset',
        mimeType: 'application/vnd.geo+json',
    },
    geodataKml: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Geographic data in KML format',
        name: 'dataset.kml',
        url: 'http://my.server/files/geographic/dataset.kml',
    },
    geodataGpkg: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Geographic data in geopackage format',
        name: 'dataset.gpkg',
        url: 'http://my.server/files/geographic/dataset.gpkg',
    },
    geodataShp: {
        protocol: 'WWW:DOWNLOAD',
        description: 'Geographic data in shapefile format',
        name: 'dataset.shp',
        url: 'http://my.server/files/geographic/dataset.zip',
    },
    geodataShpWithMimeType: {
        protocol: 'WWW:DOWNLOAD:x-gis/x-shapefile',
        description: 'Geographic data in shapefile format',
        name: 'dataset',
        url: 'http://my.server/files/geographic/dataset.zip',
        mimeType: 'x-gis/x-shapefile',
    },
    geodataWms: {
        protocol: 'OGC:WMS',
        name: 'mylayer',
        url: 'https://my.ogc.server/wms',
    },
    geodataWmts: {
        protocol: 'OGC:WMTS',
        name: 'mylayer',
        url: 'https://my.ogc.server/wmts',
    },
    geodataWfs: {
        protocol: 'OGC:WFS',
        name: 'mylayer',
        url: 'https://my.ogc.server/wfs',
    },
    geodataWms2: {
        protocol: 'OGC:WMS',
        name: 'myotherlayer',
        url: 'https://my.ogc.server/wms',
    },
    geodataWfs2: {
        protocol: 'OGC:WFS',
        name: 'myotherlayer',
        url: 'https://my.ogc.server/wfs',
    },
    geodataRest: {
        protocol: 'ESRI:REST',
        name: 'myrestlayer',
        url: 'https://my.esri.server/FeatureServer',
    },
    geodataRestWfs: {
        protocol: 'OGC:WFS',
        name: 'mywfsrestlayer',
        url: 'https://my.esri.server/WFSServer',
    },
    maplayerRest: {
        protocol: 'ESRI:REST',
        name: 'myotherrestlayer',
        url: 'https://my.esri.server/MapServer',
    },
    landingPage: {
        protocol: 'WWW:LINK:LANDING_PAGE',
        name: 'landingpage link',
        url: 'https://landing.page',
    },
    unknownFormat: {
        protocol: 'WWW:DOWNLOAD-1.0-http--download',
        name: 'Vue HTML des métadonnées sur internet',
        url: 'http://catalogue.geo-ide.developpement-durable.gouv.fr/catalogue/srv/fre/catalog.search#/metadata/fr-120066022-jdd-199fd14c-2abb-4c14-b0f8-6c8d92e7b480',
    },
});
exports.LINK_FIXTURES = LINK_FIXTURES;
//# sourceMappingURL=metadata-links.fixtures.js.map