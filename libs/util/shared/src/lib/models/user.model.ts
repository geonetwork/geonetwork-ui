import { MeResponseApiModel } from '@geonetwork-ui/data-access/gn4'

export type UserModel = Omit<
  MeResponseApiModel,
  | 'hash'
  | 'groupsWithRegisteredUser'
  | 'groupsWithEditor'
  | 'groupsWithReviewer'
  | 'groupsWithUserAdmin'
>
