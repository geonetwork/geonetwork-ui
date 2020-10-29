import { Injectable } from '@angular/core'
import {
  SettingsListResponseApiModel,
  SiteApiService,
  UiApiService,
  UiSettingApiModel,
} from '@lib/gn-api'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  private uiConfigurations: Record<string, Observable<UiSettingApiModel>>

  constructor(
    private siteApiService: SiteApiService,
    private uiService: UiApiService
  ) {
    this.uiConfigurations = {}
  }

  siteInfoReady(): Observable<SettingsListResponseApiModel> {
    return this.siteApiService.getSiteOrPortalDescription().pipe(
      map((r) => r),
      shareReplay()
    )
  }

  settingsReady(): Observable<SettingsListResponseApiModel> {
    return this.siteApiService.getSettingsSet().pipe(
      map((r) => r),
      shareReplay()
    )
  }

  uiConfReady(uiIdentifier: string): Observable<UiSettingApiModel> {
    if (!this.uiConfigurations[uiIdentifier]) {
      this.uiConfigurations = {
        ...this.uiConfigurations,
        [uiIdentifier]: this.uiService.getUiConfiguration(uiIdentifier).pipe(
          map((r) => r),
          shareReplay()
        ),
      }
    }
    return this.uiConfigurations[uiIdentifier]
  }
}
