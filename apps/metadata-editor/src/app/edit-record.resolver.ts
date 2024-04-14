import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { catchError, EMPTY, Observable } from 'rxjs'
import { EditorService } from '@geonetwork-ui/feature/editor'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { NotificationsService } from '@geonetwork-ui/feature/notifications'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class EditRecordResolver {
  constructor(
    private editorService: EditorService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CatalogRecord> {
    return this.editorService.loadRecordByUuid(route.paramMap.get('uuid')).pipe(
      catchError((error) => {
        this.notificationsService.showNotification({
          type: 'error',
          title: this.translateService.instant('editor.record.loadError.title'),
          text: `${this.translateService.instant(
            'editor.record.loadError.body'
          )} ${error.message}`,
          closeMessage: this.translateService.instant(
            'editor.record.loadError.closeMessage'
          ),
        })
        return EMPTY
      })
    )
  }
}
