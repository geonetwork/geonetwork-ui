import { deepFreeze } from './utils/freeze'
import { Organization } from '@geonetwork-ui/common/domain/record'

export const ORGANISATIONS_FIXTURE: Organization[] = deepFreeze([
  {
    name: 'I Data Org',
    description: 'one org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo1.png'),
    recordCount: 12,
  },
  {
    name: 'H Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo2.png'),
    recordCount: 15,
  },
  {
    name: 'J Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo3.png'),
    recordCount: 6,
  },
  {
    name: 'G Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo4.png'),
    recordCount: 8,
  },
  {
    name: 'B Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo5.png'),
    recordCount: 2,
  },
  {
    name: 'D Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo6.png'),
    recordCount: 17,
  },
  {
    name: 'F Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo7.png'),
    recordCount: 14,
  },
  {
    name: 'A Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo8.png'),
    recordCount: 3,
  },
  {
    name: 'C Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo9.png'),
    recordCount: 9,
  },
  {
    name: 'E Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo10.png'),
    recordCount: 1,
  },
  {
    name: 'é Data Org',
    description: 'another org for testing',
    logoUrl: new URL('https://my-geonetwork.org/logo10.png'),
    recordCount: 2,
  },
])
