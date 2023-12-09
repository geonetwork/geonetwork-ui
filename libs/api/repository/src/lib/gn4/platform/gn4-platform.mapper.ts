import {
  MeResponseApiModel,
  UserApiModel,
} from '@geonetwork-ui/data-access/gn4'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { Injectable } from '@angular/core'
import { AvatarServiceInterface } from '../auth/avatar.service.interface'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus/thesaurus.model'

@Injectable()
export class Gn4PlatformMapper {
  constructor(private avatarService: AvatarServiceInterface) {}
  userFromMeApi(apiUser: MeResponseApiModel): Observable<UserModel | null> {
    if (!apiUser) return of(null)
    const {
      hash,
      groupsWithRegisteredUser,
      groupsWithEditor,
      groupsWithReviewer,
      groupsWithUserAdmin,
      admin,
      ...user
    } = apiUser

    return this.avatarService
      .getProfileIcon(hash)
      .pipe(map((profileIcon) => ({ ...user, profileIcon } as UserModel)))
  }
  userFromApi(apiUser: UserApiModel): UserModel {
    if (!apiUser) return null
    const {
      enabled,
      emailAddresses,
      organisation,
      kind,
      lastLoginDate,
      accountNonExpired,
      accountNonLocked,
      id,
      credentialsNonExpired,
      ...user
    } = apiUser
    return { ...apiUser, id: id + '' } as UserModel
  }

  thesaurusFromApi(thesaurus: any[]): ThesaurusModel {
    return thesaurus.map((keyword) => {
      const { uri, value } = keyword
      return {
        key: uri,
        label: value,
      }
    })
  }
}
