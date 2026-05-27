import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { getUserDisplayName, toIndividual } from './user-display'

describe('getUserDisplayName', () => {
  it('should return first and last name with org', () => {
    const individual: Individual = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      role: 'author',
      organization: { name: 'ACME' },
    }
    expect(getUserDisplayName(individual)).toBe('Jane Doe (ACME)')
  })

  it('should fall back to org name when no personal name', () => {
    const individual: Individual = {
      email: 'info@acme.com',
      role: 'author',
      organization: { name: 'ACME' },
    }
    expect(getUserDisplayName(individual)).toBe('ACME')
  })
})

describe('toIndividual', () => {
  it('should convert UserModel with organisation to Individual', () => {
    const user: UserModel = {
      id: '1',
      profile: 'admin',
      username: 'jdoe',
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      organisation: 'ACME',
    }
    expect(toIndividual(user)).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'unspecified',
      organization: { name: 'ACME' },
    })
  })

  it('should set organization to undefined when user has no organisation', () => {
    const user: UserModel = {
      id: '2',
      profile: 'editor',
      username: 'asmith',
      name: 'Alice',
      surname: 'Smith',
      email: 'alice@example.com',
    }
    expect(toIndividual(user)).toEqual({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      role: 'unspecified',
      organization: undefined,
    })
  })
})
