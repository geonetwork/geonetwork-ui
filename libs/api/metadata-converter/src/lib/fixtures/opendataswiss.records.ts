import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const OPENDATASWISS_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier:
    '393940cd-6a67-4190-8b91-378669cdea1d@bundesamt-fur-energie-bfe',
  title: 'Energy cities',
  contacts: [],
  contactsForResource: [
    {
      email: 'geoinformation@bfe.admin.ch',
      role: 'point_of_contact',
      firstName: 'geoinformation@bfe.admin.ch',
    },
  ],
  landingPage: new URL('https://www.bfe.admin.ch/energiestaedte'),
  onlineResources: [
    {
      description: 'GeoPackage',
      name: 'GeoPackage',
      type: 'download',
      url: new URL(
        'https://data.geo.admin.ch/ch.bfe.energiestaedte/gpkg/2056/ch.bfe.energiestaedte.zip'
      ),
    },
    {
      description: 'swisstopo REST API',
      name: 'swisstopo REST API',
      type: 'link',
      url: new URL(
        'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.bfe.energiestaedte'
      ),
    },
    {
      description: 'Thematic geoportal - map.geo.admin.ch',
      name: 'Map (Preview) Thematic geoportal - map.geo.admin.ch',
      type: 'link',
      url: new URL(
        'https://map.geo.admin.ch/?topic=energie&lang=de&layers=ch.bfe.energiestaedte'
      ),
    },
    {
      description: 'INTERLIS',
      name: 'INTERLIS',
      type: 'download',
      url: new URL(
        'https://data.geo.admin.ch/ch.bfe.energiestaedte/xtf/2056/ch.bfe.energiestaedte.zip'
      ),
    },
    {
      description: 'Web Map Services WMS',
      name: 'ch.bfe.energiestaedte',
      type: 'link',
      url: new URL(
        'http://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de'
      ),
    },
  ],
  keywords: [
    {
      label: 'ifdg-linfrastructure-federale-de-donnees-geographiques',
      type: 'theme',
    },
    {
      label: 'ifdg-infrastruttura-federale-dei-dati-geografici',
      type: 'theme',
    },
    {
      label: 'bgdi-bundesgeodaten-infrastruktur',
      type: 'theme',
    },
    {
      label: 'fsdi-federal-spatial-data-infrastructure',
      type: 'theme',
    },
  ],
  kind: 'dataset',
  otherLanguages: [],
  legalConstraints: [],
  licenses: [],
  otherConstraints: [],
  overviews: [],
  securityConstraints: [],
  spatialExtents: [
    {
      description: 'Schweiz',
    },
  ],
  temporalExtents: [],
  topics: [
    'http://publications.europa.eu/resource/authority/data-theme/ENVI',
    'http://dcat-ap.ch/vocabulary/themes/energy',
    'http://publications.europa.eu/resource/authority/data-theme/ENER',
    'http://dcat-ap.ch/vocabulary/themes/territory',
    'http://publications.europa.eu/resource/authority/data-theme/REGI',
    'http://dcat-ap.ch/vocabulary/themes/culture',
    'http://publications.europa.eu/resource/authority/data-theme/EDUC',
    'http://dcat-ap.ch/vocabulary/themes/geography',
  ],
  abstract: `The Energy City label is used for certifying municipalities that develop and implement a sustainable energy policy. Municipalities that have been awarded this label promote renewable energy and ecological mobility, and focus on the efficient use of resources. In order to qualify for the label, a municipality must have realised or adopted at least 50 percent of its scope for action in the area of energy policy. Here the calculation is based on the Energy Cities catalogue. The European Energy Award®GOLD is the highest level of certification. This label is awarded to municipalities that have implemented at least 75 percent of the measures listed in the catalogue at the time of certification. Municipalities that qualify for this award demonstrate the highest level of commitment towards a sustainable energy future. The label is based on an assessment of municipal energy policy in the areas of development and spatial planning, municipal buildings and installations, supply and disposal, mobility, internal organisation, communication and cooperation.`,
  lineage: '',
  ownerOrganization: {
    name: 'Bundesamt für Energie',
  },
  recordCreated: new Date('2022-06-03T08:24:30.000Z'),
  recordUpdated: new Date('2022-06-16T20:06:22.000Z'),
  resourceCreated: new Date('2014-06-30T00:00:00.000'),
  resourceUpdated: new Date('2022-06-15T00:00:00.000'),
  status: 'completed',
  updateFrequency: 'unknown',
}
