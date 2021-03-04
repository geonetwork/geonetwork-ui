import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {
  FileUploadApiService,
  AnalysisStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { Observable, of } from 'rxjs'
import { catchError, filter, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class UploadProgressGuard implements CanActivate {
  constructor(
    private router: Router,
    private fileUploadApiService: FileUploadApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.params.id
    return this.fileUploadApiService.findUploadJob(id).pipe(
      filter((job) => !!job),
      map((job) => {
        if (job.status === AnalysisStatusEnumApiModel.DONE) {
          this.router.navigate([state.url, `validation`])
          return false
        }
        if (job.status === AnalysisStatusEnumApiModel.ERROR) {
          this.router.navigate([`/`])
          return false
        }
        return true
      }),
      catchError(() => {
        this.router.navigate([`/`])
        return of(false)
      })
    )
  }
}
