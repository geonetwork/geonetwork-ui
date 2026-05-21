import { UserModel } from '@geonetwork-ui/common/domain/model/user'

export function getUserDisplayName(user: UserModel): string {
  const nameParts = [user.name, user.surname].filter(Boolean).join(' ')
  const orgPart = user.organisation ? ` (${user.organisation})` : ''
  if (nameParts) return `${nameParts}${orgPart}`
  return user.organisation ?? user.username ?? user.email ?? ''
}
