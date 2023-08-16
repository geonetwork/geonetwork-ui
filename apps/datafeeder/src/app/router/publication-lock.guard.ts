import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {
  DataPublishingApiService,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { Observable, of } from 'rxjs'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class PublicationLockGuard {
  constructor(
    private router: Router,
    private publishService: DataPublishingApiService,
    private facade: DatafeederFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // eslint-disable-line
  ): Observable<boolean> {
    const id = route.params.id

    return this.publishService.getPublishingStatus(id).pipe(
      tap((publication) => this.facade.setPublication(publication)),
      tap((publication: PublishJobStatusApiModel) => {
        if (publication.status === PublishStatusEnumApiModel.Done) {
          this.router.navigate([`${id}/publishok`])
        }
        if (publication.status === PublishStatusEnumApiModel.Running) {
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
