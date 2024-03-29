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
    return { ...apiUser, id: id.toString() } as UserModel
  }

  thesaurusFromApi(thesaurus: any[], lang3?: string): ThesaurusModel {
    return thesaurus.map((keyword) => {
      let key = keyword.uri
      // sometines GN can prefix an URI with an "all thesaurus" URI; only keep the last one
      if (key.indexOf('@@@') > -1) {
        key = key.split('@@@')[1]
      }
      const label =
        lang3 && lang3 in keyword.values ? keyword.values[lang3] : keyword.value
      const description =
        lang3 && lang3 in keyword.definitions
          ? keyword.definitions[lang3]
          : keyword.definition
      return {
        key,
        label,
        description,
      }
    })
  }
}
