import { Individual } from '@geonetwork-ui/common/domain/model/record'
import { groupContactsByRole } from './contact.util'

describe('groupContactsByRole', () => {
  it('should return an empty array when given an empty array', () => {
    expect(groupContactsByRole([])).toEqual([])
  })

  it('should group contacts by role preserving encounter order', () => {
    const contacts: Individual[] = [
      { email: 'a@test.com', role: 'author', organization: { name: 'Org A' } },
      {
        email: 'b@test.com',
        role: 'custodian',
        organization: { name: 'Org B' },
      },
      { email: 'c@test.com', role: 'author', organization: { name: 'Org C' } },
      {
        email: 'd@test.com',
        role: 'funder',
        organization: { name: 'Org D' },
      },
      {
        email: 'e@test.com',
        role: 'custodian',
        organization: { name: 'Org E' },
      },
    ]

    const result = groupContactsByRole(contacts)

    expect(result).toEqual([
      {
        role: 'author',
        contacts: [contacts[0], contacts[2]],
      },
      {
        role: 'custodian',
        contacts: [contacts[1], contacts[4]],
      },
      {
        role: 'funder',
        contacts: [contacts[3]],
      },
    ])
  })

  it('should produce one group per unique role', () => {
    const contacts: Individual[] = [
      { email: 'a@test.com', role: 'owner' },
      { email: 'b@test.com', role: 'distributor' },
      { email: 'c@test.com', role: 'owner' },
    ]

    const result = groupContactsByRole(contacts)

    expect(result.length).toBe(2)
    expect(result[0].role).toBe('owner')
    expect(result[1].role).toBe('distributor')
  })
})
