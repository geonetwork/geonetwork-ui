import { Injectable } from '@angular/core'
import { SiteApiService } from '@geonetwork-ui/data-access/gn4'
import { map, shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class Gn4SettingsService {
  public identicon$: Observable<string> = this.getSettingsSetValueByKey(
    'system/users/identicon'
  )

  public allowEditHarvested$: Observable<boolean> =
    this.getSettingsSetValueByKey('system/harvester/enableEditing')

  constructor(private siteApiService: SiteApiService) {}

  private getSettingsSetValueByKey(key: string) {
    return this.siteApiService.getSettingsSet(null, [key]).pipe(
      map((v) => v[key]),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }
}
