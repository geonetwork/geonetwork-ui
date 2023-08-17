import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { FileUploadApiService } from '@geonetwork-ui/data-access/datafeeder'
import { Observable, of } from 'rxjs'
import { catchError, mapTo, mergeMap, take, tap } from 'rxjs/operators'
import { DatafeederFacade } from '../store/datafeeder.facade'

@Injectable({ providedIn: 'root' })
export class UploadStatusGuard {
  constructor(
    private router: Router,
    private fileUploadApiService: FileUploadApiService,
    private facade: DatafeederFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // eslint-disable-line
  ): Observable<boolean> {
    const id = route.params.id

    return this.facade.upload$.pipe(
      take(1),
      mergeMap((stateUpload) => {
        return stateUpload
          ? of(true)
          : this.fileUploadApiService.findUploadJob(id).pipe(
              tap((upload) => this.facade.setUpload(upload)),
              mapTo(true),
              catchError(() => {
                this.router.navigate([`/`])
                return of(false)
              })
            )
      })
    )
  }
}
