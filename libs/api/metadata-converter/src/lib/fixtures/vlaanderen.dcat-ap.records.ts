import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const VLAANDEREN_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: 'f3bd3e9b-cec1-38de-bb16-d063edace486',
  title: 'Fish damage at pump stations',
  abstract: `Fish damage at pump stations is a sampling event dataset published by the Research Institute for Nature and Forest (INBO). It contains 7319 occurrences, recorded during 120 events as well as lengths and weights of the fish that were recorded. Issues with the dataset can be reported at https://github.com/inbo/data-publication/issues
                    We have released this dataset to the public domain under a Creative Commons Zero waiver. We would appreciate it if you follow the INBO norms for data use (https://www.inbo.be/en/norms-data-use) when using the data. If you have any questions regarding this dataset, don't hesitate to contact us via the contact information provided in the metadata or via opendata@inbo.be.`,
  contacts: [],
  contactsForResource: [
    {
      firstName: 'David',
      lastName: 'Buysse',
      email: 'david.buysse@inbo.be',
      role: 'point_of_contact',
    },
  ],
  ownerOrganization: {
    name: 'Research Institute for Nature and Forest (INBO)',
  },
  landingPage: new URL('https://ipt.inbo.be/resource?r=visschade-occurrences'),
  onlineResources: [
    {
      description: 'Darwin Core Archive',
      name: 'Darwin Core Archive of Fish damage at pump stations',
      type: 'download',
      url: new URL('https://ipt.inbo.be/archive.do?r=visschade-occurrences'),
      translations: {},
    },
  ],
  keywords: [
    { label: 'fish', type: 'theme' },
    { label: 'pumping station', type: 'theme' },
    { label: 'migration', type: 'theme' },
    { label: 'Samplingevent', type: 'theme' },
    { label: 'mortality', type: 'theme' },
  ],
  kind: 'dataset',
  defaultLanguage: 'en',
  otherLanguages: [],
  legalConstraints: [],
  licenses: [
    {
      text: 'Creative Commons CC-0',
      url: new URL(
        'https://creativecommons.org/publicdomain/zero/1.0/legalcode'
      ),
    },
  ],
  otherConstraints: [],
  overviews: [],
  securityConstraints: [],
  spatialExtents: [
    {
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3.768, 51.072],
            [3.768, 51.31],
            [4.202, 51.31],
            [4.202, 51.072],
            [3.768, 51.072],
          ],
        ],
      },
    },
  ],
  temporalExtents: [],
  topics: ['biodiversity'],
  lineage: '',
  recordUpdated: new Date('2024-09-19T01:15:09.732Z'),
  resourceUpdated: new Date('2021-04-14T11:15+02:00'),
  status: 'completed',
  updateFrequency: 'unknown',
  translations: {},
}
