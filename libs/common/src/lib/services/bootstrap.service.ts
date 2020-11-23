import { Injectable } from '@angular/core'
import {
  SettingsListResponseApiModel,
  SiteApiService,
  UiApiService,
  UiSettingApiModel,
} from '@lib/gn-api'
import { Observable, of } from 'rxjs'
import { catchError, map, pluck, shareReplay } from 'rxjs/operators'
import { LogService } from './log.service'

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  private uiConfigurations: Record<string, Observable<UiSettingApiModel>>

  constructor(
    private siteApiService: SiteApiService,
    private logService: LogService,
    private uiService: UiApiService
  ) {
    this.uiConfigurations = {}
  }

  siteInfoReady(): Observable<SettingsListResponseApiModel> {
    return this.siteApiService.getSiteOrPortalDescription().pipe(shareReplay())
  }

  settingsReady(): Observable<SettingsListResponseApiModel> {
    return this.siteApiService.getSettingsSet().pipe(shareReplay())
  }

  uiConfReady(uiIdentifier: string): Observable<any> {
    if (!this.uiConfigurations[uiIdentifier]) {
      this.uiConfigurations = {
        ...this.uiConfigurations,
        [uiIdentifier]: this.uiService.getUiConfiguration(uiIdentifier).pipe(
          pluck('configuration'),
          map((configString) => JSON.parse(configString)),
          catchError((error) => {
            this.logService.warn(
              `Error during UI configuration loading: ${uiIdentifier}`
            )
            return of({})
          }),
          shareReplay()
        ),
      }
    }
    return this.uiConfigurations[uiIdentifier]
  }
}
