import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { FileUploadApiService } from '@lib/datafeeder-api'
import { Observable, of } from 'rxjs'
import { catchError, mapTo } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class StatusGuard implements CanActivate {
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
      mapTo(true),
      catchError(() => {
        this.router.navigate(['/'])
        return of(false)
      })
    )
  }
}
