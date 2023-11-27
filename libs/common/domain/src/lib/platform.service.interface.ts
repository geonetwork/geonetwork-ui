import { Observable } from 'rxjs'
import { MeUserModel, UserModel } from './model/user/user.model'
import { Organization } from './model/record/organization.model'

export abstract class PlatformServiceInterface {
  abstract getTye(): string
  abstract getApiVersion(): Observable<string>
  abstract isApiCompatible(): Observable<boolean>

  abstract getMe(): Observable<MeUserModel>
  abstract isAnonymous(): Observable<boolean>
  abstract getUsers(): Observable<UserModel[]>
  abstract getUsersByOrganization(
    organisation: Organization
  ): Observable<UserModel[]>
  abstract getOrganizations(): Observable<Organization[]>
}
