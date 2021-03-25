import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { Observable, of } from 'rxjs'
import { catchError, mapTo, mergeMap, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class PublicationLockGuard implements CanActivate {
  constructor(
    private router: Router,
    private publishService: DataPublishingApiService,
    private facade: DatafeederFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.params.id

    return this.publishService.getPublishingStatus(id).pipe(
      tap((publication) => this.facade.setPublication(publication)),
      tap((publication: PublishJobStatusApiModel) => {
        if (publication.status === PublishStatusEnumApiModel.DONE) {
          this.router.navigate([`${id}/publishok`])
        }
        if (publication.status === PublishStatusEnumApiModel.RUNNING) {
          this.router.navigate([`${id}/publish`])
        }
      }),
      mapTo(true),
      catchError(() => {
        return of(true)
      })
    )
  }
}
