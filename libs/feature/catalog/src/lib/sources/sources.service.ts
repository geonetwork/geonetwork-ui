import { Injectable } from '@angular/core'
import { SourcesApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { filter, map, shareReplay } from 'rxjs/operators'
import { CatalogSource } from './sources.model'
import { TranslateService } from '@ngx-translate/core'
import { toLang3 } from '@geonetwork-ui/util/i18n'

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  sources$: Observable<CatalogSource[]> = (
    this.sourcesApiService.getSubPortals1() as Observable<CatalogSource[]>
  ).pipe(shareReplay())

  constructor(
    private sourcesApiService: SourcesApiService,
    private translateService: TranslateService
  ) {}

  getSourceLabel(uuid: string): Observable<string> {
    return this.sources$.pipe(
      map((sources) => sources.filter((source) => source.uuid === uuid)[0]),
      filter((source) => !!source),
      map((source) => source.label[toLang3(this.translateService.currentLang)])
    )
  }
}
