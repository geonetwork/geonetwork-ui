import { Injectable } from '@angular/core'
import { SourcesApiService } from '@geonetwork-ui/data-access/gn4'
import { LangService } from '@geonetwork-ui/util/i18n'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { CatalogSource } from './sources.model'

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  sources$: Observable<Array<CatalogSource>> = this.sourcesApiService
    .getSources1()
    .pipe(shareReplay())
  sourceUuid$ = new BehaviorSubject('')
  sourceLabel$: Observable<CatalogSource> = combineLatest(
    this.sources$,
    this.sourceUuid$
  ).pipe(
    map(
      ([sources, uuid]) => sources.filter((source) => source.uuid === uuid)[0]
    ),
    map((source) => (source ? source.label[this.langService.iso3] : undefined))
  )

  constructor(
    private sourcesApiService: SourcesApiService,
    private langService: LangService
  ) {}

  setSourceUuid(uuid: string) {
    this.sourceUuid$.next(uuid)
  }
}
