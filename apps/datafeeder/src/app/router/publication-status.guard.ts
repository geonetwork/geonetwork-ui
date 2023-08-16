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
import { iif, Observable, of } from 'rxjs'
import { catchError, mapTo, mergeMap, take, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class PublicationStatusGuard {
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

    return this.facade.publication$.pipe(
      take(1),
      mergeMap((statePublication) =>
        iif(
          () =>
            statePublication &&
            statePublication.status !== PublishStatusEnumApiModel.Pending,
          of(true),
          this.publishService.getPublishingStatus(id).pipe(
            tap((publication) => this.facade.setPublication(publication)),
            tap((publication: PublishJobStatusApiModel) => {
              if (publication.status === PublishStatusEnumApiModel.Error) {
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
