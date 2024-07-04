import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const OPENDATASWISS_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier:
    '393940cd-6a67-4190-8b91-378669cdea1d@bundesamt-fur-energie-bfe',
  title: 'Energy cities',
  contacts: [
    {
      email: 'mailto:geoinformation@bfe.admin.ch',
      role: 'pointOfContact',
    },
  ],
  contactsForResource: [],
  landingPage: new URL('https://www.bfe.admin.ch/energiestaedte'),
  distributions: [
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
  keywords: [],
  kind: 'dataset',
  languages: [],
  legalConstraints: [],
  licenses: [],
  otherConstraints: [],
  overviews: [],
  securityConstraints: [],
  spatialExtents: [],
  temporalExtents: [],
  topics: [],
  abstract: `The Energy City label is used for certifying municipalities that develop and implement a sustainable energy policy. Municipalities that have been awarded this label promote renewable energy and ecological mobility, and focus on the efficient use of resources. In order to qualify for the label, a municipality must have realised or adopted at least 50 percent of its scope for action in the area of energy policy. Here the calculation is based on the Energy Cities catalogue. The European Energy Award®GOLD is the highest level of certification. This label is awarded to municipalities that have implemented at least 75 percent of the measures listed in the catalogue at the time of certification. Municipalities that qualify for this award demonstrate the highest level of commitment towards a sustainable energy future. The label is based on an assessment of municipal energy policy in the areas of development and spatial planning, municipal buildings and installations, supply and disposal, mobility, internal organisation, communication and cooperation.`,
  lineage: undefined,
  ownerOrganization: undefined,
  recordUpdated: undefined,
  status: undefined,
  updateFrequency: undefined,
}
