import { Injectable } from '@angular/core'
import { SourcesApiService } from '@geonetwork-ui/data-access/gn4'
import { LangService } from '@geonetwork-ui/util/i18n'
import { Observable } from 'rxjs'
import { filter, map, shareReplay } from 'rxjs/operators'
import { CatalogSource } from './sources.model'

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  sources$: Observable<CatalogSource[]> = this.sourcesApiService
    .getSources1()
    .pipe(shareReplay())

  constructor(
    private sourcesApiService: SourcesApiService,
    private langService: LangService
  ) {}

  getSourceLabel(uuid: string): Observable<string> {
    return this.sources$.pipe(
      map((sources) => sources.filter((source) => source.uuid === uuid)[0]),
      filter((source) => !!source),
      map((source) => source.label[this.langService.iso3])
    )
  }
}
