import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { catchError, EMPTY, Observable } from 'rxjs'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Injectable({
  providedIn: 'root',
})
export class DuplicateRecordResolver {
  private recordsRepository = inject(RecordsRepositoryInterface)
  private notificationsService = inject(NotificationsService)
  private translateService = inject(TranslateService)

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<[CatalogRecord, string, boolean]> {
    return this.recordsRepository
      .openRecordForDuplication(route.paramMap.get('uuid'))
      .pipe(
        catchError((error) => {
          this.notificationsService.showNotification(
            {
              type: 'error',
              title: this.translateService.instant(
                'editor.record.loadError.title'
              ),
              text: `${this.translateService.instant(
                'editor.record.loadError.body'
              )} ${error.message}`,
              closeMessage: this.translateService.instant(
                'editor.record.loadError.closeMessage'
              ),
            },
            undefined,
            error
          )
          return EMPTY
        })
      )
  }
}
