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
import { iif, Observable, of } from 'rxjs'
import { catchError, mapTo, mergeMap, take, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class PublicationStatusGuard implements CanActivate {
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

    return this.facade.publication$.pipe(
      take(1),
      mergeMap((statePublication) =>
        iif(
          () =>
            statePublication &&
            statePublication.status !== PublishStatusEnumApiModel.PENDING,
          of(true),
          this.publishService.getPublishingStatus(id).pipe(
            tap((publication) => this.facade.setPublication(publication)),
            tap((publication: PublishJobStatusApiModel) => {
              if (publication.status === PublishStatusEnumApiModel.ERROR) {
                throw new Error('api error')
              }
            }),
            mapTo(true),
            catchError(() => {
              this.router.navigate(['/'])
              return of(false)
            })
          )
        )
      )
    )
  }
}
