import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {
  AnalysisStatusEnumApiModel,
  FileUploadApiService,
} from '@geonetwork-ui/data-access/datafeeder'
import { Observable, of } from 'rxjs'
import { catchError, filter, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class UploadProgressGuard {
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
        if (job.status === AnalysisStatusEnumApiModel.Done) {
          this.router.navigate([
            state.url,
            UploadProgressGuard.getRedirectPage(job.datasets[0].format),
          ])
          return false
        }
        if (job.status === AnalysisStatusEnumApiModel.Error) {
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

  static getRedirectPage(format: string) {
    switch (format) {
      case 'CSV':
        return 'validation-csv'
      case 'SHAPEFILE':
        return 'validation'
      default:
        return '/'
    }
  }
}
