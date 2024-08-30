import { Organization } from '@geonetwork-ui/common/domain/model/record'

export const createOrganizationFixture = (
  overrides: Partial<Organization> = {}
): Organization => ({
  name: 'anOrganizationName',
  description: 'An organization description.',
  email: 'contact@anOrganizationName.com',
  website: new URL('https://www.anOrganizationName.com'),
  logoUrl: new URL('https://www.anOrganizationName/logo.png'),
  recordCount: 10,
  ...overrides,
})

export const barbieIncOrganizationFixture = (): Organization =>
  createOrganizationFixture({
    name: 'Barbie Inc.',
    description:
      "Barbie Incorporation is an iconic company creating dolls that inspire young generations. Founded on innovation, it offers diverse products reflecting everyone's aspirations. Barbie is more than a doll; she's a symbol of empowerment and creativity.",
    email: 'contact@barbie-inc.com',
    website: new URL('https://www.barbie-inc.com'),
    logoUrl: new URL('https://www.barbie-inc.com/logo.png'),
    recordCount: 4,
  })

export const regionHautDeFranceOrganizationFixture = (): Organization =>
  createOrganizationFixture({
    name: 'Région Hauts-de-France',
    description: 'A very sweet description about Région Hauts-de-France.',
    email: 'contact@region-haut-de-france.com',
    website: new URL('https://region-haut-de-france.com/'),
    logoUrl: new URL('https://region-haut-de-france.com/logo.png'),
    recordCount: 4,
  })

export const someOrganizationsFixture = (): Organization[] => [
  {
    name: 'I Data Org',
    description: 'one org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo1.png'),
    recordCount: 12,
  },
  {
    name: 'H Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo2.png'),
    recordCount: 15,
  },
  {
    name: 'J Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo3.png'),
    recordCount: 6,
  },
  {
    name: 'G Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo4.png'),
    recordCount: 8,
  },
  {
    name: 'B Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo5.png'),
    recordCount: 2,
  },
  {
    name: 'D Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo6.png'),
    recordCount: 17,
  },
  {
    name: 'F Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo7.png'),
    recordCount: 14,
  },
  {
    name: 'A Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo8.png'),
    recordCount: 3,
  },
  {
    name: 'C Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo9.png'),
    recordCount: 9,
  },
  {
    name: 'E Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo10.png'),
    recordCount: 1,
  },
  {
    name: 'é Data Org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo10.png'),
    recordCount: 2,
  },
  {
    name: 'wizard-org',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo11.png'),
    recordCount: 2,
  },
  {
    name: "Université de l'Ingénierie",
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo12.png'),
    recordCount: 2,
  },
  {
    name: 'ARS / Agence régionale de santé',
    description: 'another org for testing',
    email: 'test@gmail.com',
    website: new URL('https://my-geonetwork.org/'),
    logoUrl: new URL('https://my-geonetwork.org/logo12.png'),
    recordCount: 2,
  },
  regionHautDeFranceOrganizationFixture(),
  barbieIncOrganizationFixture(),
]
