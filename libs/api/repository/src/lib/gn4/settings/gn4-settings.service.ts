import { Injectable, inject } from '@angular/core'
import { SiteApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable, of, switchMap } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class Gn4SettingsService {
  private siteApiService = inject(SiteApiService)

  public identicon$: Observable<string> = this.getSettingsSetValueByKey(
    'system/users/identicon'
  )

  public allowEditHarvested$: Observable<boolean> =
    this.getSettingsSetValueByKey('system/harvester/enableEditing')

  public allowFeedbacks$: Observable<boolean> = this.getSettingsSetValueByKey(
    'system/userFeedback/enable'
  )

  public apiVersion$: Observable<string> = this.getSettingsSetValueByKey(
    'system/platform/version'
  )

  private getSettingsSetValueByKey(key: string) {
    return of(true).pipe(
      switchMap(() => this.siteApiService.getSettingsSet(null, [key])),
      map((v) => v[key]),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }
}
