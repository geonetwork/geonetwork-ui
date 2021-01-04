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
import { DEFAULT_UI_CONFIG } from './constant'

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

  /**
   * Adapt GeoNetwork current UI config to Angular app UI config.
   * At some point this should be removed and converge to the same.
   *
   * TODO Changes are:
   * * Aggregation / Move GN specific config properties to the meta tag
   * (the meta tag is returned by Elasticsearch)
   */
  buildConfig(configString) {
    const config =
      typeof configString === 'string' ? JSON.parse(configString) : configString

    const aggs = config.mods.search.facetConfig
    const aggsPropertyToMoveToMeta = ['userHasRole', 'collapsed']
    Object.keys(aggs).map((key) => {
      aggsPropertyToMoveToMeta.map((property) => {
        if (aggs[key].hasOwnProperty(property)) {
          const o = { ...aggs[key].meta }
          o[property] = aggs[key][property]
          aggs[key].meta = o
          delete aggs[key][property]
        }
      })
    })

    return config
  }

  uiConfReady(uiIdentifier: string): Observable<any> {
    if (!this.uiConfigurations[uiIdentifier]) {
      this.uiConfigurations = {
        ...this.uiConfigurations,
        [uiIdentifier]: this.uiService.getUiConfiguration(uiIdentifier).pipe(
          pluck('configuration'),
          map((configString) => this.buildConfig(configString)),
          catchError((error) => {
            this.logService.warn(
              `Error during UI configuration loading: ${uiIdentifier}. Using default.`
            )
            return of(this.buildConfig(DEFAULT_UI_CONFIG))
          }),
          shareReplay()
        ),
      }
    }
    return this.uiConfigurations[uiIdentifier]
  }
}
