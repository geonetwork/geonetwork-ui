import type { Observable } from 'rxjs'
import type { UserModel } from './model/user/user.model'
import type { Organization } from './model/record/organization.model'
import type { ThesaurusModel } from './model/thesaurus/'
import { UserFeedback } from './model/record'

export abstract class PlatformServiceInterface {
  abstract getType(): string
  abstract getApiVersion(): Observable<string>

  abstract getMe(): Observable<UserModel>
  abstract isAnonymous(): Observable<boolean>
  abstract getUsers(): Observable<UserModel[]>
  abstract getUsersByOrganization(
    organisation: Organization
  ): Observable<UserModel[]>
  abstract getOrganizations(): Observable<Organization[]>
  abstract translateKey(key: string): Observable<string>
  abstract getThesaurusByUri(uri: string): Observable<ThesaurusModel>
  abstract getUserFeedbacks(recordUuid: string): Observable<UserFeedback[]>
  abstract postUserFeedbacks(recordUuid: UserFeedback): Observable<void>
}
