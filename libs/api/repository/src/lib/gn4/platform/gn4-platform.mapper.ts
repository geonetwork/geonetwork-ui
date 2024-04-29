import {
  MeResponseApiModel,
  UserApiModel,
  UserFeedbackDTOApiModel,
} from '@geonetwork-ui/data-access/gn4'
import { UserModel } from '@geonetwork-ui/common/domain/model/user/user.model'
import { Injectable } from '@angular/core'
import { AvatarServiceInterface } from '../auth'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ThesaurusModel } from '@geonetwork-ui/common/domain/model/thesaurus/thesaurus.model'
import {
  UserFeedback,
  UserFeedbackViewModel,
} from '@geonetwork-ui/common/domain/model/record'

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

  userFeedbacksFromApi(userFeedback: any): UserFeedback {
    return {
      uuid: userFeedback.uuid,
      metadataUUID: userFeedback.metadataUUID,
      comment: userFeedback.comment,
      authorUserId: userFeedback.authorUserId.toString(),
      authorName: userFeedback.authorName,
      authorEmail: userFeedback.authorEmail,
      published: userFeedback.published,
      parentUuid: userFeedback.parentUuid ?? undefined,
      date: new Date(userFeedback.date),
    }
  }

  userFeedbacksToApi(
    userFeedback: UserFeedback
  ): Partial<UserFeedbackDTOApiModel> {
    return {
      uuid: userFeedback.uuid,
      metadataUUID: userFeedback.metadataUUID,
      comment: userFeedback.comment,
      authorUserId: Number.parseInt(userFeedback.authorUserId),
      authorName: userFeedback.authorName,
      authorEmail: userFeedback.authorEmail,
      published: userFeedback.published,
      parentUuid: userFeedback.parentUuid,
      date: userFeedback.date.getTime().toString(),
    }
  }

  async createUserFeedbackViewModel(
    baseUserFeedback: UserFeedback
  ): Promise<UserFeedbackViewModel> {
    const userAvatarUrl = await this.avatarService.getProfileIconUrl(
      baseUserFeedback.authorUserId?.toString()
    )

    return {
      ...baseUserFeedback,
      avatarUrl: userAvatarUrl,
    }
  }
}
