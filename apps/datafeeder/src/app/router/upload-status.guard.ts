import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { FileUploadApiService } from '@lib/datafeeder-api'
import { iif, Observable, of } from 'rxjs'
import { catchError, mapTo, mergeMap, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class UploadStatusGuard implements CanActivate {
  constructor(
    private router: Router,
    private fileUploadApiService: FileUploadApiService,
    private facade: DatafeederFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.params.id

    return this.facade.upload$.pipe(
      mergeMap((stateUpload) =>
        iif(
          () => !!stateUpload,
          of(true),
          this.fileUploadApiService.findUploadJob(id).pipe(
            tap((upload) => this.facade.setUpload(upload)),
            mapTo(true),
            catchError(() => {
              this.router.navigate([`/`])
              return of(false)
            })
          )
        )
      )
    )
  }
}
