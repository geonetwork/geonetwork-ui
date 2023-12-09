import type { Observable } from 'rxjs'
import type { UserModel } from './model/user/user.model'
import type { Organization } from './model/record/organization.model'
import type { ThesaurusModel } from './model/thesaurus/'

export abstract class PlatformServiceInterface {
  abstract getType(): string
  abstract getApiVersion(): Observable<string>
  abstract isApiCompatible(): Observable<boolean>

  abstract getMe(): Observable<UserModel>
  abstract isAnonymous(): Observable<boolean>
  abstract getUsers(): Observable<UserModel[]>
  abstract getUsersByOrganization(
    organisation: Organization
  ): Observable<UserModel[]>
  abstract getOrganizations(): Observable<Organization[]>
  abstract translateKey(key: string): Observable<string>
  abstract getThesaurusByLang(
    thesaurusName: string,
    lang: string
  ): Observable<ThesaurusModel>
}
