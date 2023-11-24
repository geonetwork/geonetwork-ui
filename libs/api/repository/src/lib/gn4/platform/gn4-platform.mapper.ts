import { MeResponseApiModel } from '@geonetwork-ui/data-access/gn4'
import { MeUserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { Injectable } from '@angular/core'
import { AvatarServiceInterface } from '../auth/avatar.service.interface'

@Injectable()
export class Gn4PlatformMapper {
  constructor(private avatarService: AvatarServiceInterface) {}
  userFromApi(apiUser: MeResponseApiModel): MeUserModel {
    if (!apiUser) return null
    const {
      hash,
      groupsWithRegisteredUser,
      groupsWithEditor,
      groupsWithReviewer,
      groupsWithUserAdmin,
      admin,
      ...user
    } = apiUser
    const icon = this.avatarService.getProfileIcon(hash)
    return { ...user, profileIcon: icon } as MeUserModel
  }
}
