import { UserModel } from '@geonetwork-ui/common/domain/model/user'

export function getUserDisplayName(user: UserModel): string {
  if (!user.name) return ''
  const orgPart = user.organisation ? ` (${user.organisation})` : ''
  return `${user.name} ${user.surname}${orgPart}`
}
