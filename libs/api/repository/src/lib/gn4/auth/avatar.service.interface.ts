import { Observable } from 'rxjs'

export abstract class AvatarServiceInterface {
  public abstract getPlaceholder(): Observable<string>
  public abstract getProfileIcon(...args): Observable<string>
}
