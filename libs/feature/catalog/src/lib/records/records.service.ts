import { Injectable } from '@angular/core'
import { ElasticsearchService } from '@geonetwork-ui/util/shared'
import { SearchApiService } from '@geonetwork-ui/data-access/gn4'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  recordsCount$: Observable<number> = this.searchApiService
    .search(
      'records-count',
      JSON.stringify({
        ...this.esService.getSearchRequestBody(),
        track_total_hits: true,
      })
    )
    .pipe(
      map((response) => response.hits.total.value),
      shareReplay(1),
      catchError(() => of(0))
    )

  constructor(
    private esService: ElasticsearchService,
    private searchApiService: SearchApiService
  ) {}
}
