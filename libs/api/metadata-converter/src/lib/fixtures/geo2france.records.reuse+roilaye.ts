import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

export const GEO2FRANCE_REUSE_ROILAYE_RECORD: ReuseRecord = {
  uniqueIdentifier: '982b6e7d-61f5-43b3-983d-ebae8bc3892d',
  kind: 'reuse',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordUpdated: new Date('2022-12-08T16:06:54.000Z'),
  resourceCreated: new Date('2019-12-31T00:00:00.000Z'),
  title: 'Photographie aérienne 2021 sur la commune de Saint-Etienne-Roilaye',
  abstract:
    'Orthophotoplan 2021 sur le territoire de la commune de Saint-Etienne-Roilaye.',
  ownerOrganization: { name: null, translations: {} },
  contacts: [
    {
      email: 'missing@missing.com',
      role: 'unspecified',
      organization: { name: null, translations: {} },
    },
  ],
  contactsForResource: [
    {
      email: 'missing@missing.com',
      role: 'unspecified',
      organization: { name: null, translations: {} },
    },
  ],
  keywords: [
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.inspire-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/fre/thesaurus.download?ref=external.theme.inspire-theme'
        ),
      },
      label: 'Ortho-imagerie',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET - Concepts, version 2.4',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/en/thesaurus.download?ref=external.theme.gemet'
        ),
      },
      label: 'photographie aérienne',
      type: 'theme',
      translations: {},
    },
    { label: 'ortho', type: 'theme', translations: {} },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.place.GeoCompiegnois',
        name: 'Collectivités du Pays Compiégnois',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/en/thesaurus.download?ref=external.place.GeoCompiegnois'
        ),
      },
      label: 'Saint-Étienne-Roilaye*60572',
      type: 'place',
      translations: {},
    },
  ],
  topics: ['imageryBaseMapsEarthCover'],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [
    {
      text: 'Utilisation libre sous réserve de mentionner la source (a minima le nom du producteur) et la date de sa dernière mise à jour',
      translations: {},
    },
  ],
  overviews: [
    {
      url: new URL(
        'https://geo.compiegnois.fr/geonetwork/srv/api/records/982b6e7d-61f5-43b3-983d-ebae8bc3892d/attachments/Saint-Etienne-Roilaye_ortho_2021.jpg'
      ),
    },
  ],
  spatialExtents: [
    { bbox: [2.987, 49.3372, 3.0286, 49.3783], translations: {} },
  ],
  onlineResources: [
    {
      type: 'link',
      url: new URL(
        'http://geo.compiegnois.fr/documents/cartotheque/Saint-Etienne-Roilaye_ortho_2021.jpg'
      ),
      name: 'Orthophotoplan 2021 de la commune de Saint-Etienne-Roilaye',
      translations: {},
    },
  ],
  translations: {},
  lineage: null,
  temporalExtents: [{ start: null, end: null }],
  reuseType: 'map',
}
