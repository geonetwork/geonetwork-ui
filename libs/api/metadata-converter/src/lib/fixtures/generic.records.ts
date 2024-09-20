import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const GENERIC_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: 'my-dataset-001',
  kind: 'dataset',
  ownerOrganization: {
    name: 'MyOrganization',
    website: new URL('https://www.my.org/info'),
    logoUrl: new URL('https://www.my.org/logo.png'),
    description: 'A generic organization',
  },
  contacts: [
    {
      email: 'bob@org.net',
      role: 'point_of_contact',
      organization: {
        name: 'MyOrganization',
        website: new URL('https://www.my.org/info'),
        logoUrl: new URL('https://www.my.org/logo.png'),
        description: 'A generic organization',
      },
      firstName: 'Bob',
      lastName: 'TheGreat',
      position: 'developer',
    },
  ],
  contactsForResource: [
    {
      email: 'bob@org.net',
      role: 'author',
      organization: {
        name: 'MyOrganization',
        website: new URL('https://www.my.org/info'),
        logoUrl: new URL('https://www.my.org/logo.png'),
        description: 'A generic organization',
      },
      firstName: 'Bob',
      lastName: 'TheGreat',
      position: 'developer',
    },
    {
      email: 'john@org2.com',
      role: 'custodian',
      organization: {
        name: 'Another Organization',
        website: new URL('https://www.another.org/docs'),
      },
      position: 'manager',
    },
    {
      email: 'bill@org2.com',
      role: 'distributor',
      organization: {
        name: 'Another Organization',
        website: new URL('https://www.another.org/docs'),
      },
      position: 'randomWorker',
      address: '123 rue des moulins, 10808 Montargis, FR',
      phone: '+11234567890',
      lastName: 'TheDistributor',
      firstName: 'Bill',
    },
  ],
  status: 'ongoing',
  recordCreated: new Date('2021-11-15T09:00:00'),
  recordPublished: new Date('2022-01-01T10:00:00'),
  recordUpdated: new Date('2022-02-01T15:12:00'),
  resourceCreated: new Date('2022-09-01T14:18:19'),
  resourceUpdated: new Date('2022-12-04T15:12:00'),
  title: 'A very interesting dataset (un jeu de données très intéressant)',
  abstract: `# Introduction
This dataset has been established for testing purposes.

## Details
This is a section about details. Here is an HTML tag: <img src="http://google.com" />. And [a link](https://google.com).

## Informations intéressantes
Cette section contient des *caractères internationaux* (ainsi que des "caractères spéciaux"). 'çàü^@/~^&`,
  overviews: [
    {
      url: new URL('http://my-org.net/one.png'),
      description: 'An overview',
    },
    {
      url: new URL('http://my-org.net/two.png'),
    },
  ],
  keywords: [
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.local',
        name: 'geonetwork.thesaurus.local',
      },
      type: 'other',
      label: 'international',
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.local',
        name: 'geonetwork.thesaurus.local',
      },
      type: 'other',
      label: 'test',
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.local',
        name: 'geonetwork.thesaurus.local',
      },
      type: 'other',
      label: '_another_keyword_',
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.theme',
        name: 'geonetwork.thesaurus.theme',
      },
      type: 'theme',
      label: 'test theme',
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.place',
        name: 'geonetwork.thesaurus.place',
      },
      type: 'place',
      label: 'test place',
    },
    {
      type: 'theme',
      label: 'themeNoThesaurus',
    },
    {
      type: 'theme',
      label: 'themeNoThesaurus 2',
    },
    {
      type: 'temporal',
      label: 'temporalNoThesaurus',
    },
  ],
  topics: ['agriculture'],
  spatialRepresentation: 'grid',
  onlineResources: [
    {
      type: 'download',
      url: new URL('http://my-org.net/download/1.zip'),
      mimeType: 'x-gis/x-shapefile',
      name: 'Direct download',
      description: 'Dataset downloaded as a shapefile',
    },
    {
      type: 'download',
      url: new URL('http://my-org.net/download/2.geojson'),
      mimeType: 'application/geo+json',
      name: 'Direct download',
    },
    {
      type: 'link',
      url: new URL('https://my-org.net/docs/1234.pdf'),
      name: 'Documentation',
      description:
        'A link to the online documentation in PDF; please forgive the typos.',
    },
    {
      type: 'service',
      url: new URL('https://my-org.net/wfs'),
      accessServiceProtocol: 'wfs',
      name: 'my:featuretype', // FIXME: same as identifier otherwise it will be lost in iso...
      description: 'This WFS service offers direct download capability',
      identifierInService: 'my:featuretype',
    },
  ],
  lineage: `This record was edited manually to test the conversion processes

As such, **it is not very interesting at all.**`,
  otherConstraints: [
    { text: 'Should only be used as a testing tool' },
    { text: 'Might cause minor annoyance in people' },
  ],
  licenses: [
    {
      text: 'Licence ODbL mai 2013 (basée sur ODbL 1.0)',
      url: new URL('https://data.rennesmetropole.fr/pages/licence/'),
    },
  ],
  legalConstraints: [
    {
      text: "Dataset access isn't possible since it does not really exist",
    },
  ],
  securityConstraints: [
    {
      text: 'Contains sensitive information related to national defense',
    },
  ],
  spatialExtents: [
    {
      bbox: [-11.5, 35.3, 43.2, 81.4],
      description: 'http://www.naturalearthdata.com/ne_admin#Continent/Europe',
    },
  ],
  temporalExtents: [
    {
      start: new Date('2024-05-24'),
      end: null,
    },
    {
      start: new Date('2024-05-30'),
    },
  ],
  updateFrequency: {
    updatedTimes: 3,
    per: 'month',
  },
  languages: ['en'],
  defaultLanguage: 'en',
}
