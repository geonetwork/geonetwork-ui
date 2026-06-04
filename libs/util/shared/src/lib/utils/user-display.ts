import { UserModel } from '@geonetwork-ui/common/domain/model/user'
import { Individual } from '@geonetwork-ui/common/domain/model/record'

export function getIndividualDisplayName(individual: Individual): string {
  const nameParts = [individual.firstName, individual.lastName]
    .filter(Boolean)
    .join(' ')
  const orgPart = individual.organization?.name
    ? ` (${individual.organization.name})`
    : ''
  if (nameParts) return `${nameParts}${orgPart}`
  return individual.organization?.name ?? individual.email ?? ''
}

export function getAddressLines(address: string | undefined): string[] {
  return address
    ? address
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
    : []
}

export function toIndividual(user: UserModel): Individual {
  return {
    firstName: user.name,
    lastName: user.surname,
    email: user.email,
    role: 'unspecified',
    organization: user.organisation ? { name: user.organisation } : undefined,
  }
}
