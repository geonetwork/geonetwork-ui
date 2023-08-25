import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, shareReplay } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  recordsCount$: Observable<number> = this.recordsRepository
    .search({
      limit: 0,
      offset: 0,
    })
    .pipe(
      map((response) => response.count),
      shareReplay(1),
      catchError(() => of(0))
    )

  constructor(private recordsRepository: RecordsRepositoryInterface) {}
}
