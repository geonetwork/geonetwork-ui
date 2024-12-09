import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { barbieIncOrganizationFixture } from './organisations.fixture'

export const createIndividualFixture = (
  overrides: Partial<Individual> = {}
): Individual => ({
  firstName: 'Arnaud',
  lastName: 'Demaison',
  email: 'a.demaison@geo2france.fr',
  organization: barbieIncOrganizationFixture(),
  role: 'point_of_contact',
  ...overrides,
})

export const barbieIndividualFixture = (): Individual =>
  createIndividualFixture({
    firstName: 'Barbara',
    lastName: 'Roberts',
    email: 'barbie@email.org',
    organization: barbieIncOrganizationFixture(),
    role: 'point_of_contact',
  })

export const someIndividualsFixture = (): Individual[] => [
  barbieIndividualFixture(),
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    organization: barbieIncOrganizationFixture(),
    role: 'owner',
  },
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@workplace.com',
    organization: barbieIncOrganizationFixture(),
    role: 'author',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@company.org',
    organization: barbieIncOrganizationFixture(),
    role: 'contributor',
  },
  {
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'emma.w@business.io',
    organization: barbieIncOrganizationFixture(),
    role: 'rights_holder',
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@enterprise.net',
    organization: barbieIncOrganizationFixture(),
    role: 'stakeholder',
  },
]
