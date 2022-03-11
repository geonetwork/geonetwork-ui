import { Injectable } from '@angular/core'
import { SourcesApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { CatalogSource } from './sources.model'

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  $sources: Observable<Array<CatalogSource>> = this.sourcesApiService
    .getSources1()
    .pipe(share())

  constructor(private sourcesApiService: SourcesApiService) {}

  public getSource(uuid: string): Observable<CatalogSource> {
    return this.$sources.pipe(
      map((sources) => sources.filter((source) => source.uuid === uuid)[0])
    )
  }
}
