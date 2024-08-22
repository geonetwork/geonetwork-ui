import type { Observable } from 'rxjs'
import type { UserModel } from './model/user/user.model'
import type { Organization } from './model/record/organization.model'
import { Keyword, UserFeedback } from './model/record'
import { KeywordType } from './model/thesaurus'

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
  abstract searchKeywords(
    query: string,
    keywordTypes: KeywordType[]
  ): Observable<Keyword[]>
  abstract getKeywordsByUri(uri: string): Observable<Keyword[]>
  abstract searchKeywordsInThesaurus(
    query: string,
    thesaurusId: string
  ): Observable<Keyword[]>
  abstract getUserFeedbacks(recordUuid: string): Observable<UserFeedback[]>
  abstract postUserFeedbacks(recordUuid: UserFeedback): Observable<void>
}
